<template>
  <div>
    <div>
      <div class="form-row">
        <label for="title" class="col-sm-2 col-form-label">Product Title</label>
        <div class="col-sm-5">
          <input type="text" class="form-control" v-model="title" id="title" placeholder="A title for the product">
        </div>
      </div>
      <div class="form-row">
        <label for="description" class="col-sm-2 col-form-label">Description</label>
        <div class="col-sm-5">
          <input type="text" class="form-control" v-model="description" id="description" placeholder="Product description">
        </div>
      </div>
      <div class="form-row">
        <label for="create" class="col-sm-2"></label>
        <div class="col-sm-3">
          <button id="create" @click="createProduct()" class="btn btn-primary">Create Product</button>
        </div>
      </div>
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