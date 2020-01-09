<template>
  <div class="product pt-2 pl-3">
    <h2>Live Updates</h2>
    <LiveUpdates />
  </div>
</template>

<script>
import LiveUpdates from '~/components/LiveUpdates'

export default {
  layout: "product",
  head: {
    title: "Live Product Updates"
  },
  components: {
    LiveUpdates
  }
};
</script>
