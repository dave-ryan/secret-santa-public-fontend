<template>
  <div>
    <div>
      Here's your Christmas List!
      <div v-for="item in myList" :key="item.id">
        <br />
        {{ item.name }} <br />
        Link: {{ item.link }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      myList: {},
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
  },
};
</script>