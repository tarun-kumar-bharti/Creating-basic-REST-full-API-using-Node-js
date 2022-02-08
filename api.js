const mysql 		= require('mysql');  			//npm install --save mysql 
const express 		= require('express') 			//npm install --save express
const bodyParser 	= require('body-parser'); 		//npm install --save body-parser
const cors 		= require('cors');			//npm install --save cors							
 
const app = express();
const port = 3000;
  
// Configuring body parser middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test"
});

/*
CREATE TABLE `user` (
 `userid` int(10) NOT NULL AUTO_INCREMENT,
 `mobile` varchar(15) NOT NULL,
 `email` varchar(100) NOT NULL, 
 PRIMARY KEY (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1

*/

 
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});
 
app.get('/', (req, res) => {
	res.send('Server Running !');
});

//add new record  // send two parameter mobile
app.post('/api/newuser',(req, res) => {
  let data = {email: req.body.mobile, mobile: req.body.mobile};
  let sql = "INSERT INTO user SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//get all records
app.get('/api/alluser', (req, res) => {  
  let sql = "SELECT * FROM user";
  let query = conn.query(sql, (err, results) => {
  if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  }); 
});

//get one record
app.get('/api/oneuser/:id',(req, res) => {
  let sql = "SELECT * FROM user WHERE userid="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//delete one record
app.delete('/api/oneuser/:id',(req, res) => {
  let sql = "DELETE FROM user WHERE userid="+req.params.id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
}); 
 

app.listen(port, () => console.log('Hello world app listening on port : '+port));
 
