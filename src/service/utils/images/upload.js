const { Storage } = require('@google-cloud/storage');
const { format } = require('util');
const path = require("path")
module.exports = ({ bucketName, projectId }, keyFilename) => {
    // Instantiate a storage client
    const storage = new Storage({ keyFilename, projectId });
    // A bucket is a container for objects (files).
    const bucket = storage.bucket(bucketName);
    return async (file) => {
        // Create a new blob in the bucket and upload the file data.
        console.log(file, "filename")
        const blob = bucket.file(file.filename)
        const blobStream = blob.createWriteStream({
        //resumable: false,
            metadata: {
            contentType: file.mimetype,
            },
        public: true // torna o objeto público
        });

        blobStream.on('error', err => {
            console.log(err)
            throw Error(err)
        });

        blobStream.on('finish', () => {
            console.log("finish") 
        });

        blobStream.end(file.buffer);
        file.url = format(
            `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );
        return file
    }
}


//const url = "https://storage.googleapis.com/user-images-c_137/"

