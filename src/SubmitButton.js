import { useState } from "react";

/* 
 * ==============================================================
 * Component for the submit button and it's behaviours.
 * ==============================================================
 */
 function SubmitButton() {

  /*
   * State variables
   * isSubmitting: Behavior to change while the "submitting process" is taking place. 
   * This is just for user feedback to see their action having an effect.
   */
   const [isSubmitting, setSubmitting] = useState(false);

   return (
	   	<div className="button-container">
		   {/* Before refreshing the page, change the image type for show the next type when the page refreshes  refreshPage() */}
		   <button className={isSubmitting ? "verify-button button-on-submit" : "verify-button" } onClick={() => {setSubmitting(true); refreshPage()}}>VERIFY</button>
	   </div>
   );

}

/* 
 * When the verify button is clicked, show a new set of random images.
 */  
 function refreshPage() {
 	window.location.reload(false);
 }

 export default SubmitButton;
