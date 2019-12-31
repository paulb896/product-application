<template>
  <div>
  <ProductNav />
  <div class="container">
    <Nuxt/>
  </div>
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
