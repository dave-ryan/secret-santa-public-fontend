<template>
  <div>
    <div>
      Here's your Christmas List!
      <div v-for="item in myList" :key="item.id">
        <br />

        <div>{{ item.name }}</div>
        <div v-if="item.link">Link: {{ item.link }}</div>
        <button class="btn btn-secondary" @click="editItem(item)">Edit</button>
        <button class="btn btn-danger" @click="deleteItem(item)">Delete</button>
      </div>
    </div>
    <br />
    <hr />
    <br />
    <form>
      New item for your Christmas List!
      <div class="input-group mb-3">
        <span class="input-group-text">Name/description of item</span>
        <input type="text" v-model="newItem.name" class="form-control" />
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text"> Online shopping link (optional!) </span>
        <input type="text" v-model="newItem.link" class="form-control" />
      </div>
      <button
        class="btn btn-primary"
        :disabled="isDisabled"
        @click="createItem"
      >
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
      console.log(item);
      axios.delete(`/wishedgifts/${item.id}`).then((response) => {
        console.log(response.data);
        this.myList.splice(this.myList.indexOf(item), 1);
      });
    },
    createItem: function (e) {
      e.preventDefault();

      if (this.newItem.name === undefined) {
        console.log("NO!");
      } else {
        console.log(this.newItem.name);
        axios.post("/wishedgifts", this.newItem).then((response) => {
          console.log(response.data);
          this.myList.push(this.newItem);
          this.newItem = {};
        });
      }
    },
  },
};
</script>