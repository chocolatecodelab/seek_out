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
];

module.exports = routes;
