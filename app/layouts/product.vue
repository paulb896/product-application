<template>
  <div class="container">
    <ProductNav class="mb-2"/>
    <Nuxt/>
  </div>
</template>

<script>
import ProductNav from '~/components/ProductNav'

export default {
  name: 'product',
  components: {
    ProductNav
  }
};
</script>
