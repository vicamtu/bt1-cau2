import { ethers } from 'ethers';
import * as readlineSync from 'readline-sync';
import * as dotenv from 'dotenv';

// Tải biến môi trường từ file .env
dotenv.config();

// ABI tối thiểu cho token ERC20
const ERC20_ABI = [
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function symbol() view returns (string)",
    "function name() view returns (string)"
];

// Hàm kiểm tra địa chỉ hợp lệ
function isValidAddress(address: string): boolean {
    try {
        return ethers.isAddress(address);
    } catch {
        return false;
    }
}

// Hàm chính để kiểm tra số dư
async function checkTokenBalance() {
    try {
        // Kiểm tra URL RPC
        const rpcUrl = process.env.RONIN_RPC_URL;
        if (!rpcUrl) {
            throw new Error('Không tìm thấy URL RPC trong file .env');
        }

        // Kết nối với mạng Ronin Saigon
        const provider = new ethers.JsonRpcProvider(rpcUrl);
        console.log('Đã kết nối với mạng Ronin Saigon');

        // Nhận địa chỉ ví từ người dùng
        const walletAddress = readlineSync.question('Nhập địa chỉ ví (bắt đầu bằng 0x): ');
        if (!isValidAddress(walletAddress)) {
            throw new Error('Địa chỉ ví không hợp lệ');
        }

        // Nhận địa chỉ hợp đồng token từ người dùng
        const contractAddress = readlineSync.question('Nhập địa chỉ hợp đồng token (bắt đầu bằng 0x): ');
        if (!isValidAddress(contractAddress)) {
            throw new Error('Địa chỉ hợp đồng không hợp lệ');
        }

        // Tạo instance của hợp đồng token
        const tokenContract = new ethers.Contract(contractAddress, ERC20_ABI, provider);

        // Lấy thông tin token
        const [name, symbol, decimals] = await Promise.all([
            tokenContract.name(),
            tokenContract.symbol(),
            tokenContract.decimals()
        ]);

        // Lấy số dư token
        const balance = await tokenContract.balanceOf(walletAddress);
        
        // Chuyển đổi số dư sang định dạng dễ đọc
        const formattedBalance = ethers.formatUnits(balance, decimals);

        // Hiển thị kết quả
        console.log('\nKết quả:');
        console.log('-------------------');
        console.log(`Token: ${name} (${symbol})`);
        console.log(`Địa chỉ ví: ${walletAddress}`);
        console.log(`Số dư: ${formattedBalance} ${symbol}`);
        console.log('-------------------');

    } catch (error) {
        if (error instanceof Error) {
            console.error('Lỗi:', error.message);
        } else {
            console.error('Đã xảy ra lỗi không xác định');
        }
    }
}

// Chạy chương trình
console.log('Chương trình kiểm tra số dư token ERC20 trên Ronin Saigon');
console.log('=====================================================\n');
checkTokenBalance(); 