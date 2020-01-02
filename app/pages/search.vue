<template>
  <div>
    <input class="form-control form-control-lg" type="search" v-model="searchText" placeholder="Search text" />
    <ul class="list-group">
      <li v-for="item in filteredProducts" :key="item.id" class="border-light list-group-item list-group-item-action">
        <NLink v-bind:to="item.id | makeLink">
          <img class="card-img-top" :src="item.mainImageUrl">
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

export default {
  layout: "product",
  data: () => ({
    removedProducts: [],
    searchText: "Hello",
    search() {
      return [];
    }
  }),
  filters: {
    makeLink(id) {
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
