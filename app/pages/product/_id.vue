<template>
  <div class="card">
    <div v-if="product && !product.id || (product.id && !product.title)" class="card-body">
      <h3>Product Has Been Deleted!</h3>
      <NLink to="/search">Go to Product Search</NLink>
    </div>
    <div v-else class="card-body">
      <img class="card-img-top" style="max-width: 30rem" :src="product.mainImageUrl" v-if="product.mainImageUrl">
      <h5 class="card-title">{{ product ? product.title : '' }}</h5>
      <p class="card-text">Product ID: {{ $route.params.id }}</p>
      <p class="card-text">{{ product ? product.description : '' }}</p>
      <p class="card-text">{{ product ? product.dateCreated : '' }}</p>
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
      dateCreated: "",
      title: "",
      description: "",
      mainImageUrl: ""
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
      // TODO: Update once https://github.com/nuxt-community/apollo-module/issues/295 is fixed.
      pollInterval: process.server ? undefined: 20000,
      preFetch: true,
      notifyOnNetworkStatusChange: true,
      variables() {
        return {
          id: this.$route.params.id
        };
      }
    }
  }
};
</script>