/** * @author Jaeyong Park <scorpion@dgu.ac.kr> */

var express = require('express');
var router = express.Router();
var service = require('../services/signup');

/** 
 * @description signup routine.
 */
router.post('/', async function(req, res, next) {
      if(await service.duplicationCheck(req)){
        enrolledResult = await service.enrollTheAccount(req)
        res.status(200).send({
          retult:true,
          message:"회원가입 완료",
          data:enrolledResult
        })
      }else {
        res.status(204).send("회원가입 실패")
      }
});
module.exports = router;