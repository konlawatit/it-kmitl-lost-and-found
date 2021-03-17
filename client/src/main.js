import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { LoaderPlugin } from 'vue-google-login';

Vue.use(LoaderPlugin, {
    client_id: "869793669585-thq4uiq4ir7cqqsdg0p90cafo28hu61d.apps.googleusercontent.com"
});

Vue.GoogleAuth.then(auth2 => {
    console.log(auth2.isSignedIn.get());
    console.log(auth2.currentUser.get())
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
