<template>
  <div>
    <ProductNav />
    <div class="container-fluid">
      <Nuxt/>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" defer></script>
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" defer></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" defer></script>
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
