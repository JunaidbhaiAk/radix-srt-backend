import fs from "fs";
import path from "path";

const baseDir = path.resolve();
export const getAllFiles = (req, res) => {
  try {
    let data = JSON.parse(fs.readFileSync("./uploads/data.json"));
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const saveFile = (req, res) => {
  try {
    let preData = JSON.parse(fs.readFileSync("./uploads/data.json"));
    let len = preData.files.length;
    const staticName = req.name.split(".")[0];
    const createdAt = staticName.split("-")[0];
    const newFile = {
      id: len + 1,
      videoFile: `${staticName}.mp4`,
      vttFile: `${staticName}.json`,
      createdAt,
    };
    preData.files.push(newFile);
    fs.writeFileSync("./uploads/data.json", JSON.stringify(preData));
    res.status(200).json("Added Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getVideoStream = (req, res) => {
  const { id } = req.params;
  let data = JSON.parse(fs.readFileSync("./uploads/data.json"));

  let exists = data.files.some((el) => el.id === Number(id));
  if (!exists) return res.status(404).json({ msg: "Data Not Found" });
  const idx = data.files.findIndex((ele) => ele.id === Number(id));
  const dynamicPath = path.join(baseDir, "uploads", data.files[idx].videoFile);
  res.setHeader("Content-Type", "video/mp4");

  // Send the file as the response
  res.sendFile(dynamicPath, (err) => {
    if (err) {
      console.error(err);
      res.status(err.status).end();
    } else {
      console.log("File sent successfully");
    }
  });
};

export const getSubFile = (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    let data = JSON.parse(fs.readFileSync("./uploads/data.json"));
    let exists = data.files.some((el) => el.id === Number(id));
    if (!exists) return res.status(404).json({ msg: "Data Not Found" });
    const idx = data.files.findIndex((ele) => ele.id === Number(id));
    const dynamicPath = path.join(baseDir, "uploads", data.files[idx].vttFile);
    const currSub = JSON.parse(fs.readFileSync(dynamicPath));
    res.status(200).json(currSub);
  } catch (error) {
    res.status(500).json(error);
  }
};
