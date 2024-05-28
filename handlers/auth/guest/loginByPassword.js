module.exports = (req, res) => {
  console.log('Login Body Incoming: ', req.body);

  const dataTest = {
    data: {
      etag: '',
      profile: {
        swid: 1,
        displayName: 'Test',
        parentEmail: 'test@test.com',
        firstName: 'Test',
        ageBand: 'CHILD',
        ageBandAssumed: true,
        countryCodeDetected: 'US',
        status: 'ACTIVE',
      },
      token: {
        access_token: '1',
        refresh_token: '1',
        swid: '1',
      },
    },
    error: null,
  };

  res.send(dataTest);
};
