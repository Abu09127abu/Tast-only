<?php
$API_TOKEN = '7344204668:AAE5JhEi4chHTpHjtit4HMPNY4U3JCSnJiY'; // আপনার টেলিগ্রাম বট টোকেন
$webhook_url = 'https://yourdomain.com/bot.php'; // আপনার সার্ভারের URL

// Webhook সেট করতে
file_get_contents("https://api.telegram.org/bot$API_TOKEN/setWebhook?url=$webhook_url");

$content = file_get_contents("php://input");
$update = json_decode($content, true);

// যদি কোনো নতুন মেসেজ পাওয়া যায়
if (isset($update["message"])) {
    $chat_id = $update["message"]["chat"]["id"];
    $first_name = $update["message"]["chat"]["first_name"];
    $last_name = $update["message"]["chat"]["last_name"];
    $user_name = $update["message"]["chat"]["username"];
    $user_id = $update["message"]["chat"]["id"];
    
    // স্বাগতম মেসেজ পাঠানো
    $text = "Welcome, $first_name $last_name! Your Username: @$user_name, Your User ID: $user_id.";
    sendMessage($chat_id, $text);
}

// ফাংশন ব্যবহারকারীর কাছে মেসেজ পাঠানোর জন্য
function sendMessage($chat_id, $message) {
    global $API_TOKEN;
    $url = "https://api.telegram.org/bot$API_TOKEN/sendMessage?chat_id=$chat_id&text=" . urlencode($message);
    file_get_contents($url);
}
?>
