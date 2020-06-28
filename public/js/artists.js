let sum=0;
const suma= () =>{
    sum=0;
    let divs=document.querySelectorAll("main .tot")
    divs.forEach(diviziune =>{
        sum+=diviziune.offsetHeight;
    });

}
window.addEventListener("load", suma);
window.addEventListener("resize", suma);



const down = () =>{
    window.scrollTo(0, sum);
}
let buton= document.querySelector("button.submitart");
buton.addEventListener("click", down);




const setDim = ()=> {
    let form= document.querySelector('.formular');
    let width = window.innerWidth;
    if(form)
        form.style.left=(`${(width - form.offsetWidth)/2}px `);
}
window.addEventListener('resize', setDim);
setDim();



let poplog= document.querySelector(".poplog");
const popLogInForm = () => {
    let main= document.querySelector("main");
    let footer=document.querySelector("footer");
    let nav= document.querySelector("nav");
    let form= document.querySelector(".no");
    // console.log(form)
    form.classList.remove("no");
    form.classList.add("formular");
    setDim();
    main.style.opacity='0.1';
    nav.style.opacity='0.1';
    footer.style.opacity='0.1';
    poplog.removeEventListener('click', popLogInForm);
    buton.removeEventListener('click', down);

}
if(poplog)
    poplog.addEventListener('click', popLogInForm);



const revPopLogInForm = () => {
    let main= document.querySelector("main");
    let footer=document.querySelector("footer");
    let nav= document.querySelector("nav");
    let form= document.querySelector(".formular");
    // console.log(form)
    form.classList.add("no");
    form.classList.remove("formular");
    main.style.opacity='1';
    nav.style.opacity='1';
    footer.style.opacity='1';
    poplog.addEventListener('click', popLogInForm);
    buton.addEventListener('click', down);
}
let revpoplog=document.querySelectorAll(".inchide");
revpoplog.forEach( revpop => revpop.addEventListener('click', revPopLogInForm)) 





