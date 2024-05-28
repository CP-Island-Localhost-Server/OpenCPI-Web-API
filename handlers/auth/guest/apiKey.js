module.exports = (req, res) => {
  // TODO: Generate API key per IP address -- store in Redis + expire after period of time + add rate limiting

  res.setHeader(
    'api-key',
    'aqnA9p/GHYcMJnHGPld3WUYS6xVbbkaizQIgUOXxUTV1ty0kGcIvQkRHMBiO89jAF+h6Bp6jWCj0KDdy71nsYSAhDpDV/5Y9AYDhQ/2efdB5XCWilW5q2g=='
  );
  res.setHeader('Content-Type', 'application/json;charset=utf-8');
  res.send({ data: null, error: null });
};
