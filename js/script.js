
let id = 0;
let ad = 0;
let tableauOne = [];
let tableauTwo = [];
let test = {};
let canvas = document.querySelector('#grilleCa')
let decompte = document.getElementById("decompte");
let playerOne = true;
let positionBase = {
    posX: 1000,
    posY: 1000
};
let tableauFinale = [positionBase];

document.getElementById("click", function(e){
    console.log(document.getElementById("colorChoice").options)
});

document.getElementById("startGame").addEventListener("click", function(e){
    setTimeout(function(e){decompte.textContent = "3"}, 1000);
    setTimeout(function(e){decompte.textContent = "2"}, 2000);
    setTimeout(function(e){decompte.textContent = "1"}, 3000);
    setTimeout(function(e){decompte.textContent = "Player 1"; game()}, 4000);
});

document.getElementById("rejouerGame").addEventListener("click", function(e){
    game();
})

function game(){
    for(o = 0; o < 3; o++){
        for(i = 0; i < 3; i++){
            let ctx = canvas.getContext("2d");
            ctx.strokeRect(id, ad, 200, 200);
            id = id + 200;
        }
        ad = ad + 200;
        id = 0;
    }
    document.getElementById("grilleCa").addEventListener("mousedown", function(e){
            let encoche = true;
            let tableauTest = [0, 0, 0, 0, 0, 0, 0, 0];
            let tableauRed = [0, 0, 0, 0, 0, 0, 0, 0];
            const x = Math.floor(event.x);
            const y = Math.floor(event.y);
            resultX = x - (x % 200);
            resultY = y - (y % 200);
            let ctx = canvas.getContext("2d");
            if(playerOne)
            {
                tableauFinale.map(function(e){
                    if(e.posX == resultX && e.posY == resultY)
                    {
                        alert("case déjà colorée")
                        playerOne = true;
                        encoche = false;
                    }
                });
                if(encoche == true)
                {
                    ctx.fillStyle = "red";
                    playerOne = false;
                    positionRed = {
                        posX: resultX,
                        posY: resultY,
                        color: "red"
                    };
                    tableauOne.push(positionRed);
                    tableauFinale.push(positionRed);
                    decompte.textContent = "Player 2";
                    console.log(tableauOne);
                    ctx.fillRect(resultX, resultY, 199, 199);
                }
                tableauOne.map(function(e){
                    if(e.posX == 0 && e.posY == 0)
                    {
                        tableauRed[0] = tableauRed[0] + 1
                        tableauRed[3] = tableauRed[3] + 1
                        tableauRed[5] = tableauRed[5] + 1
                    }
                    else if(e.posX == 0 && e.posY == 200)
                    {
                        tableauRed[0] = tableauRed[0] + 1
                        tableauRed[6] = tableauRed[6] + 1
                    }
                    else if(e.posX == 0 && e.posY == 400)
                    {
                        tableauRed[0] = tableauRed[0] + 1
                        tableauRed[4] = tableauRed[4] + 1
                        tableauRed[7] = tableauRed[7] + 1
                    }
                    else if(e.posX == 200 && e.posY == 0)
                    {
                        tableauRed[1] = tableauRed[1] + 1
                        tableauRed[5] = tableauRed[5] + 1
                    }
                    else if(e.posX == 200 && e.posY == 200)
                    {
                        tableauRed[1] = tableauRed[1] + 1
                        tableauRed[3] = tableauRed[3] + 1
                        tableauRed[4] = tableauRed[4] + 1
                        tableauRed[6] = tableauRed[6] + 1
                    }
                    else if(e.posX == 200 && e.posY == 400)
                    {
                        tableauRed[1] = tableauRed[1] + 1
                        tableauRed[7] = tableauRed[7] + 1
                    }
                    else if(e.posX == 400 && e.posY == 0)
                    {
                        tableauRed[2] = tableauRed[2] + 1
                        tableauRed[5] = tableauRed[5] + 1
                    }
                    else if(e.posX == 400 && e.posY == 200)
                    {
                        tableauRed[6] = tableauRed[6] + 1
                        tableauRed[2] = tableauRed[2] + 1
                    }
                    else if(e.posX == 400 && e.posY == 400)
                    {
                        tableauRed[2] = tableauRed[2] + 1
                        tableauRed[3] = tableauRed[3] + 1
                        tableauRed[4] = tableauRed[4] + 1
                        tableauRed[7] = tableauRed[7] + 1
                    }
                })
            }
            else
            {
                tableauFinale.map(function(e){
                    if(e.posX == resultX && e.posY == resultY)
                    {
                        alert("case déjà colorée")
                        playerOne = false;
                        encoche = false;
                    }
                });
                if(encoche == true)
                {
                    ctx.fillStyle = "blue";
                    playerOne = true;
                    positionBlue = {
                        posX: resultX,
                        posY: resultY,
                        color: "blue"
                    };
                    tableauTwo.push(positionBlue);
                    tableauFinale.push(positionBlue);
                    decompte.textContent = "Player 1";
                    console.log(tableauTwo);
                    ctx.fillRect(resultX, resultY, 199, 199);
                    tableauTwo.map(function(e){
                        if(e.posX == 0 && e.posY == 0)
                        {
                            tableauTest[0] = tableauTest[0] + 1
                            tableauTest[3] = tableauTest[3] + 1
                            tableauTest[5] = tableauTest[5] + 1
                        }
                        else if(e.posX == 0 && e.posY == 200)
                        {
                            tableauTest[0] = tableauTest[0] + 1
                            tableauTest[6] = tableauTest[6] + 1
                        }
                        else if(e.posX == 0 && e.posY == 400)
                        {
                            tableauTest[0] = tableauTest[0] + 1
                            tableauTest[4] = tableauTest[4] + 1
                            tableauTest[7] = tableauTest[7] + 1
                        }
                        else if(e.posX == 200 && e.posY == 0)
                        {
                            tableauTest[1] = tableauTest[1] + 1
                            tableauTest[5] = tableauTest[5] + 1
                        }
                        else if(e.posX == 200 && e.posY == 200)
                        {
                            tableauTest[1] = tableauTest[1] + 1
                            tableauTest[3] = tableauTest[3] + 1
                            tableauTest[4] = tableauTest[4] + 1
                            tableauTest[6] = tableauTest[6] + 1
                        }
                        else if(e.posX == 200 && e.posY == 400)
                        {
                            tableauTest[1] = tableauTest[1] + 1
                            tableauTest[7] = tableauTest[7] + 1
                        }
                        else if(e.posX == 400 && e.posY == 0)
                        {
                            tableauTest[2] = tableauTest[2] + 1
                            tableauTest[4] = tableauTest[4] + 1
                            tableauTest[5] = tableauTest[5] + 1
                        }
                        else if(e.posX == 400 && e.posY == 200)
                        {
                            tableauTest[6] = tableauTest[6] + 1
                            tableauTest[2] = tableauTest[2] + 1
                        }
                        else if(e.posX == 400 && e.posY == 400)
                        {
                            tableauTest[2] = tableauTest[2] + 1
                            tableauTest[3] = tableauTest[3] + 1
                            tableauTest[7] = tableauTest[7] + 1
                        }
                    })
                }
            }
            console.log(tableauTest);
            console.log(tableauFinale);
            console.log(tableauFinale.indexOf(resultX))
            if(tableauTest[0] == 3 || tableauTest[1] == 3 || tableauTest[2] == 3 || tableauTest[3] == 3 || tableauTest[4] == 3 || tableauTest[5] == 3 || tableauTest[6] == 3 || tableauTest[7] == 3)
            {
                alert("Le player 2 a gagné !")
            }
            else if(tableauRed[0] == 3 || tableauRed[1] == 3 || tableauRed[2] == 3 || tableauRed[3] == 3 || tableauRed[4] == 3 || tableauRed[5] == 3 || tableauRed[6] == 3 || tableauRed[7] == 3)
            {
                alert("Le player 1 a gagné !")
            }
            //////////
            if(tableauFinale.length == 10)
            {
                alert("Partie Terminée, pas de gagnant");
            }
            
    });
};


