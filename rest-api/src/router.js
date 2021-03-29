const { getCarList, getCar, postCar, putCar, deleteCar } = require('./controller');
const { HTTP_METHODS: { GET, POST, PUT, DELETE }, return40X } = require('./util')

const router = (req, res) => {
  const { url, method } = req;
  const api = '/api'
  const carRegex = RegExp(/\/api\/car\/\w+/);

  const dict = {
    [GET]: () => {
      if (url === `${api}/cars`) {
        return getCarList(req, res)
      }
      if (url.match(carRegex)) {
        const [, , , id] = url.split('/');
        return getCar(req, res, id);
      }
    },
    [POST]: () => {
      if (url === `${api}/cars`) {
        return postCar(req, res);
      }
    },
    [PUT]: () => {
      if (url.match(carRegex)) {
        const [, , , id] = url.split('/');
        return putCar(req, res, id)
      }
    },
    [DELETE]: () => {
      if (url.match(carRegex)) {
        const [, , , id] = url.split('/')
        return deleteCar(req, res, id)
      }
    },
    // PATCH
  }

  if (dict[method] === undefined) {
    return return40X(res, 404);
  }

  return dict[method]();
}

module.exports = { router }