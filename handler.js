const model = require("./model");
const fs = require("fs");
const util = require("util");
const readdir = util.promisify(fs.readdir);
const { initializeApp, applicationDefault, cert } = require("firebase-admin/app");
const { getFirestore, Timestamp, FieldValue, Filter } = require("firebase-admin/firestore");
const Joi = require("@hapi/joi");

// send photo will be used for ML to folder images
const sendPhotoHandler = async (request, h) => {
  try {
    const db = getFirestore();

    const { photo } = request.payload;

    if (!photo) {
      return h.response("Upload Picture Failed");
    }

    const file = photo;
    const name = file.hapi.filename;
    const path = `./images/isNotFound/${name}`;
    const pathFinder = `images/isNotFound/${name}`;

    // Cek apakah file sudah ada
    const filesInDir = await readdir("./images/isNotFound");
    if (filesInDir.includes(name)) {
      return h.response("File already exists").code(409);
    }

    // Jika tidak ada, simpan file
    const fileStream = fs.createWriteStream(path);
    await file.pipe(fileStream);

    // input to firestore -> MissingPeople
    await db.collection("UserSubmittedPhotos").add({
      foto: `http://localhost:3000/${pathFinder}`,
    });
    return h.response("Upload picture has been success");
  } catch (error) {
    // Log error di konsol atau tempatkan di file log
    console.error("Error occurred while uploading file:", error);

    // Memberikan respons yang lebih ramah pengguna
    return h.response("Something went wrong while uploading the file").code(500);
  }
};

// getAllData
const getAllDataMissingPerHandle = async () => {
  try {
    const db = getFirestore();
    const missingPers = db.collection("MissingPersons");
    const snapshot = await missingPers.get();
    const data = snapshot.docs.map((doc) => doc.data());
    return { pesan: "Data berhasil diambil", data };
  } catch (error) {
    return {
      pesan: "Data gagal disimpan",
      error,
    };
  }
};



module.exports = {
  sendPhotoHandler,
  getAllDataMissingPerHandle,
};

