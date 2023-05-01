 //type="text/javascript" src='library/PapaParse/papaparse.js' ;
 //type='text/javascript' src='library/PapaParse/papaparse.min.js';

//document.getElementById('txtFileUpload').addEventListener('change', upload, false);

let resultats;
let res;
const fs = require("fs");

function test(){
    document.getElementById('TitreThème').textContent = "test1"
    document.getElementById('TitreThème').textContent = "test11"
    fs.readFile("DefaultQR.csv", function(err, data) {
      document.getElementById('TitreThème').textContent = "test2"
      document.getElementById('TitreThème').textContent = "test3"
      console.log(data.toString())
    });
    document.getElementById('TitreThème').textContent = "test4"
}

async function upload_default(){
    document.getElementById('TitreThème').textContent = "test1"
    let response = await fetch('images/Fonds/1.jpg');

    let blob = await response.blob(); // télécharger en tant qu'objet Blob
    // create <img> for it
    let img = document.createElement('img');
    img.style = 'position:fixed;top:10px;left:10px;width:100px';
    document.body.append(img);

    // l'afficher
    img.src = URL.createObjectURL(blob);

    setTimeout(() => { // le cacher après 3 secondes
      img.remove();
      URL.revokeObjectURL(img.src);
    }, 3000);
    document.getElementById('TitreThème').textContent = "test2"

    /*document.getElementById('TitreThème').textContent = "test1"
    var file = "DefaultQR.csv"
    document.getElementById('TitreThème').textContent = "test2"
    const response = await fetch("https://github.com/trivialMA/trivialMA.github.io/blob/main/QRLAST2.csv");
    if (response.ok) { // if HTTP-status is 200-299
      // obtenir le corps de réponse (la méthode expliquée ci-dessous)
        document.getElementById('TitreThème').textContent = "test3"
        let json = await response.json();
    } else {
        document.getElementById('TitreThème').textContent = "test4"
        alert("HTTP-Error: " + response.status);
    }
    document.getElementById('TitreThème').textContent = "test3"*/
    /*let url = new URL("https://github.com/trivialMA/trivialMA.github.io/blob/main/QRLAST2.csv");
    document.getElementById('TitreThème').textContent = "test3"
    let url = new URL("DefaultQR.csv");
    document.getElementById('TitreThème').textContent = "test4"*/
    /*const response = await fetch("DefaultQR.csv");
    document.getElementById('TitreThème').textContent = "test4"*/
    /*const response2 = await fetch(url);
    document.getElementById('TitreThème').textContent = "test5"*/

    /*var reader = new FileReader();
    reader.readAsText(f2);*/
    document.getElementById('TitreThème').textContent = "test5"

    reader.onload = function(event) {
        var csvData = event.target.result;
        document.getElementById('TitreThème').textContent = csvData.toString()
        var result = Papa.parse(csvData, 
            { header : true, complete: function(data) { resultats = data.data } } );
        res = split_array(resultats)
        console.log(res)
    };

    reader.onerror = function() {
        alert('Unable to read ' + file.fileName);
    };
}

function upload(evt) {

    //console.log(evt)
    var file = evt.target.files[0];
    var reader = new FileReader();
    reader.readAsText(file);

    reader.onload = function(event) {
        var csvData = event.target.result;
        document.getElementById('TitreThème').textContent = csvData.toString()
        var result = Papa.parse(csvData, 
            { header : true, complete: function(data) { resultats = data.data } } );
        //alert (resultats)
        /*console.log(resultats)    
        window.retour = split_array(resultats)
        localStorage.setItem("retour", JSON.stringify(retour));
        console.log(retour)*/
        res = split_array(resultats)
        console.log(res)
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