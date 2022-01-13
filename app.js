const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");


const INITIAL_COLOR ="";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height =CANVAS_SIZE;

ctx.fillStyle ="white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 5;


let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}
function startPainting(){
    painting = true;
}

// 마우스 움직이는 내내 발생
function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!filling){
        if(!painting)
        {
            // 경로 그림 (실제 사용 x)
            ctx.beginPath();
            // 경로 좌표 설정 
            ctx.moveTo(x,y);
        }else{
            // 현재 sub-path 에서 마지막 지점을 특정 좌표로 연결함  
            ctx.lineTo(x,y);
            // 선을 그린다 .
            ctx.stroke();    
        }
    }
}

if(canvas){
    // 캔버스 안에서 클릭했을 때 이벤트가 발생함 
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",  stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
}
function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
}


function handleColorClick(event){
   const color = event.target.style.backgroundColor;
   ctx.strokeStyle = color;
   ctx.fillStyle = color;
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    }else{
        filling = true;
        mode.innerText = "paint";
    }
}
function handleSaveClick(){
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "paintJS";
    link.click();
}

Array.from(colors).forEach(color => color.addEventListener("click",handleColorClick));

if(range){
    range.addEventListener("input",handleRangeChange);
}

if(mode){
    mode.addEventListener("click",handleModeClick);
}
if(saveBtn){
    saveBtn.addEventListener("click",handleSaveClick);
}