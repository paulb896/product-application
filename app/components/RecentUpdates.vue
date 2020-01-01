<template>
  <div>
    <b>New Products</b>
    <div v-for="item in products" :key="item.id">
      <NLink v-bind:to="item.id | makeLink">
        <vue-timeline-update
          :date="new Date()"
          :title="item.title"
          :description="item.description"
          category="New Product"
          icon="headset"
          :color="item.title | productColor" >
        </vue-timeline-update>
      </NLink>
    </div>

  </div>
</template>

<script>
import productSubscription from "~/apollo/productUpdated.gql";

export default {
  data: () => ({
    products: []
  }),
  filters: {
    makeLink: id => {
      return `/product/${id}`;
    },
    productColor: title => {
      function getProductColor (charCode) {
        if (charCode >= 97 && charCode < 100) {
          return 'red';
        } else if (charCode >= 100 && charCode < 105) {
          return 'green';
        } else if (charCode >= 105 && charCode < 110) {
          return 'orange';
        } else if (charCode >= 110 && charCode < 115) {
          return 'black';
        } else if (charCode >= 115 && charCode < 120) {
          return 'turquoise';
        } else if (charCode >= 120 && charCode <= 122) {
          return 'yellow';
        }

        return 'orange';
      }

      return title ? getProductColor(parseInt(title.toLowerCase().charCodeAt(0), 10)) : 'blue'
    }
  },
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
