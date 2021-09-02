/**a function that toggle select visibility */
function toggleSelect(){
    document.getElementById("choice").parentElement.classList.toggle("invisible");
}
/**returns a random numner from 0 to x, x not included */
function randomNum(x){
    return Math.floor(Math.random()*x);
}
/**funzione che apre la pagina di vittoria o sconfitta e ritorna un numero */
function gameOver(result,score){
    document.getElementById("gameFrame").classList.add("underlay");
    document.getElementById("gameOver").classList.remove("underlay");
    document.getElementById("gameOver").classList.remove("invisible");
    document.getElementById("gameOver").classList.add("d-flex");
    if(result=="lost"){
        document.getElementById("resultLabel").innerHTML="YOU LOST!";
        document.getElementById("scoreLabel").innerHTML="SCORE: " + Math.floor(totalClick/totalCells*100) + "/100";
    }else{
        document.getElementById("resultLabel").innerHTML="YOU WON!";
        document.getElementById("scoreLabel").innerHTML="SCORE: 100/100";
    }
}
function populateBombs(totalCells){
    let bombsArray=[], temp;
    while (bombsArray.length<16){
        temp=randomNum(totalCells);
        console.log(bombsArray);
        if(!bombsArray.includes(temp)){
           bombsArray.push(temp);
        }
    }
    return bombsArray;
}
/** funzione che dati il numero di celle crea una griglia con dimensione impostata dalle variabili css */
function generateGameBoard(cells){
    totalCells=cells*cells;
    var bombsArray = populateBombs(totalCells);
    var board=document.getElementById("gameFrame");
    var root = document.documentElement;
    board.innerHTML="";
    //get the frame width from the var in css
    var frameWidth = parseInt(getComputedStyle(root).getPropertyValue('--frameWidth').match(/[0-9]/g).join(""));
    console.log(`the max width is :${frameWidth}`);
    var cellWidth = frameWidth/cells;
    cellWidth+="px";
    console.log(`the cell width is :${cellWidth}`);
    //write a var cellwidth in css that is set as sigle cell width
    root.style.setProperty("--cellWidth" , cellWidth);
    let t=0,j=0;//var to cycle the matrix
    bombMap[0]=[];
    for(let i=0;i<(cells*cells);i++){
        if(j==cells){
            t++;
            bombMap[t]=[];
            j=0;
        }
        //chanche of a bomb
        if(bombsArray.includes(i)){
            board.innerHTML+=`<div class="cell bomb"><div class="stdBgr"><p class="invisible">${i}</p></div></div>`;
            // board.innerHTML+=`<div class="cell d-flex"><div class="stdBgr"></div><p class="left invisible">ciao</p><div class="center invisible d-flex"><p class="top">ciao</p><p class="bot">ciao</p></div><p class="right invisible">ciao</p></div>`;
            bombMap[t][j]=1;//populate matrix with mine
        }else{
            // board.innerHTML+=`<div class="cell d-flex"><div class="stdBgr"><p class="invisible">${i}</p></div></div>`;
            let top=0, bot=0, left=0, right=0;
            board.innerHTML+=`<div class="cell d-flex"><div class="stdBgr"></div><p class="left invisible">ciao</p><div class="center invisible d-flex"><p class="top">ciao</p><p class="bot">ciao</p></div><p class="right invisible">ciao</p></div>`;
            bombMap[t][j]=0;//populate matrix with empty
        }
        j++;
    }
    console.log("board: "+bombMap);
    console.log(bombMap.length);
    t=0;
    let top=0, bot=0, left=0, right=0;
    //populate the bombs around
    for(j=0;j<bombMap.length;j++){//*cycle rows */
        for(let i=0;i<bombMap.length;i++){/*cycle columns */
            if(bombMap[j][i]!=1){
                if(j==0){//if it's the starting row
                    if(i==0){
                        bot=bombMap[j+1][i]+bombMap[j+1][i+1];
                        right=bombMap[j+1][i+1]+bombMap[j][i+1];
                    }else if(i==bombMap.length-1){
                        bot=bombMap[j+1][i]+bombMap[j+1][i-1];
                        left=bombMap[j+1][i-1]+bombMap[j][i-1];
                    }else{
                        bot=bombMap[j+1][i]+bombMap[j+1][i+1]+bombMap[j+1][i-1];
                        right=bombMap[j+1][i+1]+bombMap[j][i+1];
                        left=bombMap[j+1][i-1]+bombMap[j][i-1];
                    }
                }else if(j==bombMap.length-1){//if it's the last row
                    if(i==0){
                        top=bombMap[j-1][i]+bombMap[j-1][i+1];
                        right=bombMap[j-1][i+1]+bombMap[j][i+1];
                    }else if(i==bombMap.length-1){
                        top=bombMap[j-1][i]+bombMap[j-1][i-1];
                        left=bombMap[j-1][i-1]+bombMap[j][i-1];
                    }else{
                        top=bombMap[j-1][i]+bombMap[j-1][i+1]+bombMap[j-1][i-1];
                        right=bombMap[j-1][i+1]+bombMap[j][i+1];
                        left=bombMap[j-1][i-1]+bombMap[j][i-1];
                    }
                }else if(i==0){
                    top=bombMap[j-1][i]+bombMap[j-1][i+1];
                    bot=bombMap[j+1][i]+bombMap[j+1][i+1];
                    right=bombMap[j-1][i+1]+bombMap[j][i+1]+bombMap[j+1][i+1];
                }else if(i==bombMap.length-1){
                    top=bombMap[j-1][i]+bombMap[j-1][i-1];
                    bot=bombMap[j+1][i]+bombMap[j+1][i-1];
                    left=bombMap[j-1][i-1]+bombMap[j][i-1]+bombMap[j+1][i-1];
                }else{
                    left=bombMap[j-1][i-1]+bombMap[j][i-1]+bombMap[j+1][i-1];
                    right=bombMap[j-1][i+1]+bombMap[j][i+1]+bombMap[j+1][i+1];
                    bot=bombMap[j+1][i]+bombMap[j+1][i+1]+bombMap[j+1][i-1];
                    top=bombMap[j-1][i]+bombMap[j-1][i+1]+bombMap[j-1][i-1];
                }
                board.getElementsByClassName("top")[t].innerHTML=top;
                board.getElementsByClassName("bot")[t].innerHTML=bot;
                board.getElementsByClassName("left")[t].innerHTML=left;
                board.getElementsByClassName("right")[t].innerHTML=right;
                top=0, left=0, right=0, bot=0;
                t++;
            }
        }
    }
}
var totalClick=0;
var totalCells=0;
var bombMap=[];//global matrix with the position of the cells empty and mined
document.getElementById("choice").addEventListener("change", function(event){
    let size=parseInt(document.getElementById("choice").value);
    if(!isNaN(size)){
        // i generate the board
        generateGameBoard(size);
        //toggle select off
        toggleSelect();
    }else{
        alert("invalid choice");
    }
});
//add the click eventlistener to the frame
document.getElementById("gameFrame").addEventListener("click",function(event){
    clickedCell=event.target;
    clickedCell.classList.remove("stdBgr");
    clickedCell=event.target.parentElement;
    // se è una cella senza bomba
    if(clickedCell.getElementsByClassName("center")[0]!=undefined){
        if(clickedCell.getElementsByClassName("center")[0].classList.contains("invisible")){
            clickedCell.getElementsByClassName("center")[0].classList.remove("invisible");
            clickedCell.getElementsByClassName("right")[0].classList.remove("invisible");
            clickedCell.getElementsByClassName("left")[0].classList.remove("invisible");
            totalClick++;
            if(totalClick==totalCells-16){
                gameOver("won",totalClick);
            }
        }
    }
    if(event.target.parentElement.classList.contains("bomb")){
        gameOver("lost",totalClick);
        // document.getElementById("gameFrame").classList.add("underlay");
        // document.getElementById("gameOver").classList.remove("underlay");
        // document.getElementById("gameOver").classList.remove("invisible");
        // document.getElementById("gameOver").classList.add("d-flex");
    }
});
document.getElementById("reload").addEventListener("click", function(){
    location.reload();
});