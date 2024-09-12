# Node.js Meme Scraper

## TODOs

- [x] Clone the repository
- [x] Create a repository
- [x] Create a readme
- [x] Set up ESLint config
- [x] Create a .gitignore file and ignore the images by adding memes
- [x] Create the memes folder
- [x] Connect to [memegen-link-examples-upleveled.netlify.app](https://memegen-link-examples-upleveled.netlify.app/)
- [x] Research methods to make request in Node.js
  - [x] should we use a fetch request?
  - [x] is this the same as connecting?
- [x] Create a variable with the html string from the website
- [x] From the html, extract all of the img src attributes (array of strings = array of urls)
- [x] Limit the array of urls to the first 10 (maybe this can be done with the previous step)
- [x] Loop over each of the first 10 URLs in the array
  - [x] Request the image URL
  - [x] Save the image data in a variable
  - [x] Create the file name with the leading zero
  - [x] Create the file with the file name
  - [x] Put the image data inside of the file
- [x] Test that the program runs multiple times without errors
