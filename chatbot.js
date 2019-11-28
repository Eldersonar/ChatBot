 import speak from './chatbotSS.js';
 /****************************************************************************************
  * Makes textarea autosize height
  *****************************************************************************************/
 var tx = document.getElementsByTagName('textarea'); // finds our textarea
 for (var i = 0; i < tx.length; i++) { // loops through it
     tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
     tx[i].addEventListener("input", OnInput, false); // using callback function
 }

 function OnInput() { // callback function
     this.style.height = 'auto'; // sets textarea's height to "auto"
     this.style.height = (this.scrollHeight) + 'px'; // sets textarea's height to number of pixels accorting to input
 }

 /****************************************************************************************
  * This set of functions are designed for testing porpuses to see how local storage works
  *****************************************************************************************/
 function saveName() { // saves the itemlet userNameKey = 'userName';
     let userNameValue = document.getElementById("input").value;
     localStorage.setItem(userNameKey, userNameValue);
 }

 function loadName() { // loads the item
     let userNameKey = 'userName';
     let userNameValue = localStorage.getItem(userNameKey);
     document.getElementById("name_editor").value = userNameValue;
 }

 function removeName() { // removes the item
     let userNameKey = 'userName'
     let userNameValue = localStorage.getItem(userNameKey);
     localStorage.removeItem(userNameKey);
 }

 function clearStorage() { //clears storage
     localStorage.clear();
 }

 /****************************************************************************************
  * This set of functions are designed to get a little intro for a user
  *****************************************************************************************/
 // let questionNum = 0;										    // keep count of question, used for IF condition.
 //    let question = '<h1>Hello!</h1>';				                // Set up greetings
 const phrase = 'Hello!';
 speak(phrase);
 //    output.innerHTML = `<h1>${phrase}</h1>`;

 let output = document.getElementById('output'); // store id="output" in output variable
 output.innerHTML = `<h1>${phrase}</h1>`; // greetings

 setTimeout(timedIntro, 2000); // little intro
 setTimeout(timedIntro2, 4000); // little intro part 2
 setTimeout(timedName, 6000); // asking name                             

 function timedIntro() { // "Intro" function
     const phrase = 'My name is Vee';
     speak(phrase);
     output.innerHTML = `<h1>${phrase}</h1>`;
 }

 function timedIntro2() { // "Intro2" function
     const phrase = 'I am a chat bot created by Slava';
     speak(phrase);
     output.innerHTML = `<h1>${phrase}</h1>`;
 }


 /***************************************************************************************************************
  * Here we start conversation with our chatbot. We ask user for a name. All the input is stored in local storage that simulates database
  * must add more validation
  ****************************************************************************************************************/
 function timedName() { // First question
     //    output.innerHTML = '<h1>What is your name?</h1>';
     const phrase = 'What is your name?';
     speak(phrase);
     output.innerHTML = `<h1>${phrase}</h1>`;
 }

 /***************************************************************************************************************
  * Once we changed or input box from text to textarea, our localstorage saved elements with additional pressed "enter"
  * To avoid it we must prevent enter from going to a new line in textarea
  ****************************************************************************************************************/

 const inpt = document.getElementById("input"); // setting up user's input
 inpt.onkeyup = saveNamesObj; // make our first function get triggered by "onkeyup" event
 inpt.onkeydown = (e) => {
     if (event.keyCode == 13 || event.which == 13) { // if "enter" pressed
         e.preventDefault(); // cancels the event
         e.stopPropagation(); // prevents propagation of the same event from being called
     }
 }

 function saveNamesObj() { // array of nemes in localstorage Object
     let users = JSON.parse(localStorage.getItem("users")); // 
     if (!users) // checks if the "users" object exists
         users = {}; // if not, creates a new "users" object
     let userNameValue = document.getElementById("input").value; // getting the user input
     if (event.keyCode == 13 || event.which == 13) { // make our function listen to "enter" be taped
         if (userNameValue in users) // checks if user exists
         {
             blankInput(); // clearing up input box
             setTimeout(() => {
                 timedHelloOldUser(userNameValue)
             }, 2000); // calling this function to greet old user
             setTimeout(timedHowCanIHelpYou, 4000)
             // calling the "firstRequest" function to deal with onkeyup event listener 
             document.getElementById("input").onkeyup = getTheQuestion;
             return;
         } else {

             blankInput(); // clearing up input box

             users[userNameValue] = { // creating a new object with the name of the user
                 name: userNameValue, // name equals to user's name
                 age: 0, // age
                 sex: "undefined", // sex
                 favoriteColor: "none", // favorite color
             };

             setTimeout(timedHelloNewUser(userNameValue), 2000); // calling this function to greet new user
             let myObj_before = JSON.stringify(users); // converts the "users" object to JSON
             localStorage.setItem('users', myObj_before); // sends a new "users" object to a local storage
             //let myObj_after = JSON.parse(localStorage.getItem('users'));                    
         }

         setTimeout(ageQestion, 5000); // asking user for age
         document.getElementById("input").onkeyup = () => {
             saveAge(userNameValue); // calling the "saveAge" function to deal with onkeyup event listener 
         }
     }
 }

 function timedHelloOldUser(userNameValue) { // Greeting old user by using user name
     //    output.innerHTML = '<h1>Welcome back, ' + userNameValue + '</h1>';
     const phrase = 'Welcome back, ' + userNameValue;
     speak(phrase);
     output.innerHTML = `<h1>${phrase}</h1>`;
 }

 function timedHelloNewUser(userNameValue) { // Greeting new user by using user name
     //    output.innerHTML = '<h1>Hello, ' + userNameValue + '</h1>';
     const phrase = 'Hello, ' + userNameValue;
     speak(phrase);
     output.innerHTML = `<h1>${phrase}</h1>`;
 }

 function ageQestion() { // Age question
     //    output.innerHTML = '<h1>How old are you?</h1>';
     const phrase = 'How old are you?';
     speak(phrase);
     output.innerHTML = `<h1>${phrase}</h1>`;
 }


 /***************************************************************************************************************
  * Continue conversation chatbot. All the input is stored in local storage that simulates database
  * must add more validation!!!
  ****************************************************************************************************************/
 function saveAge(userNameValue) { // saving user's age
     let users = JSON.parse(localStorage.getItem("users")); // getting ready to work by turning our JSON to an object 

     //    console.log(users);


     let userAgeValue = document.getElementById("input").value; // getting user's input
     if (event.keyCode == 13 || event.which == 13) { // make our function listen to "enter" be taped
     users[userNameValue].age = userAgeValue; // sending user's age to our object BROKEN users[userNameValue].age = userAgeValue;

         blankInput(); // clearing up input box
         setTimeout(() => timedAgeAnswer(userAgeValue), 2000); // calling chatbot comment on age

         let myObj_before = JSON.stringify(users); // converts the "users" object to JSON
         localStorage.setItem('users', myObj_before); // sends a new "users" object to a local storage
         // let myObj_after = JSON.parse(localStorage.getItem('users')); 

         setTimeout(() => colorQuestion(userNameValue), 5000); // asking user about favorite color
         document.getElementById("input").onkeyup =  () => saveColor(userNameValue); // calling the "saveColor" function to deal with onkeyup event listener
     }
 }

 function timedAgeAnswer(userAgeValue) { // giving comment on user's age
     let users = JSON.parse(localStorage.getItem("users")); // getting ready to work by turning our JSON to an object 

     //INPUT CHECK REQUIRED

    //  let output = document.getElementById('output'); 
    // // console.log(output);

     if (userAgeValue < 5) { // answer based on user input
         const phrase = 'I am impressed you can type...';
         speak(phrase);
         output.innerHTML = `<h1>${phrase}</h1>`;
         //    output.innerHTML = '<h1>I am impressed you can type...</h1>';
     } else if (userAgeValue >= 6 && userAgeValue <= 16) {
         const phrase = 'I hope you are doing well in school.';
         speak(phrase);
         output.innerHTML = `<h1>${phrase}</h1>`;
         //    output.innerHTML = '<h1>I hope you are doing well in school.</h1>'
     } else if (userAgeValue >= 17 && userAgeValue <= 30) {
         const phrase = 'The best age, isn\'t it?';
         speak(phrase);
         output.innerHTML = `<h1>${phrase}</h1>`;
         //    output.innerHTML = '<h1>The best age, isn\'t it?</h1>'
     } else if (userAgeValue >= 31 && userAgeValue <= 50) {
         const phrase = 'Hope you have enough time to rest.';
         speak(phrase);
         output.innerHTML = `<h1>${phrase}</h1>`;
         //    output.innerHTML = '<h1>Hope you have enough time to rest.</h1>'
     } else if (userAgeValue >= 51 && userAgeValue <= 100) {
         const phrase = 'Wow, you are old!';
         speak(phrase);
         output.innerHTML = `<h1>${phrase}</h1>`;
         //    output.innerHTML = '<h1>Wow, you are old!</h1>'
     } else if (userAgeValue >= 100) {
         const phrase = 'People don\'t live that much... How you do that?';
         speak(phrase);
         output.innerHTML = `<h1>${phrase}</h1>`;
         //    output.innerHTML = '<h1>People don\'t live that much... How you do that?</h1>'
     }
 }

 function colorQuestion(userNameValue) { // asking user color question
     let users = JSON.parse(localStorage.getItem("users")); // getting ready to work by turning our JSON to an object
     //    output.innerHTML = '<h1>What is your favorite color, ' + users[userNameValue].name + '?</h1>';
     const phrase = 'What is your favorite color, ' + users[userNameValue].name + '?'; // check line 220 for expectations
     speak(phrase);
     output.innerHTML = `<h1>${phrase}</h1>`;
 }

 /***************************************************************************************************************
  * Continue conversation chatbot. All the input is stored in local storage that simulates database
  * must add more validation
  ****************************************************************************************************************/
 function saveColor(userNameValue) { // saving user's fav color
     let users = JSON.parse(localStorage.getItem("users")); // getting ready to work by turning our JSON to an object 
     let userColor = document.getElementById("input").value; // getting user's input
     if (event.keyCode == 13 || event.which == 13) { // make our function listen to "enter" be taped
     users[userNameValue].favoriteColor = userColor; // sending user's color to our object BROKEN users[userNameValue].favoriteColor = userColor;

         blankInput(); // clearing up input box

         let myObj_before = JSON.stringify(users); // converts the "users" object to JSON
         localStorage.setItem('users', myObj_before); // sends a new "users" object to a local storage
         // let myObj_after = JSON.parse(localStorage.getItem('users'));

         setTimeout(() => timedColorAnswer(userNameValue), 2000); // commenting on user's color

         setTimeout(simpleWhatQuestion, 5000); // explaining how to ask questions
         setTimeout(simpleWhatQuestion1, 7500); // explaining how to ask questions
         setTimeout(simpleWhatQuestion2, 10000); // explaining how to ask questions
         setTimeout(simpleWhatQuestion3, 12500); // explaining how to ask questions
         setTimeout(simpleWhatQuestion4, 17000); // explaining how to ask questions

         // calling the "getThe Question" function to deal with onkeyup event listener
         document.getElementById("input").onkeyup = getTheQuestion;
     }
 }

 function timedColorAnswer(userNameValue) {
     let users = JSON.parse(localStorage.getItem("users")); // getting ready to work by turning our JSON to an object 
     // if user's fav color is orange, bot gets excited
     if (users[userNameValue].favoriteColor.toLowerCase() == "orange") { // BROKEN if (users[userNameValue].favoriteColor.toLowerCase() == "orange") {
         //    output.innerHTML = '<h1>Hey, this is my favorite color too!!!</h1>';
         const phrase = 'Hey, this is my favorite color too!!!';
         speak(phrase);
         output.innerHTML = `<h1>${phrase}</h1>`;
     } else {
         //    output.innerHTML = '<h1>Good to know.</h1>'             // it is meh color
         const phrase = 'Good to know.';
         speak(phrase);
         output.innerHTML = `<h1>${phrase}</h1>`;
     }
 }

 /***************************************************************************************************************
  * We got to the "user asking questions" part. This is just the intro part
  ****************************************************************************************************************/
 function simpleWhatQuestion() { // explain how asking questions work
     //    output.innerHTML = '<h1>So far, you can ask me to give you a definition, ask for current weather, or ask me to tell you a joke</h1>'
     const phrase = 'So far, you can ask me to give you a definition of word, ask for current weather, or ask me to tell you a joke';
     speak(phrase);
     output.innerHTML = `<h1>${phrase}</h1>`;

 }

 function simpleWhatQuestion1() { // explain how asking questions work
     //    output.innerHTML = '<h1>Here is example: "What is borscht?" "weather in Kiev?" or ""Tell me a joke.</h1>'
     const phrase = 'Here is example: "What is borscht?" "weather in Kiev?" or ""Tell me a joke.';
     speak(phrase);
     output.innerHTML = `<h1>${phrase}</h1>`;
 }

 function simpleWhatQuestion2() { // explain how asking questions work
     output.innerHTML = '<h1>If I know the answer, I will tell you.</h1>'
     const phrase = 'Here is example: "What is borscht?" "weather in Kiev?" or ""Tell me a joke.';
     speak(phrase);
     output.innerHTML = `<h1>${phrase}</h1>`;
 }

 function simpleWhatQuestion3() { // explain how asking questions work
     output.innerHTML = '<h1>By the way, you can clear the local storage by simply say: "clear local storage."</h1>'
 }

 function simpleWhatQuestion4() { // explain how asking questions work
     output.innerHTML = '<h1>So, go ahead, ask me a question now.</h1>'
 }

 /***************************************************************************************************************
  * We got to the "user asking questions" part. Here the fun begins
  * must add more validation
  ****************************************************************************************************************/
 function getTheQuestion() { // get a question from user
     // let question = JSON.parse(localStorage.getItem("question")); 
     let question = 'question';
     let questionValue = document.getElementById("input").value.toLowerCase().trim();
     if (event.keyCode == 13 || event.which == 13) { // checks for pressed key
         let questionName = question[questionValue]; // get question

         console.log(questionValue);
         //     localStorage.setItem(question, questionValue);          // saves input in localstorage
         blankInput(); // clears up input box
         // setTimeout(questionComment, 3000);                      // answering question



         if (questionValue.search("what is") !== -1) {
             const position = questionValue.search("what is ") + 8;
             const parsedStr = questionValue.substring(position, questionValue.length - 1);

             console.log(position);
             console.log(parsedStr);

             var params = {
                 define: parsedStr,
                 lang: 'en'
             }
             let result = document.getElementById("output");
             const url = `https://googledictionaryapi.eu-gb.mybluemix.net?define=${params.define}`;

             fetch(url)
                 .then(function (response) {
                     if (!response.ok) {
                         throw new Error("HTTP error, status = " + response.status);
                     }
                     return response.json();
                 })
                 .then(function (data) {
                     console.log(data);

                     Array.isArray(data);
                     data = data[0];

                     if ('noun' in data.meaning) {

                        console.log(data.meaning)
                         for (let def of data.meaning.noun) {

                             const phrase = `${def.definition}`;
                             speak(phrase);
                             output.innerHTML = `<h1>${phrase}</h1>`;
                             // result.innerHTML = '<h1>' + def.definition + '</h1>'; // another way to display the result
                             break;
                         }
                     }
                 })
                 .catch(function (error) {
                     console.log(error);
                     result.innerHTML = '<h1>Sorry, I didn\'t understand that. Can you try again?</h1>';
                 });
         } else if (questionValue.search("weather in ") !== -1) {
             const position = questionValue.search(" weather ") + 12;
             const parsedStr = questionValue.substring(position, questionValue.length - 1);

             var params = {
                 define: parsedStr
             }
             let result = document.getElementById("output");
//             const url = `http://api.apixu.com/v1/current.json?key=fe27a2e7c93347239ba195516190704&q=${params.define}`;
             const url = `http://api.weatherstack.com/current?access_key=06606f5d893188bfe895ef860a31c87d&query=${params.define}`

             console.log(url);

             fetch(url)
                 .then(function (response) {
                     if (!response.ok) {
                         throw new Error("HTTP error, status = " + response.status);
                     }
                     return response.json();
                 })
                 .then(function (data) {
                     console.log(data);
                     // result.innerHTML = `<h1>It is ${data.current.condition.text}. The temperature is ${data.current.temp_c} degrees celsius, 
                     // feels like ${data.current.feelslike_c}. The wind is ${data.current.wind_kph} kilometers per hour. 
                     // Humidity is ${data.current.humidity}%.</h1>`;

                     const phrase = `It is ${data.current.weather_descriptions}. The temperature is ${data.current.temperature} degrees celsius, 
                            feels like ${data.current.feelslike}. The wind is ${data.current.wind_speed} kilometers per hour. 
                            Humidity is ${data.current.humidity}%.`;
                     speak(phrase);
                     output.innerHTML = `<h1>${phrase}</h1>`;
                 })
                 .catch(function (error) {
                     console.log(error);
                     //    result.innerHTML = '<h1>Sorry, I didn\'t understand that. Can you try again?</h1>';
                     const phrase = 'Sorry, I didn\'t understand that. Can you try again?';
                     speak(phrase);
                     output.innerHTML = `<h1>${phrase}</h1>`;

                 });
         } else if (questionValue.search("tell me") !== -1) {

             let result = document.getElementById("output");
             const url = 'https://sv443.net/jokeapi/category/Programming?blacklistFlags=nsfw,religious';

             fetch(url)
                 .then(function (response) {
                     if (!response.ok) {
                         throw new Error("HTTP error, status = " + response.status);
                     }
                     return response.json();
                 })
                 .then(function (data) {
                     console.log(data);
                     if (data.type == 'twopart') {
                         // result.innerHTML = `<h1>${data.setup} <br><br> ${data.delivery}</h1>`;
                         const phrase = data.setup + '<br><br>' + data.delivery; // I don't yet know how to make the voice stop reading <br> tags
                         speak(phrase);
                         output.innerHTML = `<h1>${phrase}</h1>`;
                     } else {
                         // result.innerHTML = `<h1>${data.joke}</h1>`;
                         const phrase = `${data.joke}`;
                         speak(phrase);
                         output.innerHTML = `<h1>${phrase}</h1>`;
                     }
                 })
                 .catch(function (error) {
                     console.log(error);
                     // result.innerHTML = '<h1>Sorry, I don\'t have any jokes today...</h1>';
                     const phrase = 'Sorry, I don\'t have any jokes today...';
                     speak(phrase);
                     output.innerHTML = `<h1>${phrase}</h1>`;
                 });
         } else if (questionValue.search("clear local storage") !== -1) {
             clearStorage();
             const phrase = 'Sorry, local storage can\'t be cleared up at the moment...';
             speak(phrase);
             output.innerHTML = `<h1>${phrase}</h1>`;
         } else {
             let result = document.getElementById("output");
             // result.innerHTML = '<h1>Sorry, I don\'t have an answer to that. Ask me something else.</h1>';
             const phrase = 'Sorry, I don\'t have an answer to that. Ask me something else.';
             speak(phrase);
             output.innerHTML = `<h1>${phrase}</h1>`;
         }
     }
 }

 function questionComment() {
     //    output.innerHTML = '<h1>I don\'t know, teach me what it is.</h1>'
     const phrase = 'I don\'t know, teach me what it is.';
     speak(phrase);
     output.innerHTML = `<h1>${phrase}</h1>`;
 }

 function timedHowCanIHelpYou() { // trying to be useful
     //    output.innerHTML = '<h1>How can I help you today?</h1>';
     const phrase = 'How can I help you today?';
     speak(phrase);
     output.innerHTML = `<h1>${phrase}</h1>`;
 }

 let ta = document.getElementById("input"); // "ta" is a short "textarea"

 function blankInput() { // sets input box to blank
     document.getElementById("input").value = "";
     ta.style.height = 'auto'; // sets textarea's height to auto
     ta.style.height = (ta.scrollHeight) + 'px'; // sets textarea's height to number of pixels accorting to input 
 }

 function blankOutput() { // sets output box to blank
     document.getElementById("output").innerHTML = "";
 }