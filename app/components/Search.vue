<template>
  <div class="pt-2 pl-3 pr-3 col-8">
    <input
      class="form-control form-control-lg mb-3 col-6"
      type="search"
      v-model="searchText"
      placeholder="Product Search Text"
      ref="search"
    />
    <ul class="list-group d-flex h-100">
      <li
        v-for="item in filteredProducts"
        :key="item.id"
        class="border list-group-item list-group-item-action mb-1"
      >
        <NLink :to="makeProductLink(item.id)" class="text-secondary d-flex align-self-center">
          <div class="card-body align-self-center">
            <h5 class="card-title">{{ item.title }}</h5>
            <p class="card-text">{{ item.description }}</p>
          </div>
          <img class="card-image float-right align-self-center" style="max-width: 10em; max-height: 5em" :src="item.mainImageUrl" />
        </NLink>
      </li>
    </ul>
  </div>
</template>

<script>
import searchQuery from "~/apollo/search.gql";

export default {
  mounted() {
    this.focusSearchInput();
  },
  methods: {
    focusSearchInput() {
      this.$nextTick(() => this.$refs.search.focus());
    },
    makeProductLink(id) {
      const queryString = this.$route.query.text ? `?text=${this.$route.query.text}`: '';
      return `/product/${id}${queryString}`;
    }
  },
  data() {
    return {
      searchText: this.$route.query.text,
      searchResults() {
        return [];
      }
    };
  },
  watch: {
    searchText(newVal) {
      this.$router.push({ query: { ...this.$route.query, text: newVal } });
    },
    "$route.query.text": function(val) {
      this.searchText = val;
    }
  },
  computed: {
    filteredProducts() {
      return this.$data.searchResults.length
        ? this.$data.searchResults.filter(product => {
            return product.title ? true : false;
          })
        : [];
    }
  },
  apollo: {
    searchResults: {
      query: searchQuery,
      variables() {
        return {
          text: this.searchText
        };
      }
    }
  }
};
</script>