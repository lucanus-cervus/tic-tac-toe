let id = 0;
let ad = 0;
let gagner = 0;
let test = {};
let canvas = document.querySelector('#grilleCa')
let decompte = document.getElementById("decompte");
let playerOne = true;
let tableauTempo = []

let tableauPosition = {
    0:[0, 0],
    1:[200, 0],
    2:[400, 0],
    3:[0, 200],
    4:[200, 200],
    5:[400, 200],
    6:[0, 400],
    7:[200, 400],
    8:[400, 400]
}
let tableauResultat = [0, 0, 0,
                       0, 0, 0,
                       0, 0, 0];
tableauRed = [
    [1,1,1,0,0,0,0,0,0],
    [0,0,0,1,1,1,0,0,0],
    [0,0,0,0,0,0,1,1,1],
    [1,0,0,1,0,0,1,0,0],
    [0,1,0,0,1,0,0,1,0],
    [0,0,1,0,0,1,0,0,1],
    [1,0,0,0,1,0,0,0,1],
    [0,0,1,0,1,0,1,0,0]
]
tableauBlue = [
    [2,2,2,0,0,0,0,0,0],
    [0,0,0,2,2,2,0,0,0],
    [0,0,0,0,0,0,2,2,2],
    [2,0,0,2,0,0,2,0,0],
    [0,2,0,0,2,0,0,2,0],
    [0,0,2,0,0,2,0,0,2],
    [2,0,0,0,2,0,0,0,2],
    [0,0,2,0,2,0,2,0,0]
]

document.getElementById("click", function(e){
    console.log(document.getElementById("colorChoice").options)
});

document.getElementById("startGame").addEventListener("click", function(e){
    //setTimeout(function(e){decompte.textContent = "3"}, 1000);
    //setTimeout(function(e){decompte.textContent = "2"}, 2000);
    //setTimeout(function(e){decompte.textContent = "1"}, 3000);
    setTimeout(function(e){decompte.textContent = "Player 1"; game()}, 10);
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
            const x = Math.floor(event.x);
            const y = Math.floor(event.y);
            resultX = x - (x % 200);
            resultY = y - (y % 200);
            let ctx = canvas.getContext("2d");
            console.log(tableauPosition[0], tableauPosition[0].value);
            if(playerOne)
            {    
                for(i = 0; i < 9; i++)
                {
                    if(tableauPosition[i][0] === resultX && tableauPosition[i][1] === resultY ){
                        if(tableauResultat[i] == 0)
                        {
                            let xhr = new XMLHttpRequest;
                            xhr.open("POST", "http://bigot.cefim.o2switch.site/test", true)
                            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
                            xhr.addEventListener("readystatechange", function(e){
                                console.log(xhr.responseText);
                            });
                            xhr.send("resultX=" + resultX + "&resultY=" + resultY + "&color=red")
                            tableauResultat[i] = 1
                            ctx.fillStyle = "red"
                            ctx.fillRect(resultX, resultY, 199, 199)
                            playerOne = false;
                            for(k = 0; k < 9; k++)
                            {
                                tableauTempo[k] = tableauResultat[k];
                            }
                            for(a = 0; a < 9; a++)
                            {
                                if(tableauResultat[a] == 2)
                                {
                                    tableauResultat[a] = 0;
                                }
                            }
                            console.log(tableauResultat)
                            for(o = 0; o < 8; o++ )
                            {
                                for(i = 0; i < 9; i++)
                                { 
                                    if(tableauRed[o][i] === tableauResultat[i])
                                    {
                                        gagner++;
                                        if(gagner == 8)
                                        {
                                            console.log("c'est gagné");
                                        } 
                                    }
                                    else
                                    {
                                        gagner = 0;
                                        break;
                                    }
                                }
                            }
                            for(k = 0; k < 9; k++)
                            {
                                tableauResultat[k] = tableauTempo[k]
                            }
                        }
                        else
                        {
                            console.log("case déjà colorié connard")
                        }
                        break;
                    }
                }
            }   
            else
            {
                for(i = 0; i < 9; i++)
                {
                    if(tableauPosition[i][0] === resultX && tableauPosition[i][1] === resultY ){
                        if(tableauResultat[i] == 0)
                        {
                            let xhr = new XMLHttpRequest;
                            xhr.open("POST", "http://bigot.cefim.o2switch.site/test", true)
                            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
                            xhr.addEventListener("readystatechange", function(e){
                                console.log(xhr.responseText);
                            });
                            xhr.send("resultX=" + resultX + "&resultY=" + resultY + "&color=blue")
                            tableauResultat[i] = 2
                            ctx.fillStyle = "blue"
                            ctx.fillRect(resultX, resultY, 199, 199)
                            playerOne = true;
                            for(k = 0; k < 9; k++)
                            {
                                tableauTempo[k] = tableauResultat[k];
                            }
                            for(a = 0; a < 9; a++)
                            {
                                if(tableauResultat[a] == 1)
                                {
                                    tableauResultat[a] = 0;
                                }
                            }
                            for(o = 0; o < 8; o++ )
                            {
                                for(i = 0; i < 9; i++)
                                { 
                                    if(tableauBlue[o][i] === tableauResultat[i])
                                    {
                                        gagner++;
                                        if(gagner == 8)
                                        {
                                            console.log("c'est gagné");
                                        } 
                                    }
                                    else
                                    {
                                        gagner = 0;
                                        break;
                                    }
                                }
                            }
                            tableauBlue.map((e) => {    
                                for(i = 0; i < 9; i++)
                                { 
                                    if(tableauResultat[i] === e)
                                    {
                                    }
                                }
                            })
                            for(k = 0; k < 9; k++)
                            {
                                tableauResultat[k] = tableauTempo[k]
                            }
                            console.log(tableauResultat)
                        }
                        else
                        {
                            console.log("case déjà colorié connard")
                        }
                        break;
                    }
                }
            }            
    });
};

setInterval((e) => {            
    let xhrr = new XMLHttpRequest;
    xhrr.open("GET", "http://bigot.cefim.o2switch.site/list", true)
    xhrr.addEventListener("readystatechange", function(e){
        console.log(xhrr.responseText);
    });
    xhrr.send()   
}, 3000);


