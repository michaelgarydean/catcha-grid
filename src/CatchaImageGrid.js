import React from 'react';
import { useState, useEffect, useContext, useRef, useMemo } from "react";
import CatchaImage from "./CatchaImage";
import {LoadingContext} from "./LoadingContext";

//Storage for all the paths/sources for the images currently being shown on the grid.
var imagesSources = [];

/* 
 * ==============================================================
 * Component to show a grid of random images, without repeating an image.
 * ==============================================================
 */
 function CatchaImageGrid(props) {

  //count how many images have been fully loaded and are in the DOM
  const imagesLoaded = useRef(0);

  //are images still loading?
  const [loading, setLoading] = useContext(LoadingContext);

  //Reset the image count to 0 if loading has been set to true after a render
  useEffect( () => {

    if(loading) {
      imagesLoaded.current = 0;
    }
    
  }, [loading]);  

  //When all the <img> have loaded in the <GridImage> component, then update the state so we know loading is done
  const handleChildLoad = () => {

    //imagesLoaded++;
    imagesLoaded.current += 1;

    if(imagesLoaded.current >= props.gridSize) {
      //update state
      setLoading(false);
    }

  };

  //an array of image paths for the src attribute in the <img> tags 
  if(loading) {
    imagesSources = createGrid(props.gridSize, props.whichImage);
  }

  //create child elements on first render, then don't re-render unless imageSources is updated
  const children = useMemo(() =>
    imagesSources.map((source, gridPosition) => {
      return(
        //<CatchaImage src={source} imageIndex={gridPosition} onImgLoad={handleChildLoad} key={"child-image-" + source} />
        <CatchaImage src={source} imageIndex={gridPosition} key={"child-image-" + source} onImgLoad={handleChildLoad} />
      )
    }), [imagesSources]
  );

   return <React.Fragment>
      <div className="loading" style={{display: loading ? "block" : "none"}}></div>
      <div key={props.imageType} className="catcha-images" style={{visibility: loading ? "hidden" : "visible"}}>
        {/* CatchaImage */}
        { children }
        {/* end CatchaImage */}
      </div>
    </React.Fragment>;

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
    var sources = [];

    /* 
   * Create an array that contains all the CatchaImage components
   */
   for(let squareIndex=1; squareIndex <= gridSize; squareIndex++){

    //generate the filename based on the current image to render on the grid
    var imageSrc = "grid"+ String(whichImage).padStart(2, '0') + "_" + String(squareIndex).padStart(2, '0') + ".jpg";

    //Add filenames to the array
    sources.push(imageSrc);
   }

   return sources;

  }

  export default CatchaImageGrid;