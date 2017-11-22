/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
        init();
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        console.log('Received Event: ' + id);
    }

};

function init() {

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}
function onSuccess(position) {
    /* alert('Latitude: ' + position.coords.latitude + '\n' +
     'Longitude: ' + position.coords.longitude + '\n' +
     'Altitude: ' + position.coords.altitude + '\n' +
     'Accuracy: ' + position.coords.accuracy + '\n' +
     'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
     'Heading: ' + position.coords.heading + '\n' +
     'Speed: ' + position.coords.speed + '\n' +
     'Timestamp: ' + position.timestamp + '\n');
     */
    $.ajax({
        dataType: "jsonp",
        url: "https://api.darksky.net/forecast/4753bec9e74d19cf56d1db0223619337/" + position.coords.latitude + ',' + position.coords.longitude + "?units=si",
        success: function (result) {

            //  $("#weather").text('Summary: ' + result.currently.summary + ', Icon: ' + result.currently.icon + ', Temperature: ' + result.currently.temperature);


            $("#weatherIcon").attr("src", 'img/weatherIcons/' + result.currently.icon + '.png');
            $("#weatherText").text(result.currently.summary);
            $("#tempText").text(result.currently.temperature);

            if (result.currently.temperature < 15.0) {

                $("#tempIcon").attr("src", "second.jpg");

            } else {

                $("#tempIcon").attr("src", "img/weatherIcons/high.png");
            }


            /*MAP API*/


            var mymap = L.map('mapid').setView([position.coords.latitude, position.coords.longitude], 12);

            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicmltaTg4IiwiYSI6ImNqYTVha2ZsZTltanUzM3F0bjV1a2k3ZW8ifQ.3ZYBWHzXLzQfzJR6V11g-Q', {
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery � <a href="http://mapbox.com">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox.streets',
                accessToken: 'pk.eyJ1IjoicmltaTg4IiwiYSI6ImNqYTVha2ZsZTltanUzM3F0bjV1a2k3ZW8ifQ.3ZYBWHzXLzQfzJR6V11g-Q'
            }).addTo(mymap);


            L.circle([position.coords.latitude, position.coords.longitude], {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: 500
            }).addTo(mymap).bindPopup("You are here.");


            var marker = L.marker([-20.135462, 57.524831]).addTo(mymap).bindPopup("Le Hochet Social Welfare Centre, Dr Manilall Rd Terre Rouge .");

            var geo = JSON.parse(localStorage.getItem('shelters'));

            for (var i = 0; i < geo.shelters.length; i++) {

                L.marker([geo.shelters[i].latitude, geo.shelters[i].longitude]).addTo(mymap).bindPopup(geo.shelters[i].addr);

            }

            var mapName = L.map('shelterMapid').setView([position.coords.latitude, position.coords.longitude], 12);
            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicmltaTg4IiwiYSI6ImNqYTVha2ZsZTltanUzM3F0bjV1a2k3ZW8ifQ.3ZYBWHzXLzQfzJR6V11g-Q', {
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery � <a href="http://mapbox.com">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox.streets',
                accessToken: 'pk.eyJ1IjoicmltaTg4IiwiYSI6ImNqYTVha2ZsZTltanUzM3F0bjV1a2k3ZW8ifQ.3ZYBWHzXLzQfzJR6V11g-Q'
            }).addTo(mapName);


            var geo = JSON.parse(localStorage.getItem('shelters'));

            for (var i = 0; i < geo.shelters.length; i++) {

                L.marker([geo.shelters[i].latitude, geo.shelters[i].longitude]).addTo(mapName).bindPopup(geo.shelters[i].addr);


            }


            var string = "";


            $.ajax({
                type: 'get',

                url: "https://newsapi.org/v2/top-headlines?q=disaster&apiKey=86d903bb5559418b85bcb50ff607e0f8",
                success: function (result) {


                    for (var i = 0; i < result.articles.length; i++) {

                        if (result.articles[i].title != null && result.articles[i].description != null && result.articles[i].publishedAt != null && result.articles[i].url != null && result.articles[i].urlToImage != null
                        ) {
                            var date = moment(result.articles[i].publishedAt);

                            string = string + '<div class="article">';
                            string = string + '<p><img width="100%" class="centerElement" src="' + result.articles[i].urlToImage + '"></p>';

                            string = string + '<h2>' + result.articles[i].title + '</h2>';

                            string = string + '<p> ' + result.articles[i].description + '</p>';

                            string = string + '<p><small><b>' + date.format("dddd, MMMM Do YYYY, h:mm:ss a") + '</b></small></p>';

                            string = string + '<p><a href="' + result.articles[i].url + '" class="ui-btn ui-shadow ui-corner-all ui-btn-inline ui-mini">more</a></p>';

                            string = string + '    </div>';


                        }


                    }


                    $("#news").html(string);
                }


            });


            $.ajax({

                type: 'get',
                url: "https://newsapi.org/v2/top-headlines?q=flood&sources=abc-news,the-irish-times&apiKey=86d903bb5559418b85bcb50ff607e0f8",
                success: function (result) {

                    string = "";
                    for (var i = 0; i < result.articles.length; i++) {

                        if (result.articles[i].title != null && result.articles[i].description != null && result.articles[i].publishedAt != null && result.articles[i].url != null && result.articles[i].urlToImage != null
                        ) {

                            var date = moment(result.articles[i].publishedAt);
                            string = string + '<div class="article">';
                            string = string + '<p><img width="100%" class="centerElement" src="' + result.articles[i].urlToImage + '"></p>';

                            string = string + '<h2>' + result.articles[i].title + '</h2>';

                            string = string + '<p> ' + result.articles[i].description + '</p>';

                            string = string + '<p><small><b>' + date.format("dddd, MMMM Do YYYY, h:mm:ss a") + '</b></small></p>';

                            string = string + '<p><a href="' + result.articles[i].url + '" class="ui-btn ui-shadow ui-corner-all ui-btn-inline ui-mini">more</a></p>';

                            string = string + '    </div>';


                        }


                    }


                    $("#news").append(string);
                }

            });

            $.ajax({
                type: 'get',
                url: "https://newsapi.org/v2/top-headlines?q=cyclone&sources=abc-news,the-irish-times&apiKey=86d903bb5559418b85bcb50ff607e0f8",
                success: function (result) {

                    string = "";
                    for (var i = 0; i < result.articles.length; i++) {

                        if (result.articles[i].title != null && result.articles[i].description != null && result.articles[i].publishedAt != null && result.articles[i].url != null && result.articles[i].urlToImage != null
                        ) {

                            var date = moment(result.articles[i].publishedAt);
                            string = string + '<div class="article">';
                            string = string + '<p><img width="100%" class="centerElement" src="' + result.articles[i].urlToImage + '"></p>';

                            string = string + '<h2>' + result.articles[i].title + '</h2>';

                            string = string + '<p> ' + result.articles[i].description + '</p>';

                            string = string + '<p><small><b>' + date.format("dddd, MMMM Do YYYY, h:mm:ss a") + '</b></small></p>';

                            string = string + '<p><a href="' + result.articles[i].url + '" class="ui-btn ui-shadow ui-corner-all ui-btn-inline ui-mini">more</a></p>';

                            string = string + '    </div>';


                        }


                    }
                    $("#news").append(string);
                }


            });

            /* $(document).on("pagechange", "#body", function (e, f) {
             var page_id = f.toPage[0].id;
             if (page_id == "emergency-shelters") {*/
          /*  var mapName = L.map('shelterMapid').setView([position.coords.latitude, position.coords.longitude], 10);
            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicmltaTg4IiwiYSI6ImNqYTVha2ZsZTltanUzM3F0bjV1a2k3ZW8ifQ.3ZYBWHzXLzQfzJR6V11g-Q', {
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery � <a href="http://mapbox.com">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox.streets',
                accessToken: 'pk.eyJ1IjoicmltaTg4IiwiYSI6ImNqYTVha2ZsZTltanUzM3F0bjV1a2k3ZW8ifQ.3ZYBWHzXLzQfzJR6V11g-Q'
            }).addTo(mapName);

            var geo = JSON.parse(localStorage.getItem('shelters'));

            for (var i = 0; i < geo.shelters.length; i++) {

                L.marker([geo.shelters[i].latitude, geo.shelters[i].longitude]).addTo(mapName).bindPopup(geo.shelters[i].addr);


            }*/
            /*  }
             });*/


        }
    });
}
function onError(error) {
    alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}


init();


