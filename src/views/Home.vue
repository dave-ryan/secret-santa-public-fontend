<template>
  <div class="home">
    <div v-if="!loggedIn"></div>

    <div v-if="loggedIn">
      <button @click="getUsers()">CLICK</button>
      <div v-for="user in users" :key="user.id">
        {{ user.name }}
      </div>
    </div>

    <p>
      {{ inputParams }}
    </p>
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
