import axios from 'axios';
const getShortestPath = async (from, to, busy) => {
  try {
    const response = await axios.post('http://localhost:5000/get-path', {
      from,
      to,
      busy,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching path:', error);
    return { path: [], distance: null };
  }
};

export default getShortestPath;
