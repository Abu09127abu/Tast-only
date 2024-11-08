
<?php
// এখানে আপনার টেলিগ্রাম বট টোকেন
$API_TOKEN = '7344204668:AAE5JhEi4chHTpHjtit4HMPNY4U3JCSnJiY';
$user_id = $_GET['user_id']; // আপনি ব্যবহারকারীর ID গ্রহণ করবেন

// টেলিগ্রাম API থেকে ব্যবহারকারীর প্রোফাইল তথ্য নিয়ে আসুন
$url = "https://api.telegram.org/bot$7344204668:AAE5JhEi4chHTpHjtit4HMPNY4U3JCSnJiY/getUserProfilePhotos?user_id=$user_id";
$response = file_get_contents($url);
$data = json_decode($response, true);

// ব্যবহারকারীর তথ্য এবং ছবি
if ($data['ok']) {
    $profile_pic_url = "https://api.telegram.org/file/bot7344204668:AAE5JhEi4chHTpHjtit4HMPNY4U3JCSnJiY/" . $data['result']['photos'][0][0]['file_id']; // প্রথম ছবি
    $response_data = [
        'success' => true,
        'name' => 'User Name', // আপনি এই নামটি ব্যবহারকারীর নাম দিয়ে প্রতিস্থাপন করবেন
        'username' => 'User Name', // আপনি ইউজারনেমও এখান থেকে নিবেন
        'user_id' => $user_id,
        'is_premium' => false, // টেলিগ্রাম API থেকে সরাসরি এটি পাওয়া যায় না
        'profile_picture' => $profile_pic_url,
        'groups' => ['Group 1', 'Group 2'] // এখানে গ্রুপের নামের তালিকা রাখুন
    ];
} else {
    $response_data = ['success' => false];
}

echo json_encode($response_data);
?>
