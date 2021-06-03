/* 
 * ==============================================================
 * Component for the icons at the bottom of the CATCHA
 * ==============================================================
 */

 const iconsSources = collectImages(require.context('./images/icons', false, /\.(png|jpe?g|svg)$/));

 function Icons(props) {

 	return(
	 		<div className="catcha-icons">
		 		<div className="icon"><img src={iconsSources['refresh_2x.png'].default} alt="refresh icon" /></div>
		 		<div className="icon"><img src={iconsSources['audio_2x.png'].default} alt="audio icon" /></div>
		 		<div className="icon"><img src={iconsSources['info_2x.png'].default} alt="info icon" /></div>
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