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

            <div
              class="collapse"
              aria-expanded="false"
              :id="`christmas-list-${user.id}`"
            >
              (sample item)

              <div v-for="item in christmasLists[`${user.id}`]" :key="item.id">
                <div
                  v-if="item.purchaser_id && item.purchaser_id != this.user_id"
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
                    <i class="bi bi-x"></i>

                    <label
                      class="form-check-label"
                      :for="`checkbox-` + item.id"
                      :id="`label-` + item.id"
                    >
                      {{ item.name }}
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
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      family: {},
      secretSanta: {},
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
        .then((family) => {
          this.family = family.data;
          console.log(family.data);
          family.data.forEach((user) => {
            axios.get(`/users/${user.id}/christmaslist`).then((response) => {
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
        })
        .catch((error) => {
          console.log(error.response);
          this.inputParams = {};
        });
    },
  },
};
</script>
