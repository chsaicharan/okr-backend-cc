const axios = require("axios");

const googleAuth = async (req, res, next) => {
  try {
    const userDetails = {
      googleId: null,
      userName: "",
      email: "",
      profilePic: "",
    };
    const token = req.header("Authorization");
    console.log(token);
    axios
      .get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`)
      .then((res) => {
        userDetails.googleId = res.data.sub;
        userDetails.userName = res.data.name;
        userDetails.email = res.data.email;
        userDetails.profilePic = res.data.picture;
        console.log(userDetails);
        req.body.userDetails = userDetails;
        next();
      })
      .catch((e) => {
        res.status(400).send("Invalid Google Token");
      });
  } catch (e) {
    res.send(e);
  }
};

module.exports = googleAuth;
