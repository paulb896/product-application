<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <NLink class="navbar-brand nav-link" to="/">Product Info</NLink>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <NLink to="/" class="nav-link">Home</NLink>
        </li>
        <li class="nav-item">
          <NLink class="nav-link" to="/create">Add a Product</NLink>
        </li>
        <li class="nav-item">
          <NLink class="nav-link" to="/search">Product Search</NLink>
        </li>
        <li class="nav-item">
          <NLink class="nav-link" to="/updates">Real Time Updates</NLink>
        </li>
      </ul>
    </div>
  </nav>
</template>
