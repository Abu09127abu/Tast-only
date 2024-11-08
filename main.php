<?php
$API_TOKEN = '7344204668:AAE5JhEi4chHTpHjtit4HMPNY4U3JCSnJiY'; // আপনার টেলিগ্রাম বট টোকেন
$firebase_url = "https://ab-coin-main-game-default-rtdb.firebaseio.com/"; // Firebase ডাটাবেস URL

$content = file_get_contents("php://input");
$update = json_decode($content, true);

// যদি কোন নতুন মেসেজ পাওয়া যায়
if (isset($update["message"])) {
    $chat_id = $update["message"]["chat"]["id"];
    $first_name = $update["message"]["chat"]["first_name"];
    $last_name = $update["message"]["chat"]["last_name"];
    $user_name = $update["message"]["chat"]["username"];
    $photo = $update["message"]["chat"]["photo"];
    $user_id = $update["message"]["chat"]["id"];

    // ফায়ারবেসে ডাটা পাঠানোর জন্য
    $data = [
        "first_name" => $first_name,
        "last_name" => $last_name,
        "username" => $user_name,
        "user_id" => $user_id,
        "photo" => $photo,
        "reward" => 0, // রিওয়ার্ড ফিল্ড (প্রাথমিকভাবে 0)
    ];

    $firebase_data = json_encode($data);

    // Firebase API কল
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $firebase_url . "users/$user_id.json");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
    curl_setopt($ch, CURLOPT_POSTFIELDS, $firebase_data);
    curl_exec($ch);
    curl_close($ch);

    // ব্যবহারকারীকে স্বাগতম মেসেজ পাঠানো
    $text = "Welcome, $first_name $last_name! Your Username: @$user_name. Your ID: $user_id.";
    sendMessage($chat_id, $text);
}

function sendMessage($chat_id, $message) {
    global $API_TOKEN;
    $url = "https://api.telegram.org/bot$API_TOKEN/sendMessage?chat_id=$chat_id&text=" . urlencode($message);
    file_get_contents($url);
}
?>
