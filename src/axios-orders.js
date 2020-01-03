import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sandys-91c8c.firebaseio.com/'
})

export default instance;