const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Serve static files (HTML, CSS, etc.)
app.use(express.static('public'));

// Route to handle the Telegram login
app.get('/auth', async (req, res) => {
    const user = req.query.user; // Extract the Telegram user data from the query
    const isPremium = req.query.premium === 'true'; // Check if the user is premium

    // For now, let's log the user info to console
    console.log(`User: ${user}`);
    console.log(`Premium: ${isPremium ? 'Yes' : 'No'}`);

    // Render the app.html with the user data
    res.send(`
        <html>
            <head>
                <title>Telegram User Info</title>
                <style>
                    body { font-family: Arial, sans-serif; text-align: center; }
                    .premium { color: gold; font-weight: bold; }
                </style>
            </head>
            <body>
                <h1>Welcome, ${user}</h1>
                <p>Your Telegram name: ${user}</p>
                <p>Your status: <span class="premium">${isPremium ? 'Premium User' : 'Regular User'}</span></p>
                <p>Complete your tasks below!</p>
                <div id="tasks"></div>
            </body>
        </html>
    `);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
