const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const PORT = 3000
const morgan = require("morgan")
const { get } = require("http")
let envelopes = []
let totalBudget = 0


app.use(bodyParser.json())
app.use(morgan("dev"))


app.get("/", (req,res,next)=>{
    res.send("Hello World!")
})

app.get("/envelopes/:name", (req,res,next) => {
    const reqEnvelope = envelopes.find(envelope => req.params.name)
    res.status(200).send(reqEnvelope)
})

app.get("/envelopes", (req,res,next)=>{
    res.status(200).send(envelopes)
})

app.post("/envelopes" ,(req, res, next)=>{
    const envelopeName = req.query.name
    const envelopeBudget = req.query.budget
    const newEnvelope = {
        name: envelopeName,
        budget: envelopeBudget
    }
    envelopes.push(newEnvelope)
    res.status(201).send(newEnvelope)
})

app.put("/envelopes/:name", (req,res,next)=>{
    const envelopeName = req.query.name
    const envelopeBudget = req.query.budget
    const reqEnvelope = envelopes.find(envelope => req.params.name)
    if(envelopeBudget){
        reqEnvelope.budget = envelopeBudget 
    }
    if(envelopeName){
        reqEnvelope.name = envelopeName
    }
    res.status(201).send(reqEnvelope)
})
app.delete("/envelopes/:name", (req,res,next)=>{
    const reqEnvelope = envelopes.find(envelope => req.params.name)
    const idOfReqEnvelope = envelopes.indexOf(reqEnvelope)
    envelopes.splice(idOfReqEnvelope,1)
    res.status(204).send("Envelope deleted")
})

app.put("/envelopes/transfer/:name", (req,res,next)=>{
    const envelopeToWithdrawName = req.query.name
    const budgetToTransfer = req.query.budget
    const intBudgetToTransfer = parseInt(budgetToTransfer)
    const envelopeToTransfer = envelopes.find(envelope => req.params.name)
    const envelopeToWithdraw = envelopes.find(envelope => req.query.name)
    console.log(req.params.name)
    console.log(req.query.name)
    const envelopeToTransferBudget = parseInt(envelopeToTransfer.budget)
    const envelopeToWithdrawBudget = parseInt(envelopeToWithdraw.budget)
    envelopeToWithdraw.budget = envelopeToWithdrawBudget - intBudgetToTransfer
    envelopeToTransfer.budget = envelopeToTransferBudget + intBudgetToTransfer
    res.status(201).send([envelopeToWithdraw, envelopeToTransfer])
})

app.get("/budget", (req,res,next)=> {
    res.status(200).send(totalBudget.toString())
})

app.put("/budget", (req,res,next)=>{
    const actionType = req.query.action
    if(actionType === "add"){
        totalBudget += parseInt(req.query.amount)
    }else if(actionType === "substract"){
        totalBudget -= parseInt(req.query.amount)
    }else {
        res.status(400).send("Bad action!")
    }
    res.status(200).send(totalBudget.toString())
})


app.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}`)
})
