import * as SCALE from "./scales";

/**
* @const {Object} | Formulas, names and suffix for each chord quality
* Formulas will help us identify the quality of a chord and build any chord from scratch.
* To keep our formulas in a numeric format, we're using the integer notation
* https://en.wikipedia.org/wiki/Pitch_class#Integer_notation
*/
export const FORMULAS = [			
	{ formula:"1-3-5",			integer:"0-4-7", 			name:"Major", 							suffix:""			},
	{ formula:"1-3-5#", 		integer:"0-4-8", 			name:"Augmented", 						suffix:"aug"		},
	{ formula:"1-b3-b5", 		integer:"0-3-6",    		name:"Diminished", 						suffix:"dim"		},
	{ formula:"1-b3-5", 		integer:"0-3-7", 			name:"Minor", 							suffix:"min"		},
	{ formula:"1-b3-5-9", 		integer:"0-2-3-7", 			name:"Minor, added ninth", 			  	suffix:"m(add9)"	},
	{ formula:"1-4-5", 			integer:"0-5-7", 			name:"Suspended fourth", 				suffix:"sus4"		},
	{ formula:"1-2-5", 			integer:"0-2-7", 			name:"Suspended second", 				suffix:"sus2"		},
	{ formula:"1-3-5-9", 		integer:"0-2-4-7", 	   		name:"Added ninth", 					suffix:"add9"		},
	{ formula:"1-3-b7",			integer:"0-4-10",			name:"Seventh",							suffix:"7"			},
	{ formula:"1-3-5-b7",		integer:"0-4-7-10",			name:"Dominant seventh",				suffix:"7"			},
	{ formula:"1-3-5-7", 		integer:"0-4-7-11", 	   	name:"Major seventh", 					suffix:"maj7"		},
	{ formula:"1-b3-5-7", 		integer:"0-3-7-11",         name:"Minor, major seventh", 		  	suffix:"m(maj7)"	},
	{ formula:"1-b3-5-b7", 		integer:"0-3-7-10", 		name:"Minor seventh", 					suffix:"m7"			},
	{ formula:"1-b3-b5-b7", 	integer:"0-3-6-10", 		name:"Minor seventh, flat fifth",  		suffix:"m7b5"		},
	{ formula:"1-3-6", 			integer:"0-4-9", 			name:"Sixth",							suffix:"6"			},
	{ formula:"1-b3-5-6", 		integer:"0-3-7-9", 			name:"Minor sixth", 					suffix:"m6"			},
	{ formula:"1-b3-5-b6", 		integer:"0-3-7-8", 			name:"Minor, flat sixth", 				suffix:"mb6"		},
	{ formula:"1-b3-5-6-9", 	integer:"0-2-3-7-9", 		name:"Minor sixth, added ninth",   		suffix:"m6/9"		},
	{ formula:"1-3-5-6", 		integer:"0-4-7-9", 		   	name:"Major Sixth", 					suffix:"maj6"		},
	{ formula:"1-3-5-6-9", 		integer:"0-2-4-7-9",    	name:"Sixth, added ninth", 				suffix:"6/9"		},
	{ formula:"1-3-5-7-9", 		integer:"0-2-4-7-11", 	 	name:"Major ninth", 					suffix:"maj9"		},
	{ formula:"1-b3-5-b7-9", 	integer:"0-2-3-7-10", 		name:"Minor ninth",                		suffix:"m9"			},
	{ formula:"1-b3-5-7-9", 	integer:"0-2-3-7-11", 		name:"Minor ninth, major seventh", 		suffix:"m9(maj7)"	},
	{ formula:"1-b3-b5-b7-9", 	integer:"0-2-3-6-10", 		name:"Minor eleventh", 					suffix:"m9b5"		},
	{ formula:"1-b3-5-b7-9-11-13",integer:"0-2-3-4-6-7-10",	name:"Minor thirteen", 					suffix:"m13"		},
	{ formula:"1-3-5-7-#11", 	integer:"0-4-7-11-18", 	 	name:"Major seventh, sharp eleventh",	suffix:"maj7#11"	},
	{ formula:"1-3-5-7-9-13", 	integer:"0-2-4-7-9-11",		name:"Major thirteen", 					suffix:"maj13"		},
	{ formula:"1", 				integer:"0", 			  	name:"Single note", 					suffix:""			},
	{ formula:"1-5", 			integer:"0-7", 			    name:"Power chord", 					suffix:"5"			}
];

/** Check if a chord tab correspond to the chord notes composition
* @param {Array} tab | Required | The chord tab
* @param {Array} chordNotes | Required | The chord notes
* @param {Array} tuning | Required | The instrument tuning
* @return {Boolean}
*/
export function isValid(tab, chordNotes, tuning) {
	// TODO: check if tab is valid
	// TODO: check if notes is valid (valid tuning)
	// TODO: make it work with tabs and notes
	// TODO: add param to check for triads, open strings, etc.

	let result, 
		index,
		notesCount = {};

	for (let i = 0; i < tab.length; i++) {

		if (isNaN(tab[i])) {
			continue;
		}
		index = tab[i] + SCALE.A.indexOf(tuning[i]);

		if (index > (SCALE.A.length - 1)) {
			index = index - SCALE.A.length;
		}

		for (let j = 0; j < chordNotes.length; j++) {

			if (!notesCount[SCALE.A[index]]) {
				notesCount[SCALE.A[index]] = 1;
			} else if (SCALE.A[index] === SCALE.A[j]) {
				notesCount[SCALE.A[index]]++;
			}
		}
	}
	// If every note has appeared at least once, chord is valid
	for (let i = 0; i < chordNotes.length; i++) {
		if (chordNotes[i] in notesCount) {
			result = true;
		} else {
			result = false;
			break;
		}
	}
	return result;
}