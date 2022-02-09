<template>
  <div>
    <div>
      Here's your Christmas List!
      <div v-for="item in myList" :key="item.id">
        <br />
        {{ item.name }} <br />
        Link: {{ item.link }}
        <button @click="editItem(item)">Edit</button>
        <button @click="deleteItem(item)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      myList: [],
      newitem: [],
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
  },
};
</script>