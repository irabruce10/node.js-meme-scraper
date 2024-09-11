import fetch from 'node-fetch';

import fs from 'node:fs';

// eslint-disable-next-line import-x/no-unresolved
import client from 'node:https';

// eslint-disable-next-line @typescript-eslint/no-require-imports

const getData = await fetch(
  'https://memegen-link-examples-upleveled.netlify.app/',
)
  .then((response) => response.text())
  .then((data) => {
    let m,
      urls = [],
      str = data;

    const rex = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;

    while ((m = rex.exec(str))) {
      urls.push(m[1]);
    }

    urls.slice(0, 10).map((x, i) => {
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
              // Consume response data to free up memory
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

      // const content = 'hello!';

      // try {
      //   if (i >= 9) {
      //     fs.writeFileSync(`memes/${i + 1}.jpg`, content);
      //   } else {
      //     fs.writeFileSync(`memes/0${i + 1}.jpg`, content);
      //   }

      //   // file written successfully
      // } catch (err) {
      //   console.error(err);
      // }

      // imageData.forEach((el) => {
      //   const content = 'hello!';
      //   const p = el;

      //   try {
      //     fs.writeFileSync(`memes/${p.length}.jpg`, content);
      //     // file written successfully
      //   } catch (err) {
      //     console.error(err);
      //   }
      // });
    });

    // console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });
