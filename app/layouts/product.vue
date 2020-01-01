<template>
  <div>
  <ProductNav />
  <div class="container-fluid">
    <Nuxt/>
  </div>
  </div>
</template>

<script>
import ProductNav from '~/components/ProductNav'
import productAdditions from "~/apollo/productCreated.gql";
import productRemovals from "~/apollo/productRemoved.gql";
import productUpdates from "~/apollo/productUpdated.gql";

export default {
  name: 'product',
  components: {
    ProductNav
  },
  apollo: {
    $subscribe: {
      productAdditions: {
        query: productAdditions
      },
      productsRemovals: {
        query: productRemovals
      },
      productUpdates: {
        query: productUpdates
      }
    }
  }
};
</script>
