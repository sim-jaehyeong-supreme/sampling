### Vite + Vue project create
npm create vite@latest {project name} -- --template vue

### SCSS
npm add -D sass

### element-plus
npm install element-plus --save

```javascript
// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.mount('#app')
```