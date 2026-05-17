const express = require("express")
const router = express.Router()

const Task = require("../models/Task")

router.post("/create", async(req,res)=>{

    try{

        const task = new Task(req.body)

        await task.save()

        res.json({
            message:"Task Created",
            task
        })

    }catch(error){

        res.status(500).json(error)
    }

})

router.get("/", async(req,res)=>{

    try{

        const tasks = await Task.find()

        res.json(tasks)

    }catch(error){

        res.status(500).json(error)
    }

})

router.delete("/:id", async(req,res)=>{

    try{

        await Task.findByIdAndDelete(req.params.id)

        res.json({
            message:"Task Deleted"
        })

    }catch(error){

        res.status(500).json(error)
    }

})

router.put("/:id", async(req,res)=>{

    try{

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        )

        res.json(updatedTask)

    }catch(error){

        res.status(500).json(error)
    }

})

module.exports = router