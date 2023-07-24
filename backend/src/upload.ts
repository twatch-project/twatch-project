// import express from "express"
// import multer from "multer";
// import sharp from "sharp";

// async function main() {
//     const app = express();

//     const storage = multer.memoryStorage();
//     const upload = multer({ storage: storage });

//     app.post("/upload", upload.fields([{name: "image", maxCount: 1}, {name: "content"}]), async (req, res) => {
//         if (!req.files) {
//             return res.status(400).end()
//         }

//         const img = req.files["image"]
//         const contents = req.files["content"]

//         // const contentsBuffers: Buffer[] = await Promise.all(contents.map(async(content): Promise<Buffer> =>  {
//         //     return sharp(content.buffer)
//         //     .resize({ height: 1920, width: 1080, fit: "contain" })
//         //     .toBuffer();
//         // }))

//         return res.status(200).end();
//     })

//     app.listen(8000, () => {
//         console.log("listenting on 8000")
//     })

// main()
