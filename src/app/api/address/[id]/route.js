import connectToDB from "@/utils/db";
import UserModel from "@/models/User";
import AddressModel from "@/models/Address";
import { authUser } from "@/utils/auth";

export async function POST(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    const { province, city, streetAddress, phoneNumber, postalCode } = body;
    await connectToDB();

    // const reqUser=await authUser(); 
    // if (!reqUser){
    //   return new Response(JSON.stringify({ message: "Login First!" }), {
    //     status: 404,
    //   });
    // }

    const user = await UserModel.findById(id, "-__v");

    if (!user) {
      return new Response(JSON.stringify({ message: "USER not Found!" }), {
        status: 404,
      });
    }

    
    // if(reqUser._id.toString() !== user._id.toString()){
    //   return new Response(JSON.stringify({ message: "You Can Not Create Adress For Others!!" }), { status: 403 });
    //   }

    const address = await AddressModel.create({
      province,
      city,
      streetAddress,
      phoneNumber,
      postalCode,
    });

    // Add the new address ID to the user's addresses array
    user.addresses.push(address._id);
    await user.save();

    return new Response(
      JSON.stringify({ message: "Address added successfully", address }),
      { status: 201 }
    );
  } catch (err) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}


export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const { addressId } = await req.json(); // دریافت آدرس آیدی از body درخواست
    await connectToDB();

    const reqUser=await authUser(); 

    if (!reqUser){
      return new Response(JSON.stringify({ message: "Login First!" }), {
        status: 404,
      });
    }

    // یافتن کاربر با استفاده از userId
    const user = await UserModel.findById(id, '-__v');

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found!" }), { status: 404 });
    }

    if(reqUser._id.toString() !== user._id.toString()){
      return new Response(JSON.stringify({ message: "You Can Not Delete Other User Adress!!" }), { status: 403 });
      }

    // بررسی وجود addressId در addresses کاربر
    if (!user.addresses.includes(addressId)) {
      return new Response(JSON.stringify({ message: "Address not found in user's addresses!" }), { status: 404 });
    }

    // حذف آدرس از آرایه addresses کاربر
    user.addresses = user.addresses.filter(id => id.toString() !== addressId);
    await user.save();

    // حذف خود آدرس از پایگاه‌داده
    await AddressModel.findByIdAndDelete(addressId);

    return new Response(JSON.stringify({ message: "Address deleted successfully" }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), { status: 500 });
  }
}

