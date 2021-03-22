const { getReqBody, return40X, return20X } = require('./util');

const { findCarList, findCarById, addCar, updateCar, removeCar } = require('./service');

const getCarList = async (_req, res) => {
  try {
    const carList = await findCarList();
    return20X(res, 200, carList)
  } catch (error) {
    console.log(error.message);
  }
}

const getCar = async (_req, res, id) => {
  try {
    const car = await findCarById(id);
    if (!car) {
      return return40X(res, 404)
    }
    return20X(res, 200, car)
  } catch (error) {
    console.log(error);
  }
}

const postCar = async (req, res) => {
  try {
    const body = await getReqBody(req);
    const parsedBody = JSON.parse(body);
    const newCar = await addCar(parsedBody);

    return20X(res, 201, newCar)
  } catch (error) {
    console.log(error);
  }
}

const putCar = async (req, res, id) => {
  try {
    const car = await findCarById(id);

    if (!car) {
      return return40X(res, 404)
    }

    const body = await getReqBody(req);
    const parsedBody = JSON.parse(body);
    const carToUpdate = {
      name: parsedBody.name ?? car.name,
      price: parsedBody.price ?? car.price,
    }

    const updatedCar = await updateCar(id, carToUpdate);

    return20X(res, 200, updatedCar)
  } catch (error) {
    console.log(error.message);
  }
}

const deleteCar = async (_req, res, id) => {
  try {
    const car = await findCarById(id);

    if (!car) {
      return return40X(res, 404)
    }

    const newCarData = await removeCar(id);
    return return20X(res, 200, { message: `Car with id ${id} removed`, carList: newCarData })
  } catch (error) {
    console.log(error);
  }
}


module.exports = {
  getCarList,
  getCar,
  postCar,
  putCar,
  deleteCar,
}