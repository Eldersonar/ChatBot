- This is the virtual assistant written just using JS. It simulates organic conversation with the user by using web services to retrieve needed information and parsing it to give user friendly answers.
- So far you can ask 3 questions:
    - weather in "put city name here"?
    - What is "put noun here"?
    - ask for a joke by typing "tell me a joke"
- to be able to run the application you must run in on local server. Otherwise it would give you this nasty CORS error: 
"Access to script at 'file:///C:/Users/HP%20EliteBook/Desktop/CIT261/CIT-261-master/chatbot/chatbot.js' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https."
- Still must implement validation (including using regular expressions)
- Must modularize my code to maki functions reuslable. Speak() is just one example of how I will do that.