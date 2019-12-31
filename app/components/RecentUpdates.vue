<template>
  <div>
    <b>New Products</b>
    <ul>
      <li v-for="item in products" :key="item.id">{{ item.title }}
        <vue-timeline-update
          :date="new Date()"
          :title="item.title"
          :description="item.description"
          category="New Product"
          icon="headset"
          color="blue" >
        </vue-timeline-update>
      </li>
    </ul>
  </div>
</template>

<script>
import productSubscription from "~/apollo/updates.gql";

export default {
  data: () => ({
    products: []
  }),
  apollo: {
    $subscribe: {
      products: {
        query: productSubscription,
        result(result) {
          this.products.unshift(result.data.productCreated);
        }
      }
    }
  }
};
</script>
