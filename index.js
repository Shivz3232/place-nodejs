const dotenv = require('dotenv');
dotenv.config();

const { fetchAccessToken } = require('./util/fetchAccessToken');
const { placePixel } = require('./util/placePixel');

const username = process.env.REDDIT_USERNAME;
const password = process.env.REDDIT_PASSWORD;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

async function place() {
  const accessToken = await fetchAccessToken(username, password, clientId, clientSecret);

  if (!accessToken) return;

  const data = await placePixel(821, 755, 3, 1, accessToken);

  if (data.errors) {
    return data.errors;
  } else {
    return data.data.act.data;
  }
}

Promise.resolve(place()).then(console.log).catch(console.error);
