<template>
  <div class="card">
    <div class="card-body">
      <h2>Product Edit</h2>
      <p class="card-text">Product ID: {{ $route.params.id }}</p>
      <h5 class="card-title">Current Title: {{ product ? product.title : '' }}</h5>
      <p class="card-text">Current Description: {{ product ? product.description : '' }}</p>
      <div class="form-group mb-2">
        <input type="text"  class="form-control" v-model="product.title" id="title" placeholder="A title for the product">
        <input type="text" class="form-control" v-model="product.description" id="description" placeholder="Product description">
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
    <div class="card-body">
      <NLink v-bind:to="$route.params.id | makeLink">Back to Product</NLink>
    </div>
  </div>
</template>

<script>
import productQuery from "~/apollo/product.gql";
import updateMutation from "~/apollo/update.gql";
import removeMutation from "~/apollo/remove.gql";
import productUpdates from "~/apollo/productUpdated.gql";

export default {
  layout: "product",
  data: () => ({
    productRemovalIntent: false,
    title: "",
    description: "",
    product: {
      title: "",
      description: ""
    }
  }),
  filters: {
    makeLink: id => {
      return `/product/${id}`;
    }
  },
  methods: {
    cancelDelete() {
      this.$data.productRemovalIntent = false;
    },
    deleteProduct() {
      const { id } = this.$data.product;
      this.$apollo.mutate({
        mutation: removeMutation,
        variables: {
          id
        },
        update: () => {
          window.location.href = "/";
        }
      });
    },
    removeProduct() {
      this.$data.productRemovalIntent = true;
    },
    updateProduct() {
      const { id, title, description } = this.$data.product;
      this.$apollo.mutate({
        mutation: updateMutation,
        variables: {
          id,
          title,
          description
        }
      });
    }
  },
  apollo: {
    $subscribe: {
      productUpdates: {
        query: productUpdates
      }
    },
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