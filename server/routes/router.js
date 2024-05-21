const express = require('express');
const router = express.Router();
const FinancialRecordModel = require('../schema/financialRecord');

router.get("/getData/:userId", async (req, res) => {
    try {
        const userID = req.params.userId;
        const records = await FinancialRecordModel.find({ userID: userID });
        if (records.length === 0) {
            return res.status(400).send("No records found for the given user");
        }
        res.status(200).send(records);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post("/", async (req, res) => {
    try {
        const record = req.body;
        const newRecord = new FinancialRecordModel(record);
        const savedRecord = await newRecord.save();

        res.status(200).send(savedRecord);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.delete("/:id", async(req, res)=>{
    try {
        const ID = req.params.id;
        const record = await FinancialRecordModel.findByIdAndDelete(ID);
        if (!record){
            return res.status(404).send();
        }
        res.status(200).send(record);
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router;