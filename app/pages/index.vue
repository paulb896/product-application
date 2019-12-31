<template>
  <div class="product">
    <h1>Product Website</h1>
    <RecentUpdates />
  </div>
</template>

<script>
import RecentUpdates from '~/components/RecentUpdates'

export default {
  layout: "product",
  head: {
    title: "Home page"
  },
  components: {
    RecentUpdates
  }
};
</script>
