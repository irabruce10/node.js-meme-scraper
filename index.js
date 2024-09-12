import fetch from 'node-fetch';

import fs from 'node:fs';

// import client from 'node:https';

await fetch('https://memegen-link-examples-upleveled.netlify.app/')
  .then((response) => response.text())
  .then((data) => {
    let m;
    const urls = [];
    const str = data;

    const rex = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;

    while ((m = rex.exec(str))) {
      urls.push(m[1]);
    }

    const imageUrlData = urls.slice(0, 10);
    console.log(imageUrlData);

    imageUrlData.forEach((url, i) => {
      console.log(url);
      const content = url;

      if (i >= 9) {
        fs.writeFileSync(`memes/${i + 1}.jpg`, content);
      } else {
        fs.writeFileSync(`memes/0${i + 1}.jpg`, content);
      }
    });

    // loop the 10url
    // and download the images to the 'memes' directory, naming them sequentially from 1 to 10.

    // urls.slice(0, 10).forEach(function (x, i) {
    //   const imageData = x;
    //   console.log(imageData, i + 1);

    //   function downloadImage(url, filepath) {
    //     return new Promise((resolve, reject) => {
    //       client.get(url, (res) => {
    //         if (res.statusCode === 200) {
    //           res
    //             .pipe(fs.createWriteStream(filepath))
    //             .on('error', reject)
    //             .once('close', () => resolve(filepath));
    //         } else {
    //           res.resume();
    //           reject(
    //             new Error(
    //               `Request Failed With a Status Code: ${res.statusCode}`,
    //             ),
    //           );
    //         }
    //       });
    //     });
    //   }

    //   if (i >= 9) {
    //     downloadImage(imageData, `memes/${i + 1}.jpg`)
    //       .then(console.log)
    //       .catch(console.error);
    //   } else {
    //     console.log('Downloading ');
    //     downloadImage(imageData, `memes/0${i + 1}.jpg`)
    //       .then(console.log)
    //       .catch(console.error);
    //   }
    // });
  })
  .catch((error) => {
    console.error(error);
  });

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
