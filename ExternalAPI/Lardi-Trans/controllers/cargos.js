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
export const repeatMyCargo = async (req, res) => {
  console.log(req.body);
  try {
    const config = {
      headers: {
        Authorization: "2MU6H9PLKNH000003122",
        Accept: "application / json",
        "Content-Type": "application/json",
      },
    };
    await axios
      .post("/proposals/my/repeat", config, req.body)
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
