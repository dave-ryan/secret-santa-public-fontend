<template>
  <div class="home">
    <div>Name: <input type="text" v-model="inputParams.name" /></div>
    <div>Password: <input type="text" v-model="inputParams.password" /></div>
    <div>
      <button @click="logIn()">Log In</button>
    </div>
    <button @click="getUsers()">CLICK</button>
    <div v-for="user in users" :key="user.id">
      {{ user }}
    </div>

    <p>
      {{ inputParams }}
    </p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      users: {},
      inputParams: {},
    };
  },
  created: function () {
    this.getUsers();
  },
  methods: {
    logIn: function () {
      axios.post("/sessions", this.inputParams).then((response) => {
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + response.data.jwt;
        localStorage.setItem("jwt", response.data.jwt);
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
