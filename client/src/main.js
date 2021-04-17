import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import {
    LoaderPlugin
} from 'vue-google-login';
import vuetify from './plugins/vuetify';
import VueSweetalert2 from 'vue-sweetalert2';

import AuthService from './service/AuthService'

import 'sweetalert2/dist/sweetalert2.min.css';

import ChatService from './service/ChatService'

Vue.use(VueSweetalert2);

Vue.use(LoaderPlugin, {
    client_id: "869793669585-thq4uiq4ir7cqqsdg0p90cafo28hu61d.apps.googleusercontent.com"
});

Vue.GoogleAuth.then(async auth2 => {
    if (auth2.isSignedIn.get()) {
        await AuthService.login(auth2.currentUser.get().getAuthResponse().id_token, 'reload').then(
            async (result) => {
                if (!result.error) {
                    console.log('main',result)
                    store.dispatch("auth/setProfile", {
                        fullname: result.data.name,
                        fname: result.data.given_name,
                        lname: result.data.family_name,
                        email: result.data.email,
                        image: result.data.picture,
                        id: result.data.sub,
                        role: result.data.role,
                        type: result.data.type,
                        phone_number: result.data.phone_number,
                        birthday: result.data.birthday,
                        merit: result.data.merit,
                        isSigned: true,
                    });
                    if (router.app.$route.fullPath == '/') router.push(`/home`)
                    if (router.app.$route.fullPath == '/chatroom') {
                        await ChatService.getRooms(result.data.sub).then(data => {
                            console.log(data)
                            store.dispatch('conversation/setRooms', data)
                        })
                    }
                } else {
                    auth2.signOut()
                    router.push(`/`)
                }
            }
        );
    } else {
        router.push(`/`)
    }
    console.log(auth2.isSignedIn.get());
    console.log(auth2.currentUser.get());
})


Vue.config.productionTip = false
Vue.prototype.API_URL = "http://localhost:8888"

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')