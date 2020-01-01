<template>
  <div>
    <input class="form-control mr-sm-2" type="search" v-model="searchText" placeholder="Search text" />
    <ul class="list-group">
      <li v-for="item in filteredProducts" :key="item.id" class="list-group-item">
        <NLink v-bind:to="item.id | makeLink">
          <div class="card-body">
            <h5 class="card-title">{{ item.title }}</h5>
            <p class="card-text">{{ item.description }}</p>
          </div>
        </NLink>
      </li>
    </ul>
  </div>
</template>

<script>
import searchQuery from "~/apollo/search.gql";
import productRemovals from "~/apollo/productRemoved.gql";
import productUpdates from "~/apollo/productUpdated.gql";

export default {
  layout: "product",
  data: () => ({
    removedProducts: [],
    searchText: "Hello",
    search: () => {
      return [];
    }
  }),
  filters: {
    isProductShown: () => {
      return true;
    },
    makeLink: id => {
      return `/product/${id}`;
    }
  },
  computed: {
    filteredProducts() {
      return this.$data.search.length ? this.$data.search.filter(product => {
        return product.title ? true : false;
      }) : [];
    }
  },
  apollo: {
    $subscribe: {
      products: {
        query: productRemovals
      },
      productUpdates: {
        query: productUpdates
      }
    },
    search: {
      query: searchQuery,
      variables() {
        return {
          text: this.searchText
        };
      }
    }
  },
  head: {
    title: "Search Products"
  }
};
</script>
