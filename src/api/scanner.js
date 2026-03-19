import api from './axios';

export const scanMalware = async (payload, type) => {
  try {
    if (type === 'file') {
      const formData = new FormData();
      formData.append('file', payload);

      // if (userId) {
      //   formData.append('user_id', userId);
      // }

      const response = await api.post('/api/scan/file', formData);
      return response.data;
    }

    if (type === 'url') {
      const response = await api.post('/api/scan/url', {
        url: payload,
        // user_id: userId,
      });

      return response.data;
    }

    throw new Error(`지원하지 않는 검사 유형입니다: ${type}`);
  } catch (error) {
    console.error('API 통신 에러:', error);
    throw error;
  }
};
