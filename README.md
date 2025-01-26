# Project Name: Dashboard Vue App

This template helps you get started developing with Vue 3 in Vite.

## Overview

This project is a dashboard application built using Vue.js with the Composition API. It is structured as a Single Page Application (SPA) and leverages several libraries to enhance functionality and design. The app displays various charts and dashboard elements for data visualization.

## Features

- **Vue 3 Composition API**: For building modular and reusable components.
- **Single Page Application (SPA)**: Ensures smooth navigation without page reloads.
- **Dynamic Data Visualization**: Displays data in different formats using charts.

## Libraries and Tools Used

- **Chart.js**: For creating responsive and interactive charts.
- **Element Plus**: Provides UI components for a modern look.
- **Font Awesome**: Adds customizable icons.
- **Axios**: For making HTTP requests.
- **Day.js**: Lightweight library for parsing and formatting dates.
- **Lodash**: Utility library for simplifying JavaScript operations.
- **Pinia**: State management for Vue applications.
- **Swiper**: Modern touch slider for web and mobile applications.
- **Vue Router**: Manages navigation between components.
- **Vue The Mask**: Adds input masks to forms.

### Full List of Dependencies:

```json
"dependencies": {
  "@element-plus/icons-vue": "^2.3.1",
  "@fortawesome/fontawesome-svg-core": "^6.6.0",
  "@fortawesome/free-solid-svg-icons": "^6.6.0",
  "@fortawesome/vue-fontawesome": "^3.0.8",
  "axios": "^1.7.7",
  "chart.js": "^4.4.7",
  "dayjs": "^1.11.13",
  "element-plus": "^2.8.7",
  "jwt-decode": "^4.0.0",
  "lodash": "^4.17.21",
  "lodash.debounce": "^4.0.8",
  "path-browserify": "^1.0.1",
  "pinia": "^2.1.7",
  "swiper": "^11.1.14",
  "vue": "^3.4.29",
  "vue-jwt-decode": "^0.1.0",
  "vue-router": "^4.3.3",
  "vue-the-mask": "^0.11.1"
}
```

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Project Setup

### Install Dependencies

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## Folder Structure

- **src/**: Contains the core application files.
    - **components/**: Vue components for different dashboard elements.
    - **views/**: Main views of the application.
    - **assets/**: Static assets like images and styles.
- **public/**: Contains static files like the index.html.
- **vite.config.js**: Configuration file for Vite.

## Charts in the Dashboard

1. **Line Chart**: Displays progress over months.
2. **Bar Chart**: Compares product performance across quarters.
3. **Doughnut Chart**: Represents task distribution (Completed, In Progress, Pending).
4. **Custom Placeholder**: Ready for future widgets or charts.

## Contributions

Feel free to fork this repository, create a new branch, and submit a pull request for any improvements or features you want to add!

## License

This project is open source and available under the [MIT License](LICENSE).

