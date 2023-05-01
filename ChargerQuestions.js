 //type="text/javascript" src='library/PapaParse/papaparse.js' ;
 //type='text/javascript' src='library/PapaParse/papaparse.min.js';

//document.getElementById('txtFileUpload').addEventListener('change', upload, false);

let resultats;
let res;

async function test_fetch(){
    /*let response1 = await fetch('https://github.com/trivialMA/trivialMA.github.io/blob/main/images/Autres/1.jpg',
        {mode: 'cors'});
    console.log(response1);*/
    let response = await fetch('images/Autres/1.jpg',
        {mode: 'cors',
        credentials: "same-origin"});
    /*console.log(response);
    console.log(response.text());*/
    const rows = response.text().split('\n');
    for (row of rows) {
    //Split the row into each of the comma separated values
        console.log(row.split(","));
    }
}
/*test_fetch()*/

/*async function test_fetch2(){
    fetch('DefaultQR.csv')
    .then(response => response.text()) 
    .then(csvString => {
        //Split the csv into rows
        const rows = csvString.split('\n');
        for (row of rows) {
        //Split the row into each of the comma separated values
            console.log(row.split(","));
        }
    });
}
test_fetch2()*/

async function test_fetch2(){
    fetch('DefaultQR.csv')
    .then(response => response.text()) 
    .then(csvString => { 
        var result = Papa.parse(csvString, 
        {header : true, complete: function(data) { resultats = data.data } } );
        console.log(result)
        console.log(resultats)
        res = split_array(resultats)
    });
}

async function test_fetch3(){
    var result = Papa.parse('DefaultQR.csv', 
        { download: true, header : true, complete: function(data) { resultats = data.data } } );
    console.log(result)
    console.log(resultats)
    res = split_array(resultats)
}

async function upload_default(){
    var result = Papa.parse('DefaultQR.csv', 
        { download: true, header : true, complete: function(data) { resultats = data.data } } );
    res = split_array(resultats)
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