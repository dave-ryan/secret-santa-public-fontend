<template>
  <div class="container">
    <div class="row vh-100 d-flex align-items-center justify-content-center">
      <div class="col-md-8 col-12">
        <div class="row d-flex justify-content-center">
          <div class="col-auto">
            <form @submit.prevent="logIn" id="loginForm" novalidate>
              <fieldset id="loginFieldset">
                <h2>Secret Santa</h2>

                <div class="row mb-2 mt-4">
                  <div class="col">
                    <label class="form-label" for="name-input">Username</label>
                  </div>
                  <div class="col">
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      id="name-input"
                      v-model="inputParams.name"
                      required
                    />
                    <div class="invalid-feedback">
                      Please enter your first name
                    </div>
                  </div>
                </div>

                <div class="row mt-2 mb-2">
                  <div class="col">
                    <label class="form-label" for="password-input"
                      >Password</label
                    >
                  </div>
                  <div class="col">
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      id="password-input"
                      v-model="inputParams.password"
                      required
                    />
                    <div class="invalid-feedback">
                      Please enter your password (last name)
                    </div>
                  </div>
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
        <div class="row mt-5">
          <div class="col-12">
            <div class="fw-light">
              The password for every user is "demo", so you can log-in on any
              other dummy accounts to see what it's like on the other end.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.errors {
  color: red;
}
</style>

<script>
import axios from "axios";
export default {
  data() {
    return {
      inputParams: { name: "Dave", password: "demo" },
      errors: null,
      buttonName: "Log In",
      fieldset: null,
    };
  },
  methods: {
    logIn: function () {
      this.fieldset = document.getElementById("loginFieldset");
      document.getElementById("loginForm").classList.add("was-validated");

      if (this.checkForms()) {
        this.toggleLoading();
        axios
          .post("/sessions", this.inputParams)
          .then((response) => {
            console.log("Logged in!", response);

            axios.defaults.headers.common["Authorization"] =
              "Bearer " + response.data.jwt;
            localStorage.setItem("jwt", response.data.jwt);
            localStorage.setItem("user_name", response.data.user_name);
            localStorage.setItem("user_id", response.data.user_id);
            localStorage.setItem("family_id", response.data.family_id);
            this.$emit("login_change", response.data.user_name);
            this.$router.push("/");
          })
          .catch((errors) => {
            console.log("errors", errors);
            document
              .getElementById("loginForm")
              .classList.remove("was-validated");
            this.errors = errors.response.data.error;
            this.fieldset.removeAttribute("disabled");
            this.buttonName = "Log In";
          });
      }
    },
    toggleLoading: function () {
      this.errors = null;
      this.fieldset.setAttribute("disabled", "");
      this.buttonName = "Loading...";
    },
    checkForms: function () {
      if (
        this.inputParams["name"] &&
        this.inputParams["name"].length > 0 &&
        this.inputParams["password"] &&
        this.inputParams["password"].length > 0
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>