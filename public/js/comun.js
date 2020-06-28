const imagine = document.querySelector('.logo');

window.onscroll = () => {
    let verticalScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if(verticalScroll > 20){
        imagine.classList.add("logo_mic");
        imagine.classList.remove("logo_mare");
    }
    if(verticalScroll<20){
        imagine.classList.add("logo_mare");
        imagine.classList.remove("logo_mic");
    }

}
let buttonsc=document.querySelectorAll(".dropdown-content button")

// function send_to()
// {
    
    
//     let diviziuni=document.querySelectorAll(".big-category");
//     let meniu_intro=document.querySelector(".little-category");
//     let height=meniu_intro.offsetHeight;
    
    
//     i=0;
//     while(buttons[i] != event.currentTarget)
//     {
//         height=height + diviziuni[i].offsetHeight;
//         i++;
//         console.log(buttons[i])
//     }
//     window.scrollTo(0, height);
// }


let dropbtn=document.querySelector(".dropbtn");



if(!dropbtn.classList.contains("e_meniu")){
    buttonsc.forEach(option => {
        option.addEventListener("click", redirect);
    });
}

function redirect() {
    let optiune= event.currentTarget.classList;
    location.href= "meniu.html?optiune="+optiune;
}




let navs = document.querySelectorAll(".dim_a a");

navs.forEach(nav => {
    if (nav.href.includes(window.location.href)) {
        nav.style.fontSize = ("x-large");
        nav.style.textShadow = ("#7f26b38e 2px 2px 2px")
      
    }
})















