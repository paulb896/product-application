<template>
  <div>
    <b>Product Updates</b>
    <div v-for="item in products" :key="item.id">
      <NLink :to="makeProductLink(item.id)">
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
    products: []
  }),
  computed: {
    filteredProducts() {
      return this.$data.products ? this.$data.products.filter(p => p.title) : [];
    }
  },
  methods: {
    makeProductLink(id) {
      const queryString = this.$route.query.text ? `?text=${this.$route.query.text}`: '';
      return `/product/${id}${queryString}`;
    }
  },
  filters: {
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
    $subscribe: {
      products: {
        query: productAdditions,
        result(result) {
          const createdProduct = result.data.productCreated;
          let productUpdated = false

          for (let i = 0; i < this.products.length; i++) {
            const product = this.products[i];
            if (createdProduct.id === product.id) {
              product.title = createdProduct.title;
              product.description = createdProduct.description;
              product.mainImageUrl = createdProduct.mainImageUrl;
              productUpdated = true;
            }
          }

          if (!productUpdated) {
            this.products.unshift(createdProduct);
          }
        }
      }
    }
  }
};
</script>
