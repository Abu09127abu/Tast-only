const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public')); // To serve static files like HTML, JS, etc.

// Serve the home page (home.html)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/home.html');
});

// Serve the c.html page
app.get('/c.html', (req, res) => {
    res.sendFile(__dirname + '/public/c.html');
});

// Route to handle Telegram login data (this should be integrated with the Telegram Web App API)
app.get('/auth', (req, res) => {
    const { user_name, chat_id, is_premium } = req.query; // Get details from Telegram Web App
    // Store user data in localStorage (simulate with session or database)
    res.send(`
        <html>
            <head>
                <title>Telegram Info</title>
                <style>
                    body { font-family: Arial, sans-serif; text-align: center; }
                    .premium { color: gold; font-weight: bold; }
                </style>
            </head>
            <body>
                <h1>Welcome, ${user_name}</h1>
                <p>Your Telegram username: ${user_name}</p>
                <p>Your chat ID: ${chat_id}</p>
                <p>Status: <span class="premium">${is_premium === 'true' ? 'Premium' : 'Regular'}</span></p>
                <p>Loading your AB Coin...</p>
                <script>
                    localStorage.setItem('user_name', '${user_name}');
                    localStorage.setItem('chat_id', '${chat_id}');
                    localStorage.setItem('is_premium', '${is_premium}');
                    setTimeout(function() {
                        let coins = 2000; // Initial coin base
                        if(localStorage.getItem('is_premium') === 'true') {
                            coins += 1000; // If premium, add more coins
                        }
                        // Simulate time-based coins (for example, give coins based on how long Telegram has been used)
                        const coinsGained = coins + Math.floor(Math.random() * 1000);
                        localStorage.setItem('abcoins', coinsGained); // Save coins in localStorage
                        document.getElementById('loading').style.display = 'none';
                        document.getElementById('claim').style.display = 'block';
                        document.getElementById('coinAmount').innerText = coinsGained;
                    }, 3000);
                </script>
                <p id="coinAmount"></p>
                <button id="claim" style="display:none;" onclick="claimCoins()">Claim</button>
                <script>
                    function claimCoins() {
                        alert('AB Coins claimed: ' + localStorage.getItem('abcoins'));
                        window.location.href = '/c.html'; // Redirect to home page after claiming
                    }
                </script>
            </body>
        </html>
    `);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
