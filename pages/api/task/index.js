
import connectDB from "../../../lib/db";
import user from "../../../models/users.js"

// /api/task

export default async function (req,res){

    connectDB();

    const {method}=req;

    

    
    
    // if  post request create the new task
    
	if (method === "POST") {

        const data=req.body;
        let userName=data.name;
        console.log("data Coming is:")
        console.log(req.body)

        // if user exist then insert the task directly else create the user with task and insert

          let output= await user.find({name:userName})

        if(output.length==0)
        {

            const newUser=new user({
                name:data.name,
                tasks:[{
                    title:data.task.title,
                    description:data.task.description,
                    completed:data.task.completed,
                    createdAt:data.task.time
                }]
            })

            let saving_result= await newUser.save()
            res.send(saving_result)

        }

        else{

            try{
             await user.findOneAndUpdate(
                {name:userName},
                { $push: { tasks: {title:data.task.title,
                    description:data.task.description,
                    completed:data.task.completed,
                    createdAt:data.task.time} } },
                { new: true }
              );

              res.send("data send")

        }catch(error){
            console.log(error)
            res.send("Error Occured",error)

        }
    }

        




	}









    // if get request then we need a name and then we can send all the task
	if (method === "GET") {
		try {
			const tasks = await user.find({name:req.body.name});
			res.status(200).json({ data: tasks });
		} catch (error) {
			res.status(500).json({ message: "Internal Server Error" });
			console.log(error);
		}
	}
    
}