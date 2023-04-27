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