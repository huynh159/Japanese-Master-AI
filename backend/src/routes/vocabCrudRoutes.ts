import { Router, Request, Response } from 'express';
import { query } from '../db'; // Hàm thực thi SQL query vào PostgreSQL

const router = Router();

// ============================================================================
// 1. READ ALL - Lấy danh sách từ vựng (HTTP GET /api/vocab)
// ============================================================================
router.get('/', async (req: Request, res: Response) => {
  try {
    // Câu lệnh SQL lấy tất cả từ vựng sắp xếp theo thời gian tạo mới nhất
    const sql = 'SELECT * FROM vocab ORDER BY created_at DESC';
    const result = await query(sql);

    return res.json({
      success: true,
      total: result.rows.length,
      data: result.rows
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// ============================================================================
// 2. READ ONE - Lấy chi tiết 1 từ vựng theo ID (HTTP GET /api/vocab/:id)
// ============================================================================
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const sql = 'SELECT * FROM vocab WHERE id = $1'; // $1 tránh lỗi SQL Injection
    const result = await query(sql, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy từ vựng!' });
    }

    return res.json({ success: true, data: result.rows[0] });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// ============================================================================
// 3. CREATE - Thêm mới 1 từ vựng (HTTP POST /api/vocab)
// ============================================================================
router.post('/', async (req: Request, res: Response) => {
  try {
    // Lấy dữ liệu từ Frontend gửi lên trong Body (req.body)
    const { id, word, reading, romaji, hanViet, meanings, jlpt, type } = req.body;

    const sql = `
      INSERT INTO vocab (id, word, reading, romaji, han_viet, meanings, jlpt, type)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;
    const params = [id, word, reading, romaji, hanViet, meanings, jlpt || 'N5', type || 'Noun'];

    const result = await query(sql, params);

    return res.status(201).json({
      success: true,
      message: 'Thêm từ vựng mới thành công!',
      data: result.rows[0]
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// ============================================================================
// 4. UPDATE - Cập nhật thông tin từ vựng (HTTP PUT /api/vocab/:id)
// ============================================================================
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { word, reading, meanings, jlpt } = req.body;

    const sql = `
      UPDATE vocab
      SET word = $1, reading = $2, meanings = $3, jlpt = $4
      WHERE id = $5
      RETURNING *;
    `;
    const params = [word, reading, meanings, jlpt, id];

    const result = await query(sql, params);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Từ vựng không tồn tại để sửa!' });
    }

    return res.json({
      success: true,
      message: 'Cập nhật từ vựng thành công!',
      data: result.rows[0]
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// ============================================================================
// 5. DELETE - Xóa 1 từ vựng (HTTP DELETE /api/vocab/:id)
// ============================================================================
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const sql = 'DELETE FROM vocab WHERE id = $1 RETURNING *;';
    const result = await query(sql, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Từ vựng không tồn tại để xóa!' });
    }

    return res.json({
      success: true,
      message: 'Đã xóa từ vựng thành công!'
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
