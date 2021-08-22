/** * @author Jaeyong Park <scorpion@dgu.ac.kr> */
var express = require('express');
var router = express.Router();
var service = require('../services/wms');
var authenticationToken = require('../modules/login-check')

/**@description bring all the machines' state, do not need a token*/
router.get('/', async function(req, res) {
  try {
    let allMachines = await service.getAllWashingMachines(req)
    res.status(200).send({
        result : true,
        data: allMachines,
        message : `All machines' status`
    })
  } catch (error) {
      console.log("Problems Data" + error)
  }
});
router.get('/:uuid', async function(req, res) {
  try {
    let storeMachines = await service.getTheStoreMachines(req)
    res.status(200).send({
        result : true,
        data: storeMachines,
        message : `Machines in the Store states`
    })
  } catch (error) {
      console.log(error)
  }
});


/**@description book the machine, need the token*/
router.post('/book', authenticationToken.authenticationToken, async function(req, res) {
  try{
    if(await service.isBookableCheck(req)){
    let rows = await service.bookingTheWM(req);
    res.status(200).send({
      result:true,
      message:"Booked",
      data:rows
    })
    }else res.status(204).send('Booking failed');
  }catch(err){
    res.status(204).send('Booking failed');
  }
});

/**@description first QR code check API, need the token*/
router.post('/qrcheck', authenticationToken.authenticationToken, async function(req, res) {
  if(await service.firstQRCheck(req)){
    res.status(200).send({
      result:true,
      message:"QR is checked",
    })
  }else res.status(204).send()    

});

/**@description start the machine, need the token*/
router.post('/start', authenticationToken.authenticationToken, async function(req, res) {
  if(await service.startTheLaundry(req)) 
  res.status(200).send({
      result:true,
      message:"Machine started"
  })
  else res.status(204).send()
});


/**@description second QR code check API, initialize the machine state, need the token*/
router.post('/initialize', authenticationToken.authenticationToken, async function(req, res) {
  if(await service.secondQRCheck(req)) 
  res.status(200).send({
      result:true,
      message:"initialized"
  })
  else res.status(204).send()
});

module.exports = router;
