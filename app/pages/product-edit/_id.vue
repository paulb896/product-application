<template>
  <div class="card">
    <div v-if="!product || (product.id && !product.title)" class="card-body">
      <h3>Product Has Been Deleted!</h3>
      <NLink to="/search">Go to Product Search</NLink>
    </div>
    <div v-else class="card-body">
      <h2>Product Edit</h2>
      <p class="card-text">Product ID: {{ $route.params.id }}</p>
      <h5 class="card-title">Current Title: {{ product ? product.title : '' }}</h5>
      <img class="card-img-top" :src="product.mainImageUrl" style="max-width: 30rem">
      <p class="card-text">Current Description: {{ product ? product.description : '' }}</p>
      <div class="form-group mb-2">
        <input type="text"  class="form-control" v-model="product.title" id="title" placeholder="A title for the product">
        <input type="text" class="form-control" v-model="product.description" id="description" placeholder="Product description">
        <input type="text" class="form-control" v-model="product.mainImageUrl" id="mainImageUrl" placeholder="Product Main Image">
      </div>
      <div v-if="!productRemovalIntent">
        <button @click="updateProduct()" class="btn btn-primary mb-2">Update Product</button>
        <button @click="removeProduct()" class="btn btn-dark mb-2">Remove Product</button>
      </div>
      <div v-else>
        <button @click="cancelDelete()" class="btn btn-secondary mb-2">Cancel</button>
        <button @click="deleteProduct()" class="btn btn-danger mb-2">Delete Product</button>
      </div>
    </div>
    <div v-if="!!product.title" class="card-body">
      <NLink :to="makeProductLink()">Back to Product</NLink>
    </div>
  </div>
</template>

<script>
import productQuery from "~/apollo/product.gql";
import updateMutation from "~/apollo/update.gql";
import removeMutation from "~/apollo/remove.gql";

export default {
  layout: "product",
  data: () => ({
    productRemovalIntent: false,
    title: "",
    description: "",
    product: {
      title: "",
      description: "",
      mainImageUrl: "",
      dateCreated: ""
    }
  }),
  methods: {
    makeProductLink() {
      const id = this.$route.params.id;
      const queryString = this.$route.query.text ? `?text=${this.$route.query.text}`: '';
      return `/product/${id}${queryString}`;
    },
    cancelDelete() {
      this.$data.productRemovalIntent = false;
    },
    deleteProduct() {
      const self = this;
      const { id } = this.$data.product;
      this.$apollo.mutate({
        mutation: removeMutation,
        variables: {
          id
        }
      });
    },
    removeProduct() {
      this.$data.productRemovalIntent = true;
    },
    updateProduct() {
      const { id, title, description, mainImageUrl, dateCreated } = this.$data.product;
      this.$apollo.mutate({
        mutation: updateMutation,
        variables: {
          id,
          title,
          description,
          mainImageUrl,
          dateCreated
        }
      });
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