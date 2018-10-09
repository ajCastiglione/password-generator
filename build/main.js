//Initializing javascript after DOM load
$(document).ready(function() {

  //Potential characters for the password
  const lowers = "abcdefghijklmnopqrstuvwxyz".split("");
  const uppers = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const nums = "0123456789".split("");
  const specials = "!@#$%^&*()-=_+/`~[]{}".split("");

  //declaring variables I'll need later on
  let Length, check1, check2, check3, check4, actualPassword = "",
    reset, previous;

  //Gathering input
  function getVals() {
    reset = document.getElementById("resetChecks");
    check1 = document.getElementById("checkBox1");
    check2 = document.getElementById("checkBox2");
    check3 = document.getElementById("checkBox3");
    check4 = document.getElementById("checkBox4");
    Length = document.getElementById("lengthInput").value;
    checkLength(Length);
  }

  //Verifying the length
  function checkLength(Length) {
    if (!Length) {
      alert("Enter a number for length")
    } else if (Length <= 0) {
      alert("Must be > than 0")
    } else if (Length > 100) {
      alert("Length must be < than 100");
    } else {
      generateString();
    }
  }

  //Generating random string
  function generateString() {
    let string = ['']
    if (check1.checked === true) {
      string = string.concat(lowers);
    }
    if (check2.checked === true) {
      string = string.concat(uppers);
    }
    if (check3.checked === true) {
      string = string.concat(nums);
    }
    if (check4.checked === true) {
      string = string.concat(specials);
    }

    if (check1.checked === true || check2.checked === true || check3.checked === true || check4.checked === true) {
      Generate(string);
    } else {
      alert("Choose at least 1 option!");
    }
  }

  //Generating Password
  function Generate(string) {
    let i = 0;
    for (i; i < Length; i++) {
      let random = Math.floor(Math.random() * (string.length - 1)) + 1;
      actualPassword += string[random];
    }
    show(actualPassword);
    actualPassword = '';
    reset.style.display = "block";
  }
  //Displaying the password
  function show(actualPassword) {
    let passwordSpot = document.getElementById("passSpot");
    previous = actualPassword;
    passwordSpot.innerHTML = actualPassword;
    //calling prevInput function w/ parameter
    prevInput(previous);
  }

  function prevInput(previous) {
    let prevspot = document.getElementById("prevSpot");
    prevspot.innerHTML += previous + "<br />";
  }

  //Click function to activate getVals
  $("#genRndString").on('click', function(){
    getVals();
  });

  //Reseting checkboxes and fields
  function clearCheckBoxes() {
    check1.checked = false;
    check2.checked = false;
    check3.checked = false;
    check4.checked = false;
    reset.style.display = "none";
    document.getElementById("lengthInput").value = "";
    let passwordSpot = document.getElementById("passSpot");
    passwordSpot.innerHTML = "Password";
    document.getElementById("prevSpot").innerHTML = "";
  }

  //Click function to call clearCheckBoxes()
  $("#resetChecks").on('click', function() {
    clearCheckBoxes();
  })

  $("#prevTitle").on("click", function() {
    $("#prevPasswords").slideToggle(800);
  });

  //Function to grab random words
  const apiUrl = "http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=";
  const apiKey = "&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";

  function makeRndWord() {
    let amount = $("#rndWrdLength").val();
    const api = apiUrl + amount + apiKey;
    let outPut = $("#rndWordsOutput");

    $.ajax({
      type: 'GET',
      url: api,
      dataType: 'JSON',
      cache: false,
      aysnc: true,
      success: function(response) {
        let words = response;
        let rndWrd = [];

        for(word of words) {
          rndWrd.push( word.word );
        }

        let newArr = rndWrd.map(function(word){
          word = word.charAt(0).toUpperCase() + word.slice(1);
          return word;
        });

        let endStr = "";
        for(word of newArr) {
          endStr += `${word} \n`;
        }

        outPut.html(endStr)
      } //end of success function
    });

  }
  //end of rnd word

  //Click function to activate makeRndWord
  $("#genRndWord").on('click', function() {
    makeRndWord();
  });

  //Change between random words and concatenated string
  const rndWordBtn = $("#randomWordBtn");
  const concatPw = $(".concatenated-pw");
  const rndPwSect = $(".randomWord-pw");
  const concatPwBtn = $("#concatenateBtn");
  const genRndStr = $("#genRndString");
  const genRndWrd = $("#genRndWord");
  let passSpot = $("#passSpot"); let rndWordsOut = $("#rndWordsOutput");

  rndWordBtn.on('click', function(e) {
    e.preventDefault();
    concatPw.hide();
    genRndStr.hide();
    passSpot.hide();
    $(this).hide();
    rndWordsOut.show();
    genRndWrd.show();
    rndPwSect.show();
    concatPwBtn.show();
  });

  concatPwBtn.on('click', function(e) {
    e.preventDefault();
    concatPw.show();
    genRndStr.show();
    passSpot.show();
    rndWordsOut.hide();
    genRndWrd.hide();
    rndPwSect.hide();
    $(this).hide();
    rndWordBtn.show();
  });

});
