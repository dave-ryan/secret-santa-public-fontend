<template>
  <div class="home">
    Hello from HOME
    <div>Name: <input type="text" v-bind="inputParams.name" /></div>
    <div>Password: <input type="text" v-bind="inputParams.password" /></div>
    <div>
      <button @click="logIn()">Log In</button>
    </div>
    <button @click="getUsers()">CLICK</button>
    <div v-for="user in users" :key="user.id">
      {{ user }}
    </div>
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
      });
    },
    getUsers: function () {
      axios.get("http://localhost:3000/users").then((response) => {
        this.users = response.data;
        console.log(response, "test");
      });
    },
  },
};
</script>
