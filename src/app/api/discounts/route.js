import connectToDB from "@/utils/db";
import DiscountModel from "@/models/Discount";
import { authUser } from "@/utils/auth";

export async function POST(req) {
  try {
    connectToDB();
    const body = await req.json();
    const {
      code,
      description,
      discountType,
      amount,
      startDate,
      endDate,
      usageLimit,
    } = body;

    const isDuplicate = await DiscountModel.findOne({ code });
    if (isDuplicate) {
      return Response.json({ message: "این کد تکراری است" }, { status: 409 });
    }

    await DiscountModel.create({
      code,
      description,
      discountType,
      amount,
      startDate,
      endDate,
      usageLimit,
    });
    return Response.json(
      { message: "Your Discount created successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.log("error eccured ->", err);
    return Response.json({ message: "Error ECCURED!!" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    connectToDB();
    const body = await req.json();
    const { id } = body;

    const user = authUser();
    if (user.role != "ADMIN") {
      Response.json({ message: "You are not admin!" }, { status: 403 });
    }

    await DiscountModel.findByIdAndDelete(id);

    return Response.json(
      { message: "Your Discount Deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.log("error eccured ->", err);
    return Response.json({ message: "Error ECCURED!!" }, { status: 500 });
  }
}


export async function PATCH(req) {
  try {
    connectToDB();
    const body = await req.json();
    const { code } = body;

    const user = authUser();
    if (!user) {
      Response.json({ message: "Login Please" }, { status: 403 });
    }

    const Coupon = await DiscountModel.findOne({code});

    if(!Coupon){
      return Response.json(
        { message: "Your Discount Code Not Available" },
        { status: 404 }
      );
    }

    if(Coupon.endDate < new Date()){
      return Response.json(
        { message: "Your Coupon is expired!" },
        { status: 405 }
      );
    }

    if(Coupon.startDate > new Date()){
      return Response.json(
        { message: "Your Coupon is notavailable yet!" },
        { status: 406 }
      );
    }

    if(Coupon.usageLimit){
      if(Coupon.usedCount >= Coupon.usageLimit){
        return Response.json(
          { message: "Usage Limit is reached!" },
          { status: 400 }
        );
      }
    }

    Coupon.usedCount++;
    Coupon.save();

    return Response.json(
      { message: "Your code is Correct", data:Coupon },
      { status: 200 }
    );


  } catch (err) {
    console.log("error eccured ->", err);
    return Response.json({ message: "Error ECCURED!!" }, { status: 500 });
  }
}
