import React from 'react'

/* 
 * ==============================================================
 * Component for the icons at the bottom of the CATCHA
 * ==============================================================
 */

 function Icons(props) {

 	return(
		<div className="catcha-icons">
			<div className="icon"><img src='refresh_2x.png' alt="refresh icon" /></div>
			<div className="icon"><img src='audio_2x.png' alt="audio icon" /></div>
			<div className="icon"><img src='info_2x.png' alt="info icon" /></div>
		</div>
		
 		);
 }

/* 
 * Load images from a folder
 */
 function collectImages(r) {

 	let images = {};
 	r.keys().map((item, index) => ( images[item.replace('./', '')] = r(item) ));
 	return images;

 }

export default Icons;