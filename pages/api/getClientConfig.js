import axios from "axios";

const getClientConfig = async (req, res) => {
  const { query } = req;
  console.log(query);
  const UUID = query.UUID;
  let response;
  try {
    // Make a get request to your server
    response = await axios.get(
      `https://erebrus.lz1.in/api/v1.0/client/${UUID}/config`
    );
  } catch (error) {
    throw error;
  }
  return res.status(200).json(response.data);
};

export default getClientConfig;
