/** * @author Jaeyong Park <scorpion@dgu.ac.kr> */
var db = require('../modules/db-connection');
var sql = require('../sql/signin');
var service = require('../services/signin');
const jwt = require('jsonwebtoken');
const privateKey = process.env.ACCESS_TOKEN;
//const refreshKey = process.env.REFRESH_TOKEN;

exports.compareAuthInfo = async function(req){
  const {phoneNumber, userUID} = req.body;
  let [rows] = await db.query(sql.getAuthInfo,[phoneNumber,userUID])
  if(rows.length != 1)return;
  const accessToken = jwt.sign({
    phoneNumber: phoneNumber
  }, privateKey, {expiresIn:"12h"});

/*
 *** ADVANCED : Refresh Token Implementation ***
  const refreshToken = jwt.sign({ 
    phone: phoneNumber,
  }, refreshKey, { expiresIn: '3d' });
*/

  /*DEBUG : 
  console.log('login success' + JSON.stringify(rows[0]));
  */
  return accessToken;
}
