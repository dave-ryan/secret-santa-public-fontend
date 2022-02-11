<template>
  <div class="home">
    Your family:
    <div v-for="user in family" :key="user.id">
      {{ user }}
      <button @click="findChristmasList(user)">load christmas list</button>

      <div v-for="item in christmasLists[`${user.id}`]" :key="item.id">
        {{ item.name }}
      </div>
    </div>

    Your secret santa:
    <div>
      {{ secretSanta }}
      <button @click="findChristmasList(secretSanta)">
        load christmas list
      </button>
      {{ christmasLists[`${secretSanta.id}`] }}
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
      christmasLists: { 2: [] },
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
    findChristmasList: function (user) {
      axios.get(`/users/${user.id}/christmaslist`).then((response) => {
        console.log(response.data);
        this.christmasLists[user.id] = response.data;
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
