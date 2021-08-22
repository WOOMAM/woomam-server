/** * @author Jaeyong Park <scorpion@dgu.ac.kr> */
var express = require('express');
var router = express.Router();
var service = require('../services/signin')
var authenticationToken = require('../modules/login-check')

/** @description login and get the access token with expiration time. */
router.post('/', async function(req, res, next) {
  infos=await service.compareAuthInfo(req);
  res.status(200).send({
    "token":infos
  });
});

/**
 * @description token checking routine for debugging
 */
router.get('/posts', authenticationToken.authenticationToken, (req, res) => {
  res.json(req.body)
})
module.exports = router;
