<!DOCTYPE html>
<html>
<head>
    <title>Đăng ký</title>
</head>
<body>
    <h2>Đăng ký tài khoản</h2>
    <?php if (!empty($error)): ?>
        <p style="color:red"><?= htmlspecialchars($error) ?></p>
    <?php endif; ?>
    <form method="POST">
        <label>Họ tên:</label><br>
        <input type="text" name="full_name" required><br>

        <label>Email:</label><br>
        <input type="email" name="email" required><br>

        <label>Tên đăng nhập:</label><br>
        <input type="text" name="username" required><br>

        <label>Mật khẩu:</label><br>
        <input type="password" name="password" required><br><br>

        <button type="submit">Đăng ký</button>
    </form>
    <p><a href="index.php?controller=user&action=login">Đã có tài khoản? Đăng nhập</a></p>
</body>
</html>
