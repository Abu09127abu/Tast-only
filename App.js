// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAsyGiZ8R2QReR5ptT2lmnS8QEwZunxveA",
    authDomain: "ab-coin-main-game.firebaseapp.com",
    databaseURL: "https://ab-coin-main-game-default-rtdb.firebaseio.com",
    projectId: "ab-coin-main-game",
    storageBucket: "ab-coin-main-game.firebasestorage.app",
    messagingSenderId: "353294390131",
    appId: "1:353294390131:web:b57b57a2907e5d3a4aeb06"
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Variables for user login status
let currentUser = null;
let userCoins = 0;

// Login Function
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'asrabu123' && password === 'asrabu123') {
        // Admin Login
        currentUser = 'admin';
        showAdminPage();
    } else if (username && password) {
        // User Login
        currentUser = username;
        showUserPage();
    } else {
        document.getElementById('loginError').textContent = 'Invalid username or password';
    }
}

// Show Admin Page
function showAdminPage() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('adminPage').style.display = 'block';
    loadAdminTasks();
}

// Show User Page
function showUserPage() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('userPage').style.display = 'block';
    loadUserTasks();
}

// Navigation
function navigateTo(page) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.style.display = 'none');
    document.getElementById(`${page}Page`).style.display = 'block';
}

// Earn Coin on Home page
function earnCoin() {
    userCoins += 10; // Add 10 coins for each click
    alert(`You earned 10 coins! Total: ${userCoins} coins.`);
    updateLeaderboard();
}

// Admin Logout
function logout() {
    currentUser = null;
    document.getElementById('adminPage').style.display = 'none';
    document.getElementById('loginPage').style.display = 'block';
}

// Task Page for User
function loadUserTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '<p>Loading tasks...</p>';
    
    firebase.database().ref('tasks').once('value', (snapshot) => {
        taskList.innerHTML = '';
        snapshot.forEach(taskSnapshot => {
            const task = taskSnapshot.val();
            const taskItem = document.createElement('div');
            taskItem.innerHTML = `
                <h3>${task.name}</h3>
                <p>${task.description}</p>
                <button onclick="completeTask('${taskSnapshot.key}')">Complete Task</button>
            `;
            taskList.appendChild(taskItem);
        });
    });
}

// Complete Task
function completeTask(taskId) {
    alert(`Task ${taskId} completed! You earned 20 coins.`);
    updateLeaderboard();
}

// Load Admin Tasks
function loadAdminTasks() {
    const adminTaskList = document.getElementById('adminTaskList');
    adminTaskList.innerHTML = '<p>Loading tasks...</p>';

    firebase.database().ref('tasks').once('value', (snapshot) => {
        adminTaskList.innerHTML = '';
        snapshot.forEach(taskSnapshot => {
            const task = taskSnapshot.val();
            const taskItem = document.createElement('div');
            taskItem.innerHTML = `
                <h3>${task.name}</h3>
                <p>${task.description}</p>
                <button onclick="deleteTask('${taskSnapshot.key}')">Delete Task</button>
            `;
            adminTaskList.appendChild(taskItem);
        });
    });
}

// Delete Task
function deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        firebase.database().ref('tasks').child(taskId).remove();
        loadAdminTasks();
    }
}

// Update Leaderboard
function updateLeaderboard() {
    const leaderboard = document.getElementById('leaderboard');
    leaderboard.innerHTML = '<p>Loading leaderboard...</p>';

    firebase.database().ref('users').orderByChild('coins').once('value', (snapshot) => {
        leaderboard.innerHTML = '<h3>Leaderboard</h3>';
        snapshot.forEach(userSnapshot => {
            const user = userSnapshot.val();
            const userItem = document.createElement('div');
            userItem.innerHTML = `${user.username}: ${user.coins} coins`;
            leaderboard.appendChild(userItem);
        });
    });
}

// Add Task as Admin
function addTask() {
    const taskName = prompt("Enter task name:");
    const taskDescription = prompt("Enter task description:");

    const newTask = {
        name: taskName,
        description: taskDescription
    };

    firebase.database().ref('tasks').push(newTask);
    loadAdminTasks();
}
