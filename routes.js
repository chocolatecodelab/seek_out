const { sendPhotoHandler, getAllDataMissingPerHandle, tambahDataOrangHilangHandler, editDataOrangHilangHandler, hapusDataOrangHilangHandler } = require("./handler");

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
];

module.exports = routes;
