import { authUser } from "@/utils/auth";
import connectToDB from "@/utils/db";
import OrderModel from "@/models/Order";
import { processPayment } from "@/utils/ProccessPayment";

export async function POST(req) {
  try {
    const user = await authUser();
    if (!user) {
      return new Response(
        JSON.stringify({ message: "only USERS can Order!" }),
        { status: 500 }
      );
    }
    await connectToDB();
    const { items, address, paymentMethod } = await req.json();

    // محاسبه مبلغ کل
    const totalAmount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

       // ایجاد سفارش اولیه با وضعیت پرداخت 'Pending'
       let order = new OrderModel({
        user: user._id,
        items,
        totalAmount,
        address,
        paymentMethod,
        paymentStatus: 'Pending',
        status: 'Pending'
    });

    // ذخیره سفارش اولیه
    order = await order.save();

    // پردازش پرداخت
    const paymentResult = await processPayment(totalAmount, paymentMethod);

    // بررسی نتیجه پرداخت
    if (paymentResult.success) {
        // به‌روزرسانی وضعیت پرداخت به 'Completed' در صورت موفقیت‌آمیز بودن
        order.paymentStatus = 'Completed';
        await order.save();
        return new Response(JSON.stringify({ message: 'Order placed successfully', order }), { status: 201 });
    } else {
        // به‌روزرسانی وضعیت پرداخت به 'Failed' در صورت ناموفق بودن
        order.paymentStatus = 'Failed';
        await order.save();
        return new Response(JSON.stringify({ message: 'Payment failed', order }), { status: 400 });
    }
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
}



export async function GET(req) {
  try {
    await connectToDB();
    
    const user =await authUser();

    if(user.role !== "ADMIN"){
      return new Response(
        JSON.stringify({ message: "You Must Be Admin" }),
        { status: 500 }
      );
    }

    const orders = await OrderModel.find({}).populate("user").sort({ createdAt: -1 }).lean();;

      return new Response(
          JSON.stringify({ message: "Orders Found Successfully", data:orders }),
          { status: 200 }
        );
    

  } catch (err) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
