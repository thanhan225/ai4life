# AI Tư Vấn Ngành Học - FPT Polytechnic

Ứng dụng web tích hợp AI để tư vấn ngành học phù hợp cho học sinh FPT Polytechnic.

## 🚀 Tính năng chính

### ✅ Chức năng bắt buộc:
1. **Thu thập thông tin người dùng**: Sở thích, kỹ năng, điểm số, môn học yêu thích, định hướng nghề nghiệp, thói quen học tập
2. **Phân tích & tư vấn ngành học**: Sử dụng AI (Google Gemma 3) để phân tích và đưa ra khuyến nghị
3. **Lưu trữ kết quả**: Lưu trữ lịch sử tư vấn trong localStorage

### 🎯 Chức năng nâng cao:
1. **Infographic cá nhân**: Biểu đồ radar hiển thị kỹ năng cá nhân
2. **Thống kê ngành học**: Biểu đồ cột thống kê ngành học được quan tâm
3. **Chia sẻ QR Code**: Tạo QR code để chia sẻ kết quả

## 🛠️ Công nghệ sử dụng

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **AI API**: OpenRouter với model Google Gemma 3
- **Biểu đồ**: Chart.js
- **QR Code**: QR Server API
- **Lưu trữ**: LocalStorage

## 📁 Cấu trúc file

```
ALT/
├── index.html          # Trang web chính
├── script.js           # Logic JavaScript
├── majors_curriculum.json  # Dữ liệu ngành học
└── README.md           # Hướng dẫn sử dụng
```

## 🚀 Cách sử dụng

1. **Mở file `index.html`** trong trình duyệt web
2. **Điền thông tin cá nhân**:
   - Họ và tên
   - Sở thích
   - Kỹ năng/Tố chất
   - Môn học yêu thích
   - Định hướng nghề nghiệp
   - Thói quen học tập
   - Đánh giá các kỹ năng (1-5 điểm)

3. **Nhấn "Tư Vấn Ngành Học"** để nhận kết quả

4. **Xem kết quả**:
   - Ngành học được khuyến nghị
   - Biểu đồ kỹ năng cá nhân
   - QR code để chia sẻ
   - Thống kê tổng quan

## 🎨 Giao diện

- **Thiết kế responsive**: Tương thích với mọi thiết bị
- **Gradient background**: Giao diện hiện đại với gradient tím-xanh
- **Animation**: Hiệu ứng hover và transition mượt mà
- **Loading state**: Hiển thị trạng thái đang xử lý
- **Error handling**: Xử lý lỗi và thông báo rõ ràng

## 🔧 Cấu hình AI



## 📊 Danh sách ngành học FPT Polytechnic

- Công nghệ thông tin
- Kỹ thuật phần mềm
- An toàn thông tin
- Thiết kế đồ họa
- Quản trị kinh doanh
- Marketing
- Tài chính - Ngân hàng
- Kế toán
- Du lịch - Khách sạn
- Ngôn ngữ Anh
- Ngôn ngữ Nhật
- Ngôn ngữ Hàn Quốc
- Công nghệ thực phẩm
- Công nghệ sinh học
- Điện tử - Viễn thông
- Cơ điện tử
- Xây dựng
- Kiến trúc

## 🎯 Prompt AI

AI sẽ phân tích thông tin và trả về kết quả theo format:
1. **NGÀNH HỌC PHÙ HỢP NHẤT**: [Tên ngành]
2. **LÝ DO**: [Giải thích ngắn gọn]
3. **KỸ NĂNG CẦN CẢI THIỆN**: [Liệt kê 2-3 kỹ năng]
4. **MÔN HỌC NÊN TẬP TRUNG**: [Liệt kê 2-3 môn học]
5. **ĐIỂM MẠNH**: [Liệt kê 2-3 điểm mạnh]

## 🔒 Bảo mật

- API key được lưu trữ trong client-side (chỉ dành cho demo)
- Dữ liệu được lưu trong localStorage của trình duyệt
- Không có server-side processing

## 🚀 Triển khai

Để triển khai lên web server:

1. Upload tất cả file lên web server
2. Đảm bảo HTTPS để bảo mật API calls
3. Cấu hình CORS nếu cần thiết

## 📝 Lưu ý

- Ứng dụng hoạt động offline sau khi load lần đầu
- Dữ liệu được lưu trong localStorage của trình duyệt
- API calls có thể mất vài giây để xử lý
- QR code được tạo thông qua external API

## 🎉 Kết quả mong đợi

Ứng dụng sẽ giúp học sinh:
- Hiểu rõ hơn về bản thân và kỹ năng
- Nhận được tư vấn ngành học phù hợp
- Có định hướng rõ ràng cho tương lai
- Chia sẻ kết quả với bạn bè và gia đình
