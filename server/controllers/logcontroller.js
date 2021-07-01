const { query } = require("express");
let express = require("express");
let router = express.Router();
let validateJWT = require("../middleware/validate-jwt");

const { LogModel } = require("../models");

router.get("/practice", validateJWT, (req,res) => {
  res.send(Hey!! This is a practice route!")")
});

router.post("/create", validateJWT, async(req,res) => {
  const { title, date, entry} = req.body.log;
  const {id} = req.user;
  const logEntry ={
    title,
    date,
    entry,
    owner: id
  }
  try {
    const newLog = await LogModel.create(logEntry);
    res.status(200).json(newLog);
  } catch (err) {
    res.status(500).json({error: err});
  }
  LogModel.create(logEntry)
});


router.get("/about", (req, res) => {
  res.send("This is the about route!")
});

router.get("/", async(req, res) => {
  try{
    const entries = await LogModel.findAll();
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({error:err});
  }
});

router.put("/update/:entryId", validateJWT, async(req,res) => {
  const {title, date, entry} = req.body.log;
  const logId = req.params,entryId;
  const userId = req.user.id;

  const query = {
    where: {
      id: logId,
      owner:userId
    }
  };

  const updatedLog = {
    title: title,
    date: date,
    entry: entry
  };

  try{
    const update = await LogModel.update(updatedLog, query);
    res.status(200).json(update);
  } catch (err){
    res.status(500).json({error:err});
  }
});

router.delete("/delete/:id", validateJWT, async(req,res) => {
  const ownerId = req.user.id;
  const logId = req.params.id;

  try{
    const query = {
      where: {
        id: logId,
        owner: ownerId
      }
    };
  await LogModel.destroy(query);
  res.status(200).json({message: "Log Entry Removed"});
  } catch(err){
    res.status(500).json({error:err});
  }
});

/*
// .then() syntax - user create
//route - type(post) takes arguements for endpoint(/create), request function, response function
router.post('/create',(req,res)=> {

  const logObj={
    description:req.body.log.description,
    definition: req.body.log.definition,
    result:req.body.log.result,
    owner_id:req.body.log.owner_id
  }

  Log.create(logObj)
    .then((created)=>{
      res.status(200).json({
        Log: created,
        Message: 'The log was successfully created',
      })
    })
    .catch(err=>{
      res.status(500).json(err)
    })
})

router.get('/all', async(req,res)=> {

  try{
    //check table, find all of them and pass forward
    const Logs=await Log.findAll()
    
    //UPDATE THE INFO
    const LogsRet =Logs.map(a=>{return {name:a.name, legNumber:a.legNumber, predator:a.predator} })

    res.status(200).json({
      Log: logsRet,
      message: 'Success'
    })
  }
  catch(error){
    res.status(500).json({
      messgae: 'Data not found'
    })
  }
})

*/


module.exports = router;