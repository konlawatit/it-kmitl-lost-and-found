import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import { LoaderPlugin } from 'vue-google-login';
import vuetify from './plugins/vuetify';

Vue.use(LoaderPlugin, {
    client_id: "869793669585-thq4uiq4ir7cqqsdg0p90cafo28hu61d.apps.googleusercontent.com"
});

Vue.GoogleAuth.then(auth2 => {
    if (auth2.isSignedIn.get()) {
        let profile = auth2.currentUser.get().getBasicProfile();
        store.dispatch('auth/setProfile', {
            fullname: profile.getName(),
            fname: profile.getGivenName(),
            lname: profile.getFamilyName(),
            email: profile.getEmail(),
            image: profile.getImageUrl(),
            id: profile.getId(),
            role: profile.getEmail().split('@')[0][3] === '7' ? 'student' : 'personnel',
            isSigned: true
        })
        router.push(`/home`)
    }
    console.log(auth2.isSignedIn.get());
    console.log(auth2.currentUser.get());
})


Vue.config.productionTip = false

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
