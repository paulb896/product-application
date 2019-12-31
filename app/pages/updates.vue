<template>
  <div class="product">
    <h1>Updates</h1>
    <RecentUpdates />
  </div>
</template>

<script>
import RecentUpdates from '~/components/RecentUpdates'

export default {
  layout: "product",
  head: {
    title: "Product Updates"
  },
  components: {
    RecentUpdates
  }
};
</script>
