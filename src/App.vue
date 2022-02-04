<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/my-list">My List</router-link> |
    <router-link v-if="checkIfLoggedIn" to="" @click="logOut()"
      >Log Out</router-link
    >
  </div>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
export default {
  data() {
    return { loggedIn: false };
  },
  mounted() {
    this.checkIfLoggedIn();
  },
  methods: {
    checkIfLoggedIn: function () {
      if (localStorage.getItem("jwt")) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
      console.log(this.loggedIn);
    },
    logOut: function () {
      localStorage.removeItem("jwt");
      console.log("logged out");
    },
  },
};
</script>