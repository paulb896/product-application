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
        <label for="mainImageUrl" class="col-sm-2 col-form-label">Image Url</label>
        <div class="col-sm-5">
          <input type="text" class="form-control" v-model="mainImageUrl" id="description" placeholder="Product image url">
          <img class="card-img-top" :src="mainImageUrl">
        </div>
      </div>
      <div class="form-row mt-2">
        <label for="create" class="col-sm-2"></label>
        <div class="col-sm-3">
          <button id="create" @click="createProduct()" class="btn btn-primary">Create Product</button>
        </div>
      </div>
    </div>
    <LiveUpdates />
  </div>
</template>

<script>
import createMutation from "~/apollo/create.gql";
import LiveUpdates from '~/components/LiveUpdates'

export default {
  name: "create",
  layout: "product",
  components: {
    LiveUpdates
  },
  data() {
    return {
      title: "",
      description: "",
      mainImageUrl: "https://i.imgur.com/VxeNZ.jpg"
    };
  },
  methods: {
    createProduct() {
      const { title, description, mainImageUrl } = this.$data;
      this.$apollo.mutate({
        mutation: createMutation,
        variables: {
          title,
          description,
          mainImageUrl
        }
      });
    }
  },
  head: {
    title: "Create Product"
  }
};
</script>