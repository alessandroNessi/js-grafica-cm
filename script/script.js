/**a function that toggle select visibility */
function toggleSelect(){
    document.getElementById("choice").parentElement.classList.toggle("invisible");
}
/**returns a random numner from 0 to x, x not included */
function randomNum(x){
    return Math.floor(Math.random()*x);
}
/**function that change the overlay form and gives the result+score */
function gameOver(result,score){
    document.getElementById("gameFrame").classList.add("underlay");
    document.getElementById("gameOver").classList.remove("underlay");
    document.getElementById("gameOver").classList.remove("invisible");
    document.getElementById("gameOver").classList.add("d-flex");
    if(result=="lost"){
        document.getElementById("resultLabel").innerHTML="YOU LOST!";
        document.getElementById("resultLabel").classList.add("lost");
        document.getElementById("scoreLabel").classList.add("lost");
        document.getElementById("scoreLabel").innerHTML="TOTAL SCORE: " + Math.floor(totalClick/totalCells*100) + "/100";
    }else{
        document.getElementById("resultLabel").innerHTML="YOU WON!";
        document.getElementById("resultLabel").classList.add("won");
        document.getElementById("scoreLabel").classList.add("won");
        document.getElementById("scoreLabel").innerHTML="TOTAL SCORE: 100/100";
    }
}
/** given a total numbers of cell returns an array populated with the non recorursive position of the 16 bombs */
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
        //populate bombs array adding a fake attribute value to the div where i save the corresponding position of the cell in the array
        if(bombsArray.includes(i)){
            board.innerHTML+=`<div class="cell stdBgr" value="${t},${j}"></div>`;
            bombMap[t][j]=1;//populate matrix with mine
        }else{
            board.innerHTML+=`<div class="cell stdBgr d-flex" value="${t},${j}"><p class="radius invisible"></p></div>`;
            bombMap[t][j]=0;//populate matrix with empty
        }
        j++;
    }
    t=0;
    let sum = 0;
    //populate the bombs around every cell saving the correspondi value inside <p class="radius">
    for(j=0;j<bombMap.length;j++){//*cycle rows */
        for(let i=0;i<bombMap.length;i++){/*cycle columns */
            if(bombMap[j][i]!=1){
                if(j==0){//if it's the starting row
                    if(i==0){
                        sum=bombMap[j+1][i]+bombMap[j+1][i+1]+bombMap[j][i+1];
                    }else if(i==bombMap.length-1){
                        sum=bombMap[j+1][i-1]+bombMap[j][i-1]+bombMap[j+1][i];
                    }else{
                        sum=bombMap[j+1][i]+bombMap[j+1][i+1]+bombMap[j+1][i-1]+bombMap[j][i-1]+bombMap[j][i+1];
                    }
                }else if(j==bombMap.length-1){//if it's the last row
                    if(i==0){
                        sum=bombMap[j][i+1]+bombMap[j-1][i]+bombMap[j-1][i+1];
                    }else if(i==bombMap.length-1){
                        sum=bombMap[j][i-1]+bombMap[j-1][i]+bombMap[j-1][i-1];
                    }else{
                        sum=bombMap[j-1][i]+bombMap[j-1][i+1]+bombMap[j][i+1]+bombMap[j-1][i-1]+bombMap[j][i-1];
                    }
                }else if(i==0){//if it's the left border
                    sum=bombMap[j][i+1]+bombMap[j-1][i]+bombMap[j-1][i+1]+bombMap[j+1][i]+bombMap[j+1][i+1];
                }else if(i==bombMap.length-1){//if it's the right border
                    sum=bombMap[j-1][i-1]+bombMap[j][i-1]+bombMap[j+1][i-1]+bombMap[j+1][i]+bombMap[j-1][i];
                }else{
                    sum=bombMap[j][i-1]+bombMap[j][i+1]+bombMap[j+1][i]+bombMap[j+1][i+1]+bombMap[j+1][i-1]+bombMap[j-1][i]+bombMap[j-1][i+1]+bombMap[j-1][i-1];
                }
                if(sum!=0){
                    board.getElementsByClassName("radius")[t].innerHTML=sum;
                    sum=0;
                }
                t++;
            }
        }
    }
}
var totalClick=0;//clicks counter
var totalCells=0;//total matrix cells cout even obtain with bombmap.length^2
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
document.getElementById("gameFrame").addEventListener("mousedown",function(event){
    clickedCell=event.target;
    console.log(clickedCell.getAttribute('value'));
    let j=parseInt(clickedCell.getAttribute('value').split(",")[0]);
    let i=parseInt(clickedCell.getAttribute('value').split(",")[1]);
    clickedCell.classList.remove("stdBgr");
    // se è una cella senza bomba
    if(bombMap[j][i]==1){
        clickedCell.classList.add("bomb");
        gameOver("lost",totalClick);
    }else{
        if(clickedCell.getElementsByClassName("radius")[0].classList.contains("invisible")){
            clickedCell.classList.add("checkedBgr");
            clickedCell.getElementsByClassName("radius")[0].classList.remove("invisible");
            totalClick++;
            if(totalClick==totalCells-17){
                gameOver("won",totalClick);
            }
        }
    }
});
document.getElementById("reload").addEventListener("click", function(){
    location.reload();
});