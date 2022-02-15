<template>
  <div class="navbar navbar-expand-lg navbar-light bg-light" v-if="loginStatus">
    <a href="#" class="navbar-brand">Griffith</a>

    <router-link to="/">Home</router-link> |
    <router-link to="/my-list">My List</router-link> |
    <router-link to="/login" @click="logOut()">Log Out</router-link>
  </div>
  <router-view @updateParent="updateLogin"></router-view>
</template>

<style>
.container {
  text-align: center;
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