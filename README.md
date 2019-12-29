# Product Catalog Application

A template nodejs application using Nuxt for a component and page rendering server. Nuxt application components load data (when rendering on the server or client) from a GraphQL search endpoint, that retrieves data from an elasticsearch endpoint.

## Dependencies

Requires Docker and Docker Compose to be installed on the host machine.


## Building All Dependencies

The `docker-compose` command with pull down all necessary images for Node.js, Elasticsearch, and Nginx, and build the GraphQL and Nuxt server applications (`npm run build` as defined in each applications Dockerfile).

### Install Docker Compose

    sudo curl -L "https://github.com/docker/compose/releases/download/1.25.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose

### Raise Default memory limit on host machine as required by the elasticsearch container. [More Details](https://www.elastic.co/guide/en/elasticsearch/reference/current/vm-max-map-count.html).

**Resolves Issue:** `Invalid kernel settings. Elasticsearch requires at least: vm.max_map_count = 262144`.

    sudo sysctl -w vm.max_map_count=262144

### Build the App and All Dependencies

    docker-compose build

    # Using docker-compose >= 1.23.0
    docker-compose build --parallel


-----

## Running the App

    docker-compose up

The app should now be available on localhost port 80: http://localhost.


## Benchmark Search Page

    ab -n 5000 -c 50 http://localhost/search

## Benchmark GraphQL Endpoint

    ab -n 12000 -c 100 -T 'application/json' -p example-search-query.json  http://localhost/graphql

-----

## Elasticsearch Docs

### Create a new index

    curl -X PUT "localhost:9200/my-index?pretty" -H 'Content-Type: application/json' -d'
    {
        "settings" : {
            "number_of_shards" : 2
        },
        "mappings" : {
            "properties" : {
                "title" : { "type" : "text" }
            }
        }
    }
    '

### View all current indexes

    curl http://localhost:9200/_cat/indices


### Add a new document

    curl -XPOST http://localhost:9200/my-index/1 -d '{"title":"Hello world"}' -H "Content-Type: application/json"

### Benchmark elasticsearch

    ab -n 12000 -c 100 http://localhost:9200/my-index/_search?q=title:hello