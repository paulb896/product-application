<template>
  <div class="card">
    <div class="card-body">
      <h2>Product Edit</h2>
      <h5 class="card-title">Current Title: {{ product ? product.title : '' }}</h5>
      <p class="card-text">Product ID: {{ $route.params.id }}</p>
      <p class="card-text">Current Description: {{ product ? product.description : '' }}</p>
      <div class="form-group mb-2">
        <label for="inputPassword2" class="sr-only">Title</label>
        <input type="text" class="form-control" v-model="product.title" id="title" placeholder="A title for the product">
        <input type="text" class="form-control" v-model="product.description" id="title" placeholder="Product description">
      </div>
      <button @click="updateProduct()" class="btn btn-primary mb-2">Update Product</button>
    </div>
    <div class="card-body">
      <NLink v-bind:to="$route.params.id | makeLink">Back to Product</NLink>
    </div>
  </div>
</template>

<script>
import productQuery from "~/apollo/product.gql";
import updateMutation from "~/apollo/update.gql";

export default {
  layout: "product",
  data: () => ({
    id: '',
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