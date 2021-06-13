import React from 'react';
import { useState, useEffect } from "react";
import CatchaImage from "./CatchaImage";

var gridImages = [];



/* 
 * ==============================================================
 * Component to show a grid of random images, without repeating an image.
 * ==============================================================
 */
 function CatchaImageGrid(props) {

  //the paths of all the images needed to show a single image on the grid
  gridImages = createGrid(props.gridSize, props.whichImage);

  var checkmarkPath = 'checkmark.png';

  //If whichImage gets updated in the parent, re-render the component with a new image grid.
  useEffect( () => {
     gridImages = createGrid(props.gridSize, props.whichImage);
  }, [props.whichImage]);

  useEffect(() => {
  // Your code here
  }, []);

   return (

    <div key={props.whichImage} className="catcha-images">
    
    {/* CatchaImage */}
      {
        gridImages.map((source, gridPosition) => {
          return(
              <CatchaImage src={source} imageIndex={gridPosition} checkmarkPath={checkmarkPath} />
          )
        })
      }
    {/* end CatchaImage */}

    </div>
    )
  }

  function createGrid(gridSize, whichImage) {
    var imagesSources = [];

    /* 
   * Create an array that contains all the CatchaImage components
   */
   for(let squareIndex=1; squareIndex <= gridSize; squareIndex++){

    //generate the filename based on the current image to render on the grid
    var imageSrc = "grid"+ String(whichImage).padStart(2, '0') + "_" + String(squareIndex).padStart(2, '0') + ".jpg";

    //load the image and store it in the global array
    //images[imageIndex] = loadImage(sources[imageSrc].default);

    /*
     * Create the <div> and insert a random image on the image grid;
     * Lazy load the images, so just load blank spaces for the fallback when the image hasn't loaded yet
     */

     imagesSources.push(imageSrc);
   }

   return imagesSources;

  }

  export default CatchaImageGrid;