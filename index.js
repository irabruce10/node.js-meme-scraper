import fetch from 'node-fetch';

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

    const slicedArray = urls.slice(0, 10).map((x) => {
      const imageData = x;
      console.log(imageData);
    });

    // console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });
