<template>
  <div id="login">
    <h2>Griffith</h2>
    <div>Name: <input type="text" v-model="inputParams.name" /></div>
    <div>Password: <input type="text" v-model="inputParams.password" /></div>
    <div>
      <button @click="logIn()">Log In</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      inputParams: {},
    };
  },
  methods: {
    logIn: function () {
      axios.post("/sessions", this.inputParams).then((response) => {
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + response.data.jwt;
        localStorage.setItem("jwt", response.data.jwt);
        console.log("Logged in!");
        this.$router.push("/");
        this.$emit("updateParent", true);
      });
    },
  },
};
</script>