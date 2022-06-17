function getEnvelopeByName(name){
    return envelopes.find(envelope =>envelope.name === name)
}

function getEnvelopeID(name){
    return envelopes.indexOf(getEnvelopeByName(name))
}

function nameCheck(name){
    if(name.length < 2 || name.length >15){
        throw "Wrong name input"
    }
}

function budgetCheck(budget){
    const budgetToCheck = /^[0-9]+$/.test(budget)
    if(!budgetToCheck)
        throw "Wrong budget output"
}

function envelopeCheck(req, res,next){
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
}

function envelopeQueryCheck(req, res,next){
    const envelopeToCheck = getEnvelopeByName(req.query.name)
    try{
        if(!envelopeToCheck){
            throw "No envelope with this name"
        }
    }catch(e){
        res.status(400).send(e)
        next(e)
    }
    next()
}


exports.getEnvelopeByName = getEnvelopeByName
exports.getEnvelopeID = getEnvelopeID
exports.nameCheck= nameCheck
exports.budgetCheck= budgetCheck
exports.envelopeCheck= envelopeCheck
exports.envelopeQueryCheck= envelopeQueryCheck