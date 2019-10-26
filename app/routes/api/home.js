const router = require('express').Router();
const geoip = require('geoip-lite');

router.post('/apply-user', applyUser);

module.exports = router;

function applyUser(req, res) {
  let geo = geoip.lookup('207.97.227.239');
  //console.log(geo);
  // const extIP = require('external-ip')();
  // extIP((err, ip) => {
  //   console.log(ip);
  //   console.log(geoip.lookup(ip))
  // });
  
  res.json({ user: true })
}