<template>
  <div class="home">
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
    };
  },
  created: function () {
    this.getUsers();
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
