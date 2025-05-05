# Warsaw Method Insulin Calculator

Your **Warsaw Method Insulin Calculator** is now available as a web form. It allows users to input meal details, calculates insulin needs, and displays bolus timing guidance.

You can embed or deploy this React component in any web application. Would you like assistance integrating it into a full site or publishing it via a static hosting service like Vercel or GitHub Pages?

To publish your Warsaw Method Insulin Calculator using GitHub Pages, follow these steps. This guide assumes you're using a React app created with Vite, Create React App, or similar tooling.

## Step-by-Step Instructions

1. Prepare Your React App

If you haven’t already, create a React project:

```bash
npm create vite@latest warsaw-method --template vue
cd warsaw-method
npm install
```

Then replace the contents of `src/App.jsx` with the component I provided.

2. Add the Component

Copy the content from the Warsaw Insulin Form I just generated into src/App.jsx or a new file (e.g., src/WarsawForm.jsx) and import it into App.jsx.

```jsx
import WarsawInsulinForm from './WarsawForm'

function App() {
  return <WarsawInsulinForm />
}

export default App
```

3. Update vite.config.js (if using Vite)
Add the base setting so GitHub Pages knows where to find the files.

```js
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/<your-repo-name>/',
})
```

Replace <your-repo-name> with your actual GitHub repository name.

4. Update package.json Scripts
Add a homepage and a deploy script:

```json
"homepage": "https://<your-username>.github.io/<your-repo-name>",
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

5. Install gh-pages Package

```bash
npm install gh-pages --save-dev
```

6. Initialize Git and Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

7. Deploy to GitHub Pages

```bash
npm run deploy
```

This will build the app and push the dist/ folder to the gh-pages branch.

8. Enable GitHub Pages
Go to your GitHub repository:

Navigate to Settings → Pages

Under Source, select gh-pages branch, then /(root)

Click Save

Your site will be live at:

```txt
https://<your-username>.github.io/<your-repo-name>/
```

## Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).
