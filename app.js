const https = require('https');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 5000;
let totalData = '';
let titles = [];
let urls = [];
const urlFolder = './urls';


https.get('https://www.reddit.com/r/aww.json', (resp) => {
    
    let data = '';
    resp.on ('data', (chunk) => {
        data += chunk;
    });

    resp.on('end', () => {
        totalData = JSON.parse(data).data.children;
        totalData.forEach((item) => {
            titles.push(item.data.title);
            urls.push(item.data.url);
        });
        console.log(titles);
        // console.log(urls);

        if(fs.existsSync(urlFolder)) {
            fs.rmdirSync(urlFolder, {recursive: true})
        } else {
            // Create Folder
            fs.mkdir(path.join(__dirname, '/urls'), {}, function(error) {
                if(error) throw error;
                console.log('Folder created');
            })

            // Create and Write to File
            fs.writeFile(path.join(__dirname, '/urls', 'url_list.log'), JSON.stringify(urls), function(error) {
                if(error) throw error;
                console.log('File created');
            });
        }
    });
    

}).on('error', (err) => {
    console.log('Error: ' + err.message);
});




