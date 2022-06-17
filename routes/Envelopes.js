const express = require("express")
const router = express.Router()

//gets all envelopes
router.get("/", (req,res)=>{
    res.status(200).send(envelopes)
})
//creates new envelope
router.post("/" ,(req, res)=>{
    const envelopeName = req.query.name
    const envelopeBudget = req.query.budget
    const newEnvelope = {
        name: envelopeName,
        budget: envelopeBudget
    }
    envelopes.push(newEnvelope)
    res.status(201).send(newEnvelope)
})

module.exports = router