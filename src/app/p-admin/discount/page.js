import connectToDB from "@/utils/db";
import Form from "./form";
import AdminDiscountTable from "./table";
import DiscountModel from "@/models/Discount";

const Discount = async () => {
  await connectToDB();
  const discounts = await DiscountModel.find().sort({ _id: -1 }).lean();
  return (
    <>
      <Form />
      <AdminDiscountTable discounts={discounts} />
    </>
  );
};

export default Discount;
