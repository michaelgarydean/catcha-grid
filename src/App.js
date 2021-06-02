import './App.scss';
import React, { useEffect, useState } from "react";

/* Load images from the folders */
const catchaCatImages = collectImages(require.context('./images/cats', false, /\.(png|jpe?g|svg)$/));
const catchaCarImages = collectImages(require.context('./images/cars', false, /\.(png|jpe?g|svg)$/));
const catchaIcons = collectImages(require.context('./images/icons', false, /\.(png|jpe?g|svg)$/));

//console.log(JSON.stringify(catchaCatImages, null, 2));

/*
 * Render the webpage with the app
 */
 function App() {

  /* 
   * Store which image type has been used for the CATCAH (cars or cats)
   * 0 - is for cats
   * 1 - is for cars
   */

// Before setting a default value, try to get it from local storage.
// If it exists, reset, update the value (using !)
  const [imageType, setImageType] = useState(() => (
    (!JSON.parse(localStorage.getItem('imageType')) || 0)
  ));

  //store image type in local storage
  useEffect(() => {
  	localStorage.setItem("imageType", JSON.stringify(imageType));
  });


  return (
	  	<div className="App">

	  	<div className="centered-container">
	  	<div className="catcha-outer-border">

	  	<div className="catcha-interior-elements-container">

        <div className="catcha-top-elements-container">

          {/* Header */}
          <div className="catcha-header">
            <p>Select all images with</p>
            {/* If imageType is 0, show cats, otherwise, show cars. */}
            <h2>{imageType ? "cars" : "cats"}</h2>
            <p>Click verify once there are none left.</p>
          </div>

            {/* Grid of images */}
            {/* If imageType is 0, show cats, otherwise, show cars. */}
            <CatchaImageGrid imageType={imageType} />

          </div> {/* end catcha-top-elements-container */}

          {/* Bottom of catcha */}
          <div className="catcha-footer">
            <span className="icon-size-aligner"></span>
            <div className="catcha-icons">
            <div className="icon"><img src={catchaIcons['refresh_2x.png'].default} alt="refresh icon" /></div>
            <div className="icon"><img src={catchaIcons['audio_2x.png'].default} alt="audio icon" /></div>
            <div className="icon"><img src={catchaIcons['info_2x.png'].default} alt="info icon" /></div>
          </div>
          <SubmitButton />
          </div>

        </div> {/* end catcha-interior-elements-container */}
		</div>

		</div>


		<div className="image-placeholder">
		</div>

		</div>
		);
}

/* 
 * ==============================================================
 * Component for the submit button and it's behaviours.
 * ==============================================================
 */
 function SubmitButton() {

  /*
   * State variables
   * isSubmitting: Behavior to change while the "submitting process" is taking place. 
   * This is just for user feedback to see their action having an effect.
   */
   const [isSubmitting, setSubmitting] = useState(false);

   return (
	   	<div className="button-container">
		   {/* Before refreshing the page, change the image type for show the next type when the page refreshes  refreshPage() */}
		   <button className={isSubmitting ? "verify-button button-on-submit" : "verify-button" } onClick={() => {setSubmitting(true); refreshPage()}}>VERIFY</button>
	   </div>
   );

}

/* 
 * When the verify button is clicked, show a new set of random images.
 */  
 function refreshPage() {
 	window.location.reload(false);
 }

/* 
 * Load images from a folder
 */
 function collectImages(r) {

 	let images = {};
 	r.keys().map((item, index) => ( images[item.replace('./', '')] = r(item) ));
 	return images;

 }

