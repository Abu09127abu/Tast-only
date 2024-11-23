<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Telegram Mini App</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 20px;
        }
        .premium {
            color: gold;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h1>Welcome, <span id="user-name"></span></h1>
    <p>Your Telegram name: <span id="telegram-name"></span></p>
    <p>Your status: <span id="status" class="premium"></span></p>

    <h2>Complete Your Tasks</h2>
    <div id="tasks"></div>

    <script>
        // Simulating the Telegram Web App object and query parameters for testing
        const userName = 'JohnDoe'; // Simulated Telegram username
        const isPremium = true; // Simulated Premium status

        // Display user information
        document.getElementById('user-name').innerText = userName;
        document.getElementById('telegram-name').innerText = userName;
        document.getElementById('status').innerText = isPremium ? 'Premium User' : 'Regular User';

        // Dynamically load tasks (just for example purposes)
        const tasks = ['Task 1', 'Task 2', 'Task 3'];
        const taskContainer = document.getElementById('tasks');
        tasks.forEach(task => {
            const taskElement = document.createElement('p');
            taskElement.innerText = task;
            taskContainer.appendChild(taskElement);
        });
    </script>
</body>
</html>
