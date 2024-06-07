const axios = require("axios");
const qs = require("qs");
const AppConfig = require("../config/config");

class GoogleAuthService {
  async getOAuthTokenFromGoogle(code) {
    // Get access token and id token from Google using code
    const rootUrl = "https://oauth2.googleapis.com/token";
    const options = {
      code,
      client_id: AppConfig.GOOGLE_OAUTH2_CLIENT_ID,
      client_secret: AppConfig.GOOGLE_OAUTH2_CLIENT_SECRET,
      redirect_uri: AppConfig.GOOGLE_OAUTH2_CLIENT_REDIRECT_URI,
      grant_type: "authorization_code"
    };

    try {
      const response = await axios.post(rootUrl, qs.stringify(options), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });

      console.log(response.data);

      return response.data;
    } catch (error) {
      throw new Error("Error while getting token from Google: " + error);
    }
  }

  async getUserInfoFromGoogle(idToken, accessToken) {
    // Get user info from Google using id token and access token
    try {
      const userInfo = await axios.get(
        `https://www.googleapis.com/oauth2/v3/userinfo?alt=json&access_token=${accessToken}`,
        {
          headers: {
            Authorization: `Bearer ${idToken}`
          }
        }
      );
      return userInfo.data;
    } catch (error) {
      throw new Error("Error while getting user info from Google: " + error);
    }
  }

  async getGoogleCode() {
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${
      AppConfig.GOOGLE_OAUTH2_CLIENT_ID
    }&redirect_uri=${encodeURIComponent(
      AppConfig.GOOGLE_OAUTH2_CLIENT_REDIRECT_URI
    )}&scope=profile email`;
    const response = await axios.get(authUrl);
    return response.data;
  }
}

const googleService = new GoogleAuthService();

module.exports = { googleService };
