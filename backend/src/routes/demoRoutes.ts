import { Router, Request, Response } from 'express';
// Khởi tạo Express Router 
const router = Router();
//1. API get đơn giải nhất 
// http:/localhost:5000/api/demo/hello

router.get('/hello', (req: Request, res: Response) => {
    // res.json() sẽ tự động chuyển object thành dạng json để gửi cho người dùng
    return res.json({
        success: true,
        message: ' Chúc mừng bạn đã gọi thành công API đầu tiên của mình',
        timestamp: new Date().toLocaleString('vi-VN')
    });

});
// 2.API Post nhận dữ liệu gửi lên 
// http://localhost:5000/api/demo/xin-chao
router.post('/xin-chao', (req: Request, res: Response) => {
    // lấy giá trị 'tên' từ người dùng gửi lên trong body
    const { ten } = req.body;
    if (!ten) {
        return res.status(400).json({
            success: false,
            message: 'Vui lòng cung cấp tên của bạn!'
        });
    }
    return res.json({
        success: true,
        message: `xin chào ${ten}! rất vui được ngấc ngấc học viết API`
    });

});
export default router;