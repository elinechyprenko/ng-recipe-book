# Recipes Book

Recipes Book is a **full-stack web application** for managing recipes.  
The app demonstrates modern Angular frontend development with a mock Node.js backend for providing recipe data.

## 🚀 Features
- **Browse Recipes**: Display recipes in a styled card layout with lazy-loaded images
- **Filter & Search:** Filter recipes by title
- **Create Recipes:** Add new recipes through a reactive form with simulated image upload and progress bar
- **View Recipe Details:** See full recipe details including ingredients, tags, and preparation steps
- **Reactive Architecture:** Built using Angular Signals + RxJS for reactive and efficient state management

## 🛠️ Technologies Used

### Frontend
- [Angular 17](https://angular.io/)
- [Angular Signals](https://angular.io/guide/signals) for reactive state  
- [RxJS 7.8+](https://rxjs.dev/) for async data streams

### Backend (Mock)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)

## Development server

- Install dependencies for frontend: `npm install`
- Install dependencies for backend: `cd recipes-book-api` => `npm install`
- Run the backend: `npm run server:start` . This will start the Node.js/Express server (listening on `http://localhost:3001/`).
- Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
