const mqttLib = require("mqtt");
const url = process.env.MQTT_BROKER;
let client;
function ensure() {
  if (!url) return null;
  if (client && client.connected) return client;
  client = mqttLib.connect(url);
  return client;
}
async function publishDevice(id, action) {
  const c = ensure();
  if (!c) return false;
  const topic = `devices/${id}/set`;
  return new Promise((resolve) => {
    c.publish(topic, action, {}, (err) => resolve(!err));
  });
}
module.exports = { publishDevice };
