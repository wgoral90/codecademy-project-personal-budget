const express = require("express")
const { getEnvelopeByName, envelopeCheck, envelopeQueryCheck } = require("../utils")
const router = express.Router({mergeParams: true})

//transfers budget from one envelope to another
router.put("/",envelopeCheck, envelopeQueryCheck, (req,res)=>{
    const intBudgetToTransfer = parseInt(req.query.budget)
    const envelopeToTransfer = getEnvelopeByName(req.params.name)
    const envelopeToWithdraw = getEnvelopeByName(req.query.name)
    const envelopeToTransferBudget = parseInt(envelopeToTransfer.budget)
    const envelopeToWithdrawBudget = parseInt(envelopeToWithdraw.budget)
    envelopeToWithdraw.budget = (envelopeToWithdrawBudget - intBudgetToTransfer).toString()
    envelopeToTransfer.budget = (envelopeToTransferBudget + intBudgetToTransfer).toString()
    res.status(201).send([envelopeToWithdraw, envelopeToTransfer])
})

module.exports = router