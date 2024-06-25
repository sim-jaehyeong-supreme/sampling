import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import 'primevue/resources/themes/aura-light-green/theme.css'
import PrimeVue from "primevue/config";

const app = createApp(App);

app.use(ElementPlus);
app.use(PrimeVue);

app.mount('#app');