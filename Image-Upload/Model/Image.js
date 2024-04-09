const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'imageupload'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ', err);
        return;
    }
    console.log('Connected to MySQL database');
});

function insertImage(imageName, imageType, imagePath, callback) {
    const query = 'INSERT INTO images (imageName, imageType, imagePath) VALUES (?, ?, ?)';
    connection.query(query, [imageName, imageType, imagePath], (err, results) => {
        if (err) {
            console.error('Error inserting image into database: ', err);
            return callback(err);
        }
        console.log('Image inserted into database.');
        callback(null, results);
    });
}

module.exports = {
    insertImage
};
