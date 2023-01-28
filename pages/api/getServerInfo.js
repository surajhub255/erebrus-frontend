import axios from "axios";

const getServerInfo = async (req, res) => {
  let response;
  try {
    // Make a get request to your server
    response = await axios.get(`https://erebrus.lz1.in/api/v1.0/server`);
  } catch (error) {
    throw error;
  }
  return res.status(200).json(response.data);
};

export default getServerInfo;
