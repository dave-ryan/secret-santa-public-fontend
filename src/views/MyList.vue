<template>
  <div class="container">
    <div class="mb-5">
      <h2 class="mt-2 mb-5">Your Christmas List</h2>

      <table class="table table-striped table-responsive">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Wished gift</th>
            <th scope="col">Link</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in myList" :key="item.id">
            <th scope="row">{{ index + 1 }}</th>
            <td class="text-truncate" style="max-width: 150px">
              {{ item.name }}
            </td>
            <td class="text-truncate" style="max-width: 150px">
              <a :href="`//` + item.link" alt="" target="_blank">{{
                item.link
              }}</a>
            </td>
            <td>
              <button class="btn btn-outline-success" @click="editItem(item)">
                Edit
              </button>
              <button class="btn btn-outline-danger" @click="deleteItem(item)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <hr />
    <form
      @submit.prevent="createItem"
      id="newItemForm"
      class="mt-5 mb-4"
      novalidate
    >
      <h5 class="mb-3">New item for your Christmas List:</h5>
      <div class="input-group mb-3">
        <span class="input-group-text">Name/description of item</span>
        <input
          type="text"
          v-model="newItem.name"
          class="form-control"
          required
        />
        <div class="invalid-feedback">What do you want for Christmas?</div>
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text"> Online shopping link (optional) </span>
        <input type="text" v-model="newItem.link" class="form-control" />
      </div>
      <button class="btn btn-success" type="submit">
        Add this to your list
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      myList: [],
      newItem: {},
    };
  },
  computed: {
    isDisabled: function () {
      if (!this.newItem.name || this.newItem.name == "") {
        return true;
      } else {
        return false;
      }
    },
  },
  mounted() {
    this.getMyList();
  },
  methods: {
    getMyList: function () {
      axios
        .get("/wishedgifts")
        .then((response) => {
          this.myList = response.data;
        })
        .catch((errors) => {
          console.log(errors);
        });
    },
    editItem: function (item) {
      console.log(item);
    },
    deleteItem: function (item) {
      axios.delete(`/wishedgifts/${item.id}`).then((response) => {
        console.log(response.data);
        this.myList.splice(this.myList.indexOf(item), 1);
      });
    },
    createItem: function () {
      document.getElementById("newItemForm").classList.add("was-validated");
      if (this.checkForms()) {
        axios.post("/wishedgifts", this.newItem).then((response) => {
          this.myList.push(response.data);
          this.newItem = {};
          document
            .getElementById("newItemForm")
            .classList.remove("was-validated");
        });

        setTimeout(() => {
          window.scrollTo(
            0,
            document.body.scrollHeight || document.documentElement.scrollHeight
          );
        }, 400);
      }
    },
    checkForms: function () {
      if (this.newItem["name"] && this.newItem["name"].length > 0) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>