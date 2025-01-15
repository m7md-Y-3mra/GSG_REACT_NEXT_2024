import axios from 'axios';

const API_BASE_URL = 'https://api.aladhan.com/v1';
const OPENCAGE_API_KEY = 'your-api-key-here';

export const fetchPrayerTimesByCity = async (country, city) => {
  const response = await axios.get(`${API_BASE_URL}/timingsByCity`, {
    params: { country, city },
  });
  return response.data;
};

export const fetchLocationDetails = async (latitude, longitude) => {
  const response = await axios.get(
    `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${OPENCAGE_API_KEY}&language=en`
  );
  return response.data.results[0].components;
};
