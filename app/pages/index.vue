<template>
  <div class="product">
    <h2>Recent Updates</h2>
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
