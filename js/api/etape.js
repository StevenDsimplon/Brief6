const url = "http://51.137.57.138:1337";
const cartel = "/api/cartels/";
const recupAll = "?populate=*";
const section = document.querySelector("section.cartels");
var map = L.map('map').setView([50.62925, 3.057256], 9);
/// creation map
var Stadia_OSMBright = L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map);

// URL to your GPX file or the GPX itself
//  Ajout Gpx //
var liengpx = ["../gpx/calais-ardres.gpx",
    "../gpx/ardres-watten.gpx",
    "../gpx/watten-st-omer.gpx",
    "../gpx/st-omer-aire-sur-la-lys.gpx",
    "../gpx/aire-sur-la-lys-st-venant.gpx",
    "../gpx/st-venant-bethune.gpx",
    "../gpx/bethunes-olhain.gpx",
    "../gpx/olhain-angres.gpx",
    "../gpx/angres-lens.gpx",
    "../gpx/lens-don.gpx",
    "../gpx/don-lille.gpx",
    "../gpx/lille-wattrelos.gpx"];

function $_GET(param) {
    var vars = {};
    window.location.href.replace(location.hash, '').replace(
        /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
        function (m, key, value) { // callback
            vars[key] = value !== undefined ? value : '';
        }
    );

    if (param) {
        return vars[param] ? vars[param] : null;
    }
    return vars;
}

var customOptions =
{
    'className': 'popupCustom'
}
let mapEtape = [];
let popup = [];

function printArticle(value) {


    article = document.createElement("article");
    article.setAttribute("data-id", "etape" + value.id);

    //// Creation contenu gauche
    figure = document.createElement("figure");

    imgetape = document.createElement("img");
    imgetape.src = url + value.attributes.imgetape.data.attributes.formats.small.url;
    imgetape.classList.add("imgEtape");
    figure.appendChild(imgetape);

    figcaption = document.createElement("figcaption");
    figcaption.innerText = value.attributes.km + " Km";
    figure.appendChild(figcaption);

    article.appendChild(figure);

    //// Creation contenu droit
    divContenu = document.createElement("div");
    divContenu.classList.add("contenu");

    ////// Presentation
    divPresentation = document.createElement("div");
    divPresentation.classList.add("presentation");
    presentation = document.createElement("p");
    presentation.innerText = value.attributes.presentation
    divPresentation.appendChild(presentation);
    lien = document.createElement("a");
    lien.classList.add("carnet")
    heart = document.createElement("i");
    heart.classList.add("fa-regular");
    heart.classList.add("fa-heart");
    lien.setAttribute("href", "#");
    lien.appendChild(heart);
    divPresentation.appendChild(lien);
    divContenu.appendChild(divPresentation);

    ////// Niveau
    divNiv = document.createElement("div");


    circle = document.createElement("i");
    circle.classList.add("fa-solid");
    circle.classList.add("fa-circle");
    divNiv.appendChild(circle);


    textNiv = document.createElement("p");
    switch (value.attributes.niveau) {
        case 1:
            divNiv.classList.add("niveau-deb");
            textNiv.innerText = "Débutant";
            break;
        case 2:
            divNiv.classList.add("niveau-moy");
            textNiv.innerText = "Moyen";
            break;

        case 3:
            divNiv.classList.add("niveau-dif");
            textNiv.innerText = "Difficile";
            break;
        default:
            console.log('erreur');
    }

    divNiv.appendChild(textNiv);
    divContenu.appendChild(divNiv);

    //////Etape
    etape = document.createElement("h2");
    etape.innerText = value.attributes.etape
    divContenu.appendChild(etape)

    ////// Description
    description = document.createElement("p");
    description.classList.add("description");
    description.innerText = value.attributes.description;
    divContenu.appendChild(description);

    article.appendChild(divContenu);

    popup[0] = L.popup(customOptions);
    mapEtape[0] = new L.GPX(liengpx[value.id -1], {
        polyline_options: {
            color: '#00246B',
            weight: 5,
            lineCap: 'round'
        }
    }).on('mouseover', function (e) {
        this.setStyle({
            color: '#e5b9d5'
        })
        popup[0]
            .setLatLng(e.latlng)
            .setContent("<h3>" + value.attributes.etape.toString() + "</h3>")
            .openOn(map);
    }).on('mouseout', function (e) {
        map.closePopup();
        this.setStyle({
            color: '#00246B'
        }).on('click', function (e) {
            document.location.href = "etape.html?etape=" +value.id;
        })
    }).on('loaded', function (e) {
        map.fitBounds(e.target.getBounds());
    }).addTo(map);


    //Ajout de l'article a la section
    section.appendChild(article);

    article.addEventListener('mouseover', () => {
        mapEtape[0].setStyle({
            color: '#e5b9d5'
        });
    });
    article.addEventListener('mouseout', () => {
        mapEtape[0].setStyle({
            color: '#00246B'
        });
    });
    article.addEventListener('click', () => {
        document.location.href = "itineraire.html";
    });

}




fetch(url + cartel + recupAll)
    .then(response => response.json())
    .then(function (response) {
        response.data.sort(function (a, b) {
            return a.id - b.id;
        })

        numEtape = $_GET('etape');
        console.log(numEtape, '/', response.data[numEtape-1])

        printArticle(response.data[numEtape-1]);


    })
    .catch(error => alert("Erreur :" + error));