

const { ApolloServer, gql, PubSub } = require('apollo-server');

const pubsub = new PubSub();

const { Client } = require('@elastic/elasticsearch');

const client = new Client({ node: process.env.ELASTIC_SEARCH_URL ? process.env.ELASTIC_SEARCH_URL : 'http://localhost:9200' })

const typeDefs = gql`
  type Product {
    id: ID
    title: String
    description: String
    dateCreated: String
    mainImageUrl: String
  }

  type AddProductResult {
    product: Product
    success: Boolean!
    errors: [String]
  }

  type RemoveProductResult {
    success: Boolean!
    errors: [String]
  }

  type UpdateProductResult {
    product: Product
    success: Boolean!
    errors: [String]
  }

  type Query {
    search (text: String): [Product]
    product(id: String): Product
    recentProducts: [Product]
  }

  type Mutation {
    addProduct(title: String description: String mainImageUrl: String): AddProductResult
    updateProduct(id: String! title: String description: String mainImageUrl: String dateCreated: String): UpdateProductResult
    removeProduct(id: String!): RemoveProductResult
  }

  type Subscription {
    productCreated: Product
    productUpdated: Product
    productRemoved: Product
  }
`;

const PRODUCT_CREATED = 'PRODUCT_CREATED'
const PRODUCT_UPDATED = 'PRODUCT_UPDATED'
const PRODUCT_REMOVED = 'PRODUCT_REMOVED'

const redis = require('redis');
const redisClient = redis.createClient({
  url: process.env.REDIS_URL
});

redisClient.on('error', function (err) {
  console.log('Redis Error ' + err);
});

const TWENTY_SECONDS = 20 * 1000;

setInterval(() => {
  console.log('sending out all events');

  function sendProductEvents(eventName) {
    redisClient.lrange(eventName, 0, -1, (r, productEvents) => {
      productEvents.forEach(product => {
        pubsub.publish(eventName, JSON.parse(product));
      });
      redisClient.get(`${eventName}:time`, (err, lastProductEvent) => {
        if (((new Date()) - new Date(lastProductEvent)) > TWENTY_SECONDS) {
          redisClient.del(eventName)
        }
      })
    });
  }

  sendProductEvents(PRODUCT_CREATED);
  sendProductEvents(PRODUCT_UPDATED);
  sendProductEvents(PRODUCT_REMOVED);
}, 10000)

const resolvers = {
  Subscription: {
    productCreated: {
      subscribe: () => pubsub.asyncIterator([PRODUCT_CREATED]),
    },
    productUpdated: {
      subscribe: () => pubsub.asyncIterator([PRODUCT_UPDATED]),
    },
    productRemoved: {
      subscribe: () => pubsub.asyncIterator([PRODUCT_REMOVED]),
    },
  },
  Mutation: {
    addProduct: (async (_, { title, description, mainImageUrl }) => {
      const dateCreated = new Date();
      return client.index({
        index: 'my-index',
        body: {
          title,
          description,
          dateCreated,
          mainImageUrl
        }
      }).then(async res => {
        const product = { title, description, id: res.body._id, dateCreated, mainImageUrl };
        const productAddedEvent = { productCreated: product };

        pubsub.publish(PRODUCT_CREATED, productAddedEvent);
        redisClient.rpush(PRODUCT_CREATED, JSON.stringify(productAddedEvent), () => {
          redisClient.ltrim(PRODUCT_CREATED, 0, 10);
          redisClient.set(`${PRODUCT_CREATED}:time`, new Date());
        });

        // TODO: MOVE THIS SOMEWHERE ELSE?
        await client.indices.refresh({ index: 'my-index' });

        return {
          success: true,
          product
        }
      });
    }),
    removeProduct: (async (_, { id }) => {
      return client.delete({
        id,
        index: 'my-index',
      }).then(async () => {
        const productRemovedEvent = { productRemoved: { id } }
        pubsub.publish(PRODUCT_REMOVED, productRemovedEvent);
        redisClient.rpush(PRODUCT_REMOVED, JSON.stringify(productRemovedEvent), () => {
          redisClient.ltrim(PRODUCT_REMOVED, 0, 10)
        });

        // TODO: MOVE THIS SOMEWHERE ELSE?
        await client.indices.refresh({ index: 'my-index' });

        return {
          success: true
        }
      });
    }),
    updateProduct: (async (_, { id, title, description, mainImageUrl, dateCreated }) => {
      return client.index({
        index: 'my-index',
        id,
        body: {
          title,
          description,
          mainImageUrl,
          dateCreated
        }
      }).then(async res => {
        const product = { title, description, mainImageUrl, dateCreated, id: res.body._id };
        const productUpdatedEvent = { productUpdated: product };

        pubsub.publish(PRODUCT_UPDATED, productUpdatedEvent);
        redisClient.rpush(PRODUCT_UPDATED, JSON.stringify(productUpdatedEvent), () => {
          redisClient.ltrim(PRODUCT_UPDATED, 0, 10)
        });

        // TODO: MOVE THIS SOMEWHERE ELSE?
        await client.indices.refresh({ index: 'my-index' });

        return {
          success: true,
          product
        }
      });
    })
  },
  Query: {
    product: (async (_, {id}) => {
      return client.get({
        id,
        index: 'my-index'
      }).then(product => {
        return {
          title: product.body._source.title,
          description: product.body._source.description,
          dateCreated: product.body._source.dateCreated,
          mainImageUrl: product.body._source.mainImageUrl,
          id: product.body._id
        }
      })
    }),
    recentProducts: async () => {
      return client.search({
        index: 'my-index',
        sort: ['dateCreated:desc'],
        size: 10
      }).then(({ body: results }) => {
        if (results && results.hits.hits && results.hits.hits.length) {
          return results.hits.hits.map(result => ({
            title: result._source.title,
            description: result._source.description,
            dateCreated: result._source.dateCreated,
            mainImageUrl: result._source.mainImageUrl,
            id: result._id
          }));
        }

        return [];
      }).catch(e => {
        console.log('Could not get recent products', e);
        return [];
      })
    },
    search: async (_, { text }) => {
      return client.search({
        index: 'my-index',
        body: {
          query: {
            multi_match: {
              query: text,
              fields: ["title", "description"]
            }
          }
        }
      }).then(({ body: results }) => {
        if (results && results.hits.hits && results.hits.hits.length) {
          return results.hits.hits.map(result => ({
            title: result._source.title,
            description: result._source.description,
            mainImageUrl: result._source.mainImageUrl,
            dateCreated: result._source.dateCreated,
            id: result._id
          }));
        }

        return [];
      }).catch(e => {
        console.log('Search error', e);
        return [];
      })
    }
  }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  persistedQueries: true,
  subscriptions: {
    keepAlive: 1000,
    path: '/api/ws'
  },
  cacheControl: { defaultMaxAge: 10 },
});

// The `listen` method launches a web server.
server.listen().then(async ({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
  await client.indices.putMapping({
    index: 'my-index',
    body: {
      properties: {
        title: { type: 'text' },
        description: { type: 'text' },
        dateCreated: { type: 'date' }
      }
    }
  });
});