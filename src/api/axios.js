import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust if needed
});
export default instance;
