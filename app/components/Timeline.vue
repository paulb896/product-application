<template>
  <div>
    <!-- Latest update -->
    <vue-timeline-update
        :date="new Date('2017-02-26')"
        title="v2.2.0 - Initial D"
        description="Today I am thrilled to announce the release of Vue.js 2.2.0."
        thumbnail="/images/vuetimeline/initial_d.jpg"
        category="announcement"
        icon="code"
        color="blue"
    />

    <!-- Another update -->
    <vue-timeline-update
        :date="new Date('2016-11-22')"
        title="v2.1.0 - Hunter X Hunter"
        description="Today I am thrilled to announce the release of Vue.js 2.1.0."
        thumbnail="/images/vuetimeline/hunter_x_hunter.jpg"
        category="announcement"
        icon="code"
        color="blue"
    />

    <!-- Yet another update -->
    <vue-timeline-update
        :date="new Date('2016-09-30')"
        title="v2.0.0 - Ghost in the Shell"
        description="Today I am thrilled to announce the release of Vue.js 2.0.0"
        thumbnail="/images/vuetimeline/ghost_in_the_shell.jpg"
        category="announcement"
        icon="code"
        color="white"
        is-last
    />
  </div>
</template>