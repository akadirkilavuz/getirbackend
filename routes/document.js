const express = require('express');
const router = express.Router();
const Docs = require('../models/document')
// Response data of failing cases
var failedResponse = {
    "code":1,
    "msg":"",
    "record":[]
}
// Validations of request dates and counts
var dateValid = /^\d\d\d\d-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\d|3[0-1])$/;
var countValid = /^\d{1,5}$/;
function checkDate(start,end){
    return start<end
}
function checkCount(min,max){
    return min<max
}
// for /documents path, post handler
router.post('/', async(req,res) => {
    try{
        // Checking startDate<endDate
        if(!checkDate(req.body.startDate,req.body.endDate)){
            failedResponse.msg= "Start Date should be lower than End Date"
            res.json(failedResponse)
        }
        // Checking minCount<maxCount
        else if(!checkCount(req.body.minCount,req.body.maxCount)){
            failedResponse.msg= "Min Count should be lower than Max Count"
            res.json(failedResponse)
        }
        // Validation of Start Date
        else if(!(dateValid.test(req.body.startDate))){
            failedResponse.msg= "Start Date is in invalid format. Please use YYYY-MM-DD"
            res.json(failedResponse)
        }
        // Validation of End Date 
        else if(!(dateValid.test(req.body.endDate))){
            failedResponse.msg= "End Date is in invalid format. Please use YYYY-MM-DD"
            res.json(failedResponse)
        }
        // Validation of Min Count 
        else if(!(countValid.test(req.body.minCount))){
            failedResponse.msg= "Please give a valid minCount number"
            res.json(failedResponse)
        }
        // Validation of Max Count 
        else if(!(countValid.test(req.body.maxCount))){
            failedResponse.msg= "Please give a valid maxCount number"
            res.json(failedResponse)
        }
        // If request body passes the all validations test this block is reached
        else {
            // Getting Date format of request body dates
            startDate = new Date(req.body.startDate);
            endDate = new Date(req.body.endDate);

            // Fetch the all document data
            var docs = await Docs.find();
            // Filter by given dates
            var dateFiltered = docs.filter(function(data){
                return data.createdAt > startDate && data.createdAt < endDate;
            });
            // Filter by given counts
            var countFiltered = dateFiltered.filter(function(data){
                sum = eval(data.counts.join('+'));
                return sum > req.body.minCount && sum < req.body.maxCount;
            });
            // There is no document record with above filters
            if(docs.length==0){
                response = {
                    "code":1,
                    "msg":"There is no record within these filters",
                    "record":[]
                }
            }
            // There is/are document record
            else {
                response = {
                    "code":0,
                    "msg":"Success",
                    // Adding filtered data into response
                    "record": countFiltered.map(doc => ({
                        "key":doc.key,
                        "createdAt":doc.createdAt,
                        "totalCount": eval(doc.counts.join('+')),
                    }))
                }
            }
            res.json(response)
        }
    }catch(err){
        res.json(err)
    }
})

module.exports = router;