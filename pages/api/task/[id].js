import connectDB from "../../../lib/db";
import user from "../../../models/users.js";
// import { useRouter } from 'next/router';

export default async function handler(req, res) {
  connectDB();

  const { method } = req;
  const { id } = req.query;

  // if method if GET
  if (method == "GET") {


    try{
    let output = await user.find({ name: id });
    console.log(output);
    res.send(output);
    }catch(error){
        res.status(500).json({message:"Error in Finding data of user"})
    }

  }
}
