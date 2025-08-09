<!DOCTYPE html>
<html>
<head>
    <title>Đăng nhập</title>
</head>
<body>
    <h2>Đăng nhập</h2>
    <?php if (!empty($error)): ?>
        <p style="color:red"><?= htmlspecialchars($error) ?></p>
    <?php endif; ?>
    <form method="POST">
        <label>Tên đăng nhập:</label><br>
        <input type="text" name="username" required><br>

        <label>Mật khẩu:</label><br>
        <input type="password" name="password" required><br><br>

        <button type="submit">Đăng nhập</button>
    </form>
    <p><a href="index.php?controller=user&action=register">Chưa có tài khoản? Đăng ký</a></p>
</body>
</html>
