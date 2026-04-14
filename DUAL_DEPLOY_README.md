# 🧱 — React Dual-Deploy Template  
**Deploy to GitHub Pages (Preview) + Custom Domain (Official)**

### 📘 Overview  
This template allows you to:

- Develop inside **one React repo** (the preview repo)  
- Deploy to a **GitHub Pages preview site**  
- Deploy the **same project** to a **custom domain (official site)**  
- Keep both environments fully isolated  
- Use `.env.preview` and `.env.official` to control build paths

---

# 🚀 1. Prerequisites

- Node + npm installed  
- React app created with `create-react-app`  
- Two GitHub repositories:
  - **Preview repo** → holds all source code  
  - **Live repo** → holds only the built files (`/build`)  

---

# 📁 2. Folder Structure

Your main working repo (preview repo) should contain:

```
react_website/
  src/
  public/
  .env.preview
  .env.official
  package.json
  README.md
```

---

# ⚙️ 3. Install Required Dependencies

```bash
npm install --save-dev gh-pages env-cmd
```

---

# 🧩 4. `.env` Files

### `.env.preview`
```env
PUBLIC_URL=/your-preview-repo
REACT_APP_SITE_ENV=preview
```

### `.env.official`
```env
PUBLIC_URL=/
REACT_APP_SITE_ENV=official
```

---

# 🗺️ 5. React Router Setup (`index.tsx`)

```tsx
const basename = (process.env.PUBLIC_URL || '').replace(/\/+$/, '');

<MainRouter basename={basename}>
  <App />
</MainRouter>
```

---

# 📦 6. `package.json` Scripts (Dual Build + Dual Deploy)

```jsonc
"scripts": {
  "start": "react-scripts start",
  "spa-fallback": "node -e \"require('fs').copyFileSync('build/index.html','build/404.html')\",

  "build:preview": "env-cmd -f .env.preview react-scripts build",
  "predeploy:preview": "npm run build:preview && npm run spa-fallback",
  "deploy:preview": "gh-pages -d build -b live",

  "build:official": "env-cmd -f .env.official react-scripts build",
  "predeploy:official": "npm run build:official && npm run spa-fallback && node -e \"require('fs').writeFileSync('build/CNAME','OFFICIAL_DOMAIN')\"",
  "deploy:official": "gh-pages -d build -b live -r GITHUB_OFFICIAL_REPO_LINK"
}
```

Replace:

- `OFFICIAL_DOMAIN` → your real domain  
- `GITHUB_OFFICIAL_REPO_LINK` → live repo Git URL  

---

# 🏗️ 7. Build & Deploy Commands

## 🌿 Preview Site (GitHub Pages)

```bash
npm run predeploy:preview
npm run deploy:preview
```

---

## 🦄 Official Site (Custom Domain)

```bash
npm run predeploy:official
npm run deploy:official
```

This will:

- Build using `.env.official`  
- Create `build/CNAME` automatically  
- Push `build/` to the **live** branch of the live repo  

---

# 🌐 8. Live Repo Setup

Your official repo should contain:

✔ A `README.md`  
✔ A **live branch** (auto-created during deploy)  
✔ **No source code — only built files**

GitHub → **Settings → Pages**

- Source → `Branch: live`  
- Folder → `/`  
- Custom domain → your domain  
- Enforce HTTPS → ON  

---

# 🌍 9. DNS Setup for Custom Domain

### A Records (root domain)

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

### CNAME (www)

```
Type: CNAME
Host: www
Points to: <username>.github.io
```

---

# 🔎 10. Verifying Everything

### Preview Build

```bash
npm run build:preview
```

Should open correctly at:

```
http://localhost:3000/preview-repo
```

### Official Build

```bash
npm run build:official
```

Should work at root `/` paths.

---

# ⭐ Summary

This template supports:

- ✔ Full dual-deploy system  
- ✔ Separate environment builds  
- ✔ Automatic CNAME creation  
- ✔ Clean routing through PUBLIC_URL  
- ✔ No homepage switching  
- ✔ Reusable for every new project  
