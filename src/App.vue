<template>
  <div id="nav" v-if="current_user">
    <router-link to="/">Home</router-link> |
    <router-link to="/my-list">My List</router-link> |
    <router-link to="/login" @click="logOut">Log Out</router-link>
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
import axios from "axios";
export default {
  data() {
    return {
      current_user: null,
    };
  },
  mounted: function () {
    this.checkIfLoggedIn();
  },
  methods: {
    checkIfLoggedIn: function () {
      console.log("jwt:", localStorage.getItem("jwt"));
      if (localStorage.getItem("jwt")) {
        axios.get("/users/1", "jwt").then((response) => {
          console.log(response.data);
          this.current_user = response.data;
        });
      } else {
        this.$router.push("/login");
      }
    },
  },
};
</script>