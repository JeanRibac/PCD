const getReqBody = (req) => {
  return new Promise((resolve, reject) => {
    try {
      let body = '';
      req.on('data', (chunk) => body += chunk.toString());
      req.on('end', () => resolve(body));

    } catch (error) {
      reject(err);
    }
  })
}

const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
}

const return40X = (res, statusCode = 404) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  return res.end(JSON.stringify({ message: 'Route not found' }));
}

const return20X = (res, statusCode = 201, jsonData) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  return res.end(JSON.stringify(jsonData));
}

module.exports = { getReqBody, HTTP_METHODS, return40X, return20X };