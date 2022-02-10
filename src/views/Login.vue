<template>
  <div class="container">
    <div class="d-flex align-items-center vh-100 justify-content-center">
      <form @submit.prevent="logIn">
        <h2>Griffith</h2>

        <div>Name: <input type="text" v-model="inputParams.name" /></div>
        <div>
          Password: <input type="text" v-model="inputParams.password" />
        </div>
        <div>
          <button class="btn btn-success" type="submit">Log In</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.container {
  text-align: center;
}
</style>

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