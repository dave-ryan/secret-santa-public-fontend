<template>
  <div class="container">
    <div v-if="!loaded">
      <img src="../assets/images/loading.gif" alt="" />
    </div>
    <transition>
      <div v-if="loaded">
        <div class="row">
          <div class="col-12">
            <div class="fw-light mb-5">
              <p>
                You can see everyone's list, and who bought what. Of course
                it'll still be a mystery for that person!
                <br />
                You can click on an item to declare that you'll buy that gift
                for that person, and everyone else will be able to see that.
              </p>
            </div>
            <h3>Your family</h3>

            <div class="row mt-3" v-for="user in family" :key="user.id">
              <div class="col-12-">
                <button
                  class="btn btn-outline-success"
                  data-bs-toggle="collapse"
                  :data-bs-target="`#christmas-list-${user.id}`"
                >
                  {{ user.name }}
                </button>
                <i
                  class="bi bi-check-lg text-success"
                  v-if="
                    user.wishedgifts &&
                    user.wishedgifts.some(
                      (item) => item.purchaser_id == user_id
                    )
                  "
                ></i>
                <div
                  class="collapse"
                  aria-expanded="false"
                  :id="`christmas-list-${user.id}`"
                >
                  <span v-if="user.wishedgifts.length < 1"
                    >this person hasn't made their christmas list yet! remind
                    them! :)</span
                  >
                  <div v-for="item in user.wishedgifts" :key="item.id">
                    <div v-if="item.purchaser && item.purchaser_id != user_id">
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          checked
                          :id="`checkbox-` + item.id"
                          disabled
                        />
                        <label
                          class="form-check-label"
                          :for="`checkbox-` + item.id"
                          :id="`label-` + item.id"
                        >
                          {{ item.name }}
                          <span v-if="item.link || item.purchaser_id"> - </span>
                          <a
                            v-if="item.link"
                            :href="`//` + item.link.replace(/^https?:\/\//, '')"
                            target="_blank"
                            >link</a
                          >
                        </label>
                        <span class="text-danger">
                          purchased by {{ item.purchaser.name }}
                        </span>
                      </div>
                    </div>
                    <div
                      v-else-if="
                        item.purchaser_id && item.purchaser_id == user_id
                      "
                    >
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          checked
                          @click="toggleCheckBox(item)"
                          :id="`checkbox-` + item.id"
                        />
                        <label
                          class="form-check-label"
                          :for="`checkbox-` + item.id"
                          :id="`label-` + item.id"
                        >
                          {{ item.name }}
                          <span v-if="item.link || item.purchaser_id"> - </span>
                          <a
                            v-if="item.link"
                            :href="`//` + item.link.replace(/^https?:\/\//, '')"
                            target="_blank"
                            >link</a
                          >
                        </label>
                        <span class="text-success"> Purchased by you!</span>
                      </div>
                    </div>
                    <div v-else>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          @click="toggleCheckBox(item)"
                          :id="`checkbox-` + item.id"
                        />
                        <label
                          class="form-check-label"
                          :for="`checkbox-` + item.id"
                          :id="`label-` + item.id"
                        >
                          {{ item.name }}
                          <span v-if="item.link || item.purchaser_id"> - </span>
                          <a
                            v-if="item.link"
                            :href="`//` + item.link.replace(/^https?:\/\//, '')"
                            target="_blank"
                            >link</a
                          >
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mb-5" v-if="secretSanta">
          <div class="col-12">
            <hr />
            <h3 class="mt-3 mb-4">Your secret santa</h3>
            <button
              class="btn btn-outline-success"
              data-bs-toggle="collapse"
              data-bs-target="#christmas-list-ss"
            >
              {{ secretSanta.name }}
            </button>
            <div class="collapse" aria-expanded="false" id="christmas-list-ss">
              <span v-if="secretSanta.wishedgifts.length === 0"
                >this person hasn't made their christmas list yet! remind them!
                :)</span
              >
              <div v-for="item in secretSanta.wishedgifts" :key="item.id">
                <div v-if="item.purchaser && item.purchaser_id != user_id">
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      checked
                      :id="`checkbox-` + item.id"
                      disabled
                    />
                    <label
                      class="form-check-label"
                      :for="`checkbox-` + item.id"
                      :id="`label-` + item.id"
                    >
                      {{ item.name }}
                      <span v-if="item.link || item.purchaser_id"> - </span>
                      <a
                        v-if="item.link"
                        :href="`//` + item.link.replace(/^https?:\/\//, '')"
                        target="_blank"
                        >link</a
                      >
                    </label>
                    <span class="text-danger">
                      purchased by {{ item.purchaser.name }}</span
                    >
                  </div>
                </div>
                <div
                  v-else-if="item.purchaser_id && item.purchaser_id == user_id"
                >
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      checked
                      @click="toggleCheckBox(item)"
                      :id="`checkbox-` + item.id"
                    />
                    <label
                      class="form-check-label"
                      :for="`checkbox-` + item.id"
                      :id="`label-` + item.id"
                    >
                      {{ item.name }}
                      <span v-if="item.link || item.purchaser_id"> - </span>
                      <a
                        v-if="item.link"
                        :href="`//` + item.link.replace(/^https?:\/\//, '')"
                        target="_blank"
                        >link</a
                      >
                    </label>
                    <span class="text-success"> Purchased by you!</span>
                  </div>
                </div>
                <div v-else>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      @click="toggleCheckBox(item)"
                      :id="`checkbox-` + item.id"
                    />
                    <label
                      class="form-check-label"
                      :for="`checkbox-` + item.id"
                      :id="`label-` + item.id"
                    >
                      {{ item.name }}
                      <span v-if="item.link || item.purchaser_id"> - </span>
                      <a
                        v-if="item.link"
                        :href="`//` + item.link.replace(/^https?:\/\//, '')"
                        target="_blank"
                        >link</a
                      >
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.container {
  padding-top: 80px;
}
</style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      family: [],
      secretSanta: null,
      christmasLists: {},
      loaded: false,
      user_id: null,
    };
  },
  created: function () {
    this.user_id = localStorage.user_id;
    this.getUsers();
  },
  methods: {
    toggleCheckBox: function (item) {
      if (item.purchaser_id) {
        item.purchaser_id = null;
        item.purchaser = null;
        axios
          .patch(`/wishedgifts/${item.id}`, { purchaser_id: null })
          .catch((error) => {
            console.log("errors:", error);
          });
      } else {
        item.purchaser_id = this.user_id;
        axios
          .patch(`/wishedgifts/${item.id}`, { purchaser_id: this.user_id })
          .catch((error) => {
            console.log("errors:", error);
          });
      }
    },
    getUsers: function () {
      axios
        .get(`/families/${localStorage.family_id}`)
        .then((response) => {
          this.loaded = true;
          // console.log("family ping response", response.data);
          var my_id = localStorage.user_id;
          this.family = response.data.users.filter(function (user) {
            return user.id != my_id;
          });
        })
        .catch((error) => {
          console.log("errors", error, error.response);
          if (error.response.status === 401) {
            this.$root.logOut();
          }
        });
      this.getSecretSanta();
    },
    toggleChristmasList: function (user) {
      axios.get(`/users/${user.id}/christmaslist`).then((response) => {
        this.family[user.id] = response.data;
      });
    },
    getSecretSanta: function () {
      axios
        .get("/users/secretsanta")
        .then((response) => {
          this.secretSanta = response.data;
          console.log("my secret santa", this.secretSanta);
        })
        .catch((error) => {
          console.log("errors", error.response);
        });
    },
    secretSantaShuffle: function () {
      if (
        confirm("ARE YOU SURE YOU WANT TO SHUFFLE EVERYONE'S SECRET SANTA?")
      ) {
        axios.post("/secret-santa-shuffle").then((response) => {
          console.log(response.data);
        });
      }
    },
  },
};
</script>
