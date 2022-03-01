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
              <button
                type="button"
                class="btn btn-outline-success"
                data-bs-toggle="modal"
                data-bs-target="#editModal"
                @click="editItem(item)"
              >
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

    <!-- Edit Modal -->
    <div
      class="modal fade"
      id="editModal"
      tabindex="-1"
      aria-labelledby="editModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <form
            @submit.prevent="updateItem"
            id="editingItemForm"
            class="mt-5 mb-4"
            novalidate
          >
            <div class="modal-header">
              <h3 class="modal-title" id="editModalLabel">
                Editing {{ editingItem.name }}
              </h3>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="input-group mb-3">
                <span class="input-group-text">Name/description of item</span>
                <input
                  type="text"
                  v-model="editingItem.name"
                  class="form-control"
                  required
                />
                <div class="invalid-feedback">
                  What do you want for Christmas?
                </div>
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text">
                  Online shopping link (optional)
                </span>
                <input
                  type="text"
                  v-model="editingItem.link"
                  class="form-control"
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="btn btn-success"
                data-bs-dismiss="modal"
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
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
      newItem: {},
      editingItem: {},
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
      this.editingItem.name = item.name;
      this.editingItem.link = item.link;
      this.editingItem.id = item.id;
    },
    updateItem: function () {
      axios
        .patch(`/wishedgifts/${this.editingItem.id}`, this.editingItem)
        .then((response) => {
          console.log(response);
          var foundItem = this.myList.find(
            (item) => item.id == this.editingItem.id
          );
          console.log("found item", foundItem);
          console.log("editing item", this.editingItem);
          foundItem.name = this.editingItem.name;
          foundItem.link = this.editingItem.link;
        });
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