# Cloudonix Test Mathias

This web application is live at: [cloudonix-test-mathias.vercel.app](https://cloudonix-test-mathias.vercel.app/).

## Project documentation

This project is Mathias Onu's submission for an interview assignment for a Frontend Developer position at Cloudonix. It is a web application built with Angular 19, which manages a collection of products for an online store.

Unfortunately, given the limited time frame, and my busy schedule, I wasn't able to add unit / e2e tests. I recognize that automated tests are extremely important, and if I given the opportunity, I would gladly implement them!

Project Features:
1. Login screen to authenticate users
    - Login screen with authorization key
    - Bearer token implementation
    - Route guards for protected pages
2. Visualize the store's products
    - View all products in a paginated table
    - Create new products
    - Edit existing products
    - Delete products
    - Real-time form validation
3. Edit, delete, and create existing products
    - Along with basic operations, it contains key-value pair management
        - Dynamic form for product properties
        - Supported property types:
            - Type (equipment, furniture, stationary, part)
            - Available (boolean)
            - Backlog (number)
        - Prevents adding duplicate pairs

## Technical Stack

- Angular 19
- PrimeNG UI Components
- RxJS for state management
- Angular Reactive Forms
- TypeScript
- SCSS and PrimeFlex library for styling

## Development server

To start a local development server, ensure you have:
- Node.js version 18.19.1, or newer
- Git
- npm
- Angular CLI (latest)

To start a local development server, clone the repository (`git clone https://github.com/mathias-onu/cloudonix-test-mathias.git`) and run:

```bash
npm start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.


## Building

To build the project run:

```bash
npm run build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.
