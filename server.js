const e = require('express')
const a = e()
const p = require('body-parser')

a.use(e.static('.'));
a.use(p());





const beefkasten = [];
a.post("/message",(req,res)=>{
  let date = Date.now(),
    { msg, img, name } = req.body;
  if ( msg || img) beefkasten.push({img,name,msg,date});
  res.json({msgs:beefkasten});
});



a.listen(9922);
