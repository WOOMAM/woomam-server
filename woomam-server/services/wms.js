/** * @author Jaeyong Park <scorpion@dgu.ac.kr> */
var db = require('../modules/db-connection');
var sql = require('../sql/wms');

/** @description check the washing machine bookable */
exports.isBookableCheck = async function(req){
  const {washingMachineUID} = req.body;
  let [rows] = await db.query(sql.getTargetWM,[washingMachineUID])
  rows = rows[0]
  bookedTime = new Date(rows["bookedTime"]);
  nowTime = new Date();
  /* Debug : console.log(nowTime, bookedTime)*/
  /* NEED : check the washingMachineState or taskTo time */
  if(nowTime>=bookedTime)return true;
  else return false;
}

/** @description book the washing machine */
exports.bookingTheWM = async function(req){
  const {phoneNumber,bookedTime,washingMachineUID} = req.body;
  let [rows] = await db.query(sql.bookTargetMachine,[bookedTime,phoneNumber,washingMachineUID])
  rows = rows[0]
  return rows
}

/** @description check the qr code */
exports.firstQRCheck = async function(req){
  const {phoneNumber,washingMachineUID} = req.body;
  let [rows] = await db.query(sql.getTargetWM,[washingMachineUID])
  rows = rows[0]
  limitTime = new Date(rows["bookedTime"]);
  nowTime = new Date();
  /* Debug :
  console.log("본인 : "+String(rows["phoneNumber"]==phoneNumber));
  console.log("예약시간보다 전에 왔는지 : "+String(limitTime>=nowTime));
  */
  let isRightQR = (rows["phoneNumber"]==phoneNumber&&limitTime>=nowTime);
  if(isRightQR){
    let queryResult=await db.query(sql.qrfirstCheck,[washingMachineUID]);
    queryResult = queryResult[0];
    if(queryResult["affectedRows"] == 1)return true;
  }
  return false;
}

/** @description start the washing machine */
exports.startTheLaundry = async function(req){
  /* NEED : pay the bill routine */
  const {taskFrom,taskTo,arduinoState,washingMachineState,washingMachineUID,phoneNumber} = req.body;
  let [rows] = await db.query(sql.getTargetWM,[washingMachineUID])
  if(rows.length == 0)return false;
  if(!(rows[0]["phoneNumber"]==phoneNumber&&rows[0]["qrState"]=="verified"))return false;
  let [queryResult] = await db.query(sql.startTargetWM,[taskFrom,taskTo,arduinoState,washingMachineState,washingMachineUID]);
  if(queryResult["affectedRows"]==1)return true;
  return false;
}

/** @description initialize the washing machine state */
exports.secondQRCheck = async function(req){
  const {phoneNumber,washingMachineUID} = req.body;
  let [rows] = await db.query(sql.getTargetWM,[washingMachineUID])
  rows = rows[0]
  limitTime = new Date(rows["taskTo"]);
  nowTime = new Date();
  /* Debug :
  console.log("본인 : "+String(rows["phoneNumber"]==phoneNumber));
  console.log("세탁종료 후에 왔는지 : "+String(limitTime<=nowTime)); 
  */
  let isRightQR = (rows["phoneNumber"]==phoneNumber&&limitTime<=nowTime);
  if(isRightQR){
    let queryResult = await db.query(sql.updateTargetWM,[null,null,null,null,'unchecked',"opened","turnedOff",washingMachineUID]);
    queryResult = queryResult[0];
    if(queryResult["affectedRows"] == 1)return true;
  }
  return false;
}

/** @description get all of the washing machines enrolled in our service */
exports.getAllWashingMachines = async function(req){
  let [rows] = await db.query(sql.getAllWMs)
  return rows;
}

/** @description get all of the washing machines enrolled in our service */
exports.getTheStoreMachines = async function(req){
  let [rows] = await db.query(sql.getStoreWMs,[req.params.uuid])
  return rows;
}

/** @description get a washing machine enrolled in our service */
exports.getTheMachineState = async function(req){
  let [rows] = await db.query(sql.getTargetWM,[req.params.uuid])
  return rows[0];
}