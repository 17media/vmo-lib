import axios from 'axios';

export const bark = () => {
  console.log('bark !');
  return axios.get('http://google.com');
};

export default bark;
