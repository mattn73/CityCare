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
    $.ajax({dataType: "jsonp",
        url: "https://api.darksky.net/forecast/4753bec9e74d19cf56d1db0223619337/" + position.coords.latitude + ',' + position.coords.longitude + "?units=si",
        success: function (result) {

          //  $("#weather").text('Summary: ' + result.currently.summary + ', Icon: ' + result.currently.icon + ', Temperature: ' + result.currently.temperature);


            $("#weatherIcon").attr("src",'img/weatherIcons/' + result.currently.icon+'.png');
            $("#weatherText").text( result.currently.summary);
            $("#tempText").text(result.currently.temperature );

            if(result.currently.temperature < 15.0){

                $("#tempIcon").attr("src","second.jpg");

            }else  {

                $("#tempIcon").attr("src","img/weatherIcons/high.png");
            }




            var mymap = L.map('mapid').setView([position.coords.latitude, position.coords.longitude], 12);

            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicmltaTg4IiwiYSI6ImNqYTVha2ZsZTltanUzM3F0bjV1a2k3ZW8ifQ.3ZYBWHzXLzQfzJR6V11g-Q', {
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery � <a href="http://mapbox.com">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox.streets',
                accessToken: 'pk.eyJ1IjoicmltaTg4IiwiYSI6ImNqYTVha2ZsZTltanUzM3F0bjV1a2k3ZW8ifQ.3ZYBWHzXLzQfzJR6V11g-Q'
            }).addTo(mymap);
            //var marker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(mymap);
            var circle = L.circle([position.coords.latitude, position.coords.longitude], {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: 500
            }).addTo(mymap);
        }
    });
}
function onError(error) {
    alert('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
}


init();
