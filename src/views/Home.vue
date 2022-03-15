<template>
  <div class="container">
    <div v-if="!loaded">
      <img src="../assets/images/loading.gif" alt="" />
    </div>
    <transition>
      <div v-if="loaded">
        <div class="row">
          <div class="col-12">
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
                  class="bi bi-check-lg"
                  v-if="
                    user.wishedgifts &&
                    user.wishedgifts.some(
                      (item) => item.purchaser_id == this.user_id
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
                    <div
                      v-if="item.purchaser && item.purchaser_id != this.user_id"
                    >
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
                          <a
                            v-if="item.link"
                            :href="`//` + item.link"
                            target="_blank"
                            >link</a
                          >
                        </label>
                        <span style="color: red">
                          (purchased by {{ item.purchaser.name }})</span
                        >
                      </div>
                    </div>
                    <div
                      v-else-if="
                        item.purchaser_id && item.purchaser_id == this.user_id
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
                          <a
                            v-if="item.link"
                            :href="`//` + item.link"
                            target="_blank"
                            >link</a
                          >
                        </label>
                        <span style="color: green"> Purchased by you!</span>
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
                          <a
                            v-if="item.link"
                            :href="`//` + item.link"
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
        <div class="row" v-if="secretSanta">
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
                <div v-if="item.purchaser && item.purchaser_id != this.user_id">
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
                      <a
                        v-if="item.link"
                        :href="`//` + item.link"
                        target="_blank"
                        >link</a
                      >
                    </label>
                    <span style="color: red">
                      (purchased by {{ item.purchaser.name }})</span
                    >
                  </div>
                </div>
                <div
                  v-else-if="
                    item.purchaser_id && item.purchaser_id == this.user_id
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
                      <a
                        v-if="item.link"
                        :href="`//` + item.link"
                        target="_blank"
                        >link</a
                      >
                    </label>
                    <span style="color: green"> Purchased by you!</span>
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
                      <a
                        v-if="item.link"
                        :href="`//` + item.link"
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
i {
  color: green;
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
    };
  },
  props: {
    user_id: Number,
  },
  created: function () {
    this.getUsers();
  },
  methods: {
    toggleCheckBox: function (item) {
      if (item.purchaser_id) {
        console.log("unchecked item, no longer purchasing it");
        item.purchaser_id = null;

        axios
          .patch(`/wishedgifts/${item.id}`, { purchaser_id: null })
          .then((response) => {
            console.log("response to removing purchaser", response);
          });
        document
          .getElementById(`label-${item.id}`)
          .classList.remove("text-decoration-line-through");

        console.log(item);
      } else {
        console.log("checked item, it should be crossed off");
        item.purchaser_id = this.user_id;

        axios
          .patch(`/wishedgifts/${item.id}`, { purchaser_id: this.user_id })
          .then((response) => {
            console.log("response to removing purchaser", response);
          });
        document
          .getElementById(`label-${item.id}`)
          .classList.add("text-decoration-line-through");
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
  },
};
</script>
