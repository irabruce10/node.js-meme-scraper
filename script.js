import fetch from 'node-fetch';

import fs from 'node:fs';

import client from 'node:https';

fetch('https://memegen-link-examples-upleveled.netlify.app/')
  .then((response) => response.text())
  .then((data) => {
    let m;
    const urls = [];
    const str = data;

    const rex = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;

    while ((m = rex.exec(str))) {
      urls.push(m[1]);
    }

    urls.slice(0, 10).forEach((x, i) => {
      const imageData = x;
      console.log(imageData, i + 1);

      function downloadImage(url, filepath) {
        return new Promise((resolve, reject) => {
          client.get(url, (res) => {
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
      downloadImage(imageData, `memes/0${i + 1}.jpg`)
        .then(console.log)
        .catch(console.error);
    });
  })
  .catch((error) => {
    console.error(error);
  });
