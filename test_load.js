function test_load(){
	document.getElementById('txtFileUpload').addEventListener('change', upload, false);
}


function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}

function simpleInterest(principle, time, rate) {
  const si = (principle * time * rate) / 100;
  return si;
}

async function test_fetch(){
	let response = await fetch('images/Autres/1.jpg',
		{mode: 'cors',
		credentials: "same-origin"});
	console.log(response);
	let response1 = await fetch('https://github.com/trivialMA/trivialMA.github.io/blob/main/images/Autres/1.jpg',
		{mode: 'cors'});
	console.log(response1);
}

const result = simpleInterest(1000, 1, 10);

console.log(result);
console.log(document.domain)



/*const xhr = new XMLHttpRequest();
const url = "https://github.com/trivialMA/trivialMA.github.io/blob/main/images/Autres/1.jpg";

xhr.open("GET", url);
/*xhr.onreadystatechange = someHandler;
xhr.send();*/

test_fetch()


/*readTextFile("lala.txt")*/