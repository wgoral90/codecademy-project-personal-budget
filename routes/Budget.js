const express = require("express")
const router = express.Router()

// gets total budget
router.get("/", (req,res)=> {
    res.status(200).send(totalBudget.toString())
})

// adds or substracts value from total budget
router.put("/", (req,res)=>{
    const actionType = req.query.action
    if(actionType === "add"){
        totalBudget += parseInt(req.query.budget)
    }else if(actionType === "substract"){
        totalBudget -= parseInt(req.query.budget)
    }else {
        res.status(400).send("Bad action!")
    }
    res.status(200).send(totalBudget.toString())
})

module.exports = router