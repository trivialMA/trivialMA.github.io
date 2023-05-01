var reponse;
var theme
var nb_photos

//compteur des catégories
var c_sciences=0
var c_histoire=0
var c_divert=0
var c_sports=0
var c_art=0
var c_geo=0
var c_autre=0

//IDs dans Object.entries
var id_date=0
var id_categorie=1
var id_typeQ=2
var id_question=3
var id_reponse=4
var id_nom=6
var id_difficulte=5
var id_troll=7

//nb de photos par catégories
var nb_sciences=7
var nb_histoire=3
var nb_divert=10
var nb_sports=9
var nb_art=5
var nb_geo=5
var nb_autre=11
var nb_fonds=3

let resultats;
let res;

/*async function test_fetch2(){
    fetch('DefaultQR.csv')
    .then(response => response.text()) 
    .then(csvString => { 
        var result = Papa.parse(csvString, 
        {header : true, complete: function(data) { resultats = data.data } } );
        res = split_array(resultats)
    });
}

async function test_fetch3(){
    let results = []
    const csvData = Papa.parse('DefaultQR.csv', 
        { download: true, header : true, complete: reponse => { 
            results = reponse.data
            res = split_array(results)
        } 
    });
}*/

async function upload_default(){
    let results = [];
    const csvData = Papa.parse('DefaultQR.csv', 
        { download: true, header : true, complete: reponse => { 
            results = reponse.data;
            res = split_array(results);
            Hide_Loading();
            choixThème();
        } 
    });
}

function upload(evt) {
    var file = evt.target.files[0];
    var reader = new FileReader();
    reader.readAsText(file);

    reader.onload = function(event) {
        var csvData = event.target.result;
        var result = Papa.parse(csvData, 
            { header : true, complete: function(data) { resultats = data.data } } );
        res = split_array(resultats)
        Hide_Loading();
        choixThème();
    };

    reader.onerror = function() {
        alert('Unable to read ' + file.fileName);
    };
                 
};

function print (c){
    alert (c);
};

function split_array(d){
    console.log(d)
    shuffle(d)
    var q_histoire = [];
    var q_geo = [];
    var q_art = [];
    var q_divert = [];
    var q_sciences = [];
    var q_sports = [];
    var q_autre = [];
    for (var i = 0; i < d.length; i++) {
        //console.log(d[i]["Catégorie"])

        if(d[i].Catégorie.substring(0,8)=="Histoire"){
             q_histoire.push(d[i]);
        } 
         //console.log(d[i]["Catégorie"])
        else if (d[i].Catégorie.substring(0,3)=="Géo"){
             q_geo.push(d[i]);
        } 

        else if (d[i].Catégorie.substring(0,3)=="Art") {
            q_art.push(d[i]);
        }

        else if (d[i].Catégorie.substring(0,6)=="Divert") {
            q_divert.push(d[i]);
        }

        else if (d[i].Catégorie.substring(0,5)=="Sport") {
            q_sports.push(d[i]);
        }

        else if (d[i].Catégorie.substring(0,7)=="Science") {
            q_sciences.push(d[i]);
        }

        else {
            q_autre.push(d[i]);
        }

    };// fin de boucle for

    //console.log(shuffle(q_autre))
    return {q_autre, q_sciences, q_sports, q_divert, q_art, q_histoire, q_geo};

};// fin de array_split 
         

//fonction pour melanger les arrays
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function selectionQuestion(id){
    theme = String(id)
    console.log(Object.entries(res.q_autre[c_autre]))
    if (theme=="Autres"){
        question = res.q_autre[c_autre].Question
        reponse = res.q_autre[c_autre].Réponse
        nom = Object.entries(res.q_autre[c_autre])[id_nom][1]
        nb_photos = nb_autre
        c_autre++
    }
    else if(theme=="Histoire"){
        question = res.q_histoire[c_histoire].Question
        reponse = res.q_histoire[c_histoire].Réponse
        nom = Object.entries(res.q_histoire[c_histoire])[id_nom][1]
        nb_photos = nb_histoire
        c_histoire++
    }
    else if(theme=="Géographie"){
        question = res.q_geo[c_geo].Question
        reponse = res.q_geo[c_geo].Réponse
        nom = Object.entries(res.q_geo[c_geo])[id_nom][1]
        nb_photos = nb_geo
        c_geo++
    }
    else if(theme=="Sciences"){
        question = res.q_sciences[c_sciences].Question
        reponse = res.q_sciences[c_sciences].Réponse
        nom = Object.entries(res.q_sciences[c_sciences])[id_nom][1]
        nb_photos = nb_sciences
        c_sciences++
    }
    else if(theme=="Divertissement"){
        question = res.q_divert[c_divert].Question
        reponse = res.q_divert[c_divert].Réponse
        nom = Object.entries(res.q_divert[c_divert])[id_nom][1]
        nb_photos = nb_divert
        c_divert++
    }
    else if(theme=="Littérature"){
        question = res.q_art[c_art].Question
        reponse = res.q_art[c_art].Réponse
        nom = Object.entries(res.q_art[c_art])[id_nom][1]
        nb_photos = nb_art
        c_art++
    }
    else if(theme=="Sports"){
        question = res.q_sports[c_sports].Question
        reponse = res.q_sports[c_sports].Réponse
        nom = Object.entries(res.q_sports[c_sports])[id_nom][1]
        nb_photos = nb_sports
        c_sports++
    }
    afficherCarte(theme, question, nom, nb_photos);
}


