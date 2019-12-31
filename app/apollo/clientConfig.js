// import { InMemoryCache } from "apollo-cache-inmemory";

export default function(context){
  return {
		httpEndpoint: process.env.SERVER_SEARCH_URL ? process.env.SERVER_SEARCH_URL : 'http://localhost:4000',
		browserHttpEndpoint: '/graphql',
		// cache: new InMemoryCache(),
		wsEndpoint: 'ws://localhost:4000/api/ws',
		// wsEndpoint: process.env.WS_ENDPOINT

		// Interesting option to exclusively use websockets
		// websocketsOnly: true
  	}
}