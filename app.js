const fileList = require('./fileList');
const axios = require('axios');

const jarFolderPath = "/codeshots/jars/";

function getDependencies(files) {
    var promise = new Promise((resolve, reject) => {
        const dependencies = files.map((file) => {
            let artifactId = file.substring(0, file.lastIndexOf('-'));
            let version = file.substring(file.lastIndexOf('-') + 1, file.lastIndexOf('.'));
            let mavenSearchUrl = 'http://search.maven.org/solrsearch/select?q=a:%22' + artifactId + '%22&rows=20&wt=json'

            console.log({
                artifactId: artifactId,
                version: version
            })

            axios.get(mavenSearchUrl).then((response) => {
                if (response.data.response.numFound < 2 && response.data.response.numFound > 0) {
                    let repogroupId = response.data.response.docs[0].g;
                    return {
                        groupId: repogroupId,
                        artifactId: artifactId,
                        version: version
                    }
                }
            }).catch((error) => {
                console.log(error);
                return error;
            })
        });

        if (dependencies) {
            console.log(dependencies)
            resolve(dependencies)
        }
    })
}

fileList.getFileList(jarFolderPath, (err, files) => {

    const dependencies = files.map((file) => {
        return new Promise(resolve => setTimeout(() => resolve(file * 2), 100));
    });

    var results = Promise.all(dependencies); // pass array of promises

    results.then(data => // or just .then(console.log)
        console.log(data)
    );

    getDependencies(files);

})