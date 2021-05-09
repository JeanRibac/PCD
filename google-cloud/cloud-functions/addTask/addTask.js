const { Datastore } = require("@google-cloud/datastore");
const uuid = require('uuid');

const projectId = 'theta-totem-313112'
const keyFilename = 'theta-totem-313112-401e637712a9.json'

const datastore = new Datastore({ projectId, keyFilename });

const kind = 'Task';

exports.addTask = (req, res) => {
  const { name, team } = req.query
  const id = uuid.v4();
  const key = datastore.key([kind, id]);
  const data = { id, name, team }
  const task = { key, data };

  datastore
    .save(task)
    .then(() => {
      console.log(`Saved ${task.key.name}: ${task.data.team}`);
    })
    .catch((err) => {
      console.error('ERROR:', err);
    });
};