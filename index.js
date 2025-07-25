var bookmarkNameInput = document.getElementById("bookmarkName");
var bookmarkURLInput = document.getElementById("bookmarkURL");
var tableContent = document.getElementById("tableContent");
var boxModal = document.querySelector(".box-info");
var closeBtn = document.getElementById("closeBtn");
var tableList;
if(localStorage.getItem("sites")== null){
    tableList = [];
}
else{
    tableList = JSON.parse(localStorage.getItem("sites"));
    display()
}
function addTable(){
    if(
        bookmarkNameInput.classList.contains("is-valid")&&
        bookmarkURLInput.classList.contains("is-valid")
    ){
        var prouduct = {
            Name : bookmarkNameInput.value,
            url: bookmarkURLInput.value,
        };
        tableList.push(prouduct);
        display();
        clearForm();
        localStorage.setItem("sites",JSON.stringify(tableList));
        console.log(tableList); 
    }else{
        boxModal.classList.remove("d-none")
    }
}
function clearForm(){
    bookmarkNameInput.value=null;
    bookmarkNameInput.classList.remove("is-valid");
    bookmarkURLInput.value=null;
    bookmarkURLInput.classList.remove("is-valid");
}
function display(){
    var cartona ="";
    var a=1;
    for(var i=0;i<tableList.length;i++){
        cartona +=`
    <tr>
        <td>${[a++]}</td>
        <td>${tableList[i].Name}</td>
        <td>
            <a href="${tableList[i].url}" class="btn btn-success" target="_blank">
                <i class="fa-solid fa-eye pe-2"></i>
                Visit
            </a>
        </td>
        <td>
            <button onclick="deleteTable(${i})" class="btn btn-danger">
                <i class="fa-solid fa-trash-can pe-2"></i>
                Delete
            </button>
        </td>
    </tr>`;
    }
    tableContent.innerHTML=cartona;
}
function deleteTable(deltedIndex){
    tableList.splice(deltedIndex,1);
    display();
    localStorage.setItem("sites",JSON.stringify(tableList));
    console.log(tableList);
}
function validationInputs(element){
    var regix = {
        bookmarkName:/^[a-zA-Z]{3,}$/,
        bookmarkURL: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
    };
    if(regix[element.id].test(element.value)){
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
    }else{
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
    }
}
function closeModal(){
    boxModal.classList.add("d-none");
}