# Chương Trình Kiểm Tra Số Dư Token ERC20 trên Ronin Saigon

Đây là một chương trình đơn giản được viết bằng TypeScript để kiểm tra số dư của Token ERC20 trên mạng Ronin Saigon. Chương trình này tương tác trực tiếp với blockchain mà không cần thông qua API bên ngoài.

## Yêu Cầu Hệ Thống

- Node.js (phiên bản 14.0.0 trở lên)
- npm (Node Package Manager)

## Cài Đặt

1. Tải và cài đặt [Node.js](https://nodejs.org/)

2. Clone hoặc tải về dự án này

3. Mở terminal trong thư mục dự án và cài đặt các thư viện cần thiết:
   ```bash
   npm install
   ```

4. Tạo file `.env` trong thư mục gốc của dự án với nội dung sau:
   ```
   RONIN_RPC_URL=https://saigon-testnet.roninchain.com/rpc
   ```

## Cách Sử Dụng

1. Biên dịch mã nguồn TypeScript:
   ```bash
   npm run build
   ```

2. Chạy chương trình:
   ```bash
   npm start
   ```

3. Làm theo hướng dẫn trên màn hình:
   - Nhập địa chỉ ví (wallet address)
   - Nhập địa chỉ hợp đồng token ERC20 (contract address)

## Giải Thích Mã Nguồn

Chương trình được chia thành các phần chính:

1. **Kết nối blockchain:**
   - Sử dụng thư viện ethers.js để kết nối với mạng Ronin Saigon
   - URL RPC được lấy từ file .env

2. **Kiểm tra địa chỉ:**
   - Hàm `isValidAddress()` kiểm tra tính hợp lệ của địa chỉ ví và hợp đồng
   - Địa chỉ phải bắt đầu bằng '0x' và đúng định dạng

3. **Tương tác với hợp đồng thông minh:**
   - Sử dụng ABI (Application Binary Interface) của ERC20 để gọi các hàm:
     - `name()`: lấy tên token
     - `symbol()`: lấy ký hiệu token
     - `decimals()`: lấy số thập phân của token
     - `balanceOf()`: lấy số dư token

4. **Xử lý và hiển thị kết quả:**
   - Chuyển đổi số dư từ dạng số nguyên lớn sang số thập phân dễ đọc
   - Hiển thị thông tin token và số dư

5. **Xử lý lỗi:**
   - Bắt và hiển thị các lỗi như:
     - Không tìm thấy URL RPC
     - Địa chỉ không hợp lệ
     - Lỗi kết nối blockchain
     - Lỗi hợp đồng thông minh

## Lưu Ý

- Đảm bảo bạn có kết nối internet ổn định
- Địa chỉ ví và hợp đồng phải chính xác và tồn tại trên mạng Ronin Saigon
- Nếu gặp lỗi, hãy kiểm tra:
  - File .env đã được tạo đúng chưa
  - Địa chỉ nhập vào có đúng định dạng không
  - Kết nối internet có ổn định không