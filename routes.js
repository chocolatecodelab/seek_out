const { sendPhotoHandler, getPhotoHandler } = require('./handler');

const routes = [
    {
        method: 'GET',
        path: '/find',
        handler: getPhotoHandler
    },
    {
        method: 'POST',
        path: '/find',
        config: {
            payload: {
                output: 'stream',
                parse: true,
                multipart: true,
            }
        },
        handler: sendPhotoHandler,
    },
]

module.exports = routes;