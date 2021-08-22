/** * @author Jaeyong Park <scorpion@dgu.ac.kr> */
var db = require('../modules/db-connection');
var sql = require('../sql/signup');

// Check the duplication account for signing up
exports.duplicationCheck = async function(req){
   const {phoneNumber} = req.body;
   let [data] = await db.query(sql.getTheUserCount,[phoneNumber])
   if(data[0]['count'] == 0) return true;//중복되는 항목 존재하지 않음.
   else return false;
}

// Sign up
exports.enrollTheAccount = async function(req){
  const {userName,phoneNumber,userUID}=req.body;
  let [data] = await db.query(sql.createNewAccount,[userName,phoneNumber,userUID])
  return data
}