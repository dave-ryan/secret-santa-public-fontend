<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-dark" v-if="loginStatus">
    <div class="container-fluid">
      <a href="#" class="navbar-brand">Griffith</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav">
          <li>
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li>
            <router-link class="nav-link" to="/my-list">My List</router-link>
          </li>
          <li>
            <span class="nav-link disabled">
              Logged in as {{ user_name }}
            </span>
          </li>
        </ul>
      </div>
      <span class="nav-item">
        <router-link class="nav-link" to="" @click="logOut()"
          >Log Out</router-link
        >
      </span>
    </div>
  </nav>
  <router-view @updateLoginStatus="updateLogin"></router-view>
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
      user_name: "...",
      user_id: null,
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
    if (localStorage.user_id && localStorage.user_name) {
      this.user_name = localStorage.user_name;
      this.user_id = localStorage.user_id;
      console.log("santa", this.user_name, this.user_id);
    }
  },
  methods: {
    logOut: function () {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("jwt");
      localStorage.removeItem("user_id");
      localStorage.removeItem("user_name");
      localStorage.removeItem("family_id");
      this.$router.push("/login");
      this.loginStatus = false;
    },
    updateLogin: function (value) {
      this.loginStatus = value;
    },
  },
};
</script>