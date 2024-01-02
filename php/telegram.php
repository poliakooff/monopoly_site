<?php
require_once("../../config/config.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['name'], $_POST['phone'], $_POST['town'], $_POST['post'], $_POST['payment'], $_POST['service'], $_POST['price'], $_POST['title'])) {
        $name = $_POST['name'];
        $phone = $_POST['phone'];
        $town = $_POST['town'];
        $post = $_POST['post'];
        $payment = $_POST['payment'];
        $service = $_POST['service'];
        $price = $_POST['price'];
        $title = $_POST['title'];

        $messageData = array(
            '---------- Заказ ----------',
            'Імʼя: ' . $name,
            'Телефон: ' . $phone,
            'Місто: ' . $town,
            'Відділення: ' . $post,
            'Сервіс: ' . $service,
            'Оплата: ' . $payment,
            'Назва: ' . $title,
            'Ціна: ' . $price,
            '-------------------------',
        );

        $message = '';
        foreach ($messageData as $value) {
            $message .= "<b>" . urlencode($value) . "</b>%0A";
        }

        $url = "https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$message}";
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $result = curl_exec($ch);
        curl_close($ch);

        if ($result === false) {
            echo "Error sending message to Telegram";
        } else {
            exit;
        }
    } else {
        echo "Error: Incomplete form data";
    }
} else {
    echo "Error: Invalid request method";
}
?>
