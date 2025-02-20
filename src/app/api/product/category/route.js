import connectToDB from "@/utils/db";
import CollectionModel from "@/models/Collection";
import { authUser } from "@/utils/auth";
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";

export async function GET(req) {
  try {
    await connectToDB();
    const categories = await CollectionModel.find();

    return Response.json(
      { message: "Categories Found!", data: categories },
      { status: 200 }
    );
  } catch (err) {
    console.log("error eccured ->", err);
    return Response.json({ message: "Error ECCURED!!" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectToDB();

    const body = await req.json();
    const { id } = body;
    const user = await authUser();

    if (user.role !== "ADMIN") {
      return Response.json({ message: "ONLY ADMIN" }, { status: 500 });
    }

    const collection = await CollectionModel.findById(id);
    const oldImgPath = path.join(process.cwd(), "public", collection.thumbnail);

    if (fs.existsSync(oldImgPath)) {
      fs.unlinkSync(oldImgPath); // Remove the old image from disk
    }

    //await CollectionModel.findByIdAndDelete(id);

    return Response.json(
      { message: "Category Deleted Successfully!" },
      { status: 200 }
    );
  } catch (err) {
    console.log("error eccured ->", err);
    return Response.json({ message: "Error ECCURED!!" }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    await connectToDB();

    const formData = await req.formData();
    const id = formData.get("id");
    const name = formData.get("name");
    const description = formData.get("description");
    const thumbnail = formData.get("thumbnail");

    const user = await authUser();
    if (user.role !== "ADMIN") {
      return Response.json({ message: "ONLY ADMIN" }, { status: 500 });
    }

    const collection = await CollectionModel.findById(id);

    if (!collection) {
      return Response.json(
        { message: "Collection not found" },
        { status: 404 }
      );
    }

    if (thumbnail instanceof File) {
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

      if (collection.thumbnail && thumbnail.size > 0) {
        const oldImgPath = path.join(
          process.cwd(),
          "public",
          collection.thumbnail
        );
        if (fs.existsSync(oldImgPath)) {
          fs.unlinkSync(oldImgPath); // Remove the old image from disk
        }
      }

      // ذخیره تصویر جدید
      const buffer = Buffer.from(await thumbnail.arrayBuffer());
      const filename = Date.now() + thumbnail.name;
      const imgPath = path.join(
        process.cwd(),
        "public/images/collections/" + filename
      );

      await writeFile(imgPath, buffer);
      
          // به روز رسانی thumbnail محصول
    collection.thumbnail = `/images/collections/${filename}`;
    }


    // بروزرسانی سایر فیلدها
    collection.name = name || collection.name;
    collection.description = description || collection.description;

    await collection.save();

    const UpdatedCollection = await CollectionModel.findById(id);

    return Response.json(
      { message: "Category Edited Successfully!", data: UpdatedCollection },
      { status: 200 }
    );
  } catch (err) {
    console.log("error eccured ->", err);
    return Response.json({ message: "Error ECCURED!!" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectToDB();

    const user = await authUser();
    if (!user || user.role !== "ADMIN") {
      return Response.json({ message: "YOU ARE NOT ADMIN!!" }, { status: 403 });
    }

    const formData = await req.formData();

    const name = formData.get("name");
    const description = formData.get("description");
    const thumbnail = formData.get("thumbnail");

    // بررسی نوع فایل
    const validImageTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/jpg",
      "image/JPG",
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
      "public/images/collections/" + filename
    );

    await writeFile(imgPath, buffer);

    const collection = await CollectionModel.create({
      name,
      description,
      thumbnail: `/images/collections/${filename}`,
    });

    return Response.json(
      { message: "Category Created Successfully!", data: collection },
      { status: 200 }
    );
  } catch (err) {
    console.log("error eccured ->", err);
    return Response.json({ message: "Error ECCURED!!" }, { status: 500 });
  }
}
