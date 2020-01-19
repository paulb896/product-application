<template>
  <div class="product">
    <RecentUpdates style="max-width: 35em" />
  </div>
</template>

<script>
import RecentUpdates from '~/components/RecentUpdates'

export default {
  layout: "product",
  head: {
    title: "Recent Product Updates"
  },
  components: {
    RecentUpdates
  }
};
</script>
