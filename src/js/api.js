const axios = require('axios');
const API_KEY = '24438145-b673a57932b34dc6f0a071866';
const BASE_URL = 'https://pixabay.com/api/?key=';
const FILTERS = '&image_type=photo&orientation=horizontal&safesearch=true';
const DEFAULT_PER_PAGE = 40;

export default async function getElements(name, page) {
  const item = await axios
    .get(`${BASE_URL}${API_KEY}&q=${name}${FILTERS}&page=${page}&per_page=${DEFAULT_PER_PAGE}`)
    .then(function (response) {
      console.log(response);
      return response;
    });

  return item;
}
