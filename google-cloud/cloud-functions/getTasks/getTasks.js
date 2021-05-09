
const { Datastore } = require("@google-cloud/datastore");

const projectId = 'theta-totem-313112'
const keyFilename = 'theta-totem-313112-401e637712a9.json'

const datastore = new Datastore({ projectId, keyFilename });

const kind = 'Task';

const getTasks = async () => {
  const query = datastore.createQuery(kind)
  return datastore.runQuery(query);
};

exports.getTasks = async (req, res) => {
  const [entities] = await getTasks();
  res.set('Access-Control-Allow-Origin', 'https://europe-central2-theta-totem-313112.cloudfunctions.net/getTasks');
  return res.json(entities);
};