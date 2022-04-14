const url = "http://51.137.57.138:1337";
const apitemoignage = "/api/temoignages";
const img = "?populate=*";

function printtemoignage(data) {
    let main = document.querySelector("main");
    for (let article of data.data) {
        let eltarticle = document.createElement("article");
        main.appendChild(eltarticle);
        
        let picture = document.createElement("img");
        picture.setAttribute("src", url + article.attributes.img.data[0].attributes.formats.large.url);
        eltarticle.appendChild(picture);
        picture.classList.add("imgtab");

        let name = document.createElement("h3");
        name.innerText = article.attributes.name;
        main.classList.add("ui");
        eltarticle.appendChild(name);

        let date = document.createElement("h5");
        date.innerText = article.attributes.date;
        eltarticle.appendChild(date);

        let resume = document.createElement("p");
        main.classList.add("notation-avis");
        resume.innerText = article.attributes.resume;
        eltarticle.appendChild(resume);

        let bouton = document.createElement("button");
        main.classList.add("boutontab");
        bouton.innerText = article.attributes.bouton;
        eltarticle.appendChild(bouton);
    }

}
function gettemoignage() {
    fetch(url + apitemoignage + img)
        .then(response => response.json())
        .then(response => printtemoignage(response))
        .catch(error => alert("erreur :" + error));
}
gettemoignage();