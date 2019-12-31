<template>
  <div>
    <b>New Products</b>
    <ul>
      <li v-for="item in products" :key="item.id">{{ item.title }}
        <vue-timeline-update
          :date="new Date()"
          :title="item.title"
          description="Today I am thrilled to announce the release of Vue.js 2.2.0."
          thumbnail="/images/vuetimeline/initial_d.jpg"
          category="New Product"
          icon="code"
          color="blue" >
          <div>More content here</div>
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
