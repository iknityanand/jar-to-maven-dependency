var fs = require('fs');
var fileList = {
    getFileList: (jarFolderPath, callback) => {
        fs.readdir('/codeshots/jars/', (err, files) => {
            if(err){
                callback(err)
            }else{
                callback(err, files)
            }
        })
    }
}

module.exports = fileList