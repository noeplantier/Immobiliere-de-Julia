import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.scss';

type ImgPickerProps = {
  url: string;
  setUrl: (url: string) => void;
};
function ImgPicker({ url, setUrl }: ImgPickerProps) {
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(null);
      setImage(e.target.files[0]);
    }
  };

  useEffect(() => {
    const handleUpload = async () => {
      if (image) {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'ml_default');
        // `public_id` et `api_key` ne sont pas nécessaires dans le formData pour Cloudinary.

        try {
          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/dpot9ojgo/image/upload`,
            formData
          );
          setUrl(response.data.secure_url);
        } catch (error) {
          console.error(
            'Error uploading the image',
            error.response?.data || error.message
          );
        }
      }
    };

    handleUpload();

    return () => {
      setImage(null);
    };
  }, [image]);
  console.log(url);
  return (
    <div className="image-picker">
      <input type="file" onChange={handleImageChange} />
      {url && (
        <div>
          <h3>image uploaded</h3>
        </div>
      )}
    </div>
  );
}

export default ImgPicker;
