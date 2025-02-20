import connectToDB from "@/utils/db";
import UserModel from "@/models/User";
import { generateAccessToken, hashPassword } from "@/utils/auth";
import { roles } from "@/utils/constants";

export async function POST(req) {
  try{
    await connectToDB();
    const body = await req.json();
    const { name, phone, email, password } = body;
  
    // Validation (You)
  
    const isUserExist = await UserModel.findOne({
      $or: [{ email }, { phone }],
    });
  
    if (isUserExist) {
      return Response.json(
        {
          message: "The username or email or phone exist already !!",
        },
        {
          status: 422,
        }
      );
    }
  
    const hashedPassword = await hashPassword(password);
    const accessToken = generateAccessToken({ email });
  
    const users = await UserModel.find({});
  
    await UserModel.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: users.length > 0 ? roles.USER : roles.ADMIN,
    });
  
    return Response.json(
      { message: "User signed up successfully :))" },
      {
        status: 201,
        headers: { "Set-Cookie": `token=${accessToken};path=/;httpOnly=true` },
      }
    );
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

}
