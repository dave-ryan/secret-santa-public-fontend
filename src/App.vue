<template>
  <div id="nav" v-if="loginStatus">
    <router-link to="/">Home</router-link> |
    <router-link to="/my-list">My List</router-link> |
    <router-link to="/login" @click="logOut()">Log Out</router-link>
  </div>

  <router-view @updateParent="updateLogin"></router-view>
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
import axios from "axios";
export default {
  data() {
    return {
      loginStatus: false,
    };
  },
  created: function () {
    if (localStorage.getItem("jwt")) {
      this.loginStatus = true;
      console.log("status is true");
    } else {
      this.loginStatus = false;
      console.log("status is false");
      this.$router.push("/login");
    }
  },
  methods: {
    logOut: function () {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("jwt");
      this.$router.push("/login");
      this.loginStatus = false;
    },
    updateLogin: function (value) {
      this.loginStatus = value;
    },
  },
};
</script>