<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Bài test chọn ngành</title>
</head>
<body>
<h2>Bài test gợi ý ngành học</h2>

<?php
session_start();
if (!isset($_SESSION['user'])) {
    echo '<p>Bạn cần <a href="index.php?controller=user&action=login">đăng nhập</a> để làm bài test.</p>';
    // Nếu bạn muốn cho khách làm test không đăng nhập, có thể bỏ check này
}
?>

<form method="POST" action="index.php?controller=test&action=submit">
    <?php foreach ($questions as $q): ?>
        <div style="margin-bottom:18px;">
            <strong><?= htmlspecialchars($q['question_text']) ?></strong><br>
            <?php foreach ($q['answers'] as $ans): ?>
                <label>
                    <input type="radio" name="answers[<?= $q['question_id'] ?>]" value="<?= $ans['answer_id'] ?>" required>
                    <?= htmlspecialchars($ans['answer_text']) ?>
                </label><br>
            <?php endforeach; ?>
        </div>
    <?php endforeach; ?>

    <button type="submit">Gửi đáp án</button>
</form>
</body>
</html>
