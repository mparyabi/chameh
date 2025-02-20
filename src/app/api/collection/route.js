import connectToDB from "@/utils/db";
import CollectionModel from "@/models/Collection";

export async function POST(req){
    try{
   connectToDB();
   const body =await req.json();
   const {name, thumbnail , description} = body;
   await CollectionModel.create({name, thumbnail ,description})
   return Response.json({message:"Your Collection created successfully"},{status:201});
    }
    catch(err){
        console.log("error eccured ->" , err);
        return Response.json({message:"Error ECCURED!!"},{status:500});
    }
}