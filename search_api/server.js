

const { ApolloServer, gql } = require('apollo-server');

const { Client } = require('@elastic/elasticsearch');

const client = new Client({ node: process.env.ELASTIC_SEARCH_URL ? process.env.ELASTIC_SEARCH_URL : 'http://localhost:9200' })

const typeDefs = gql`
  type Result {
    title: String
  }

  type Query {
    search (text: String): [Result]
  }
`;

const resolvers = {
  Query: {
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
      }).then(({body: results}) => {
          if (results && results.hits.hits && results.hits.hits.length) {
            return results.hits.hits.map(result => result._source);
          }

          return [];
        }).catch (e => {
          console.log('Search error', e);
          return [];
        })
    }
  }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});