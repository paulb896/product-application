<template>
  <div>
    <form class="form-inline">
      <div class="form-group mx-sm-3 mb-2">
        <label for="inputPassword2" class="sr-only">Title</label>
        <input type="text" class="form-control" v-model="title" id="title" placeholder="A title for the product">
      </div>
      <button @click="createProduct()" type="submit" class="btn btn-primary mb-2">Create Product</button>
    </form>
  </div>
</template>

<script>
import createMutation from "~/apollo/create.gql";

export default {
  name: "create",
  layout: "product",
  data() {
    return {
      title: ""
    };
  },
  methods: {
    createProduct() {
      const { title } = this.$data;
      this.$apollo.mutate({
        mutation: createMutation,
        variables: {
          title
        }
      });
    }
  },
  head: {
    title: "Create Product"
  }
};
</script>