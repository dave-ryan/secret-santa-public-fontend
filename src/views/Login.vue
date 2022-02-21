<template>
  <div class="container">
    <div class="d-flex align-items-center vh-100 justify-content-center">
      <form @submit.prevent="logIn">
        <fieldset id="loginForm">
          <h2>Griffith</h2>

          <div>Name: <input type="text" v-model="inputParams.name" /></div>
          <div>
            Password: <input type="text" v-model="inputParams.password" />
          </div>
          <div>
            <button class="btn btn-success" type="submit">
              {{ buttonName }}
            </button>
          </div>
          <div class="errors">
            {{ errors }}
          </div>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<style scoped>
.container {
  text-align: center;
}
.errors {
  color: red;
}
</style>

<script>
import axios from "axios";
export default {
  data() {
    return {
      inputParams: {},
      errors: null,
      buttonName: "Log In",
      form: null,
    };
  },
  methods: {
    logIn: function () {
      this.toggleLoading();
      axios
        .post("/sessions", this.inputParams)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          console.log("Logged in!");
          this.$router.push("/");
          this.$emit("updateParent", true);
        })
        .catch((errors) => {
          console.log(errors);
          this.errors = errors;
          this.form.removeAttribute("disabled");
          this.buttonName = "Log In";
        });
    },
    toggleLoading: function () {
      this.errors = null;
      this.form = document.getElementById("loginForm");
      this.form.setAttribute("disabled", "");
      this.buttonName = "Loading...";
      console.log("validating..", this.form);
    },
  },
};
</script>