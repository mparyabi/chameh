import connectToDB from "@/utils/db";
import ProductModel from "@/models/Product"

export async function GET(req) {
    try {
      await connectToDB();
      const products = await ProductModel.find().populate("collections").sort({ createdAt: -1 });
  
      return Response.json(
        { message: "Products Found!", products },
        { status: 200 }
      );
    } catch (err) {
      console.log("error eccured ->", err);
      return Response.json({ message: "Error ECCURED!!" }, { status: 500 });
    }
  }