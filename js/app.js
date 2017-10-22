function countTimer(){//I tied the tries counter to the page timer to save processing power.  No need to update the tries counter any faster than the page timer
  starCount();//timer on webpage
  window.min = 0;
  window.second = 0;
  window.zeroPlaceholder = 0;
  window.counterId = setInterval(function(){countUp();}, 1000);

  function countUp(){//timer count up
    second++;
    if(second === 60){
      second = 0;
      min = min + 1;
    }
    if(second === 10){
        zeroPlaceholder = "";
    }else
    if(second < 10){//floating zero if seconds is <10
        zeroPlaceholder = 0;
    }

    $(".countUp").html(min + ":" + zeroPlaceholder + second);//timer for webpage
    $(".tries").html(tries + " attempt(s) taken.");//tries counter for webpage
  }
}

function resetTimer(){//reset timer on webpage
  window.min = 0;
  window.second = 00;
  window.zeroPlaceholder = 0;
  clearInterval(counterId);
  var counterId = setInterval(1000);
}

function stopTimer(){//stop timer on webpage; happens after game complete
    clearInterval(counterId);
}

function triesReset(){//reset tries counter on page
  tries = 0;
}

//variables
var lettersArray = ["A","A","B","B","C","C","D","D","E","E","F","F","G","G","H","H"];
var letters = [];
var currentTiles = [];
var tilesFlipped = 0;
var tries = 0;
var stars = "* * *";



Array.prototype.tileShuffle = function(){//shuffle tiles for new board
  var i = this.length, j, temp;
  while(--i > 0){
      j = Math.floor(Math.random() * (i+1));
      temp = this[j];
      this[j] = this[i];
      this[i] = temp;
  }
}

function newBoard(){//get new board
	tilesFlipped = 0;
	var output = "";
    lettersArray.tileShuffle();
	for(var i = 0; i < lettersArray.length; i++){
		output += "<div id='tile_" + i + "' onclick = 'flipTile(this,\"" + lettersArray[i] + "\")'></div>";
	}
	document.getElementById("memoryBoard").innerHTML = output;
}

function flipTile(tile,val){//tile flipping
	if(tile.innerHTML == "" && letters.length < 2){
		tile.style.background = "url(img/flipped_background.png) no-repeat";//change tile background on flip
		tile.innerHTML = val;//show value on flipped tile
		if(letters.length == 0){//run if nothing flipped
			letters.push(val);
			currentTiles.push(tile.id);
		} else if(letters.length == 1){//run if first tile already flipped
			letters.push(val);
			currentTiles.push(tile.id);
      tries += 1;//adds one try per 2 tiles flipped
      starCount()
			if(letters[0] == letters[1]){//check for match
				tilesFlipped += 2;//keep tiles flipped
        tries += 1;//adds one try per 2 tiles flipped
        starCount()//update star count if needed
				// clear both arrays
				letters = [];
        currentTiles = [];
				// check if board is clear
				if(tilesFlipped == lettersArray.length){//winner
          stopTimer();//stop timer
          winner();//display modal
				}
			} else {
				function flip2Back(){
			    // if incorrect, flip 2 tiles back over
			    var tile_1 = document.getElementById(currentTiles[0]);
			    var tile_2 = document.getElementById(currentTiles[1]);
			    tile_1.style.background = "url(img/tile_bg.png) no-repeat";
          	    tile_1.innerHTML = "";
			    tile_2.style.background = "url(img/tile_bg.png) no-repeat";
          	    tile_2.innerHTML = "";
			    // clear both arrays
			    letters = [];
          currentTiles = [];
			  }
				setTimeout(flip2Back, 700);//tile flip back timer, can be adjusted
			}
		}
	}
}

function starCount(){//display stars based on tries taken
  setInterval(function(){starRating();}, 1000);
  function starRating(){
    if(tries <= 20){
      stars = "* * *";
    } else if (tries > 20 && tries < 41) {
      stars = "* *";
    } else if (tries > 40) {
      stars = "*";
    }
  }
  $(".stars").html(stars);//star counter
  }

function winner(){//winner; HTML debug button: <button onClick="winner()">Modal Debug</button>
  var modal = document.getElementById("myModal");
    modal.style.display = "block";//make modal display
}
