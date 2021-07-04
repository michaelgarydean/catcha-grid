import React from 'react';
import { useState, useEffect, useRef, useContext } from "react";
import {LoadingContext} from "./LoadingContext";

/*
 * =================================== 
 * Component for a single CATCHA image.
 * ===================================
 */
 
 function CatchaImage(props) {

  const checkmarkurl = "url(" + 'checkmark.png' + ")";

  /*
   * State variables
   * isSelected: so we know if the image has been clicked or not. Not clicked by default.
   */
  const [isSelected, setSelected] = useState(false);

  const [loading, setLoading] = useContext(LoadingContext);
  const [animation, setAnimation] = useState("");

  /*
   * Make sure default state after rendering loading is not-checked
   */
  useEffect( () => {
     setSelected(false);
  }, [props.src]);

/*
 * Add animation class when the image has been slected so it zooms out.
 */
  useEffect( () => {
    if(isSelected) {
     setAnimation(" catcha-image-animation");
   }
  }, [isSelected]);  

  var imageClasses = (isSelected ? "catcha-image image-is-clicked" : "catcha-image") + animation;

    return(
      <div id={"image" + props.imageIndex} className="catcha-single-image" key={"image-div" + props.imageIndex} 
          onClick={() => setSelected(!isSelected )}>
        <div className={isSelected ? "checkmark image-is-clicked" : "checkmark" } style={isSelected ? {backgroundImage: checkmarkurl} : {backgroundImage: "none"} } key={"checkmark" + props.imageIndex}></div>
        <span className="catcha-image-size-aligner" key={"aligner" + props.imageIndex}></span>
        <img
          src={props.src} 
          className={imageClasses}
          key={"source-image" + props.imageIndex}
          onLoad={() => props.onImgLoad()}
        />
      </div>
    );

  // }

    return null;

}

export default CatchaImage;

//className={`${isSelected ? "catcha-image image-is-clicked" : "catcha-image"} ${loading ? "" : "catcha-image-animation" }` } 