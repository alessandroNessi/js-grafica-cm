function generateGameBoard(cells){
    var board=document.getElementById("gameFrame");
    var root = document.documentElement;
    board.innerHTML="";
    //i get the frame width from the var in css
    var frameWidth = parseInt(getComputedStyle(root).getPropertyValue('--frameWidth').match(/[0-9]/g).join(""));
    console.log(`the max width is :${frameWidth}`);
    var cellWidth = frameWidth/cells;
    cellWidth+="px";
    console.log(`the cell width is :${cellWidth}`);
    //i write a var cellwidth in css that is set as sigle cell width
    root.style.setProperty("--cellWidth" , cellWidth);
    for(var i=0;i<(cells*cells);i++){
        board.innerHTML+=`<div class="cell stdBgr"></div>`;
    }
}
var cells=prompt("inserire il numero di celle <=10: ");
if (cells<=10){
    generateGameBoard(cells);
}