const axios = require('axios');

async function placePixel(x, y, color, canvas, accessToken) {
  const response = await axios({
    url: 'https://gql-realtime-2.reddit.com/query',
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'origin': 'https://hot-potato.reddit.com',
      'referer': 'https://hot-potato.reddit.com/',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:90.0) Gecko/20100101 Firefox/90.0',
      'apollographql-client-name': 'mona-lisa',
      'apollographql-client-version': '0.0.1',
      'authorization': `Bearer ${accessToken}`
    },
    data: {
      'operationName': 'setPixel',
      'query': "mutation setPixel($input: ActInput!) {\n  act(input: $input) {\n    data {\n      ... on BasicMessage {\n        id\n        data {\n          ... on GetUserCooldownResponseMessageData {\n            nextAvailablePixelTimestamp\n            __typename\n          }\n          ... on SetPixelResponseMessageData {\n            timestamp\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n",
      'variables': {
          'input': {
              'PixelMessageData': {'coordinate': {'x': x, 'y': y}, 'colorIndex': color, 'canvasIndex': canvas},
              'actionName': "r/replace:set_pixel"
          }
      }
    }
  })

  return response.data;
}

module.exports = {
  placePixel
};
