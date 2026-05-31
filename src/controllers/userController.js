import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

// export const updateUserAvatar = async (req, res) => {
//   const { file, user } = req;

//   if (!file) {
//     throw createHttpError(400, 'No file');
//   }

//   const result = await saveFileToCloudinary(file.buffer);

//   const updatedUser = await User.findOneAndUpdate(
//     { _id: user._id },
//     { avatar: result.secure_url },
//     { returnDocument: 'after' }, // або { new: true }
//   );

//   res.status(200).json({
//     url: updatedUser.avatar,
//   });
// };
export const updateUserAvatar = async (req, res, next) => {
  try {
    const { file, user } = req;

    if (!file) {
      throw createHttpError(400, 'No file');
    }

    console.log('👉 1. Файл отримано. Користувач з токена:', user?._id);

    const result = await saveFileToCloudinary(file.buffer);
    console.log('👉 2. Успішно завантажено в Cloudinary:', result.secure_url);

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { avatar: result.secure_url },
      { returnDocument: 'after' },
    );

    res.status(200).json({ url: updatedUser.avatar });
  } catch (error) {
    console.error('🚨 СПРАВЖНЯ ПОМИЛКА:', error);
    throw error; // Прокидаємо далі для ctrlWrapper
  }
};