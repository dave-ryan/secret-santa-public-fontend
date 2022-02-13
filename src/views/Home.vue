<template>
  <div class="home">
    <div class="collapse" id="collapseExample">this is a test</div>
    <button data-bs-toggle="collapse" data-bs-target="#collapseExample">
      ddddd
    </button>
    Your family:
    <div v-for="user in family" :key="user.id">
      <br />
      {{ user }}
      <button
        class="btn btn-outline-success btn-sm"
        data-bs-toggle="collapse"
        :data-bs-target="`#christmas-list-${user.id}`"
      >
        load christmas list
      </button>

      <div
        class="collapse"
        aria-expanded="true"
        :id="`christmas-list-${user.id}`"
      >
        <div v-for="item in christmasLists[`${user.id}`]" :key="item.id">
          {{ item.name }}
        </div>
        (sample item)
      </div>
    </div>

    Your secret santa:
    <div>
      {{ secretSanta }}
      <button class="btn btn-outline-success btn-sm">
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
      christmasLists: {},
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
        .then((family) => {
          this.family = family.data;
          console.log(family.data);
          family.data.forEach((user) => {
            axios.get(`/users/${user.id}/christmaslist`).then((response) => {
              console.log("this is the response", user, response.data);
              this.christmasLists[`${user.id}`] = response.data;
            });
          });
        })
        .catch((error) => {
          console.log(error.response);
          this.inputParams = {};
        });
      console.log("christmasLists", this.christmasLists);
    },
    toggleChristmasList: function (user) {
      axios.get(`/users/${user.id}/christmaslist`).then((response) => {
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
