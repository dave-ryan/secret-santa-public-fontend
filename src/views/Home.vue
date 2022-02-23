<template>
  <div class="container" id="home">
    <div class="col-12 align-items-center vh-100">
      <div class="row">
        <div class="col-12">
          Your family:
          <div v-for="user in family" :key="user.id">
            <br />
            <button
              class="btn btn-outline-success"
              data-bs-toggle="collapse"
              :data-bs-target="`#christmas-list-${user.id}`"
            >
              {{ user.name }}
            </button>

            <div
              class="collapse"
              aria-expanded="false"
              :id="`christmas-list-${user.id}`"
            >
              <div v-for="item in christmasLists[`${user.id}`]" :key="item.id">
                <div v-if="item.purchaser_id">
                  <span class="text-decoration-line-through">{{
                    item.name
                  }}</span>
                  <span style="color: red">
                    (bought by: {{ item.purchaser.name }})</span
                  >
                </div>
                <span v-else>{{ item.name }}</span>
              </div>
              (sample item)
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <hr />
          Your secret santa:
          <br />
          <button
            class="btn btn-outline-success"
            data-bs-toggle="collapse"
            data-bs-target="#christmas-list-ss"
          >
            {{ secretSanta.name }}
          </button>
          <div class="collapse" aria-expanded="false" id="christmas-list-ss">
            <div
              v-for="item in christmasLists[`${secretSanta.id}`]"
              :key="item.id"
            >
              {{ item.name }}
            </div>
            (sample item)
          </div>
        </div>
      </div>
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
