<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-12">
        Your family:
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
                >this person hasn't made their christmas list yet! remind them!
                :)</span
              >

              <div v-for="item in user.wishedgifts" :key="item.id">
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
    </div>

    <div class="row">
      <div class="col-12">
        <hr />
        <div class="mt-3 mb-4">Your secret santa:</div>
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
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
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
      secretSanta: { wishedgifts: [] },
      christmasLists: {},
      user_id: null,
    };
  },
  created: function () {
    this.getUsers();
    this.getSecretSanta();
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
      this.user_id = localStorage.getItem("user_id");
      axios
        .get("/users")
        .then((response) => {
          this.family = response.data;
          console.log("response", response.data);
          console.log("family data: ", this.family);
          console.log("test", this.family[2], this.family[2].wishedgifts);
        })
        .catch((error) => {
          console.log(error.response);
        });
      console.log("christmasLists", this.family);
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
          console.log(error.response);
        });
    },
  },
};
</script>
