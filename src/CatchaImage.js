import { useState, useEffect } from "react";

/*
 * =================================== 
 * Component for a single CATCHA image.
 * ===================================
 */
 function CatchaImage(props) {

  const [hasMounted, setHasMounted] = useState(false);


 	//filename of the image to load
 	var fileName = props.source;

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
		   	<div className={isSelected ? "checkmark image-is-clicked" : "checkmark" } key={"checkmark" + props.imageIndex}></div>
		   	<span className="catcha-image-size-aligner" key={"aligner" + props.imageIndex}></span>
		   	<img
          alt="source to identify" 
			   	src={require('./images/grid_separated/' + fileName).default} 
			   	className={isSelected ? "catcha-image image-is-clicked" : "catcha-image" } 
			   	onClick={() => setSelected(!isSelected )}
          key={"source-image" + props.imageIndex}
		   	/>
	   	</div>
   	)
}

export default CatchaImage;