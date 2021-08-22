/** * @author Jaeyong Park <scorpion@dgu.ac.kr> */
const jwt = require('jsonwebtoken');

/**
 * @description check user for authorization api
 *  */ 
async function authenticationToken(req, res, next) {
    var authToken = req.header('Authorization');
    console.log(!authToken)
    if(!authToken)return res.status(204).send();
    authToken = authToken.split(" ")[1]
    console.log(authToken)
    jwt.verify(authToken, process.env.ACCESS_TOKEN, (err, result) => {
        if (err) {console.log(err); return res.sendStatus(204);}
        //console.log(JSON.stringify(result))
        next()
      })
}

module.exports = { authenticationToken }