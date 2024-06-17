document.addEventListener("keydown", (e)=>{
    if(e.metaKey && e.key==="s"){
        e.preventDefault();
       SaveNoteData();
    }
});


const Container=document.getElementById("container");
let selectedText="", rangeAt="";
let noteData=localStorage.getItem("noteData");
readNoteData();
function readNoteData(){
    noteData=JSON.parse(noteData);
    noteData.forEach((element)=>{
        CreateNewNote(element.value);
    })
}
function CreateNewNote(e){ 
      let div=document.createElement("div");
      div.classList.add("note-row");
      let newNote=` <div class="note-row">
            <div class="note-editor" contenteditable="true" onmouseup="getSelectedText()" id="note-editor">`+e+`</div>
                <div class="note-control">
                    <div onclick="getSelectedStyle('capitalize')" class="capitalize">Aa</div>
                        <div onclick="getSelectedStyle('bold')" class="bold">B</div>
                        <div onclick="getSelectedStyle('italic')" class="italic">I</div>
                        <div onclick="getSelectedStyle('underline')" class="underline">U</div>
                        <div onclick="getSelectedStyle('linethrough')" class="linethrough">ab</div>
                        <hr/>
                        <img src="img2.png" onclick="DeleteNode(this)"/>
                </div>
            </div>`;
      div.innerHTML=newNote;
      Container.appendChild(div);
      const noteEditorData=document.querySelectorAll(".note-editor");
      noteEditorData.forEach((element)=>{
        element.addEventListener("keypress", (e)=>{
            if(e.key==="Enter"){
                document.execCommand("insertHTML", false, "<br/>");
                return false;
            }
        });
      });
      const option=document.getElementById("options");
    option.style.display="none";
}

function CreateTodoList(e){
    let id=Date.now();
    let div=document.createElement("div");
    div.classList.add("todo-app");
    let newList=`<div class="todo-app" id="todo-app-${id}">
            <h2>To-Do List<img src="images/icon.png"></h2>
            <div class="row">
                <input type="text" id="input-box-${id}" placeholder="Add your text">
                <button class="add" onclick="addTask(${id})">Add</button>
            </div>
            <ul id="list-container-${id}">
            </ul>
        </div>`;
        div.innerHTML=newList;
        Container.appendChild(div);
    const listcontainer=document.getElementById(`list-container-${id}`);
      listcontainer.addEventListener("click", function(e)
{
    if(e.target.tagName==="LI"){
        e.target.classList.toggle("checked");
        saveData(id);
    }
    else if(e.target.tagName==="SPAN"){
        e.target.parentElement.remove();
        saveData(id);
    }
}, false);
      const option=document.getElementById("options");
      option.style.display="none";
}

function addTask(id){
const inputBox=document.getElementById(`input-box-${id}`);
const listcontainer=document.getElementById(`list-container-${id}`);

    //if input box is empty
    if(inputBox.value===''){
        alert("You must write something");
    }

    else{
        let li=document.createElement("li");
        li.innerHTML=inputBox.value;
        listcontainer.appendChild(li);
        let span=document.createElement("span");
        span.innerHTML="\u00d7";
        li.appendChild(span);
    }
    inputBox.value="";
    saveData(id);
}


// to store the data
function saveData(id){
    const listcontainer=document.getElementById(`list-container-${id}`);
    localStorage.setItem(`data-${id}`, listcontainer.innerHTML);
}
// to show data
function showTask(){
    const todoApps=document.querySelectorAll(".todo-app");
    todoApps.forEach((element)=>{
        const id=element.id.split('-')[2];
    const listcontainer=document.getElementById(`list-container-${id}`);
    listcontainer.innerHTML=localStorage.getItem(`data-${id}`);
});
}
function SaveNoteData(){
    noteData=[];
    localStorage.setItem("noteData", []);

    const noteEditorData=document.querySelectorAll(".note-editor");
    noteEditorData.forEach((element)=>{
        if(element.innerHTML!==""){
            let html={value: element.innerHTML};
            noteData.push(html);
        }
    });
    localStorage.setItem("noteData", JSON.stringify(noteData));
}
function getSelectedText(){
    selectedText=window.getSelection().toString();
    rangeAt=window.getSelection().getRangeAt(0);
}
function getSelectedStyle(e){
    if(selectedText){
    let div=document.createElement("span");
    div.classList.add(e);
    div.innerHTML=selectedText;
    rangeAt.deleteContents();
    rangeAt.insertNode(div);
}
}
function DeleteNode(e){
    let confirmed=confirm("Are you sure? Do you want to delete it?");
    if(confirmed){
        e.parentNode.parentNode.remove();
        SaveNoteData();
    }
}
function showoptions(){
    const option=document.getElementById("options");
    option.style.display="block";
}
showTask();
