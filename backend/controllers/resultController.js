//We have to write controllers for saving the data of results
//for getting the data
import Result from '../models/resultModel.js'

export const createResult = async(req,res)=>{
    const {wpm, accuracy, charsTyped, date} = req.body;
    const userId = req.user?._id;

    if(!userId || !wpm || !accuracy || !charsTyped){
        return res.status(400).json({message: "Missing required fields"});
    }

    const result = await Result.create({
        userId,
        wpm,
        accuracy,
        charsTyped,
        date
    })

    return res.status(200).send(result);
}

//function for getting results for a user

export const getResults = async(req,res)=>{
    //user will be available here by auth middleware
    const userId = req.user?._id;

    if(!userId) return res.status(401).send({message: "Invalid user"});

    const results = await Result.find({userId});

    if(results.length === 0) return res.status(400).send({message : "No results found"});

    return res.status(200).send(results);
}