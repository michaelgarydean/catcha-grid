import React, { Component } from 'react'
import './app.scss';
import { useEffect, useState, useContext, useRef } from "react";
import CatchaImageGrid from "./CatchaImageGrid";
import {LoadingContext} from "./LoadingContext";
import Icons from "./Icons";

/*
 * = = = =
 * HEN BOILERPLATE
 * = = = =
 */
const creator = new URLSearchParams(window.location.search).get('creator')
const viewer = new URLSearchParams(window.location.search).get('viewer')

console.log('OBJKT created by', creator)
console.log('OBJKT viewed by', viewer)

/*
 * = = = =
 * GLOBALS
 * = = = =
 */

//total number of images that make up a grid (ex 16 = 4x4 grid)
const gridSize = 16;

//Total number of images to be shown on the grid, made up by n=gridSize smaller images
const numGridImages = 50;

/*
 * = = = =
 * APP
 * = = = =
 */
 function App() {

  /*
   * Store whether the images have all been loaded, or not. Defaults to true.
   */
  const [loading, setLoading] = useContext(LoadingContext);
  
  /*
   * Image type is 0 for Cats and 1 for Cars. Used to update the interface text.
   */
   const imageType = useRef(randomNumber(2)-1);

  /* 
   * Randomly sort the order of the images shown on the grid so they don't repeat until all the images have been shown.
   */
  const [imageNumbers, setImageNumbers] = useState(
    fillWithRandomNumbers(numGridImages)
  );

  /*
   * Generate a random number and the show the image it corresponds on first render.
   */
  const currentImage = useRef(randomNumber(numGridImages));

  /* 
   * Each time the verify button is clicked, the currentImage index increases by one.
   * 
   * After rendering the loading state, 
   * If the current image is more than the total number of images available,
   * then resetthe currentImage at index 1 and refill the imageNumbers state with a new random order
   * before rendering the next loaded image.
   */
  useEffect( () => {

    if(currentImage.current > numGridImages) {
      currentImage.current = 1;
      setImageNumbers(fillWithRandomNumbers(numGridImages));
    }

  }, [loading]);

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

          <CatchaImageGrid gridSize={gridSize} whichImage={currentImage.current} />
          </div> {/* end catcha-top-elements-container */}

          <div className="catcha-footer">
            <span className="icon-size-aligner"></span>
            <Icons />
              <div className="button-container">
              
               {/* Before updating the page, change the image type for show the next type */}
                <button 
                  className={loading ? "verify-button button-on-submit" : "verify-button" } 
                  onClick={() => {
                    imageType.current = !imageType.current; 
                    currentImage.current=currentImage.current+1;
                    setLoading(true);
                  }}
                >
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

//Generate a random number
function randomNumber(maxNumber) {
  var randomNumber = Math.floor((Math.random() * maxNumber) + 1);
  return randomNumber;
}

export default App;

/* End App Component */
