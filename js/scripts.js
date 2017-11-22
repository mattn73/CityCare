$(document).ready(function($){"use strict"; jQuery(".bar").each(function(){jQuery(this).append("<span class='bar-value' style='background:" + jQuery(this).data("background") + ";width:" + jQuery(this).data("value") + "%;'></span>"); jQuery(this).prepend("<h5 class='bar-title'>" + jQuery(this).data("title") + "</h5>"); var positionPercentage = parseInt(100 - jQuery(this).attr("data-value")); if (positionPercentage > 50){positionPercentage = 0; jQuery(".bar").css("background", "#dadada")}jQuery(this).prepend("<span class='bar-number' style='right: " + positionPercentage + "%;'>" + jQuery(this).data("value") + "%</span>")}); jQuery.mobile.ajaxEnabled = false; jQuery.mobile.keepNative = "select,input,a,button,textarea"; jQuery.event.special.swipe.durationThreshold = 650; jQuery.event.special.swipe.horizontalDistanceThreshold = 85; var aSearchClicked = false; jQuery(".sub-menu").hide(); jQuery(".container").hide(); jQuery("section").waypoint(function(direction){jQuery('[data-role="header"]').removeClass("dark"); if (direction === 'down'){if (this.adapter.$element.data('header-dark') == true){jQuery('[data-role="header"]').addClass("dark")} else{jQuery('[data-role="header"]').removeClass("dark")}}if (direction === 'up'){if (this.adapter.$element.prev().data('header-dark') == true){jQuery('[data-role="header"]').addClass("dark")}}}, {offset:'48px'}); if ("ontouchstart"in document.documentElement){jQuery(".menu-item-has-children").click(function(event){event.preventDefault(); jQuery(this).children(".sub-menu").toggleClass("active").toggle(350); return false}).children(".sub-menu").children("li").click(function(event){window.location.href = jQuery(this).children("a").attr("href")}); $('#a-sidebar').bind('touchstart touchon', function(event){if (aSearchClicked){$('#searchform').removeClass('moved'); aSearchClicked = false}return false}); $('#a-search').bind('touchstart touchon', function(event){if (aSearchClicked){$('#searchform').removeClass('moved'); aSearchClicked = false} else{$('#searchform').addClass('moved'); aSearchClicked = true}return false})} else{jQuery(".menu-item-has-children").click(function(event){event.preventDefault(); jQuery(this).children(".sub-menu").toggleClass("active").toggle(350); return false}).children(".sub-menu").children("li").click(function(event){window.location.href = jQuery(this).children("a").attr("href")}); jQuery('#header-menu-icon').bind('click', function(event){if (aSearchClicked){jQuery('#searchform').removeClass('moved'); aSearchClicked = false}return false}); $('#a-search').bind('click', function(event){if (aSearchClicked){$('#searchform').removeClass('moved'); aSearchClicked = false} else{$('#searchform').addClass('moved'); aSearchClicked = true}return false})}jQuery(document).on("swipeleft swiperight", '.disableswipe', function(e){e.stopPropagation(); e.preventDefault()}); jQuery(document).on("swipeleft swiperight", 'input', function(e){e.stopPropagation(); e.preventDefault()}); jQuery(document).on("swipeleft swiperight", function(e){if ($.mobile.activePage.jqmData("panel") !== "open"){if (e.type === "swipeleft"){jQuery("#sidebar-right").panel("open"); if (aSearchClicked){jQuery('#searchform').removeClass('moved'); aSearchClicked = false}} else if (e.type === "swiperight"){jQuery("#sidebar").panel("open"); if (aSearchClicked){jQuery('#searchform').removeClass('moved'); aSearchClicked = false}}}})});
//mdecalre object for storinbg varibale
        var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
                this.el = el;
                this.loopNum = 0;
                this.period = parseInt(period, 10) || 100;
                this.txt = '';
                this.tick();
                this.isDeleting = false;
        };
        TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length; //i store module number loop compare to number of word
                var fullTxt = this.toRotate[i]; //take actual position of text

                if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';
                var that = this;
                var delta = 200 - Math.random() * 100;
                if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
                //this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
                this.loopNum++;
                delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
        };
        window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
                for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
                var period = elements[i].getAttribute('data-period');
                if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
        }
        }
        // INJECT CSS
        var css = document.createElement("style");
                css.type = "text/css";
                css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #1ea8e0}";
                document.body.appendChild(css);
        };


function init() {

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

function onSuccess(position) {



    var mapName = L.map('shelterMapid').setView([position.coords.latitude, position.coords.longitude], 10);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicmltaTg4IiwiYSI6ImNqYTVha2ZsZTltanUzM3F0bjV1a2k3ZW8ifQ.3ZYBWHzXLzQfzJR6V11g-Q', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery � <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoicmltaTg4IiwiYSI6ImNqYTVha2ZsZTltanUzM3F0bjV1a2k3ZW8ifQ.3ZYBWHzXLzQfzJR6V11g-Q'
    }).addTo(mapName);

    var geo =  JSON.parse(localStorage.getItem('shelters'));

    for (var i = 0; i < geo.shelters.length; i++) {

        L.marker([geo.shelters[i].latitude, geo.shelters[i].longitude]).addTo(mapName).bindPopup(geo.shelters[i].addr);


    }


}
function onError(error) {
    alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}


$(document).on("pagechange", "#body", function (e, f) {
    var page_id = f.toPage[0].id;
    if(page_id == "emergency-shelters"){

            init();
    }

});