import axios from "../axios.js";
export const getMyCargo = async (req, res) => {
  try {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: "2MU6H9PLKNH000003122",
      },
    };
    await axios
      .get("/proposals/my/cargoes/published?language=uk", config)
      .then((response) => {
        console.log(response);
        res.json(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Error",
    });
  }
};
