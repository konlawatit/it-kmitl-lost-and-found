<template>
  <div class="mt-6" id="listbox">
    <div class="columns">
      <div class="column is-3">
        <div>
          <div class="columns mt-2 ml-6" id="boxitem">
            <div class="column is-12 p-5 has-text-centered">
              <v-btn
                depressed
                color="light-blue darken-4"
                class="button mt-6 white--text"
                @click="addCategory()"
                >เพิ่มประเภทสิ่งของ</v-btn
              >
              <v-btn
                depressed
                color="light-blue darken-4"
                class="button mt-6 white--text"
                @click="changelisttolistposts()"
                >โพสต์ทั้งหมด</v-btn
              >
              <v-btn
                depressed
                color="light-blue darken-4"
                class="button mt-6 white--text"
                @click="changelisttolistname()"
                >รายชื่อผู้ใช้งาน</v-btn
              >
              <v-btn
                depressed
                color="light-blue darken-4"
                class="button mt-6 mb-6 white--text"
                @click="changelisttolistnameban()"
                >รายชื่อผู้ถูกระงับ</v-btn
              >
            </div>
          </div>
        </div>
      </div>
      <div class="column is-8">
        <v-card max-width="600" class="mx-auto" v-show="listbox == true">
          <v-toolbar color="light-blue darken-4" dark>
            <v-toolbar-title>{{ titlelist }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <input
              type="text"
              class="input mr-1"
              style="width: 50%"
              placeholder="Search"
            />
            <v-btn icon>
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </v-toolbar>

          <v-list subheader two-line>
            <v-list-item v-for="list in list" :key="list.name">
              <v-list-item-avatar>
                <v-icon class="grey lighten-1" dark> mdi-folder </v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="list.name"></v-list-item-title>

                <v-list-item-subtitle
                  v-text="list.role"
                  class="mt-1"
                ></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn icon @click="editUserModal">
                  <v-icon color="grey lighten-1">mdi-information</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
        <div v-show="add == true" class="columns mt-6">
          <div class="column is-2"></div>
          <div class="column is-8">
            <v-text-field
              label="Category"
              :rules="rules"
              hide-details="auto"
            ></v-text-field>
            <v-file-input
              :rules="img"
              accept="image/png, image/jpeg, image/bmp"
              prepend-icon="mdi-camera"
              label="Image"
              class="mt-6"
            ></v-file-input>
            <div class="columns mt-2">
              <div class="column is-8"></div>
              <div class="column is-4">
                <button class="button is primary white--text has-text-centered">Add</button>
              </div>
            </div>
          </div>
          <div class="column is-2"></div>
        </div>
      </div>
    </div>
    <div class="modal" :class="{ 'is-active': edituser }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title has-text-centered is-size-3 mt-4">
            Edit user
          </p>
          <button
            class="delete"
            aria-label="close"
            @click="edituser = false"
          ></button>
        </header>
        <section class="modal-card-body">
          <div class="columns" id="listedit">
            <div class="column is-12 is-size-2 has-text-centered">
              User to Admin
            </div>
          </div>
          <div class="columns" id="listedit">
            <div
              class="column is-12 is-size-2 has-text-centered has-text-danger"
            >
              Banned users
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "listitem",
  data() {
    return {
      rules: [
        (value) => !!value || "Required.",
        (value) => (value && value.length >= 3) || "Min 3 characters",
      ],
      img: [
        value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
      ],
      add: true,
      listbox: false,
      edituser: false,
      titlelist: "",
      list: [],
      listname: [
        {
          role: "Admin",
          name: "นายธีรภัทร์ บุญช่วยแล้ว",
        },
        {
          role: "User",
          name: "นายธีรภัทร์ บุญช่วยแล้ว",
        },
        {
          role: "User",
          name: "นายธีรภัทร์ บุญช่วยแล้ว",
        },
        {
          role: "User",
          name: "นายธีรภัทร์ บุญช่วยแล้ว",
        },
      ],
      listnameban: [
        {
          role: "Banned",
          name: "นายธีรภัทร์ บุญช่วยแล้ว",
        },
        {
          role: "Banned",
          name: "นายธีรภัทร์ บุญช่วยแล้ว",
        },
      ],
      listposts: [],
    };
  },
  methods: {
    editUserModal() {
      this.edituser = true;
    },
    changelisttolistnameban() {
      this.list = this.listnameban;
      this.titlelist = "Banned ( " + this.list.length + " )";
      this.listbox = true;
      this.add = false;
    },
    changelisttolistname() {
      this.list = this.listname;
      this.titlelist = "User ( " + this.list.length + " )";
      this.listbox = true;
      this.add = false;
    },
    changelisttolistposts() {
      this.list = this.listposts;
      this.titlelist = "Post ( " + this.list.length + " )";
      this.listbox = true;
      this.add = false;
    },
    addCategory() {
      this.listbox = false;
      this.add = true;
    },
  },
  created() {
    this.list = this.listname;
    this.titlelist = "User ( " + this.list.length + " )";
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#listbox {
  width: 100%;
  font-family: "Kanit", sans-serif;
}
.v-list {
  height: 16rem;
  overflow-y: auto;
}
#listedit :hover {
  background: rgb(211, 211, 211);
}
.modal {
  font-family: "Kanit", sans-serif;
}
#boxitem {
  border-radius: 1rem;
  font-family: "Kanit", sans-serif;
  background: rgb(187, 186, 186);
}
button {
  font-family: "Kanit", sans-serif;
  width: 100%;
}
</style>
