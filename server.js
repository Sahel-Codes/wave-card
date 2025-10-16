import express from "express";
import multer from "multer";
import cors from "cors";
import fs from "fs";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

const upload = multer({ dest: "public/uploads/" });

app.post("/update", upload.single("logo"), (req, res) => {
  const { name, address } = req.body;
  let logoPath = req.file ? `/uploads/${req.file.filename}` : null;

  const data = { name, address, logo: logoPath };
  fs.writeFileSync("public/data.json", JSON.stringify(data, null, 2));

  res.json({ message: "Profile updated successfully!", data });
});

app.get("/data", (req, res) => {
  if (fs.existsSync("public/data.json")) {
    const data = JSON.parse(fs.readFileSync("public/data.json"));
    res.json(data);
  } else {
    res.json({
      name: "InfoSaathi Education Center",
      address: "SahelCodes, AI & ML Developer",
      logo: "logo.jpg",
    });
  }
});

app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
