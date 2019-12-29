<template>
  <div>
    <input v-model="searchText" placeholder="Search text" />
    <ul>
      <li v-for="item in search" :key="item.id">
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import searchQuery from '~/apollo/search.gql'

export default {
  layout: 'product',
  data: () => ({
    searchText: 'Hello'
  }),
  apollo: {
    search: {
      query: searchQuery,
      variables () {
        return {
          text: this.searchText
        }
      }
    }
  },
  head: {
    title: 'Search Products'
  }
}
</script>
