import requests

API_TOKEN = '7344204668:AAE5JhEi4chHTpHjtit4HMPNY4U3JCSnJiY'  # আপনার টেলিগ্রাম বট টোকেন
user_id = 'USER_ID'  # এখানে ব্যবহারকারীর টেলিগ্রাম আইডি দিন

# টেলিগ্রাম API থেকে ব্যবহারকারীর প্রোফাইল ছবি এবং তথ্য নিয়ে আসুন
url = f"https://api.telegram.org/bot{API_TOKEN}/getUserProfilePhotos?user_id={user_id}"
response = requests.get(url)
data = response.json()

# ব্যবহারকারীর তথ্য এবং ছবি
if data['ok']:
    profile_pic_url = f"https://api.telegram.org/file/bot{API_TOKEN}/{data['result']['photos'][0][0]['file_id']}"  # প্রথম ছবি থেকে URL নিচ্ছে
    response_data = {
        'success': True,
        'name': 'User Name',  # এখানে প্রকৃত নাম নিবেন
        'username': 'User Name',  # এখানে প্রকৃত ইউজারনেম নিবেন
        'user_id': user_id,
        'is_premium': False,  # এটি টেলিগ্রাম API দ্বারা সরাসরি পাওয়া যাবে না
        'profile_picture': profile_pic_url,
        'groups': ['Group 1', 'Group 2']  # এখানে গ্রুপের নামের তালিকা থাকবে
    }
else:
    response_data = {'success': False}

print(response_data)