/* 
 * ==============================================================
 * Component to show a grid of random images, without repeating an image.
 * ==============================================================
 */
 function CatchaImageGrid(props) {

  /* 
   * Store a list of random numbers for each type of image, so they don't repeat until all the iamges
   * in the image folders have been shown.
   */

   //First load data from local storage, or else initialize empty arrays
   const [imageNumbersCats, setImageNumbersCats] = useState(
      JSON.parse(localStorage.getItem('imageNumbersCats')) ||
      fillWithRandomNumbers(Object.keys(catchaCatImages).length)
    );
   const [imageNumbersCars, setImageNumbersCars] = useState(
      JSON.parse(localStorage.getItem('imageNumbersCars')) ||
      fillWithRandomNumbers(Object.keys(catchaCarImages).length)
    );

  //store image type in local storage when either imageNumbersCats, or imageNumbersCars is updated
  useEffect(() => {
    localStorage.setItem("imageNumbersCats", JSON.stringify(imageNumbersCats));
    localStorage.setItem("imageNumbersCars", JSON.stringify(imageNumbersCars));
  });


  /* 
   * Set up the grid and get the images for either Cats or Cars, depending on which image type is selected.
   */
 	const gridSize = 9;
 	const gridImages = [];

 	const images = props.imageType ? catchaCarImages : catchaCatImages;
  var imageNumbers = props.imageType ? imageNumbersCars : imageNumbersCats;

  //is there at least the same number of elements in the imageNumbers arrays as the grid size?
  if(imageNumbers.length < gridSize) {

    //if not, regenerate the random number array so there is enough random numbers to select images for the grid
    imageNumbers = fillWithRandomNumbers(Object.keys(images).length);

    //if the image type is 'cars', then update the local storage for 'cars'
    if(props.imageType) {
      setImageNumbersCars(imageNumbers);
    }

  //if the image type is 'cats', then update the local storage for 'cats'
    if(!props.imageType) {
      setImageNumbersCats(imageNumbers);

    }

  }

  /* 
   * Create the <div> and insert a random image on the image grid for each index
   */
   for(let imageIndex=1; imageIndex <= gridSize; imageIndex++){

    /*
     * Get one of the random numbers off the front of the array
     * Filenames are written like "cat_01.jpg"
     * So format filenumbers to be exactly 2 digits (ex. 01, 11, 04 etc) for the filenames
     */
     let fileNumber = String(imageNumbers.shift()).padStart(2, '0');

    /*
     * Create the <div> and insert a random image on the image grid;
     */
     gridImages.push(
      <CatchaImage fileNumber={fileNumber} imageIndex={imageIndex} images={images} imageType={props.imageType} key={imageIndex} />
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
 * =================================== 
 * Component for a single CATCHA image.
 * ===================================
 */
 function CatchaImage(props) {

 	//filename of the image to load, depending on which folder it's coming from - cars or cats.
 	var fileName = (props.imageType ? "cars" : "cats") + "_" + props.fileNumber + ".jpg";

  /*
   * State variables
   * isSelected: so we know if the image has been clicked or not. Not clicked by default.
   */
   const [isSelected, setSelected] = useState(false);
   const [isLoaded, setLoaded] = useState(false);

  /*
   * Add a class "image-is-clicked" if the image has been clicked to resize the image and show the checkmark.
   * The <span> element is just used to vertically align the image (both set to inline-block).
   */
   return (
	   	<div id={"image" + props.imageIndex} className="catcha-single-image" key={"image-div" + props.imageIndex}>
		   	{!isLoaded && <div className="hide-image-before-load" key={"image-hider" + props.imageIndex}></div>}
		   	<div className={isSelected ? "checkmark image-is-clicked" : "checkmark" } key={"checkmark" + props.imageIndex}></div>
		   	<span className="catcha-image-size-aligner" key={"aligner" + props.imageIndex}></span>
		   	<img
          alt="source to identify" 
			   	src={props.images[fileName].default} 
			   	onLoad={() => (setLoaded(true))} 
			   	className={isSelected ? "catcha-image image-is-clicked" : "catcha-image" } 
			   	onClick={() => setSelected(!isSelected )}
          key={"source-image" + props.imageIndex}
		   	/>
	   	</div>
   	)
}

export default App;
