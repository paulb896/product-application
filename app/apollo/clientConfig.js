// import { InMemoryCache } from "apollo-cache-inmemory";
export default function(context){
  return {
  		// httpLinkOptions: {
    	// 	uri: 'http://localhost:4000',
    	// 	credentials: 'same-origin'
		  // },
		// httpEndpoint: 'http://localhost:4000',
		httpEndpoint: process.env.SERVER_SEARCH_URL ? process.env.SERVER_SEARCH_URL : 'http://localhost:4000',
		  // optional
		  // override HTTP endpoint in browser only
		browserHttpEndpoint: 'http://localhost:4000',
  		// cache: new InMemoryCache(),
	    // wsEndpoint: 'ws://localhost:8080/v1/graphql',
  	}
}