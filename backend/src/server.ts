import express from "express";
import cors from "cors";

import multer from "multer";
import sharp from "sharp";
import crypto from "crypto";

import { PrismaClient } from "@prisma/client";
import { uploadFile, deleteFile, getObjectSignedUrl } from "./services/aws";

async function main() {
  const app = express();

  app.use(express.static("public"));
  app.use(cors());

  const prisma = new PrismaClient();

  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage });

  const generateFileName = (bytes = 32) =>
    crypto.randomBytes(bytes).toString("hex");

  app.get("/", async (req, res: any) => {
    const posts: any = await prisma.posts.findMany({
      orderBy: [{ created: "desc" }],
    });
    for (let post of posts) {
      post.imageUrl = await getObjectSignedUrl(post.imageName);
    }
    return res.status(200).json(posts).end();
  });

  app.post("/posts", upload.single("image"), async (req: any, res) => {
    const file = req.file;
    const caption = req.body.caption;
    const imageName = generateFileName();

    const fileBuffer = await sharp(file.buffer)
      .resize({ height: 1920, width: 1080, fit: "contain" })
      .toBuffer();

    await uploadFile(fileBuffer, imageName, file.mimetype);

    const post = await prisma.posts.create({
      data: {
        imageName,
        caption,
      },
    });

    return res.status(200).json(post).end()
  });

  app.delete("/api/deletePost/:id", async (req, res) => {
    const id: number = Number(req.params.id);

    const post: any = await prisma.posts.findUnique({ where: { id } });

    console.log(post);

    await deleteFile(post.imageName);

    await prisma.posts.delete({ where: { id: post.id } });
    return;
  });

  app.listen(8000, () => console.log("listening on port 8000"));
}

main();
