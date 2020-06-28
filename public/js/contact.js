

const padd = () => {
    let vw= window.innerWidth;
    let wrap= document.querySelector(".wrapper");
    let contact=document.querySelector("div.contact_date");
    if(vw>650){
        wrap.style.padding=`0px ${(vw-618)/2}px`;
        contact.style.right=`${(vw-618)/2}px`;
        contact.style.left=`${(vw-618)/2}px`
    }
    else{
        wrap.style.padding=`0px ${(vw-309)/2}px`;
        contact.style.right=`${(vw-309)/2}px`;
        contact.style.left=`${(vw-309)/2}px`
    }
    
    
}

padd();

window.addEventListener("resize", padd);



