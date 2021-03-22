const { v4: uuidv4 } = require('uuid');

let carData = require('./data.json');

const findCarList = () => new Promise((resolve, _reject) => resolve(carData))

const findCarById = (id) => {
  return new Promise((resolve, _reject) => {
    const car = carData.find(f => f.id === id);
    resolve(car);
  })
}

const addCar = ({ name, price }) => {
  return new Promise((resolve, _reject) => {
    const newCar = { id: uuidv4(), name, price };
    carData.push(newCar);
    resolve(newCar);
  });
}

const updateCar = async (id, car) => {
  return new Promise((resolve, _reject) => {
    const index = carData.findIndex(f => f.id === id);
    carData[index] = { id, ...car };
    resolve(carData[index]);
  });
}

const removeCar = (id) => {
  return new Promise((resolve, _reject) => {
    carData = carData.filter(f => f.id !== id);
    resolve(carData);
  });
}

module.exports = {
  findCarList,
  findCarById,
  addCar,
  updateCar,
  removeCar
}