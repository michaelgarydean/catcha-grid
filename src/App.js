import './App.scss';
import React, { useEffect, useState } from "react";
import SubmitButton from "./SubmitButton";
import CatchaImageGrid from "./CatchaImageGrid";
import Icons from "./Icons";

const gridSize = 16;                            //total number of images in the grid
const totalAvailableGridImages = 50;            //total possibilities of the big image that is shown split up

/* Load images from the folders */

/*
 * Render the webpage with the app
 */
 function App() {
  
  /*
   * SET IMAGE TYPE: 0 for Cats, 1 for Cars
   */

  // Before setting a default value, try to get it from local storage.
  // If it exists, reset, update the value (using !)
  const [imageType] = useState(() => (
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
            <p>Select all squares with</p>
            {/* If imageType is 0, show cats, otherwise, show cars. */}
            <h2>{imageType ? "cars" : "cats"}</h2>
            <p>Click verify once there are none left.</p>
          </div>

            {/* Grid of images */}
            {/* If imageType is 0, show cats, otherwise, show cars. */}
            <CatchaImageGrid gridSize={gridSize} numGrids={totalAvailableGridImages} />

          </div> {/* end catcha-top-elements-container */}

          <div className="catcha-footer">
            <span className="icon-size-aligner"></span>
            <Icons />
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

export default App;
