import connectToDB from "@/utils/db";
import ProductModel from "@/models/Product";
import CollectionModel from "@/models/Collection";
import { authUser } from "@/utils/auth";
import { writeFile, existsSync } from "fs/promises";
import path from "path";
import fs from "fs";

export async function GET(req, { params }) {
  try {
    await connectToDB();
    const { id } = params;
    const product = await ProductModel.findById(id, "-__v");

    return Response.json(
      { message: "Product Found!", data: product },
      { status: 200 }
    );
  } catch (err) {
    console.log("error eccured ->", err);
    return Response.json({ message: "Error ECCURED!!" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectToDB();
    const { id } = params;
    const user = await authUser();

    if (user.role == "ADMIN") {
      await ProductModel.findByIdAndDelete(id);
      return Response.json(
        { message: "Product Deleted Successfully!" },
        { status: 200 }
      );
    } else {
      return Response.json({ message: "You are not admin!" }, { status: 500 });
    }
  } catch (err) {
    console.log("error eccured ->", err);
    return Response.json({ message: "Error ECCURED!!" }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    await connectToDB();

    const user = await authUser();
    if (!user || user.role !== "ADMIN") {
      return Response.json({ message: "YOU ARE NOT ADMIN!!" }, { status: 403 });
    }

    const { id } = params;
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

    const product = await ProductModel.findById(id);
    if (!product) {
      return Response.json({ message: "Product not found" }, { status: 404 });
    }

    if (thumbnail instanceof File) {
      if (product.thumbnail && thumbnail.size > 0) {
        // const oldImgPath = path.join(process.cwd(), 'public', product.thumbnail);
        // if (fs.existsSync(oldImgPath)) {
        //   fs.unlinkSync(oldImgPath); // Remove the old image from disk
        // }

        // بررسی نوع فایل
        const validImageTypes = [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/webp",
          "image/jpg",
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

        // ذخیره تصویر جدید
        const buffer = Buffer.from(await thumbnail.arrayBuffer());
        const filename = Date.now() + thumbnail.name;
        const imgPath = path.join(
          process.cwd(),
          "public/uploads/products/" + filename
        );

        await writeFile(imgPath, buffer);

        // به روز رسانی thumbnail محصول
        product.thumbnail = `/uploads/products/${filename}`;
      }
    }

    let imagesArray = [];

    for (let i = 0; i < images.length; i++) {
      if (typeof images[i] === "string") {
        imagesArray.push(images[i]);
      }

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

    // بروزرسانی سایر فیلدها
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.colors = colors || product.colors;
    product.sizes = sizes || product.sizes;
    product.collections = collections || product.collections;
    product.stock = stock || product.stock;
    product.images = imagesArray || product.images;

    // ذخیره تغییرات محصول
    await product.save();

    return Response.json(
      { message: "Product Edited successfully!" },
      { status: 200 }
    );
  } catch (err) {
    console.log("error eccured ->", err);
    return Response.json({ message: "Error ECCURED!!" }, { status: 500 });
  }
}
