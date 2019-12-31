<template>
  <div>
    <input class="form-control mr-sm-2" type="search" v-model="searchText" placeholder="Search text" />
    <ul class="list-group">
      <li v-for="item in search" :key="item.id" class="list-group-item">
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
