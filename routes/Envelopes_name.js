const express = require("express")
const { getEnvelopeByName, getEnvelopeID, envelopeCheck } = require("../utils")
const router = express.Router({mergeParams: true})

//gets specific envelope
router.get("/", (req,res) => {
    const reqEnvelope = getEnvelopeByName(req.params.name)
    res.status(200).send(reqEnvelope)
})
//changes values of envelopes
router.put("/", (req,res)=>{
    const envelopeName = req.query.name
    const envelopeBudget = req.query.budget
    const reqEnvelope = getEnvelopeByName(req.params.name)
    if(envelopeBudget){
        reqEnvelope.budget = envelopeBudget 
    }
    if(envelopeName){
        reqEnvelope.name = envelopeName
    }
    res.status(201).send(reqEnvelope)
})
// deletes specific envelope
router.delete("/", (req,res,next)=>{
    const idOfReqEnvelope = getEnvelopeID(req.params.name)
    envelopes.splice(idOfReqEnvelope,1)
    res.status(204).send("Envelope deleted")
})

module.exports = router