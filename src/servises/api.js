import axios from 'axios';

const API_KEY = '39036694-0bc3df040973ee01ad3dc4693';

export const fetchPhoto = async (query, page) => {
  try {
    const { data } = await axios.get('https://pixabay.com/api/', {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: 12,
      },
    });
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
