import { v2 as cloudinary } from 'cloudinary';

export const saveFileToCloudinary = async (buffer) => {
  // 1. Перенесли конфіг всередину функції!
  cloudinary.config({
    secure: true,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  // 2. Твої попередні налаштування
  const options = {
    folder: 'students-app/avatars',
    resource_type: 'image',
    transformation: [
      { width: 500, height: 500, crop: 'fill', gravity: 'auto' },
      { fetch_format: 'auto', quality: 'auto' },
    ],
  };

  // 3. Відправка стріму
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      },
    );

    uploadStream.end(buffer);
  });
};
