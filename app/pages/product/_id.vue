<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{ product ? product.title : '' }}</h5>
      <p class="card-text">Product ID: {{ $route.params.id }}</p>
      <p class="card-text">{{ product ? product.description : '' }}</p>
      <NLink v-bind:to="$route.params.id | makeEditLink">Edit Product</NLink>
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
  filters: {
    makeEditLink(id) {
      return `/product-edit/${id}`;
    }
  },
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