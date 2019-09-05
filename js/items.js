class Item { //itemclass
    constructor(name, pic, level, health, damage, gold, atSpeed) {
    this.name = name; //navn
    this.pic = pic; //bilde
    this.level = level; //level
    this.health = health; //hvor mye liv den gir
    this.damage = damage; //hvor mye skade den gir
    this.gold = gold; //hvor mye gull den er verdt
    this.atSpeed = atSpeed; //hvor mye attackspeed den gir
}}

var spoon = new Item(
    "Spoon", //name
    "enemy5.png", //pic
    1, //level
    10, //health
    1, //damage
    10, //gold
    0 //atSpeed
);

var itemBox = []; //backdata
var frameBox = []; //inneholder frames
var itemId = 0;

var stats2El = document.getElementById("stats2"); //div for frameholder
for(var i = 0; i < 16; i++){ //legger til 15 boxer
    const itemFrame = document.createElement("div"); //lager en box
    itemFrame.className = "itemFrame"; //setter class til
    itemFrame.id = "frameId" + i; //unik id
    itemFrame.name = i;
    itemBox.push(0); //får un grid med 0 i backdata
    frameBox.push(itemFrame); //legger til hver box

    stats2El.appendChild(itemFrame); //legger boxholder i større div
}
function placeItem(item, place){ //for å legge til et item og bilde
    itemBox[place] = item; //putter backdata i backdata array
    var anItem = document.createElement("div"); //lager div som skal inneholde bilde
    anItem.className = "fill"; //setter det som en liten div i en box størrelse
    anItem.id = "item"+itemId; //så hvert item har unik id
    anItem.name = place; //putter hvor den er i gridden som .name taggen dens
    itemId++; //gjør så neste får 1 høyere id
    anItem.style.backgroundImage = "url('bilder/" + item.pic + "')"; //setter inn bilde
    anItem.style.backgroundSize = "cover"; //så bilde er scalet til størrelsen

    //for å kunne få info av hoverover
    /*
    anItem.classList.add("popup")  //gjør bildet til riktig class
    var spany = document.createElement("span"); //lager der teksten til tipset skal være
    spany.classList.add("popuptext"); //setter teksten til riktig class
    spany.innerHTML = item.name; //putter teksten som navnet til itemet
    spany.id = "spany"+ itemId;

    anItem.addEventListener("mouseover",function() {popupFunc(spany.id);}) //så man kan hover over
    anItem.addEventListener("mouseout", function() {popupFunc(spany.id);}) //så det stopper når man forlater den
    anItem.appendChild(spany);
    */

    anItem.draggable = "true"; //gjør så man kan dra i det
    anItem.addEventListener('dragstart', dragStart);
    anItem.addEventListener('dragend', dragEnd);
    anItem.addEventListener("mousedown", beingHeld)
    frameBox[place].appendChild(anItem); //legger det i en box
}
placeItem(spoon, 1)
placeItem(spoon, 4)

// Loop through empty boxes and add listeners
for (const itemFrame of frameBox) {
  itemFrame.addEventListener('dragover', dragOver);
  itemFrame.addEventListener('dragenter', dragEnter);
  itemFrame.addEventListener('dragleave', dragLeave);
  
  itemFrame.addEventListener('drop', dragDrop);
}

// Drag Functions
var heldItem = null;
var heldItemPlace = null;
function beingHeld(e){
  heldItem = e.target;
  heldItemPlace = e.target.parentNode.name;
}

function dragStart() {
  this.className += ' hold';
  setTimeout(() => (this.className = 'invisible'), 0);
}

function dragEnd() {
  this.className = 'fill';
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.classList.toggle("hovered");
}

function dragLeave() {
  this.classList.toggle("hovered");
}

function dragDrop() {
  if(itemBox[this.name] == 0){
    this.className = 'itemFrame';
    this.append(heldItem);
    itemBox[this.name] = itemBox[heldItemPlace];
    itemBox[heldItemPlace] = 0;
  }
}
