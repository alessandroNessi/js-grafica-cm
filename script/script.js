/**a function that toggle select visibility */
function toggleSelect(){
    document.getElementById("choice").parentElement.classList.toggle("invisible");
}
/**given a percentage return with the same probability true or false */
function perc(x){
    if(Math.random()*100<x){
        return true;
    }else{
        return false;
    }
}
/** funzione che dati il numero di celle crea una griglia con dimensione impostata dalle variabili css 
 */
var bombMap=[];//global matrix with the position of the cells empty and mined
function generateGameBoard(cells){
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
        if(perc(10)){
            board.innerHTML+=`<div class="cell bomb"><div class="stdBgr"><p class="invisible">${i}</p></div></div>`;
            // board.innerHTML+=`<div class="cell d-flex"><div class="stdBgr"></div><p class="left invisible">ciao</p><div class="center invisible d-flex"><p class="top">ciao</p><p class="bot">ciao</p></div><p class="right invisible">ciao</p></div>`;
            bombMap[t][j]="1";//populate matrix with mine
        }else{
            // board.innerHTML+=`<div class="cell d-flex"><div class="stdBgr"><p class="invisible">${i}</p></div></div>`;
            let top=0, bot=0, left=0, right=0;
            board.innerHTML+=`<div class="cell d-flex"><div class="stdBgr"></div><p class="left invisible">ciao</p><div class="center invisible d-flex"><p class="top">ciao</p><p class="bot">ciao</p></div><p class="right invisible">ciao</p></div>`;
            bombMap[t][j]="0";//populate matrix with empty
        }
        j++;
    }
    console.log("board: "+bombMap);
    console.log(bombMap.length);
    // for
}
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
        clickedCell.getElementsByClassName("center")[0].classList.remove("invisible");
        clickedCell.getElementsByClassName("right")[0].classList.remove("invisible");
        clickedCell.getElementsByClassName("left")[0].classList.remove("invisible");
    }
    if(event.target.parentElement.classList.contains("bomb")){
        // alert("you lost!");
        document.getElementById("gameFrame").classList.add("underlay");
        document.getElementById("lost").classList.remove("underlay");
        document.getElementById("lost").classList.remove("invisible");
        document.getElementById("lost").classList.add("d-flex");
    }
});
document.getElementById("reload").addEventListener("click", function(){
    location.reload();
});