const { sendPhotoHandler, getAllDataMissingPerHandle, tambahDataOrangHilangHandler, editDataOrangHilangHandler, hapusDataOrangHilangHandler, dataOrangHilang } = require("./handler");

const routes = [
  {
    method: "GET",
    path: "/find",
    handler: getAllDataMissingPerHandle,
  },
  {
    method: "POST",
    path: "/find",
    config: {
      payload: {
        output: "stream",
        parse: true,
        multipart: true,
      },
    },
    handler: sendPhotoHandler,
  },
  {
    method: "POST",
    path: "/tambah-orang-hilang",
    handler: tambahDataOrangHilangHandler, // Rute untuk menambah data orang hilang
  },
  {
    method: "PUT",
    path: "/edit-orang-hilang/{id}",
    handler: editDataOrangHilangHandler, // Rute untuk mengedit data orang hilang
  },
  {
    method: "DELETE",
    path: "/hapus-orang-hilang/{id}",
    handler: hapusDataOrangHilangHandler, // Rute untuk menghapus data orang hilang
  },
  {
    method: "GET",
    path: "/data-orang-hilang",
    handler: (request, h) => {
      return h.response({ data: dataOrangHilang }).code(200); // Rute untuk mendapatkan data orang hilang
    },
  },
];

module.exports = routes;
