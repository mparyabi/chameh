import connectToDB from "@/utils/db";
import UserModel from "@/models/User";
import OrderModel from "@/models/Order";
import { authUser } from "@/utils/auth";

export async function GET(req, { params }) {
    try {
      const { id } = params;
      await connectToDB();
      const reqUser=await authUser(); 
      if (!reqUser){
        return new Response(JSON.stringify({ message: "Login First!" }), {
          status: 404,
        });
      }
  
      const user = await UserModel.findById(id, "-__v");
  
      if (!user) {
        return new Response(JSON.stringify({ message: "USER not Found!" }), {
          status: 404,
        });
      }
  
      
      if(reqUser._id.toString() !== user._id.toString()){
        return new Response(JSON.stringify({ message: "You Can Not SEE Others Orders!!" }), { status: 403 });
        }

  
      const orders = await OrderModel.find({user:user._id}).sort({ createdAt: -1 });;

      if(orders.length>0){
        return new Response(
            JSON.stringify({ message: "Orders Found Successfully", data:orders }),
            { status: 200 }
          );
      }
      else{
        return new Response(
            JSON.stringify({ message: "This is User Have not any Order" }),
            { status: 404 }
          );
      }


    } catch (err) {
      return new Response(JSON.stringify({ message: error.message }), {
        status: 500,
      });
    }
  }
  
  export async function PATCH(req, { params }) {
    try {
      const { id } = params;
      const body =await req.json();
      const {status} = body;

      await connectToDB();
      const user=await authUser(); 
      
    if(user.role !== "ADMIN"){
      return new Response(
        JSON.stringify({ message: "You Must Be Admin" }),
        { status: 500 }
      );
    }
  
    const order = await OrderModel.findOne({ _id: id });

      if(!order){
        return new Response(
            JSON.stringify({ message: "Order Not Found"}),
            { status: 500 }
          );
      }
      else{

        order.status= status;
        await order.save();

        return new Response(
            JSON.stringify({ message: "Your Status Changed Successfully" }),
            { status: 200 }
          );
      }


    } catch (err) {
      return new Response(JSON.stringify({ message: error.message }), {
        status: 500,
      });
    }
  }
  