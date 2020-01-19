<template>
    <Search />
</template>

<script>
import Search from '~/components/Search';

export default {
  layout: "product",
  head: {
    title: "Search Products"
  },
  components: {
    Search
  }
};
</script>
