import React, { Component } from 'react'
import './app.scss';
import { useEffect, useState, Suspense } from "react";
import CatchaImageGrid from "./CatchaImageGrid";
import Icons from "./Icons";

/* Load images from the folders */
//const sources = collectImages(require.context('./images/grid_separated', false, /\.(png|jpe?g|svg|webp)$/));

//total number of images that make up a grid (ex 16 = 4x4 grid)
const gridSize = 16;

//Total number of images to be shown on the grid, made up by n=gridSize smaller images
const numGridImages = 50;

/*
 * Render the webpage with the app
 */
 function App() {

  /*
   * Behavior to change while the "submitting process" is taking place. 
   * This is for user feedback to see their action having an effect and to hide the loading images until they are all loaded
   */
  const [isSubmitting, setSubmitting] = useState(false);
  
  /*
   * Image type is 0 for Cats and 1 for Cars
   */
   const [imageType, setImageType] = useState(randomNumber(2)-1);

  /* 
   * Randomly sort the order of the images shown on the grid so they don't repeat until all the images have been shown.
   */
  var [imageNumbers, setImageNumbers] = useState(
    fillWithRandomNumbers(numGridImages)
  );


  // useEffect( () => {
  //    console.log("Current image order: " + imageNumbers);
  // }, [imageNumbers]);


  /*
   * Store the current index in the components state.
   */
  var [currentImageIndex, setCurrentImageIndex] = useState(randomNumber(numGridImages));

  //If a new image is loaded, make sure that the non-repeating randomized list has enough numbers to draw from for the next random image.
  useEffect( () => {
     if(currentImageIndex >= numGridImages-1) {
      setImageNumbers(fillWithRandomNumbers(numGridImages));
     }
     setSubmitting(false);
  }, [currentImageIndex]);

  return (

      <div className="centered-container">
      <div className="catcha-outer-border">

      <div className="catcha-interior-elements-container">

        <div className="catcha-top-elements-container">

          {/* Header */}
          <div className="catcha-header">
            <p>Select all squares with</p>
            {/* If imageType is 0, show cats, otherwise, show cars. */}
            <h2>{imageType ? "cars" : "cats"}</h2>
            <p>Click verify once there are none left.</p>
          </div>

          <CatchaImageGrid gridSize={gridSize} whichImage={currentImageIndex+1} />

          </div> {/* end catcha-top-elements-container */}

          <div className="catcha-footer">
            <span className="icon-size-aligner"></span>
            <Icons />
              <div className="button-container">
               {/* Before refreshing the page, change the image type for show the next type when the page refreshes  refreshPage() */}
               {/*<button className={isSubmitting ? "verify-button button-on-submit" : "verify-button" } onClick={() => {setSubmitting(true); setImageType(!imageType); setCurrentImage(13);}}>VERIFY</button>*/}
               <button 
                className={isSubmitting ? "verify-button button-on-submit" : "verify-button" } 
                onClick={() => { 
                  setSubmitting(true); 
                  setTimeout( function(){ 
                    setImageType(!imageType);
                    setCurrentImageIndex((currentImageIndex+1)%numGridImages);
                  }, 1500) 
                }}>
                VERIFY
                </button>
             </div>
          </div>
        </div> {/* end catcha-interior-elements-container */}
    </div>

    </div>
    );
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

export default App;

/* End App Component */
