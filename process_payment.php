<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['full_name'];
    $email = $_POST['email'];
    $tracking = "TRK-" . rand(100000, 999999);

    $subject = "تأكيد طلبك من متجر الشاي الفاخر";
    $message = "عزيزي $name،\n\nشكرًا لطلبك!\nكود تتبع طلبك: $tracking\nسنقوم بشحن الطلب قريبًا.\n\nمع تحياتنا - متجر الشاي الفاخر";
    $headers = "From: store@example.com";

    // إرسال الإيميل
    mail($email, $subject, $message, $headers);

    // توجيه للصفحة النهائية
    header("Location: order-confirmation.html");
    exit;
}
?>
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['full_name'];
    $email = $_POST['email'];
    $tracking = "TRK-" . rand(100000, 999999);

    $subject = "تأكيد طلبك من متجر الشاي الفاخر";
    $message = "عزيزي $name،\n\nشكرًا لطلبك!\nكود تتبع طلبك: $tracking\nسنقوم بشحن الطلب قريبًا.\n\nمع تحياتنا - متجر الشاي الفاخر";
    $headers = "From: store@example.com";

    // إرسال الإيميل
    mail($email, $subject, $message, $headers);

    // توجيه للصفحة النهائية
    header("Location: order-confirmation.html");
    exit;
}
?>