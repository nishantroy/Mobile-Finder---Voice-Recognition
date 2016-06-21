# VoiceSearch

This is hosted at [this link](http://nroy96.github.io) (I am the owner of the nroy96 Github account as well, but primarily use nishantroy as my Github now).

I built this web-app as a prototype for using Voice Recognition (through Annyang by Tal Ater) to allow users to search for mobile devices that met their needs/wants, while I was interning at NDTV Convergence during the development of NDTV Gadgets 360.

This only works in Google Chrome since Annyang uses Chrome's webkit for Voice Recognition.

Once the speech is parsed, the query is processed by identifying key words and determining the search parameters (storage, price, OS, etc.)

Once you hit Start Listening, allow Chrome to access your microphone. Then, you can say your query.

Example queries :

1) "Show me Android devices with 4gb memory and 32gb storage costing less than 50000 rupees."

2) "Show me Samsung phones with a 5 inch screen."

The results are logged to the console as an object, and a URL is generated with the data gathered, but the URL was for testing purposes and is no longer a valid domain.

##First version

Click on the red button to see the first version of the app.

Once you hit Start Listening, allow Chrome to access your microphone. Then, you can say your query.

Here, you have 4 options:

1) "NDTV Search _______" : This will search NDTV.com for whatever is in the blank.

2) "Go to ______" : This will attempt to navigate to the website in the blank. Make sure you add the extension (.com/.org/.net/etc.)

3) "Youtube ______" : This will search YouTube for whatever is in the blank.

4) "Google ______" : This will search Google for whatever is in the blank.



