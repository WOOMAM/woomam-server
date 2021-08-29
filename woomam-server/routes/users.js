/** * @author Jaeyong Park <scorpion@dgu.ac.kr> */
var express = require('express');
var router = express.Router();
var service = require('../services/users');
var authenticationToken = require('../modules/login-check')

/**@description book the machine, need the token*/
router.post('/', authenticationToken.authenticationToken, async function(req, res) {
  try{
    if(await service.gettableBookedList(req)){
      let rows =  await service.getBookedWMByUser(req)
      res.status(200).send({
        result:true,
        message:"User's individual booked list",
        data:rows
      })
    }else{
      res.status(204).send();
    }
  }catch(err){
    res.status(204).send();
  }
});

module.exports = router;
