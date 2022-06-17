const express = require("Express")
const app = express()
const { nameCheck, budgetCheck, getEnvelopeByName} = require("./utils")

//checks if name param has appropriate format
app.param("name", (req,res,next,name) =>{
    try {
        nameCheck(req.params.name)
    }catch(e)  {
        res.status(400).send(e)
        next(e)
    } 
    next()
})
//checks if budget query has appropriate format
app.use("/", (req,res,next)=>{
    if(req.query.budget){
        try{
            budgetCheck(req.query.budget)
        }catch(e){
            res.status(400).send(e)
            next(e)
        }
    }
    next()
})
//checks if name query has appropriate format
app.use("/", (req,res,next)=>{
    if(req.query.name){
        try{
            nameCheck(req.query.name)
        }catch(e){
            res.status(400).send(e)
            next(e)
        }
    }
    next()
})
//cheks if envelope exists
app.use("/envelopes/:name", (req, res, next) =>{
    const envelopeToCheck = getEnvelopeByName(req.params.name)
    try{
        if(!envelopeToCheck){
            throw "No envelope with this name"
        }
    }catch(e){
        res.status(400).send(e)
        next(e)
    }
    next()
})


module.exports = app