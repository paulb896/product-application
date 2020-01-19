<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <NLink class="navbar-brand nav-link" :to="navLink('/')">Product Info</NLink>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="true"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <NLink class="nav-link" :to="navLink('/create')">Add a Product</NLink>
        </li>
        <li class="nav-item">
          <NLink class="nav-link" :to="navLink('/search')">Product Search</NLink>
        </li>
        <li class="nav-item">
          <NLink class="nav-link" :to="navLink('/updates')">Real Time Updates</NLink>
        </li>
      </ul>
      <input
        class="form-inline my-2 my-lg-0 form-control-lg mr-3"
        type="search"
        v-model="searchText"
        placeholder="Product Search Text"
        v-if="!isSearchPage"
      />
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      searchText: this.$route.query.text
    };
  },
  methods: {
    navLink(link) {
      const queryString = this.$route.query.text ? `?text=${this.$route.query.text}`: '';
      return `${link}${queryString}`
    }
  },
  computed: {
    isSearchPage() {
      return this.$route.path.includes("/search");
    }
  },
  filters: {
    addSearchText(link) {
      return `${link}?${this.$route.query.searchText}`;
    }
  },
  watch: {
    searchText(newVal) {
      if (newVal) {
        this.$router.push({
          path: "/search",
          query: { ...this.$route.query, text: newVal }
        });
      }
    },
    "$route.query.text": function(val) {
      this.searchText = val;
    }
  }
};
</script>