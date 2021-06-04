import { useEffect, useState } from "react";
import CatchaImage from "./CatchaImage";

const sources = collectImages(require.context('./images/grid_separated', false, /\.(png|jpe?g|svg)$/));

/* 
 * ==============================================================
 * Component to show a grid of random images, without repeating an image.
 * ==============================================================
 */
 function CatchaImageGrid(props) {

  const numGrids = props.numGrids;
  /* 
   * Set up the grid and get the images
   */
 	const gridSize = props.gridSize;
 	const gridImages = [];

  /* 
   * Randomly sort the order of the images shown on the gridso they don't repeat until all the images have been shown.
   */

   //First load data from local storage, or else initialize empty arrays
   var [imageNumbers, setImageNumbers] = useState(
      JSON.parse(localStorage.getItem('RandomizedImageNumbers')) ||
      fillWithRandomNumbers(numGrids)
    );

  //store randomized order in local storage when imageNumbers is updated
  useEffect(() => {
    localStorage.setItem("RandomizedImageNumbers", JSON.stringify(imageNumbers));
  });

  //is there at least the same number of elements in the imageNumbers arrays as the grid size?
  if(imageNumbers.length < gridSize) {

    //if not, regenerate the random number array so there is enough random numbers to select images for the grid
    imageNumbers = fillWithRandomNumbers(numGrids);
    setImageNumbers(imageNumbers);

  }

  //lets take one of the randomly sorted images off the front of the array to show on the CATCHA
  var currentImage = imageNumbers.shift();

  /* 
   * Create the <div> and insert an image on the image grid for each index
   */
   for(let imageIndex=1; imageIndex <= gridSize; imageIndex++){

    var imageSrc = "grid"+ String(currentImage).padStart(2, '0') + "_" + String(imageIndex).padStart(2, '0') + ".jpg";

    /*
     * Get one of the random numbers off the front of the array
     * Filenames are written like "cat_01.jpg"
     * So format filenumbers to be exactly 2 digits (ex. 01, 11, 04 etc) for the filenames
     // */
     // let fileNumber = String(imageNumbers.shift()).padStart(2, '0');

    /*
     * Create the <div> and insert a random image on the image grid;
     */
     gridImages.push(
        <CatchaImage imageIndex={imageIndex} key={imageIndex} source={sources[imageSrc]} />
     );
 }

 return <div key="" className="catcha-images">{gridImages}</div>;
}

/*
 * Fill an array with random numbers that don't repeat.
 */
function fillWithRandomNumbers(numElements) {

  var randomNumbersArray = [];

  for(let i=0; i<numElements; i++) {

    /* 
     * Generate a random number between [1, total number of elements]
     */
    var num = randomNumber(numElements);

    //Has the random number already been chosen? If it has, choose another number
    while(randomNumbersArray.includes(num)) {
      num = randomNumber(numElements);
    }

    //Add random number to the array
    randomNumbersArray.push(num);

  }

  return randomNumbersArray;

}

/* 
 * Generate a random number
 */
 function randomNumber(maxNumber) {
  var randomNumber = Math.floor((Math.random() * maxNumber) + 1);
  return randomNumber;
}

/* 
 * Load images from a folder
 */
 function collectImages(r) {

  let images = {};
  r.keys().map((item, index) => ( images[item.replace('./', '')] = r(item) ));
  return images;

 }

export default CatchaImageGrid;