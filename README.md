# Cloudonix Test Mathias

This web application is live at: [cloudonix-test-mathias.vercel.app](https://cloudonix-test-mathias.vercel.app/).

## Project documentation

This project is Mathias Onu's submission for an interview assignment for a Frontend Developer position at Cloudonix. It is a web application built with Angular 19, which manages a collection of products for an online store.

First and foremost, I noticed a bug: in the key-value pairs section, when sending an empty profile as edit / create, the response of the request contains an added "type" property with value "equipment". Shouldn't the user be allowed not to add any key-value pairs? If the user should not be allowed to enter an empty profile, then I apologize for the misunderstanding, since the current project version allows it.

Unfortunately, given the limited time frame, and my busy schedule, I wasn't able to finish the validation upon entering new key-value pairs, when editing / creating a product. If given the opportunity, I would gladly finish implementing this functionality as well!

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
