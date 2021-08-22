/** * @author Jaeyong Park <scorpion@dgu.ac.kr> */
var express = require('express');
var router = express.Router();
var service = require('../services/stores');

/* GET stores' list. */
router.get('/', async function(req, res, next) {
  storesInformation = await service.getAllStoresInfo(req);
  res.status(200).send({
    data : storesInformation
  })
});
module.exports = router;