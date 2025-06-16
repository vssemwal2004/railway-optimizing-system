const axios = require('axios');

const ESP8266_IP = '172.20.10.2'

async function sendPathToESP(path) {
  try {
    const response = await axios.post(`http://${ESP8266_IP}/path`, {
      path: path
    });
    console.log('ESP8266 Response:', response.data);
  } catch (error) {
    console.error('Error sending data to ESP8266:', error.message);
  }
}

module.exports = { sendPathToESP };
