var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/findAllSchedules', (req, res) => {
  let tmpData;
  const at = new Date();
  try {
    tmpData = new Array(10).fill(0).map((e, idx) => {
      const data = {
        attendants: `att = ${idx}`,
        contents: `cString - ${idx}`,
        startAt: new Date(at.setDate(at.getDate() - idx)),
        endAt: new Date(at.setDate(at.getDate() - idx - 7)),
        id: `ID${idx}`,
        place: `place-${idx}`,
        title: `${idx}번 타이틀임ㅋ`
      };
      return data;
    });
  }catch(e) {
    console.log(e)
  }
  tmpData.push({
    attendants: `att = same`,
    contents: `cString - same`,
    startAt: `2020-02-06T14:17:04.851Z`,
    endAt: `2020-02-13T14:17:04.851Z`,
    id: `IDsame`,
    place: `place-same`,
    title: `Same 타이틀임ㅋ`
  })
  res.send(tmpData);
})

router.post('/makeSchedules', (req, res, next) => {
  const data = req.body;
  console.log(data);
  res.send(data);
});

module.exports = router;
