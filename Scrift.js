const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

// Telegram Bot API token
const botToken = '7344204668:AAE5JhEi4chHTpHjtit4HMPNY4U3JCSnJiY';

// Endpoint to get user info
app.get('/get-telegram-user-info', async (req, res) => {
  // Assume that the user is authorized and we have their Telegram ID from a session or URL parameter
  const userTelegramId = 'USER_TELEGRAM_ID';  // Replace with actual user ID, ideally from the session or query parameter

  // Call Telegram Bot API to get user info
  const userResponse = await fetch(`https://api.telegram.org/bot${botToken}/getChatMember?chat_id=@your_channel_id&user_id=${userTelegramId}`);
  const userData = await userResponse.json();

  if (userData.ok) {
    const user = userData.result;
    
    // Assuming you get the photo and other user details from some API or session
    const userInfo = {
      username: user.user.username || 'Unknown',
      photo: `https://t.me/${user.user.username}/photo`,  // Example for photo URL
      id: user.user.id,
      isPremium: user.user.isPremium || false,  // This is a placeholder, Telegram does not expose premium status in the API
      groups: ['Group 1', 'Group 2'],  // Replace with actual group info from your data
    };

    res.json(userInfo);
  } else {
    res.status(500).json({ error: 'Failed to fetch user info' });
  }
});

// Serve static files
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
