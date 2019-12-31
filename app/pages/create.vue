<template>
  <div>
    <div class="form-inline">
      <div class="form-group mb-2">
        <input type="text" class="form-control" v-model="title" id="title" placeholder="A title for the product">
        <input type="text" class="form-control" v-model="description" id="description" placeholder="Product description">
      </div>
      <button @click="createProduct()" class="btn btn-primary mb-2">Create Product</button>
    </div>
    <RecentUpdates />
  </div>
</template>

<script>
import createMutation from "~/apollo/create.gql";
import RecentUpdates from '~/components/RecentUpdates'

export default {
  name: "create",
  layout: "product",
  components: {
    RecentUpdates
  },
  data() {
    return {
      title: "",
      description: ""
    };
  },
  methods: {
    createProduct() {
      const { title, description } = this.$data;
      this.$apollo.mutate({
        mutation: createMutation,
        variables: {
          title,
          description
        }
      });
    }
  },
  head: {
    title: "Create Product"
  }
};
</script>