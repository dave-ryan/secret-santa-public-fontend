<template>
  <div>
    <div>
      Here's your Christmas List!
      <div v-for="item in myList" :key="item.id">
        <br />

        <div>{{ item.name }}</div>
        <div v-if="item.link">Link: {{ item.link }}</div>
        <button @click="editItem(item)">Edit</button>
        <button @click="deleteItem(item)">Delete</button>
      </div>
    </div>
    <br />
    <hr />
    <br />
    <div>
      New item for your Christmas List!
      <div>
        Name/description of item<input type="text" v-model="newItem.name" />
      </div>
      <div>
        Online shopping link (optional!)<input
          type="text"
          v-model="newItem.link"
        />
      </div>
    </div>
    <button @click="createItem(newItem)">Add this to your list</button>
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
    createItem: function (item) {
      axios.post("/wishedgifts", item).then((response) => {
        console.log(response.data);
        this.myList.push(item);
        this.newItem = {};
      });
    },
  },
};
</script>