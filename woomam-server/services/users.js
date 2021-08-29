/** * @author Jaeyong Park <scorpion@dgu.ac.kr> */
var db = require('../modules/db-connection');
var sql = require('../sql/users');

/** @description get all of the washing machines enrolled in our service */
exports.gettableBookedList = async function(req){
  const {phoneNumber} = req.body;
  let [rows] = await db.query(sql.getBookedWMByUser,[phoneNumber])
  rows = rows[0]
  bookedTime = new Date(rows["bookedTime"]);
  nowTime = new Date();
  if(bookedTime>=nowTime)return true;
  else return false;
}
exports.getBookedWMByUser = async function(req){
  const {phoneNumber} = req.body;
  let [rows] = await db.query(sql.getBookedWMByUser,[phoneNumber])
  return rows;
}