let canvas = document.querySelector('#grilleCa');

createCanvas(); // Initialise la grille.

//Permet d'activer le statut prêt sur le serveur.
document.getElementById("ready").addEventListener("click", function(e){
    let xhrr = new XMLHttpRequest;
    xhrr.open("POST", "http://lucanuscervus.pythonanywhere.com/joueur", true)
    xhrr.addEventListener("readystatechange", function(e){
        if((xhrr.readyState === 4 && xhrr.status === 200)){     
            console.log(xhrr.responseText);
        }
    });
    xhrr.send();
})

// Permet de rejouer, réinitialise toutes les variables du jeu (tableau des cases  coloriés, les deux joueurs...)
document.getElementById("rejouerGame").addEventListener("click", function(e){
    createCanvas();
    let xhrr = new XMLHttpRequest;
    xhrr.open("POST", "http://lucanuscervus.pythonanywhere.com/rejouer", true)
    xhrr.addEventListener("readystatechange", function(e){
        if((xhrr.readyState === 4 && xhrr.status === 200)){
            console.log(xhrr.responseText);
        }
    });
    xhrr.send()
});

// Coeur du jeu, envoie les positions des cases au serveur
document.getElementById("grilleCa").addEventListener("click", function(e){ 
    const x = Math.floor(event.x);
    const y = Math.floor(event.y);
    resultX = x - (x % 200);
    resultY = y - (y % 200);
    let xhr = new XMLHttpRequest;
    xhr.open("POST", "http://lucanuscervus.pythonanywhere.com/test", true)
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    xhr.addEventListener("onreadystatechange", function(e){
        if((xhr.readyState === 4 && xhr.status === 200)){
            console.log(xhr.responseText);
        }
    });
    xhr.send("resultX=" + resultX + "&resultY=" + resultY)
});

// setInterval pour actualiser les nouvelles données du serveur(Permet de voir les nouvelles cases coloriées, les joueurs prêt à jouer...)
setInterval((e) => {            
    let xhrr = new XMLHttpRequest;
    xhrr.open("GET", "http://lucanuscervus.pythonanywhere.com/list", true)
    xhrr.addEventListener("readystatechange", function(e){
        if((xhrr.readyState === 4 && xhrr.status === 200)){
            let tableau = JSON.parse(xhrr.responseText);
            if(tableau.PO !== null && tableau.PT === null)
            {
                document.getElementById("iconeVidePo").style.display = "none";
                document.getElementById("iconePleinePos").style.display = "flex";      
            }
            else if(tableau.PT !== null)
            {
                document.getElementById("iconeVidePo").style.display = "none";
                document.getElementById("iconePleinePo").style.display = "flex";   
                document.getElementById("iconeVidePt").style.display = "none";
                document.getElementById("iconePleinePt").style.display = "flex";      
            }
            else
            {
                document.getElementById("iconePleinePo").style.display = "none";
                document.getElementById("iconePleinePt").style.display = "none";   
                document.getElementById("iconeVidePo").style.display = "flex";
                document.getElementById("iconeVidePt").style.display = "flex";    
            }
            if( Object.keys(tableau.messages).length === 0 )
            {
                createCanvas();
            }
            else{
                for (let valeur of tableau.messages) {
                    let ctx = canvas.getContext("2d");
                    ctx.fillStyle = valeur.color
                    ctx.fillRect(valeur.resultX, valeur.resultY, 199, 199)
                }
            }
        }
    });
    xhrr.send()  
}, 1000);

// Function qui initialise la grille. 
function createCanvas(){
    let id = 0;
    let ad = 0;
    for(o = 0; o < 3; o++){
        for(i = 0; i < 3; i++){
            let ctx = canvas.getContext("2d");
            ctx.fillStyle = "white";
            ctx.fillRect(id, ad, 199, 199)
            ctx.strokeRect(id, ad, 200, 200);
            id = id + 200;
        }
        ad = ad + 200;
        id = 0;
    }
}


