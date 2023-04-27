var reponse;
var theme
//compteur des catégories
var c_science=0
var c_histoire=0
var c_divert=0
var c_sport=0
var c_art=0
var c_geo=0
var c_autre=0


function selectionQuestion(id, zbeul){
    theme = String(id)
    if (theme=="Autres"){
        q=zbeul[0][0][c_autre]
        /*q=seven_array[0][c_autre].Question*/
        reponse = zbeul[0][1][c_autre]
        /*reponse = seven_array[0][c_autre].Réponse*/
        name = zbeul[0][2][c_autre]
        /*name = zbeul[0][c_autre].Votre nom*/
        c_autre=c_autre+1
    }
    else if(theme=="Histoire"){
        /*q=zbeul[5][0][c_histoire]*/
        q=seven_array[5][c_histoire].Question
        reponse = zbeul[5][1][c_histoire]
        name = zbeul[5][2][c_histoire]
        c_histoire++
    }
    else if(theme=="Géographie"){
        q=zbeul[6][0][c_geo]
        reponse = zbeul[6][1][c_geo]
        name = zbeul[6][2][c_geo]

        c_geo++
    }
    else if(theme=="Sciences"){
        q=zbeul[1][0][c_science]
        reponse = zbeul[1][1][c_science]
        name = zbeul[1][2][c_science]

        c_science++
    }
    else if(theme=="Divertissement"){
        q=zbeul[3][0][c_divert]
        reponse = zbeul[3][1][c_divert]
        name = zbeul[3][2][c_divert]

        c_divert++
    }
    else if(theme=="Littérature"){
        q=zbeul[4][0][c_art]
        reponse = zbeul[4][1][c_art]
        name = zbeul[4][2][c_art]

        c_art++
    }
    else if(theme=="Sports"){
        q=zbeul[2][0][c_sport]
        reponse = zbeul[2][1][c_sport]
        name = zbeul[2][2][c_sport]

        c_sport++
    }
    afficherCarte(theme,q,name);
}


// Arguments : le thème, la question
function afficherCarte(theme,q1, name){
        // On affiche la question
        document.getElementById('question').textContent = q1 ;
        document.getElementById('name').textContent = "La question a été posée par "+name ;
        // On affiche le nom

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
        document.body.style.backgroundImage = "url(images/MA"+theme+".jpg)";
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
    document.body.style.backgroundImage = "url(images/mesAmours.jpg)";
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
