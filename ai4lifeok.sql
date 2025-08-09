-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 09, 2025 at 02:39 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ai4lifeok`
--

-- --------------------------------------------------------

--
-- Table structure for table `curriculum`
--

CREATE TABLE `curriculum` (
  `subject_id` int NOT NULL,
  `major_id` int NOT NULL,
  `semester` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `credits` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `curriculum`
--

INSERT INTO `curriculum` (`subject_id`, `major_id`, `semester`, `code`, `name`, `credits`) VALUES
(1, 1, 'ky1', 'MUL116', 'Nhập môn đồ họa', 2),
(2, 1, 'ky1', 'MUL1013', 'Thiết kế hình ảnh với Photoshop', 3),
(3, 1, 'ky2', 'MUL1024', 'Thiết kế minh họa với Illustrator', 3),
(4, 1, 'ky2', 'MUL1143', 'Luật xa gần và bố cục', 3),
(5, 1, 'ky3', 'MUL2133', 'Nghệ thuật chữ', 3),
(6, 1, 'ky3', 'MUL2123', 'Thiết kế bao bì', 3),
(7, 1, 'ky4', 'MUL117', 'Kỹ thuật nhiếp ảnh', 3),
(8, 1, 'ky4', 'MUL217', 'Ý tưởng sáng tạo', 3),
(9, 1, 'ky5', 'MUL3211', 'Hiệu ứng kỹ xảo với Adobe After Effect', 3),
(10, 1, 'ky5', 'MUL2241', 'Quay và dựng phim với Adobe Premiere', 3),
(11, 1, 'hoc_songsong', 'PRO223', 'Dự án tốt nghiệp', 5),
(12, 1, 'hoc_songsong', 'PRO119', 'Thực tập tốt nghiệp', 2),
(13, 2, 'ky1', 'PDP102', 'Kỹ năng học tập', 2),
(14, 2, 'ky1', 'COM1071', 'Tin học', 3),
(15, 2, 'ky2', 'NET101', 'Lập trình C# 1', 3),
(16, 2, 'ky2', 'GAM104', 'Nhập môn lập trình Game', 3),
(17, 2, 'ky3', 'GAM109', 'Lập trình C# 2 cho Unity', 3),
(18, 2, 'ky3', 'GAM110', 'Cơ sở dữ liệu cho Game', 3),
(19, 2, 'ky4', 'GAM301', 'Xây dựng kịch bản Game', 3),
(20, 2, 'ky4', 'WEB1013', 'Xây dựng trang Web', 3),
(21, 2, 'ky5', 'GAM302', 'Chuyên đề Game Online', 3),
(22, 2, 'ky5', 'PRO230', 'Dự án tốt nghiệp Game', 5),
(23, 2, 'hoc_songsong', 'PRO143', 'Thực tập tốt nghiệp Game', 3),
(24, 3, 'ky1', 'MKT101', 'Nguyên lý Marketing', 3),
(25, 3, 'ky1', 'COM1071', 'Tin học', 3),
(26, 3, 'ky2', 'MKT201', 'Marketing kỹ thuật số', 3),
(27, 3, 'ky2', 'COM203', 'Thiết kế nội dung đa phương tiện', 3),
(28, 3, 'ky3', 'MKT301', 'SEO và SEM', 3),
(29, 3, 'ky3', 'MKT302', 'Quản trị mạng xã hội', 3),
(30, 3, 'ky4', 'MKT401', 'Phân tích dữ liệu Marketing', 3),
(31, 3, 'ky4', 'MKT402', 'Chiến lược truyền thông', 3),
(32, 3, 'ky5', 'MKT501', 'Dự án Marketing', 5),
(33, 4, 'ky1', 'MEC101', 'Vẽ kỹ thuật', 3),
(34, 4, 'ky1', 'MEC102', 'Cơ học đại cương', 3),
(35, 4, 'ky2', 'MEC201', 'Nguyên lý máy', 3),
(36, 4, 'ky2', 'MEC202', 'Dung sai và Kỹ thuật đo lường', 3),
(37, 4, 'ky3', 'MEC301', 'Công nghệ chế tạo máy', 3),
(38, 4, 'ky3', 'MEC302', 'Gia công CNC', 3),
(39, 4, 'ky4', 'MEC401', 'Thiết kế chi tiết máy', 3),
(40, 4, 'ky4', 'MEC402', 'Quản lý sản xuất', 3),
(41, 4, 'ky5', 'MEC501', 'Dự án tốt nghiệp Cơ khí', 5);

-- --------------------------------------------------------

--
-- Table structure for table `majors`
--

CREATE TABLE `majors` (
  `major_id` int NOT NULL,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `majors`
--

INSERT INTO `majors` (`major_id`, `code`, `name`) VALUES
(1, 'TKDH', 'Thiết kế đồ họa'),
(2, 'CNTT-GAME', 'Công nghệ thông tin - Lập trình Game'),
(3, 'DMKT', 'Digital Marketing'),
(4, 'CKCTM', 'Cơ khí chế tạo máy');

-- --------------------------------------------------------

--
-- Table structure for table `skills`
--

CREATE TABLE `skills` (
  `skill_id` int NOT NULL,
  `major_id` int NOT NULL,
  `skill` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `skills`
--

INSERT INTO `skills` (`skill_id`, `major_id`, `skill`) VALUES
(1, 1, 'Sử dụng thành thạo Photoshop, Illustrator'),
(2, 1, 'Tư duy thị giác và bố cục'),
(3, 1, 'Kỹ năng nhiếp ảnh và chỉnh sửa hình ảnh'),
(4, 1, 'Thiết kế bao bì, ấn phẩm truyền thông'),
(5, 1, 'Sản xuất và biên tập video cơ bản'),
(6, 1, 'Sáng tạo ý tưởng thiết kế'),
(7, 2, 'Lập trình C#, C++'),
(8, 2, 'Phát triển game 2D và 3D'),
(9, 2, 'Thiết kế và triển khai cơ sở dữ liệu cho game'),
(10, 2, 'Sử dụng Unity và các engine game'),
(11, 2, 'Quản lý dự án phát triển game'),
(12, 2, 'Kiểm thử và tối ưu hóa game'),
(13, 3, 'Chiến lược tiếp thị số'),
(14, 3, 'Quảng cáo Google Ads và Facebook Ads'),
(15, 3, 'Phân tích dữ liệu Marketing'),
(16, 3, 'SEO và tối ưu hóa nội dung'),
(17, 3, 'Quản trị mạng xã hội'),
(18, 3, 'Sáng tạo nội dung truyền thông'),
(19, 4, 'Vận hành và bảo trì máy móc'),
(20, 4, 'Thiết kế cơ khí 2D/3D bằng AutoCAD, SolidWorks'),
(21, 4, 'Gia công CNC'),
(22, 4, 'Đọc và phân tích bản vẽ kỹ thuật'),
(23, 4, 'Quản lý sản xuất'),
(24, 4, 'Kiểm tra và đảm bảo chất lượng sản phẩm');

-- --------------------------------------------------------

--
-- Table structure for table `usermajorchoice`
--

CREATE TABLE `usermajorchoice` (
  `choice_id` int NOT NULL,
  `user_id` int NOT NULL,
  `major_id` int NOT NULL,
  `test_score` decimal(5,2) DEFAULT NULL,
  `chosen_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `usermajorchoice`
