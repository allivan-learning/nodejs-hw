import multer from 'multer';
import createHttpError from 'http-errors';

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
  fileFilter: (req, file, cb) => {
    // Перевіряємо, чи починається mimetype з "image/"
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      // Викидаємо рівно ту помилку, яку просять у ТЗ
      cb(createHttpError(400, 'Only images allowed'), false);
    }
  },
});
