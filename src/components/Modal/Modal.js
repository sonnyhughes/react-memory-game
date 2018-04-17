import React from 'react';
import './Modal.css';

function Modal() {
	return (
		<div className="instructionsModal">
			<div className="modal-content">
				<h4 className="center">Game Instructions</h4>
				<ol>
					<li>Click on any image to start the game.</li>
					<li>After each click, the images change positions.</li>
					<li>Click all 12 images only once and you win!</li>
					<li>Click an image more than once and... you lose!</li>
				</ol>
			</div>
			<br />
			<div className="modal-footer white-text center">
				<a className="waves-effect waves-light green btn" onClick={() => {
					document.getElementsByClassName('instructionsModal')[0].classList.add('hide');
				}}>Start the Game!</a>
			</div>	
		</div>
	)
}

export default Modal;