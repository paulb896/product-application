

const { ApolloServer, gql, PubSub } = require('apollo-server');

const pubsub = new PubSub();

const { Client } = require('@elastic/elasticsearch');

const client = new Client({ node: process.env.ELASTIC_SEARCH_URL ? process.env.ELASTIC_SEARCH_URL : 'http://localhost:9200' })

const typeDefs = gql`
  type Product {
    id: ID
    title: String
    description: String
  }

  type AddProductResult {
    product: Product
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
  }

  type Mutation {
    addProduct(title: String description: String): AddProductResult
    updateProduct(id: String! title: String description: String): UpdateProductResult
  }

  type Subscription {
    productCreated: Product
  }
`;

const PRODUCT_CREATED = 'PRODUCT_CREATED'

const resolvers = {
  Subscription: {
    productCreated: {
      subscribe: () => pubsub.asyncIterator([PRODUCT_CREATED]),
    },
  },
  Mutation: {
    addProduct: (async (_, { title, description }) => {
      return client.index({
        index: 'my-index',
        body: {
          title,
          description
        }
      }).then(async res => {
        const product = { title, description, id: res.body._id };

        pubsub.publish(PRODUCT_CREATED, { productCreated: product });

        // TODO: MOVE THIS SOMEWHERE ELSE?
        await client.indices.refresh({ index: 'my-index' });

        return {
          success: true,
          product
        }
      });
    }),
    updateProduct: (async (_, { id, title, description }) => {
      return client.index({
        index: 'my-index',
        id,
        body: {
          title,
          description
        }
      }).then(async res => {
        // return {};
        const product = { title, description, id: res.body._id };

        pubsub.publish(PRODUCT_CREATED, { productCreated: product });

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
          id: product.body._id
        }
      })
    }),
    search: async (_, { text }) => {
      return client.search({
        index: 'my-index',
        body: {
          query: {
            fuzzy: {
              title: text
            }
          }
        }
      }).then(({ body: results }) => {
        if (results && results.hits.hits && results.hits.hits.length) {
          return results.hits.hits.map(result => ({
            title: result._source.title,
            description: result._source.description,
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
  persistedQueries: {
    cache: true
  },
  subscriptions: {
    keepAlive: 1000,
    path: '/api/ws'
  },
  cacheControl: { defaultMaxAge: 10 },
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});