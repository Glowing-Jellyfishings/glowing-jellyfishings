const axios = require('axios');

exports.handleCallback = async (req, res) => {
  const { code } = req.query;
  const tokenRes = await axios.post('https://github.com/login/oauth/access_token', {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    code
  }, { headers: { Accept: 'application/json' } });

  const token = tokenRes.data.access_token;
  res.redirect(`/updated?token=${token}`);
};
