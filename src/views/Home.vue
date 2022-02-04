<template>
  <div class="home">
    <div v-if="!loggedIn"></div>

    <div v-if="loggedIn">
      <button @click="getUsers()">CLICK</button>
      <div v-for="user in users" :key="user.id">
        {{ user.name }}
      </div>
    </div>

    <div>
      <div>Name: <input type="text" v-model="inputParams.name" /></div>
      <div>Password: <input type="text" v-model="inputParams.password" /></div>
      <div>
        <button @click="logIn()">Log In</button>
      </div>
    </div>

    <button @click="this.$root.checkIfLoggedIn()">
      click to check for login status
    </button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["loggedIn"],
  data: function () {
    return {
      users: {},
      inputParams: {},
    };
  },
  methods: {
    logIn: function () {
      axios.post("/sessions", this.inputParams).then((response) => {
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + response.data.jwt;
        localStorage.setItem("jwt", response.data.jwt);
        this.$emit("logged-in", true);
        console.log("Logged in!");
      });
    },
    getUsers: function () {
      axios
        .get("http://localhost:3000/users")
        .then((response) => {
          this.users = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response);
          this.inputParams = {};
        });
    },
  },
};
</script>
