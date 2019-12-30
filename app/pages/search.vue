<template>
  <div>
    <input v-model="searchText" placeholder="Search text" />
    <ul>
      <li v-for="item in search" :key="item.id">
        <NLink v-bind:to="item.id | makeLink">{{item.title}}</NLink>
      </li>
    </ul>
  </div>
</template>

<script>
import searchQuery from "~/apollo/search.gql";

export default {
  layout: "product",
  data: () => ({
    searchText: "Hello",
    search: () => {
      return [];
    }
  }),
  filters: {
    makeLink: id => {
      return `/product/${id}`;
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
