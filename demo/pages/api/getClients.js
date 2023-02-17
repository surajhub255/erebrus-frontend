import axios from "axios";

const getClients = async (req, res) => {
  let response;
  try {
    // Make a get request to your server
    response = await axios.get(`https://erebrus.lz1.in/api/v1.0/client`);
  } catch (error) {
    throw error;
  }
  return res.status(200).json(response.data);
};

export default getClients;
