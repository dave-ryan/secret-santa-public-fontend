<template>
  <div id="nav" v-if="loginStatus">
    <h2>Griffith</h2>

    <router-link to="/">Home</router-link> |
    <router-link to="/my-list">My List</router-link> |
    <router-link to="/login" @click="logOut()">Log Out</router-link>
  </div>
  <router-view @updateParent="updateLogin"></router-view>
</template>

<style>
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