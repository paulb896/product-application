<template>
  <div>
    <b>New Products</b>
    <div v-for="item in filteredRecentProducts" :key="item.id">
      <NLink v-bind:to="item.id | makeLink">
        <vue-timeline-update
          :date="item.dateCreated ? new Date(item.dateCreated) : new Date()"
          :title="item.title"
          :description="item.description"
          :thumbnail="item.mainImageUrl"
          category="New Product"
          icon="headset"
          :color="item.title | productColor" >
        </vue-timeline-update>
      </NLink>
    </div>

  </div>
</template>

<script>
import productAdditions from "~/apollo/productCreated.gql";
import recentProducts from "~/apollo/recentProducts.gql";

export default {
  data: () => ({
    recentProducts: []
  }),
  computed: {
    filteredRecentProducts() {
      return this.$data.recentProducts ? this.$data.recentProducts.filter(p => p.title) : [];
    }
  },
  filters: {
    makeLink(id) {
      return `/product/${id}`;
    },
    productColor(title) {
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
    recentProducts: {
      query: recentProducts,
      // TODO: Update once https://github.com/nuxt-community/apollo-module/issues/295 is fixed.
      pollInterval: process.server ? undefined: 30000,
      preFetch: true,
      notifyOnNetworkStatusChange: true,
      subscribeToMore: {
        document: productAdditions,
        updateQuery: (previousResult, { subscriptionData }) => {
          if (!previousResult.recentProducts.find((p) => p.id === subscriptionData.data.productCreated.id)) {
            previousResult.recentProducts.unshift(subscriptionData.data.productCreated);
          }

          return previousResult;
        }
      }
    }
  }
};
</script>
