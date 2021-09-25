import axios from 'axios';

export const getCreator = async (id) => {
  const { data } = await axios.get(`http://localhost:4200/creator/${id}`);
  return data;
};
