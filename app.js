import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDwsGtshGQfrZ7y8IZ9RlRLY3HwjmUbIGc",
    authDomain: "abcoin-d2c54.firebaseapp.com",
    databaseURL: "https://abcoin-d2c54-default-rtdb.firebaseio.com",
    projectId: "abcoin-d2c54",
    storageBucket: "abcoin-d2c54.firebasestorage.app",
    messagingSenderId: "942304733947",
    appId: "1:942304733947:web:af7671c1c81a3dfd549e5e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Function to save data to Firebase
function saveToFirebase() {
    const telegramData = JSON.parse(localStorage.getItem("telegram_user"));
    const abcoin = localStorage.getItem("abcoin");

    if (!telegramData || !abcoin) {
        console.error("No valid data in localStorage to save.");
        return;
    }

    const userId = telegramData.id; // Use Telegram chat ID as the unique user ID
    const userRef = ref(database, `users/${userId}`);

    set(userRef, {
        name: `${telegramData.first_name} ${telegramData.last_name || ""}`.trim(),
        username: telegramData.username || "N/A",
        is_premium: telegramData.is_premium || false,
        chat_id: telegramData.id,
        abcoin: Number(abcoin),
    })
        .then(() => {
            console.log("Data saved to Firebase successfully!");
        })
        .catch((error) => {
            console.error("Error saving data to Firebase:", error);
        });
}

// Trigger save function when the page loads
document.addEventListener("DOMContentLoaded", saveToFirebase);
