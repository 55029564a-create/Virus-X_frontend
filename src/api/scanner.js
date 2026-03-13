import axios from "axios";

export const scanMalware = async (file) => {
    const formData = new FormData();

    formData.append('file', file);

    const response = await axios.post('/api/scan', formData, {
        headers:{
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
}