<template>
  <div class="product pt-2 pl-3">
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
