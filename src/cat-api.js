import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_NRhFbX2RX8DJRpSiGeMIZ4UoukAQyUgUN5FPeOESVv0XTQFFLPD0pTRrw8aH2mbW';

const apiKey =
  'live_NRhFbX2RX8DJRpSiGeMIZ4UoukAQyUgUN5FPeOESVv0XTQFFLPD0pTRrw8aH2mbW';

const fetchBreeds = () => {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error('Error fetching data from API:', error);
      throw error;
    });
};
const fetchCatByBreed = breedId => {
  return axios
    .get(
      `https://api.thecatapi.com/v1/images/search?api_key=${apiKey}&breed_ids=${breedId}`
    )
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error('Error fetching data from API:', error);
      throw error;
    });
};

export { fetchBreeds, fetchCatByBreed };
