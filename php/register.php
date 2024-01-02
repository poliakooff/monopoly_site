<?php
require_once('db.php');

header('Content-Type: application/json; charset=UTF-8');
$response = array();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = mysqli_real_escape_string($conn, $_POST['name']);
    $phone = mysqli_real_escape_string($conn, $_POST['phone']);
    $town = mysqli_real_escape_string($conn, $_POST['town']);
    $post = mysqli_real_escape_string($conn, $_POST['post']);
    $payment = mysqli_real_escape_string($conn, $_POST['payment']);
    $service = mysqli_real_escape_string($conn, $_POST['service']);
    $price = mysqli_real_escape_string($conn, $_POST['price']);
    $title = mysqli_real_escape_string($conn, $_POST['title']);

    $sql = "INSERT INTO `orders` (name, phone, town, post, payment, service, price, title) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        $response['success'] = false;
        $response['message'] = 'Ошибка подготовки запроса: ' . $conn->error;
    } else {
        $stmt->bind_param("ssssssss", $name, $phone, $town, $post, $payment, $service, $price, $title);
        if ($stmt->execute()) {
            $response['success'] = true;
            $response['message'] = 'Успех: Данные успешно добавлены в базу данных';
        } else {
            $response['success'] = false;
            $response['message'] = 'Ошибка выполнения запроса: ' . $stmt->error;
            error_log('Ошибка выполнения запроса: ' . $stmt->error);
        }
        $stmt->close();
    }
} else {
    $response['success'] = false;
    $response['message'] = 'Ошибка: Форма не была отправлена';
}

$conn->close();

echo json_encode($response);
?>
