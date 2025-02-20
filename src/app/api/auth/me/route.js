
import connectToDB from "@/utils/db";
import UserModel from "@/models/User";
import { verifyAccessToken } from "@/utils/auth";
import { cookies } from "next/headers";

export async function GET() {
  try{
    connectToDB();
    const token = cookies().get("token");
    let user = null;
  
    if (token) {
      const tokenPayload = verifyAccessToken(token.value);
      if (tokenPayload) {
      user = await UserModel.findOne({ email: tokenPayload.email },"-__v -password -refreshToken");
      }
    }
    return Response.json({message:"USER found!" , data:user}, {status:200})
  }
  catch(err){
    console.log("Err ->", err);
    return Response.json(
      { message: err },
      {
        status: 500,
      }
    );
  }
  };