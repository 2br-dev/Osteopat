$(() => {
    fillImages();
    $('body').on('click', '.burger-wrapper', toggleNavi);
    $('body').on('click', '#request', openModal);
    $('body').on('click', '.segment-trigger', openSegment);
    $('body').on('click', '.close-segment', closeSegment);
    $('body').on('click', '.modal-shadow, .modal .close', closeModal);
    $('body').on('click', '#send_request', sendMessage);
});

function sendMessage(e){
    e.preventDefault();
    var form = $(this).parents('form');
    var fields = ['name', 'phone'];

    var hasErrors = false;

    $(fields).each((index, field) => {
        if(!validate(field)){
            hasErrors = true;
        }
    });

    if(!$('[name="agreement"').prop("checked")){
        $('[name="agreement"] + label').addClass('error');
        hasErrors = true;
    }else{
        $('[name="agreement"] + label').removeClass('error');
    }

    if(hasErrors)
        return;

    var data = $(this).parents('form').serialize();

    $.ajax({
        url: '/assets/sender.php',
        type: 'POST',
        dataType: 'json',
        data: data,
        success: response => {

            var classes = 'active';

            if(response.hasErrors){
                classes = 'active error'
            }

            $('.response').text(response.message).addClass(classes);
            if(response.hasErrors)
                return;
                
            setTimeout(() => {
                                $('.response').removeClass('active');
                setTimeout(() => {
                    $('.response').text('');
                    closeModal();
                })
            }, 3000);
        },
        error: response => {
            console.log(response);
        }
    })
}

function validate(selector){
    if($('[name="'+selector+'"]').val() == ''){
        $('[name="'+selector+'"]').addClass('error');
        return false;
    }else{
        $('[name="'+selector+'"]').removeClass('error');
        return true;
    }
}

loadScript = (url, callback) => {

    var script = document.createElement("script")
    script.type = "text/javascript";

    if (script.readyState){  //IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {  //Others
        script.onload = function(){
            callback();
        };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

function closeSegment(e){
    e.preventDefault();
    $('.backbone-segment').removeClass('active');
    $('.segment-trigger').addClass('pulse');
}

function openSegment(e){
    e.preventDefault();
    var seg = $(this).data('segment');
    $('.backbone-segment').removeClass('active');
    $('.segment-trigger').removeClass('pulse');
    $('#seg' + seg).addClass('active');
}

function toggleNavi(){
    $('body').toggleClass('burgered');
    $(this).toggleClass('open');
}

function fillImages(){
    $('.lazy-image').each((index, el) => {
        var src = $(el).data('src');
        if(src && src != ''){
            $(el).css({
                backgroundImage: 'url('+src+')'
            });
        }
    })
}

function openModal(e){
    e.preventDefault();

    $('.modal [type="text"]').val('');
    $('.modal [type="checkbox"]').prop('checked', false);
    $('.modal .response').prop('className', 'response');

    $('.modal').addClass('open');
    $('.modal-shadow').addClass('open');
    $('body').addClass('modalled');
}

function closeModal(){
    $('.modal').removeClass('open');
    $('.modal-shadow').removeClass('open');
    $('body').removeClass('modalled');
}

if($('#map').length){
    loadScript("https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.4.3/build/ol.js", () => {
        initMap();
    })
}

function initMap(){

            var circle = new ol.geom.Circle(
                // ol.proj.transform([38.9800954, 45.0219865], 'EPSG:4326', 'EPSG:3857'),
                ol.proj.fromLonLat([38.9800954, 45.0219865]), 
                30
            );

            // Features
            var circleFeature = new ol.Feature(circle);

            // Source and vector layer
            var vectorSource = new ol.source.Vector({
                features: [circleFeature]
            });

            var style = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(136, 191, 92, 1)'
                }),
                stroke: new ol.style.Stroke({
                    width: 30,
                    color: 'rgba(136, 191, 92, 0.3)'
                })
            });

            var vectorLayer = new ol.layer.Vector({
                source: vectorSource,
                style: style
            });

            // Maps
            var map = new ol.Map({
                target: 'map',  // The DOM element that will contains the map
                renderer: 'canvas', // Force the renderer to be used
                layers: [
                    // Add a new Tile layer getting tiles from OpenStreetMap source
                    new ol.layer.Tile({
                        source: new ol.source.OSM({
                            url: "https://basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}{r}.png"
                        })
                    }),
                    vectorLayer
                ],
                // Create a view centered on the specified location and zoom level
                view: new ol.View({
                    center: ol.proj.fromLonLat([38.9800954, 45.0219865]),
                    zoom: 17
                })
            });  
}