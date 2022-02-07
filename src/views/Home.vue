<template>
  <div class="home">
    <!-- <button @click="getUsers()">CLICK</button> -->
    Your family:
    <div v-for="user in family" :key="user.id">
      {{ user }}
    </div>

    Your secret santa:
    <div>
      {{ secretSanta }}
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      family: {},
      secretSanta: {},
    };
  },
  created: function () {
    this.getUsers();
    this.getSecretSanta();
  },
  methods: {
    getUsers: function () {
      axios
        .get("/users")
        .then((response) => {
          this.family = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response);
          this.inputParams = {};
        });
    },
    getSecretSanta: function () {
      axios
        .get("/users/secretsanta")
        .then((response) => {
          this.secretSanta = response.data;
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
