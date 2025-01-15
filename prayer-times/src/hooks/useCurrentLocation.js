import { useEffect } from 'react';
import axios from 'axios';

export const useCurrentLocation = (useCurrentLocation, setSelectedCountry, setSelectedCity) => {
  useEffect(() => {
    if (useCurrentLocation) {
      const fetchLocation = async () => {
        try {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const locationDetails = await fetchLocationDetails(latitude, longitude);
            const country = locationDetails.country_code;
            const city = locationDetails.city || locationDetails.town || locationDetails.village;

            setSelectedCountry(country);
            setSelectedCity(city);
          });
        } catch (error) {
          console.error("Error fetching location:", error);
        }
      };

      fetchLocation();
    }
  }, [useCurrentLocation, setSelectedCountry, setSelectedCity]);
};

const fetchLocationDetails = async (latitude, longitude) => {
  const OPENCAGE_API_KEY = 'your-api-key-here'; // Replace with your actual OpenCage API key
  const response = await axios.get(
    `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${OPENCAGE_API_KEY}&language=en`
  );
  return response.data.results[0].components;
};
