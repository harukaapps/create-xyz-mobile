import { useState } from 'react';

export const useUpload = () => {
  const [loading, setLoading] = useState(false);

  const upload = async ({ file }) => {
    try {
      setLoading(true);
      // FileReaderを使用してローカルでファイルを処理
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setLoading(false);
          resolve({ url: reader.result, error: null });
        };
        reader.readAsDataURL(file);
      });
    } catch (error) {
      setLoading(false);
      return { url: null, error: error.message };
    }
  };

  return [upload, { loading }];
};
