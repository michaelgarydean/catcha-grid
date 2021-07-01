import React from 'react';
import { useState, useEffect, useContext } from "react";
import CatchaImage from "./CatchaImage";
import {LoadingContext} from "./LoadingContext";

var gridImages = [];

/* 
 * ==============================================================
 * Component to show a grid of random images, without repeating an image.
 * ==============================================================
 */
 function CatchaImageGrid(props) {

  var imagesLoaded = 0;

  const [loading, setLoading] = useContext(LoadingContext);

  //When all the <img> have loaded in the <GridImage> component, then update the state so we know loading is done
  const handleChildLoad = () => {

    imagesLoaded++;

    console.log("image: " + imagesLoaded);

    if(imagesLoaded >= 9) {
      //update state
      setLoading(false);
    }

  };

  //the paths of all the images needed to show a single image on the grid
  gridImages = createGrid(props.gridSize, props.whichImage);

  //the checkmark when an image is selected
  var checkmarkPath = 'checkmark.png';

  /*
   * If whichImage gets updated in the parent, re-render the component with a new image grid. 
   * whichImage is the overall big image made up by smaller images.
   */
  useEffect( () => {
     gridImages = createGrid(props.gridSize, props.whichImage);
  }, [props.whichImage]);

   return (

    <div key={props.whichImage} className="catcha-images">
    
    {/* CatchaImage */}
      {
        gridImages.map((source, gridPosition) => {
          return(
              <CatchaImage src={source} imageIndex={gridPosition} checkmarkPath={checkmarkPath} key={"image" + props.whichImage + gridPosition} onImgLoad={handleChildLoad} />
          )
        })
      }
    {/* end CatchaImage */}

    </div>
    )
  }

  /*
   * Assemble the filenames used to create the overall image (whichImage is the overall image)
   * This organizes all the smaller images that make up which image into an array so they are placed
   * properly on the grid in the right position.
   *
   * @params    gridSize - The total size of the grid (number of images) 
                whichImage - The index of the overall big image made up by smaller images
   * @returns   An array of strings for the filenames of images on the grid.
   */
  function createGrid(gridSize, whichImage) {
    var imagesSources = [];

    /* 
   * Create an array that contains all the CatchaImage components
   */
   for(let squareIndex=1; squareIndex <= gridSize; squareIndex++){

    //generate the filename based on the current image to render on the grid
    var imageSrc = "grid"+ String(whichImage).padStart(2, '0') + "_" + String(squareIndex).padStart(2, '0') + ".jpg";

    //Add filenames to the array
    imagesSources.push(imageSrc);
   }

   return imagesSources;

  }

  export default CatchaImageGrid;