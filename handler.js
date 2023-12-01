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

// Data penyimpanan sementara
const dataOrangHilang = [];

// Handler untuk menambah data orang hilang
const tambahDataOrangHilangHandler = (request, h) => {
  // Mendapatkan data dari payload permintaan
  const { nama, umur, tinggi, beratBadan, ciriFisik, terakhirBertemu, nomorDinas, seringDitemukanDimana, foto, isKetemu } = request.payload;

  // Membuat objek data baru
  const newOrangHilang = {
    nama,
    umur,
    tinggi,
    beratBadan,
    ciriFisik,
    terakhirBertemu,
    nomorDinas,
    seringDitemukanDimana,
    foto,
    isKetemu,
  };

  // Menambahkan data baru ke dalam penyimpanan sementara
  dataOrangHilang.push(newOrangHilang);

  // Mengirim respons ke klien
  return h.response({ message: "Data orang hilang berhasil ditambahkan", data: newOrangHilang }).code(201);
};

// Handler untuk mengedit data orang hilang
const editDataOrangHilangHandler = (request, h) => {
  // Mendapatkan ID data dari parameter URL
  const orangHilangId = request.params.id;

  // Mendapatkan data baru dari payload permintaan
  const { nama, umur, tinggi, beratBadan, ciriFisik, terakhirBertemu, nomorDinas, seringDitemukanDimana, foto, isKetemu } = request.payload;

  // Membuat objek data yang telah diedit
  const editedOrangHilang = {
    nama,
    umur,
    tinggi,
    beratBadan,
    ciriFisik,
    terakhirBertemu,
    nomorDinas,
    seringDitemukanDimana,
    foto,
    isKetemu,
  };

  // Mengganti data lama dengan data yang telah diedit
  dataOrangHilang[orangHilangId] = editedOrangHilang;

  // Mengirim respons ke klien
  return h.response({ message: "Data orang hilang berhasil diubah", data: editedOrangHilang }).code(200);
};

// Handler untuk menghapus data orang hilang
const hapusDataOrangHilangHandler = (request, h) => {
  // Mendapatkan ID data dari parameter URL
  const orangHilangId = request.params.id;

  // Menghapus data berdasarkan ID
  const deletedData = dataOrangHilang.splice(orangHilangId, 1);

  // Mengirim respons ke klien
  return h.response({ message: "Data orang hilang berhasil dihapus", data: deletedData }).code(200);
};

module.exports = {
  sendPhotoHandler,
  getAllDataMissingPerHandle,
  tambahDataOrangHilangHandler,
  editDataOrangHilangHandler,
  hapusDataOrangHilangHandler,
  dataOrangHilang,
};

module.exports = {};
