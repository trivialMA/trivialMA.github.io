 //type="text/javascript" src='library/PapaParse/papaparse.js' ;
 //type='text/javascript' src='library/PapaParse/papaparse.min.js';

//document.getElementById('txtFileUpload').addEventListener('change', upload, false);

            let resultats;
             window.result = null 
            function upload(evt) {
                //console.log(evt)
              
             var file = evt.target.files[0];
             var reader = new FileReader();
             reader.readAsText(file);
             reader.onload = function(event) {
             var csvData = event.target.result;
             
             var result = Papa.parse(csvData, {header : true, complete: 
                function(data) {
                    resultats = data.data
                }});
             //alert (resultats)
         //console.log(resultats)  
          
         window.retour = split_array(resultats)
        localStorage.setItem("retour", JSON.stringify(retour));
        console.log(retour)


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
                else if(d[i].Catégorie.substring(0,3)=="Géo"){

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

            // fonction pour séparer les questions des réponses
            function qanda(t){
            var q = [];
            var r = [];
            var n = [];
            var d = [];
            var diff = []
             for (var i = 0; i < t.length; i++) {
            n.push(t[i]["Votre nom"]);
            q.push(t[i].Question);
            r.push(t[i].Réponse);
            d.push(t[i].Horodateur);
            diff.push(t[i]["Quelle est la difficulté de la question ? (subjectif)"]);
                }
                //console.log(r);
                return [q , r, n, d, diff]
           };


            function r_q(t){
                console.log(t);
                var array_autre=[];
                var array_sciences=[];
                var array_sports=[];
                var array_divert=[];
                var array_art=[];
                var array_histoire=[];
                var array_geo=[];
                array_autre = Object.values(t[0])
                console.log(array_autre);
                array_sciences = Object.values(t[1])
                array_sports = Object.values(t[2])
                array_divert = Object.values(t[3])
                array_art = Object.values(t[4])
                array_histoire = Object.values(t[5])
                array_geo = Object.values(t[6])
                

                var question_autre
                var question_sciences
                var question_sports
                var question_divert
                var question_art
                var question_histoire
                var question_geo

                var reponse_autre
                var reponse_sciences
                var reponse_sports
                var reponse_divert
                var reponse_art
                var reponse_histoire
                var reponse_geo

                var nom_autre
                var nom_sciences
                var nom_sports
                var nom_divert
                var nom_art
                var nom_histoire
                var nom_geo

                var date_autre
                var date_sciences
                var date_sports
                var date_divert
                var date_art
                var date_histoire
                var date_geo

                var diffi_autre
                var diffi_sciences
                var diffi_sports
                var diffi_divert
                var diffi_art
                var diffi_histoire
                var diffi_geo



                [question_autre, reponse_autre, nom_autre, date_autre, diffi_autre]= qanda(array_autre);
                [question_sciences, reponse_sciences, nom_sciences, date_sciences, diffi_sciences] = qanda(array_sciences);
                [question_sports, reponse_sports, nom_sports, date_sports, diffi_sports ] = qanda(array_sports);
                [question_divert, reponse_divert, nom_divert, date_divert, diffi_divert] = qanda(array_divert);
                [question_art, reponse_art, nom_art, date_art, diffi_art] = qanda(array_art);
                [question_histoire, reponse_histoire, nom_histoire, date_histoire, diffi_histoire] = qanda(array_histoire);
                [question_geo, reponse_geo, nom_geo, date_geo, diffi_geo] = qanda(array_geo);
                console.log([question_geo, reponse_geo, nom_geo, date_geo, diffi_geo]);




                return [[question_autre, reponse_autre, nom_autre, date_autre, diffi_autre],
                        [question_sciences, reponse_sciences, nom_sciences, date_sciences, diffi_sciences] ,
                        [question_sports, reponse_sports, nom_sports, date_sports, diffi_sports ],
                        [question_divert, reponse_divert, nom_divert, date_divert, diffi_divert],
                         [question_art, reponse_art, nom_art, date_art, diffi_art],
                        [question_histoire, reponse_histoire, nom_histoire, date_histoire, diffi_histoire],
                        [question_geo, reponse_geo, nom_geo, date_geo, diffi_geo]

                 ]
                

};





