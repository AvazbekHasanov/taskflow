// src/utils/apiFetch.js

// Define your base URL
const BASE_URL = 'https://sculpin-golden-bluejay.ngrok-free.app/api';

let token = localStorage.getItem('access_token');

// Create a custom fetch function
const apiFetch = async (endpoint, options = {}) => {
    const url = `${BASE_URL}${endpoint}`;

    // Set default headers and merge with provided headers
    const defaultHeaders = {
        'ngrok-skip-browser-warning': 'true',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    options.headers = {
        ...defaultHeaders,
        ...options.headers,
    };

    try {
        const response = await fetch(url, options);

        // Check if the response is OK
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        // Parse the JSON response
        return await response.json();
    } catch (error) {
        console.error('API Fetch Error:', error.message);
        throw error; // Rethrow error for further handling if needed
    }
};

export default apiFetch;
