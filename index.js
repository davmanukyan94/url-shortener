require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser")
const dns = require("dns")



const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));
app.use(bodyParser.urlencoded({extended:true}))


app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/shorturl', function(req, res) {
  const {url} = req.body
  const splitUrl = url.split("https://")
  if(splitUrl[1]==null){
    res.json({ error: 'invalid url' })
      return
  }
  dns.lookup(splitUrl[1],(err)=>{
    if(err){
      console.log(err)
      res.json({ error: 'invalid url' })
      return 
    }
    const index = arr.findIndex(item=>item===url)
    if(index>-1){
      res.json({original_url:url,short_url:index})
      return
    }
    arr.push(url)
    res.json({original_url:url,short_url:arr.length-1})
  })
});

app.get('/api/shorturl/:id',(req,res)=>{
const {id} = req.params
const url = arr[+id];
res.redirect(url);
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
