<template>
  <div>
    <v-app-bar
      app
      fixed
      dark
      class="mx-auto overflow-hidden"
      color="#0f3057"
      height="80"
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title class="logo">
        <a href="/">
          <img src="./lost 2.png" />
        </a>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="control has-icons-right is-mobile" id="inputsearch">
        <input class="input is-normal" placeholder="ค้นหา" />
        <span class="icon is-small is-right">
          <i class="fas fa-search"></i>
        </span>
      </div>
      <p id="namenavbar" class="is-mobile">
        {{ store.getters["auth/getfname"] }}
      </p>
      <p id="namenavbar" class="is-mobile">
        {{ store.getters["auth/getlname"] }}
      </p>
      <span class="icon is-large mr-4" id="navbaruser">
        <i class="fas fa-user"></i>
      </span>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      temporary
      disable-resize-watcher
      fixed
      app
    >
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-black--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{
              store.getters["auth/getFullName"]
            }}</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>fas fa-edit</v-icon>
            </v-list-item-icon>
            <v-list-item-title>My post</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>fas fa-list</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Leaderboard</v-list-item-title>
          </v-list-item>

          <v-list-item @click="onSignOut()">
            <v-list-item-icon>
              <v-icon>fa fa-power-off</v-icon>
            </v-list-item-icon>
            <v-list-item-title
              >ออกจากระบบ</v-list-item-title
            >
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import store from "../../store/index.js";
export default {
  name: "Navbar",
  data() {
    return {
      store,
      drawer: false,
      group: null,
    };
  },
  methods: {
    async onSignOut() {
      await this.$swal.fire({
        title: "คุณต้องการออกจากระบบ?",
        text: "คุณต้องการออกจากระบบหรือไม่!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
            store.dispatch("auth/clearProfile");
            window.gapi.auth2
            .getAuthInstance()
            .signOut()
            .then(() => {
                console.log("Disconnected");
                this.redirect("");
            });
          this.$swal.fire("ออกจากระบบ!", "คุณได้ออกสู่ระบบเรียบร้อย", "success");
        }
      });
    },
    redirect(path) {
      console.log("redirect to : ", path);
      this.$router.push(`/${path}`);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#iconuser {
  font-size: 2rem;
  margin-left: auto;
  margin-right: auto;
}
#navbaruser {
  font-size: 2rem;
}
#nameuser {
  font-size: 1rem;
}
#namenavbar {
  margin-top: 1rem;
  margin-right: 1rem;
  font-family: "Kanit", sans-serif;
}
#inputsearch {
  width: 25rem;
  margin-right: 15rem;
}
</style>
