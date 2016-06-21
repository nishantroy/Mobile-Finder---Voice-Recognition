angular.module('VR',[]).
    controller('myController',['$scope', '$location', '$window', function($scope,$location,$window){


        $scope.startlistening = function(){

            annyang.start();
        }

        $scope.button = "Search";

        $scope.answer= "Your results will show here!";

        $scope.original = function() {

            $window.open("ed1.html",'target');

        };

        var inputSentence;
        var words = [];
        var screenLocation;
        var memoryLocation;
        var storageInt = 50;
        var resultObj = {
            OS: null,
            MAKE: null,
            SCREENSIZE: null,
            STORAGE: null,
            MEMORY: null,
            PRICE: null
        };

        $scope.myFunction = function () {
            inputSentence = $scope.searchval;
            inputSentence = inputSentence.toLowerCase();
            console.log(inputSentence);
            inputSentence = inputSentence.replace(/gb/gi, " gb");
            inputSentence = inputSentence.replace(/inch/gi, " inch");
            words = inputSentence.split(" ");

            $scope.OSFunction();
            $scope.makeFunction();
            $scope.screenSize();
            $scope.memoryFunction();
            $scope.storageFunction();
            $scope.priceFunction();
            $scope.buildURL();
            console.log(resultObj);

        };

        $scope.OSFunction = function() {
            var OS = ["android", "ios", "windows"];

            for (var i = 0; i < OS.length; i++) {				//for OS
                if (inputSentence.indexOf(OS[i]) != -1) {
                    resultObj.OS = OS[i];

                }
            }
        };

        $scope.makeFunction = function() {
            var make = ["apple", "samsung", "htc", "micromax", "lg", "panasonic", "lava", "microsoft", "blackberry", "sony"];
            for (var i = 0; i < make.length; i++) {				//for make
                if (inputSentence.indexOf(make[i]) != -1) {
                    resultObj.MAKE = make[i];

                }
            }
        };

        $scope.screenSize = function() {
            if (inputSentence.indexOf("screen") != -1 || inputSentence.indexOf("inch") != -1 || inputSentence.indexOf("size") != -1) {
                var screenSize = true;
                var indexScWord = -1; //KEEPS TRACK OF THE WORD SCREEN,INCH OR SIZE
                if (screenSize == true) {
                    for (var j = 0; j < words.length; j++) {
                        if (words[j].valueOf() == "screen") {
                            indexScWord = j;
                            break;
                        } else if (words[j].valueOf() == "inch") {
                            indexScWord = j;
                            break;
                        } else if (words[j].valueOf() == "size") {
                            indexScWord = j;
                            break;
                        } else {
                            indexScWord = -1;
                        }

                    }

                    var lowerLimit = indexScWord - 2;
                    var upperLimit = indexScWord + 2;

                    if (lowerLimit < 0) {  //CONDITION FOR LOWER LIMIT
                        lowerLimit = 0;
                    }
                    if (upperLimit >= words.length) { //CONDITION FOR UPPER LIMIT
                        upperLimit = (words.length) - 1;
                    }
                    if (words[indexScWord].valueOf == "inch") {
                        for (var k = lowerLimit; k <= indexScWord; k++) {
                            if (words[k].length == 1) {
                                resultObj.SCREENSIZE = words[k];

                                screenLocation = k;
                            }
                        }
                    } else {
                        for (var k = lowerLimit; k <= upperLimit; k++) {
                            if (words[k].length == 1) {
                                resultObj.SCREENSIZE = parseInt(words[k]);
                                screenLocation = k;

                            }
                        }
                    }

                }
            }

        };

        $scope.memoryFunction = function(){
            memoryProvided = false;

            if (inputSentence.indexOf("memory") != -1 || inputSentence.indexOf("ram") != -1) {
                memoryProvided = true;

                memoryStorageWord = -1; //KEEPS TRACK OF THE WORD STORAGE OR SPACE
                if (memoryProvided) {
                    for (j = 0; j < words.length; j++) {

                        if (words[j].valueOf() == "memory") {
                            memoryStorageWord = j;
                            break;

                        } else if (words[j].valueOf() == "ram") {
                            memoryStorageWord = j;
                            break;

                        } else {
                            memoryStorageWord = -1;
                        }

                    }
                    memoryLocation = memoryStorageWord;
                    lowerLimit = memoryStorageWord - 2;
                    upperLimit = memoryStorageWord + 2;

                    if (lowerLimit < 0) {  //CONDITION FOR LOWER LIMIT
                        lowerLimit = 0;
                    }

                    if (upperLimit >= words.length) { //CONDITION FOR UPPER LIMIT
                        upperLimit = (words.length) - 1;
                    }

                    ramInt = storageInt;

                    for (k = lowerLimit; k <= upperLimit; k++) {
                        if (((words[k].length == 1) || (words[k].length == 2)) && !isNaN(words[k])) {
                            check = parseInt(words[k]);
                            if (check < ramInt) {
                                ramInt = check;

                                resultObj.MEMORY = ramInt;
                            }
                        }
                    }
                }

            }

        };

        $scope.storageFunction = function(){
            var storageProvided = false;
            if (memoryProvided == false) {
                if (inputSentence.indexOf("storage") != -1 || inputSentence.indexOf("space") != -1 || inputSentence.indexOf("gb") != -1) {
                    storageProvided = true;

                    var indexStorageWord = -1;
                    if (storageProvided) {

                        for (j = 0; j < words.length; j++) {


                            if (words[j].valueOf() == "storage") {

                                indexStorageWord = j;
                                break;
                            } else if (words[j].valueOf() == "space") {
                                indexStorageWord = j;
                                break;
                            } else if (words[j].valueOf() == "gb") {
                                indexStorageWord = j;

                                break;
                            }
                            else {
                                indexStorageWord = -1;
                            }

                        }

                        lowerLimit = indexStorageWord - 1;
                        upperLimit = indexStorageWord + 1;

                        if (lowerLimit < 0) {  //CONDITION FOR LOWER LIMIT
                            lowerLimit = 0;
                        }

                        if (upperLimit >= words.length) { //CONDITION FOR UPPER LIMIT
                            upperLimit = (words.length) - 1;
                        }
                        //storageInt=0;
                        for (k = lowerLimit; k <= upperLimit; k++) {
                            if (((words[k].length == 1) || (words[k].length == 2)) && !isNaN(words[k])) {
                                check = parseInt(words[k]);

                                if (check > storageInt || storageInt == 50) {
                                    storageInt = check;
                                    if (indexStorageWord != -1) {
                                        resultObj.STORAGE = storageInt;

                                    }
                                }

                            }
                        }
                    }

                }
            }
            else {
                if (inputSentence.indexOf("storage") != -1 || inputSentence.indexOf("space") != -1 || inputSentence.indexOf("gb") != -1) {
                    storageProvided = true;

                    var indexStorageWord = -1;
                    if (storageProvided) {

                        for (j = 0; j < words.length; j++) {


                            if (words[j].valueOf() == "storage") {
                                indexStorageWord = j;
                                break;
                            } else if (words[j].valueOf() == "space") {

                                indexStorageWord = j;
                                break;
                            } else if (words[j].valueOf() == "gb") {

                                if ((words[j - 1].valueOf() == resultObj.MEMORY) || (words[j + 1].valueOf() == resultObj.MEMORY)) {

                                    if (words[j - 1].valueOf() != resultObj.MEMORY) {
                                        indexStorageWord = j;
                                        break;
                                    }
                                    else {

                                        continue;
                                    }
                                }
                                else {
                                    indexStorageWord = j;
                                    break;
                                }
                            }
                            else {
                                indexStorageWord = -1;
                            }

                        }

                        lowerLimit = indexStorageWord - 1;
                        upperLimit = indexStorageWord + 1;

                        if (lowerLimit < 0) {  //CONDITION FOR LOWER LIMIT
                            lowerLimit = 0;
                        }

                        if (upperLimit >= words.length) { //CONDITION FOR UPPER LIMIT
                            upperLimit = (words.length) - 1;
                        }
                        //storageInt=0;
                        for (k = lowerLimit; k <= upperLimit; k++) {
                            if (((words[k].length == 1) || (words[k].length == 2)) && !isNaN(words[k])) {
                                check = parseInt(words[k]);

                                if (check > storageInt || storageInt == 50) {
                                    storageInt = check;
                                    if (indexStorageWord != -1) {
                                        resultObj.STORAGE = storageInt;

                                    }
                                }

                            }
                        }
                    }

                }



            }
        };

        $scope.priceFunction = function(){

                for (var i = 0; i < words.length; i++) {
                    if ($scope.isNumericPrice(words[i])) {
                        resultObj.PRICE = parseInt(words[i]);
                    }

                }
        };

        $scope.isNumericPrice = function(str) {
            var d;
            if (!isNaN(str)){
                d = parseInt(str);
            }

            else {
                return false;
            }
            return d > 1000;
        };

        $scope.buildURL = function(){
            url = "http://m.gadgets360.ndtv.net.in/mobiles/search?&query=&price_range=0-100000&sortby=slug-asc";
            if(resultObj["PRICE"] != null){
                if (inputSentence.indexOf("at least") != -1 || inputSentence.indexOf("above") != -1 || inputSentence.indexOf("higher") != -1){
                    url = "http://m.gadgets360.ndtv.net.in/mobiles/search?&query=&price_range=" + resultObj["PRICE"] + "-100000&sortby=slug-asc";
                }
                else if (inputSentence.indexOf("less than") != -1 || inputSentence.indexOf("below") != -1 || inputSentence.indexOf("lower") != -1 || inputSentence.indexOf("at most") != -1){
                    url = "http://m.gadgets360.ndtv.net.in/mobiles/search?&query=&price_range=0-" + resultObj["PRICE"] + "&sortby=slug-asc";
                }
                else{
                    url = "http://m.gadgets360.ndtv.net.in/mobiles/search?&query=&price_range=" + (resultObj["PRICE"] - 3000) + "-" + (resultObj["PRICE"] + 3000) + "&sortby=slug-asc";
                }
            }
            if(resultObj["OS"] != null){
                var os = resultObj["OS"];
                os = os[0].toUpperCase() + os.slice(1);
                url = url + "&os=" + os;
            }
            if(resultObj["MAKE"] != null){
                url = url+"&brand="+resultObj["MAKE"];
            }
            if(resultObj["SCREENSIZE"] != null){
                url = url + "&screen_size=" +resultObj["SCREENSIZE"];
            }
            if(resultObj["STORAGE"] != null){
                url = url + "&storage_internal=" +(resultObj["STORAGE"]*1000);
            }


            console.log(url);
        };








        var commands = {
            'ndtv search *val' : function(val){
                $scope.searchval = val;
                $scope.button = "Search NDTV";
                $scope.link = "http://www.ndtv.com/topic/" + val;
                $window.location.href =($scope.link);
                $scope.$apply();
                annyang.abort();
            },

            'go to *val' : function(val){
                $scope.button = "Open website";
                $scope.searchval = val;
                $scope.link = "http://" + val;
                $window.location.href =($scope.link);
                $scope.$apply();
                annyang.abort();
            },

            'youtube *val' : function(val){
                $scope.button = "Search YouTube";
                $scope.searchval = val;
                $scope.link = "https://www.youtube.com/results?search_query=" + val;
                $window.location.href =($scope.link);
                $scope.$apply();
                annyang.abort();
            },

            'google *val' : function(val){
                $scope.button = "Search Google";
                $scope.searchval = val;
                $scope.link = "https://www.google.com/#q=" + val;
                $window.location.href =($scope.link);
                $scope.$apply();
                annyang.abort();
            },

            '*val' : function(val){
                $scope.searchval = val;
                $scope.myFunction();
                $scope.$apply();
                annyang.abort();
            }


        }




        annyang.addCommands(commands);
        annyang.debug();



//function myFunction(var inputSentence) {
//
//    inputSentence = document.getElementById("inputText").value;
//    //document.write(inputSentence);
//    inputSentence = inputSentence.toLowerCase();
//    inputSentence = inputSentence.replace(/gb/gi, " gb");
//    inputSentence = inputSentence.replace(/inch/gi, " inch");
//    words = inputSentence.split(" ");
//    OSFunction();
//    makeFunction();
//    screenSize();
//    memoryFunction();
//    storageFunction();
//    priceFunction();
//    buildURL();
//    console.log(resultObj);
//
//}


    }])