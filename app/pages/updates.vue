<template>
  <div>
    <h1>New Products</h1>
    <ul>
      <li v-for="item in products" :key="item.id">{{ item.title }}</li>
    </ul>
  </div>
</template>

<script>
import productSubscription from "~/apollo/updates.gql";

export default {
  layout: "product",
  data: () => ({
    products: []
  }),
  apollo: {
    $subscribe: {
      products: {
        query: productSubscription,
        result(result) {
          this.products.push(result.data.productCreated)
        }
      }
    }
  },
  head: {
    title: "Live Product Data"
  }
};
</script>
