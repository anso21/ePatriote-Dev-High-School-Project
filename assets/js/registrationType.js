// Get the modal
let modal = document.getElementById("myModal");
let btn = document.getElementById("trigger");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// Open the modal,  When the user clicks the button 
btn.addEventListener('click',(e)=>{
  modal.style.display = "block";
});

// When the user clicks on <span> (x), close the modal
span.addEventListener('click' , (e)=>{
  modal.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', (e)=>{
  if (e.target == modal) {
    modal.style.display = "none";
  }
});