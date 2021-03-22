const http = require('http');

const { getCarList, getCar, postCar, putCar, deleteCar } = require('./controller');

const { HTTP_METHODS } = require('./util')

const api = '/api'

const server = http.createServer((req, res) => {
  if (req.url === `${api}/cars` && req.method === HTTP_METHODS.GET) {
    getCarList(req, res);
  } else if (req.url.match(/\/api\/car\/\w+/) && req.method === HTTP_METHODS.GET) {
    const [, , , id] = req.url.split('/');
    getCar(req, res, id);
  } else if (req.url === `${api}/cars` && req.method === HTTP_METHODS.POST) {
    postCar(req, res);
  } else if (req.url.match(/\/api\/car\/\w+/) && req.method === HTTP_METHODS.PUT) {
    const [, , , id] = req.url.split('/');
    putCar(req, res, id)
  } else if (req.url.match(/\/api\/car\/\w+/) && req.method === HTTP_METHODS.DELETE) {
    const [, , , id] = req.url.split('/')
    deleteCar(req, res, id)
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
})

const PORT = 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));