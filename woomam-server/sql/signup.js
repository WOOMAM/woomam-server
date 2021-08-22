/** * @author Jaeyong Park <scorpion@dgu.ac.kr> */
module.exports = {
    // SELECT 
    getTheUserCount : "select count(*) as count from woomam_users where phoneNumber=?",
    // INSERT
    createNewAccount : "insert into woomam_users(userName,phoneNumber,userUID) values(?,?,SHA2(?,512))",
}