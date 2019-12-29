<template>
  <div>
    <ProductNav/>
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
