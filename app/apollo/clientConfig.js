// import { InMemoryCache } from "apollo-cache-inmemory";

export default function(context){
  return {
		httpEndpoint: process.env.SERVER_SEARCH_URL ? process.env.SERVER_SEARCH_URL : 'http://localhost:4000',

		browserHttpEndpoint: '/graphql',

		wsEndpoint: process.env.WEBSOCKET_URL ? process.env.WEBSOCKET_URL : '/api/ws'
  	}
}