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
    for(var i=0;i<(cells*cells);i++){
        //chanche of a bomb
        if(perc(10)){
            board.innerHTML+=`<div class="cell bomb"><div class="stdBgr"><p class="invisible">${i}</p></div></div>`;
        }else{
            board.innerHTML+=`<div class="cell"><div class="stdBgr"><p class="invisible">${i}</p></div></div>`;
        }
    }
}
document.getElementById("choice").addEventListener("change", function(event){
    let size=parseInt(document.getElementById("choice").value);
    if(!isNaN(size)){
        // alert(`choice ${size}`);
        generateGameBoard(size);
        document.getElementById("choice").parentElement.classList.add("invisible");
    }else{
        alert("invalid choice");
    }
});
// var cells=prompt("inserire il numero di celle <=10: ");
// if (cells<=10){
//     generateGameBoard(cells);
// }
document.getElementById("gameFrame").addEventListener("click",function(event){
    console.log(event);
    event.target.classList.remove("stdBgr");
    event.target.getElementsByClassName("invisible")[0].classList.remove("invisible");
    console.log(event.target.classList);
    if(event.target.parentElement.classList.contains("bomb")){
        alert("you lost!");
    }
});