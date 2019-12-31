<template>
  <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">{{ product ? product.title : '' }}</h5>
      <p class="card-text">Product ID: {{ $route.params.id }}</p>
    </div>
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