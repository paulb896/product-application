<template>
  <div>
    <ul>
      <li v-for="item in search" :key="item.id">
        {{ item.title }}
      </li>
    </ul>
    <input v-model="searchText" placeholder="Search text" />
    <NLink to="/">
      Home page
    </NLink>
  </div>
</template>

<script>
import searchQuery from './search.gql'

export default {
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
    title: 'About page'
  }
}
</script>
