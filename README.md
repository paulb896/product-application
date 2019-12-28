# Product Catalog Application

## Building All Dependencies

    docker-compose build

## Running the App

    docker-compose up

The app should now be available on localhost

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