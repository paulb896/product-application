// import { InMemoryCache } from "apollo-cache-inmemory";

export default function(context){
  return {
  		// httpLinkOptions: {
    	// 	uri: 'http://localhost:4000',
    	// 	credentials: 'same-origin'
		  // },
		// httpEndpoint: 'http://localhost:4000',
		// default: {
		httpEndpoint: process.env.SERVER_SEARCH_URL ? process.env.SERVER_SEARCH_URL : 'http://localhost:4000',
		// optional
		// override HTTP endpoint in browser only
		// browserHttpEndpoint: process.env.CLIENT_SEARCH_URL ? 'http://localhost:4000' : '/graphql',
		// browserHttpEndpoint: isClientSearchUrl ? process.env.CLIENT_SEARCH_URL : 'http://localhost:4000',
		// browserHttpEndpoint: process.env.CLIENT_SEARCH_URL ? process.env.CLIENT_SEARCH_URL : 'http://localhost:4000',
		browserHttpEndpoint: '/graphql',
		// browserHttpEndpoint: 'http://localhost:4000',
		// persisting: true
		// },
		// test: {
		// 	httpEndpoint: 'http://localhost:4000',
		// 	browserHttpEndpoint: 'http://localhost:4000'
		// }
  		// cache: new InMemoryCache(),
	    wsEndpoint: 'ws://localhost:4000/graphql',
  	}
}