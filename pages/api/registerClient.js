import axios from "axios";

const registerClient = async (req, res) => {
  let response;
  try {
    console.log(req.body);
    // Make a POST request to your server
    response = await axios.post(
      "https://erebrus.lz1.in/api/v1.0/client/",
      req.body
    );
  } catch (error) {
    throw error;
  }
  return res.status(200).json(response.data);
};

export default registerClient;
