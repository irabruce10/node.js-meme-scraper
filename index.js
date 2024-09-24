import fs from 'node:fs';

import client from 'node:https';

// fetching Data from URL

fetch('https://memegen-link-examples-upleveled.netlify.app/')
  .then((response) => response.text())

  .then((data) => {
    let regex;
    const urls = [];
    const str = data;

    // Regular expression to extract iregexage URLs from HTML content

    const imageSrcRegex = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;

    while ((regex = imageSrcRegex.exec(str))) {
      urls.push(regex[1]);
    }

    // Limit the array of urls to the first 10

    const imageUrlData = urls.slice(0, 10);

    // Loop over each of the first 10 URLs in the array

    imageUrlData.forEach((url, i) => {
      const content = url;

      const folderExists = fs.existsSync('memes');

      // Create a 'memes' folder if it doesn't exist

      if (folderExists) {
        alert('memes folder already exists');
      } else {
        fs.mkdirSync('memes');
      }
      // Put the image data inside of the file and save it

      function downloadImage(image, filepath) {
        return new Promise((resolve, reject) => {
          client.get(image, (res) => {
            if (res.statusCode === 200) {
              res
                .pipe(fs.createWriteStream(filepath))
                .on('error', reject)
                .once('close', () => resolve(filepath));
            } else {
              res.resume();
              reject(
                new Error(
                  `Request Failed With a Status Code: ${res.statusCode}`,
                ),
              );
            }
          });
        });
      }

      // file name with the leading zero

      if (i >= 9) {
        downloadImage(content, `memes/${i + 1}.jpg`)
          .then(console.log)
          .catch(console.error);
      } else {
        downloadImage(content, `memes/0${i + 1}.jpg`)
          .then(console.log)
          .catch(console.error);
      }
    });
  })
  .catch((error) => {
    console.error(error);
  });
