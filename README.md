Absolutely — here's an updated, cleaned-up `README.md` for your **Nodebucket** project. I've:

- Added the **live production URL**  
- Noted the **Render cold-start delay** (common on free tiers)  
- Kept original dev info, cleaned it up just a bit  
- Added a **"Project Overview"** section to explain what this app does (you can adjust this as needed)

---

### ✅ Updated `README.md`

```markdown
# Nodebucket

Nodebucket is an Angular-based task management app built with the MEAN stack (MongoDB, Express, Angular, Node.js). Employees can log in by their employee ID and manage their assigned tasks in "To Do" and "Done" categories.

---

## 🚀 Live Site

**Frontend:**  
🔗 [https://nodebucket-front-end.onrender.com](https://nodebucket-front-end.onrender.com)

> ⚠️ Note: The app is hosted on Render's free tier. It may take a few seconds to "wake up" if it hasn't been accessed in a while (cold start).

---

## 📦 Development

### Development server

Run:

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

Run:

```bash
ng build --configuration production
```

The production build artifacts will be stored in the `dist/` directory.

---

## 🧪 Testing

### Unit tests

Run:

```bash
ng test
```

This will execute the unit tests via [Karma](https://karma-runner.github.io).

### End-to-end tests

Run:

```bash
ng e2e
```

This will execute the e2e tests via [Protractor](http://www.protractortest.org/).

---

## 🛠 Code Scaffolding

Generate a component, service, etc. using:

```bash
ng generate component component-name
```

Or:

```bash
ng generate directive|pipe|service|class|guard|interface|enum|module
```

---

## 📚 Further Help

For more Angular CLI options, run:

```bash
ng help
```

Or check the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

---

## ✨ Author

Dan Ross
```

Let me know if you want to add a **screenshot**, a **backend API URL**, or more info on the tech stack/components used. This version is polished and ready to go!