/** * @author Jaeyong Park <scorpion@dgu.ac.kr> */
var db = require('../modules/db-connection');
var sql = require('../sql/stores');

exports.getAllStoresInfo = async function(req){
  let [rows] = await db.query(sql.getAllStores);
  return rows;
}
