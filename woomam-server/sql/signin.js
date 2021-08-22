/** * @author Jaeyong Park <scorpion@dgu.ac.kr> */
module.exports = {
    // SELECT 
    getAuthInfo : "select userName,phoneNumber from woomam_users where phoneNumber=? and userUID=SHA2(?,512)",
}