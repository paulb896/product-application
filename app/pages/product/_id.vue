<template>
  <div>
    Product ID: <b>{{ $route.params.id }}</b>
    <h1>{{ product ? product.title : '' }}</h1>
  </div>
</template>

<script>
import productQuery from "~/apollo/product.gql";

export default {
  layout: "product",
  data: () => ({
    id: '',
    product: {
      title: ""
    }
  }),
  apollo: {
    product: {
      query: productQuery,
      variables() {
        return {
          id: this.$route.params.id
        };
      }
    }
  }
};
</script>