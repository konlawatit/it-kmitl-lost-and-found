import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import Vuelidate from 'vuelidate'
import {
    LoaderPlugin
} from 'vue-google-login';
import vuetify from './plugins/vuetify';
import VueSweetalert2 from 'vue-sweetalert2';

import AuthService from './service/AuthService'

import 'sweetalert2/dist/sweetalert2.min.css';

import ChatService from './service/ChatService'

Vue.use(VueSweetalert2);
Vue.use(Vuelidate);

Vue.use(LoaderPlugin, {
    client_id: "869793669585-thq4uiq4ir7cqqsdg0p90cafo28hu61d.apps.googleusercontent.com"
});
Vue.prototype.SIGNED = true
Vue.GoogleAuth.then(async auth2 => {
    if (auth2.isSignedIn.get()) {
        await AuthService.login(auth2.currentUser.get().getAuthResponse().id_token, 'reload').then(
            async (result) => {
                if (!result.error) {
                    console.log('main',result)
                    store.dispatch("auth/setProfile", {
                        fullname: result.data.user_name,
                        fname: result.data.fname,
                        lname: result.data.lname,
                        email: result.data.email,
                        image: result.data.image,
                        id: result.data.user_id,
                        role: result.data.role,
                        type: result.data.type,
                        phone_number: result.data.phone_number,
                        birthday: result.data.birthday,
                        isSigned: true,
                    });
                    // if (router.app.$route.fullPath == '/') router.push(`/home`)
                    if (router.app.$route.fullPath == '/chatroom' || router.app.$route.fullPath == '/home') {
                        await ChatService.getRooms(result.data.user_id).then(data => {
                            console.log('getroom',data)
                            store.dispatch('conversation/setRooms', data)
                        })
                    }
                } 
                else {
                    auth2.signOut()
                    router.push(`/`)
                }
            }
        );
    }
    console.log(auth2.isSignedIn.get());
    console.log(auth2.currentUser.get());
})


Vue.config.productionTip = false
Vue.prototype.API_URL = "http://localhost:8888"

new Vue({
    store,
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')