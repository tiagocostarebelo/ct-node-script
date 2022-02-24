// NODE SCRIPT without AXIOS
const https = require('https');
const path = require('path');
const fs = require('fs');
const urlEndpoint = 'https://www.reddit.com/r/aww.json';
const PORT = process.env.PORT || 5000;
let totalData = '';
let titles = [];
let urls = [];
const urlFolder = './urls';


// https.get(urlEndpoint, (resp) => {
    
//     let data = '';
//     resp.on ('data', (chunk) => {
//         data += chunk;
//     });

//     resp.on('end', () => {
//         totalData = JSON.parse(data).data.children;
//         totalData.forEach((item) => {
//             titles.push(item.data.title);
//             urls.push(item.data.url);
//         });
//         console.log(titles);
        
//         // Create Folder
//         fs.mkdir(path.join(__dirname, '/urls'), {}, function(error) {
//             if(error) throw error;
//             console.log('Folder created');
//         })

//         // Create and Write to File
//         fs.writeFile(path.join(__dirname, '/urls', 'url_list.log'), JSON.stringify(urls), function(error) {
//             if(error) throw error;
//             console.log('File created');
//         });

//         if(fs.existsSync(urlFolder)) {
//             fs.rmdirSync(urlFolder, {recursive: true})
//         } else {
//             // Create Folder
//             fs.mkdir(path.join(__dirname, '/urls'), {}, function(error) {
//                 if(error) throw error;
//                 console.log('Folder created');
//             })

//             // Create and Write to File
//             fs.writeFile(path.join(__dirname, '/urls', 'url_list.log'), JSON.stringify(urls), function(error) {
//                 if(error) throw error;
//                 console.log('File created');
//             });
//         }
//     });    

//     }).on('error', (err) => {
//         console.log('Error: ' + err.message);
// });


// NODE SCRIPT with AXIOS
const axios = require('axios');

axios
    .get(urlEndpoint)
    .then(res => {
        const totalData = res.data.data.children;
        totalData.forEach((item) => {
            titles.push(item.data.title);
            urls.push(item.data.url);
        })
        console.log(titles);
        
        if(fs.existsSync(urlFolder)) {
            fs.rmdirSync(urlFolder, {recursive: true});
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
    }) 
    .catch(err => {
        console.log(err)
    })



    