// Arguments : le thème, la question
function afficherCarte(theme,q1, name, nb_photos){
        // On affiche la question
        document.getElementById('question').textContent = q1;
        // On affiche le nom
        document.getElementById('name').textContent = "La question a été posée par " + name

       console.log(document);

        // On cache la réponse
        document.getElementById('reponse').textContent = null;
        // On affiche les boutons "afficher reponse" et "choisir une nouvelle question".
        document.getElementById('bouton-rep').hidden=false;
        document.getElementById('bouton-newQ').hidden=false;
        // On cache le titre "choissez un thème"
        document.getElementById('TitreThème').textContent = "Question de type " + theme;
        document.getElementById('TitreThème').classList.remove("display-2");
        //document.getElementById('Bulle-Titre').style.backgroundColor = "black"
        document.getElementById('Bulle-Titre').style.width = "50%"
        document.getElementById('Bulle-Titre').classList.remove("Bulle-Titre");
        document.getElementById('Bulle-Titre').classList.add("Bulle-Question-" + theme);
        // On affiche le titre "Question de type ..."
        //document.getElementById('TitreQuestion').textContent = "Question de type ... " + theme;
        // On cache les boutons de thèmes
        let listeBoutons = document.querySelectorAll('button');
        for (var i = listeBoutons.length - 1; i >= 0; i--) {
            listeBoutons[i].hidden = true;}

	    // On change le fond directement depuis le JS en fonction du theme
    	document.body.style.backgroundSize = "cover"; 
        document.body.style.backgroundImage = "url(images/"+theme+"/"+getRandomInt(nb_photos)+".jpg)";
        document.body.style.backgroundRepeat = "no-repeat";
	document.body.style.backgroundPosition = "center fixed"; // Pour les fonds autres que la photo, on cale en haut à gauche
}

function removeBackGroundColor(){
    document.getElementById('Bulle-Titre').classList.remove("Bulle-Question-Histoire");
    document.getElementById('Bulle-Titre').classList.remove("Bulle-Question-Géographie");
    document.getElementById('Bulle-Titre').classList.remove("Bulle-Question-Sciences");
    document.getElementById('Bulle-Titre').classList.remove("Bulle-Question-Divertissement");
    document.getElementById('Bulle-Titre').classList.remove("Bulle-Question-Littérature");
    document.getElementById('Bulle-Titre').classList.remove("Bulle-Question-Autres");
    document.getElementById('Bulle-Titre').classList.remove("Bulle-Question-Sports");
}

function Hide_Loading(){
    document.getElementById('Loading_div').hidden = true;
    document.getElementById('Loading_title').hidden = true;
    document.getElementById('Loading_btns').hidden = true;
    document.getElementById('Manual_loading').hidden = true;
    document.getElementById('Default_loading').hidden = true;
}

function choixThème(){
    // On cache la question et la réponse
    document.getElementById('question').textContent = null;
    document.getElementById('reponse').textContent = null;
    document.getElementById('name').textContent = null;
    // On cache les bouton "afficher la réponse" et "choisir une nouvelle question"
    document.getElementById('bouton-rep').hidden=true;
    document.getElementById('bouton-newQ').hidden=true;
    // On affiche le titre "choissez un thème"
    document.getElementById('TitreThème').textContent = "Choisissez un thème :";
    document.getElementById('TitreThème').classList.add("display-2");
    removeBackGroundColor();
    document.getElementById('Bulle-Titre').style.width = "70%"
    document.getElementById('Bulle-Titre').classList.add("Bulle-Titre");
    // On cache le titre "Question de type ..."
    //document.getElementById('TitreQuestion').textContent = null;
    // on affiche les boutons de thèmes
    let listeBoutons = document.querySelectorAll('button');
    for (var i = listeBoutons.length - 1; i >= 0; i--) {
        listeBoutons[i].hidden = false;
    }
    // on remet le fond initial
    document.body.style.backgroundImage = "url(images/Fonds/"+getRandomInt(nb_fonds)+".jpg)";
    // document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "50% 25%"; // On recale pour bien voir tout le monde
    document.body.style.backgroundSize = "cover";    

}


function afficherReponse(){
    // Si la reponse est vide (cachée), on l'affiche
    if (document.getElementById('reponse').textContent[0] == null){
        document.getElementById('reponse').textContent = reponse;
	    // On change aussi ce qui est écrit sur le bouton
	    document.querySelector('b').textContent = "Masquer la réponse";
        }      
    // Si la reponse n'est pas vide (affichée), on la cache
    else {
        document.getElementById('reponse').textContent = null;
	    // On remet le bon texte sur le bouton
	    document.querySelector('b').textContent = "Afficher la réponse";
        }
    }

function getRandomInt(max) {
  max = Math.floor(max);
  var i = Math.floor(Math.random() * max)+1;
  console.log(i);
  return i;
}