const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const morgan = require("morgan")
const { get } = require("http")

const PORT = 3000

const middleware = require("./middleware")
const budgetRoute = require("./routes/Budget")
const envelopeRoute = require("./routes/Envelopes")
const envelopeNameRoute =require("./routes/Envelopes_name")
const envelopeTransferRoute =require("./routes/Envelopes_transfer")

global.envelopes = []
global.totalBudget = 0

app.use(bodyParser.json())
app.use(morgan("dev"))
app.use(middleware)

app.use("/envelopes", envelopeRoute)
app.use("/envelopes/:name", envelopeNameRoute)
app.use("/envelopes/:name/transfer", envelopeTransferRoute)
app.use("/budget", budgetRoute)


app.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}`)
})
