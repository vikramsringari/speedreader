/*
Vikram Sringari
4/23/2016
CSE 154 AC
HW3: SpeedReader
This JavaScript file gives functionality to the speedreader page.
It enables users to change size options speed options.
It enables the user to input text on the bottom and start or stop reading using the buttons.
It out puts the text in the area above.
*/
(function() {
	"use strict";
	
	var words = null;//The words from the input
	var wordNumber = 0;//The number of the word
	var time = null;//The time of the reading 

	//The window.onload enables the user the ability, to change options of-
	//the size of the text displayed, the speed of the text displayed, and-
	//enables user to start and stop
	window.onload = function() {
		disable(true, "stop");
		document.getElementById("medium").onchange = sizeOptions;
		document.getElementById("big").onchange = sizeOptions;
		document.getElementById("bigger").onchange = sizeOptions;
		document.getElementById("wpm").onchange = speed;
		document.getElementById("start").onclick = start;
		document.getElementById("stop").onclick = stop;
	};
	
	// This disables the use of a button if it is already in use, or- 
	// disables the text from bieng changed as it is being read.
	// the ability to change the speed and the size is always enabled.
	// This takes in a boolean(disable), and value set to either the-
	// The start button bieng pressed or the stop button being pressed.
	// The boolean disables if it is true and enables if false.
	function disable(disable, buttons) {
		document.getElementById(buttons).disabled = disable;
		if (buttons == "stop") {
			document.getElementById("start").disabled = !disable;
		}else{
			document.getElementById("inputText").disabled = disable;
			document.getElementById("stop").disabled = !disable;
		}
	}

	// This enables the button start to start reading the input text
	// and reads (displays) one word at a time (one word per frame).
	function start() {
		disable(true, "start");
		var wpm = speed();
		time = setInterval(wordDisplay, wpm);
		var inputText = document.getElementById("inputText").value;
		words = inputText.split(/[ \t\n]+/);
	}
	
	// This enables the input text to be displayed and also cuts off-
	// punctuation at the end of a word, but extends the time the word-
	// is displayed. It ends reading if there is nothing else to read.
	// This function takes the read boolean to decide wether to output
	// the next word or stop reading.
	function displayText(read) {
		var possiblePunctuation = [",", ":", "!", ".", "?", ";"];
		for (var i = 0; i < possiblePunctuation.length; i++) {
			if (words[wordNumber].endsWith(possiblePunctuation[i])){
				words[wordNumber] = words[wordNumber].slice(0,  words[wordNumber].length - 1);
				words.splice(wordNumber, 0, words[wordNumber]);
				// extends the time the word is on the display
			}
		}
		var word = words[wordNumber];
		if (read) {
			document.getElementById("output").innerHTML = word;
		} else {
			document.getElementById("output").innerHTML = "";
		}
	}
	
	// This displays the text text one word at a time on to the output.
	// This stops when the text is fully read.
	function wordDisplay() {
		if (wordNumber >= words.length) {
			stop();
		}else{
			displayText(true); 
			wordNumber++;
		}
	}
	
	// This enables the speed to be changed.
	// This returns the value of the speed to be changed.
	function speed() {
		if (time) {
			clearInterval(time);
			time = setInterval(wordDisplay, document.getElementById("wpm").value);
		}
		return document.getElementById("wpm").value;
	}

	// This enables the size to be changed.
	function sizeOptions() {
		var output = document.getElementById("output");
		output.style.fontSize = this.value;
		// this is ok because of the use of the radio buttons(Allison said it was ok in a lecture)
	}
	
	// This ends the reading of the text completely and stops displaying text.
	// If the user wants to start a again they have to start from the begining.
	function stop() {
		wordNumber = 0;
		disable(false, "start");
		displayText(false);
		clearInterval(time);
		time = null;
	}
	
})();
