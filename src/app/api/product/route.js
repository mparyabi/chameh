import connectToDB from "@/utils/db";
import ProductModel from "@/models/Product";
import CollectionModel from "@/models/Collection";
import { authUser } from "@/utils/auth";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    connectToDB();
    const user = await authUser();
    if (!user || user.role !== "ADMIN") {
      return Response.json({ message: "YOU ARE NOT ADMIN!!" }, { status: 403 });
    }
    const formData = await req.formData();

    const name = formData.get("name");
    const description = formData.get("description");
    const price = formData.get("price");
    const colors = formData.get("colors")?.split(",");
    const sizes = formData.get("sizes")?.split(",");
    const collections = formData.get("collections");
    const thumbnail = formData.get("thumbnail");
    const images = formData.getAll("images");
    const stock = formData.get("stock");

    // بررسی نوع فایل
    const validImageTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/jpg"
    ];
    if (!validImageTypes.includes(thumbnail.type)) {
      return Response.json(
        { message: "Invalid file type. Only images are allowed." },
        { status: 400 }
      );
    }

    // بررسی اندازه فایل (حداکثر 2 مگابایت)
    const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
    if (thumbnail.size > MAX_FILE_SIZE) {
      return Response.json(
        { message: "File size exceeds 2MB" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await thumbnail.arrayBuffer());
    const filename = Date.now() + thumbnail.name;
    const imgPath = path.join(
      process.cwd(),
      "public/uploads/products/" + filename
    );

    await writeFile(imgPath, buffer);


    
    let imagesArray = [];

    for (let i = 0; i < images.length; i++) {

      if (images[i] instanceof File) {
        const validImageTypes = [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/webp",
          "image/jpg",
        ];
        if (!validImageTypes.includes(images[i].type)) {
          return Response.json(
            { message: "Invalid file type. Only images are allowed." },
            { status: 400 }
          );
        }

        // بررسی اندازه فایل (حداکثر 2 مگابایت)
        const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
        if (images[i].size > MAX_FILE_SIZE) {
          return Response.json(
            { message: "File size exceeds 2MB" },
            { status: 400 }
          );
        }

        // ذخیره تصویر جدید
        const buffer = Buffer.from(await images[i].arrayBuffer());
        const filename = Date.now() + images[i].name;
        const imgPath = path.join(
          process.cwd(),
          "public/uploads/products/" + filename
        );

        await writeFile(imgPath, buffer);

        // به روز رسانی images[i] محصول
        imagesArray.push(`/uploads/products/${filename}`);
      }
    }




    const newProduct = await ProductModel.create({
      name,
      description,
      price,
      colors,
      sizes,
      collections,
      thumbnail: `/uploads/products/${filename}`,
      images: imagesArray,
      stock,
    });

    await CollectionModel.updateMany(
      { _id: { $in: newProduct.collections } }, // فقط کالکشن‌های مرتبط
      { $inc: { count: 1 } } // افزایش مقدار count
    );

    return Response.json(
      { message: "Your product created successfully" },
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
    const user = await authUser();
    if (user.role != "ADMIN") {
      return Response.json({ message: "YOU ARE NOT ADMIN!!" }, { status: 403 });
    }
    const body = await req.json();
    const { id } = body;

    const product = await ProductModel.findById(id);

    if (product) {
      await ProductModel.findByIdAndDelete(id); // حذف محصول
      await CollectionModel.updateMany(
        { _id: { $in: product.collections } },
        { $inc: { count: -1 } } // کاهش مقدار count
      );

      return Response.json(
        { message: "Your product Deleted Successfully" },
        { status: 200 }
      );
    } else {
      return Response.json({ message: "Product Not Found" }, { status: 404 });
    }
  } catch (err) {
    console.log("error eccured ->", err);
    return Response.json({ message: "Error ECCURED!!" }, { status: 500 });
  }
}

// برای آپدیت کالکشن ها و تعداد آن در زیر آمده است

// const updateProduct = async (productId, updateData) => {
//     // پیدا کردن محصول قبلی
//     const product = await Product.findById(productId);

//     if (!product) {
//       throw new Error("Product not found");
//     }

//     // دریافت مجموعه‌های قبلی و جدید
//     const oldCollections = product.collections;
//     const newCollections = updateData.collections || [];

//     // شناسایی مجموعه‌هایی که حذف یا اضافه شده‌اند
//     const collectionsToAdd = newCollections.filter(c => !oldCollections.includes(c));
//     const collectionsToRemove = oldCollections.filter(c => !newCollections.includes(c));

//     // به‌روزرسانی تعداد کالکشن‌ها
//     await Collection.updateMany(
//       { _id: { $in: collectionsToAdd } },
//       { $inc: { count: 1 } } // افزایش شمارش برای کالکشن‌های جدید
//     );

//     await Collection.updateMany(
//       { _id: { $in: collectionsToRemove } },
//       { $inc: { count: -1 } } // کاهش شمارش برای کالکشن‌های حذف شده
//     );

//     // ویرایش محصول
//     const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });
//     return updatedProduct;
//   };
