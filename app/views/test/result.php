<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Kết quả gợi ý ngành</title>
</head>
<body>
<h2>Kết quả gợi ý ngành</h2>

<?php if (empty($result)): ?>
    <p>Không có gợi ý. Vui lòng làm lại bài test.</p>
<?php else: ?>
    <ol>
        <?php foreach ($result as $r): ?>
            <li>
                <strong><?= htmlspecialchars($r['name']) ?> (<?= htmlspecialchars($r['code']) ?>)</strong>
                — Điểm phù hợp: <?= htmlspecialchars($r['score']) ?>
                <?php if (!empty($r['major_id'])): ?>
                    &nbsp;|&nbsp; <a href="index.php?controller=major&action=detail&id=<?= intval($r['major_id']) ?>">Xem chi tiết ngành</a>
                <?php endif; ?>
            </li>
        <?php endforeach; ?>
    </ol>
    <p>Gợi ý hàng đầu đã được lưu vào lịch sử tư vấn của bạn.</p>
<?php endif; ?>

<p><a href="index.php">Về trang chủ</a></p>
</body>
</html>
