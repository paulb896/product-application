<template>
  <div>
    <div class="flex flex-column mt3">
      <input class="mb2" v-model="title" type="text" placeholder="A title for the product" />
    </div>
    <button @click="createProduct()">Create Product</button>
  </div>
</template>

<script>
import createMutation from '~/apollo/create.gql';

export default {
  name: 'create',
  layout: 'product',
  data() {
    return {
      title: ''
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
    title: 'Create Product'
  }
};
</script>