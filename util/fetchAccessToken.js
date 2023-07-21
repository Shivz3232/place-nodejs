const axios = require('axios');
const url = require("url");

async function fetchAccessToken(username, password, clientId, clientSecret) {
  const authData = {
      grant_type: "password",
      username: username,
      password: password,
  };

  const params = new url.URLSearchParams(authData);

  const response = await axios({
    url: 'https://www.reddit.com/api/v1/access_token',
    method: 'POST',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:90.0) Gecko/20100101 Firefox/90.0',
      'authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
    },
    params: params
  })

  if (!response.data.access_token) {
    console.log(response.data.error);
    return;
  }

  return response.data.access_token;
}

module.exports = {
  fetchAccessToken
};
