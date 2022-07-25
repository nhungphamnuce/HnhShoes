let submitBtn = document.getElementById("submit-contact-Btn")
submitBtn.onsubmit= function(){
    // event.preventDefault();
    let nameCIn = document.getElementById('exampleInputText')
    let commentCIn = document.getElementById('exampleInputEmail')
    let numberCIn = document.getElementById('exampleInputNumber')
    let contentCIn =document.getElementById("exampleInputContact")



let xhttp = new XMLHttpRequest(); 

xhttp.open("POST", "/contact", true); 
xhttp.setRequestHeader("Content-Type",
"application/x-www-form-urlencoded");
xhttp.send(`name=${nameCIn.value}&email=${commentCIn.value}&number=${numberCIn.value}&content=${contentCIn.value}`);
}