import { createPersistedQueryLink } from "apollo-link-persisted-queries";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";

export default function () {
  const link = createPersistedQueryLink().concat(
    createHttpLink({ uri: process.server ? process.env.SERVER_SEARCH_URL : '/graphql', useGETForQueries: true, defaultHttpLink: false })
  );

  return {
    httpEndpoint: process.env.SERVER_SEARCH_URL ? process.env.SERVER_SEARCH_URL : 'http://localhost:4000',
    browserHttpEndpoint: '/graphql',
    cache: new InMemoryCache(),
    persisting: true,
    wsEndpoint: 'ws://localhost:4000/api/ws',
    link

    // Interesting option to exclusively use websockets
    // websocketsOnly: true
  }
}