--

INSERT INTO `usermajorchoice` (`choice_id`, `user_id`, `major_id`, `test_score`, `chosen_at`) VALUES
(1, 1, 2, '85.50', '2025-08-09 02:36:58'),
(2, 2, 3, '78.00', '2025-08-09 02:36:58'),
(3, 1, 1, '60.00', '2025-08-09 02:36:58');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int NOT NULL,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `full_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` enum('student','admin') COLLATE utf8mb4_unicode_ci DEFAULT 'student',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password_hash`, `full_name`, `email`, `role`, `created_at`) VALUES
(1, 'nguyenvana', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Nguyễn Văn A', 'vana@example.com', 'student', '2025-08-09 02:36:58'),
(2, 'tranthib', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Trần Thị B', 'thib@example.com', 'student', '2025-08-09 02:36:58'),
(3, 'admin01', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', 'Quản trị viên', 'admin@example.com', 'admin', '2025-08-09 02:36:58');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `curriculum`
--
ALTER TABLE `curriculum`
  ADD PRIMARY KEY (`subject_id`),
  ADD KEY `major_id` (`major_id`);

--
-- Indexes for table `majors`
--
ALTER TABLE `majors`
  ADD PRIMARY KEY (`major_id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- Indexes for table `skills`
--
ALTER TABLE `skills`
  ADD PRIMARY KEY (`skill_id`),
  ADD KEY `major_id` (`major_id`);

--
-- Indexes for table `usermajorchoice`
--
ALTER TABLE `usermajorchoice`
  ADD PRIMARY KEY (`choice_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `major_id` (`major_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `curriculum`
--
ALTER TABLE `curriculum`
  MODIFY `subject_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `majors`
--
ALTER TABLE `majors`
  MODIFY `major_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `skills`
--
ALTER TABLE `skills`
  MODIFY `skill_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `usermajorchoice`
--
ALTER TABLE `usermajorchoice`
  MODIFY `choice_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `curriculum`
--
ALTER TABLE `curriculum`
  ADD CONSTRAINT `curriculum_ibfk_1` FOREIGN KEY (`major_id`) REFERENCES `majors` (`major_id`) ON DELETE CASCADE;

--
-- Constraints for table `skills`
--
ALTER TABLE `skills`
  ADD CONSTRAINT `skills_ibfk_1` FOREIGN KEY (`major_id`) REFERENCES `majors` (`major_id`) ON DELETE CASCADE;

--
-- Constraints for table `usermajorchoice`
--
ALTER TABLE `usermajorchoice`
  ADD CONSTRAINT `usermajorchoice_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `usermajorchoice_ibfk_2` FOREIGN KEY (`major_id`) REFERENCES `majors` (`major_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
