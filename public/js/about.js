let vw;

var layout;

vw=window.innerWidth;

if(vw<700)
{
    layout=0;
}
else
{
    layout=1;
}

const switch_poze_para = () => {
    let paragraf=document.querySelector(".paragraf1");
    let text=document.querySelector(".text_paragraf");
    let img=document.querySelector(".img_paragraf");
    vw=window.innerWidth;
    
    

    if(vw<700 && layout==0){
        paragraf.innerHTML=img.outerHTML + text.outerHTML;
        layout=1;
    }
    else
        {
            if(vw>=700 && layout==1)
            {
                paragraf.innerHTML=text.outerHTML + img.outerHTML;
                layout=0;
            }
        }
}


switch_poze_para();


window.onresize= switch_poze_para;

var ok=0;

const efect_para2 = () =>{

    let paragraf1=document.querySelector(".paragraf1");
    let nav=document.querySelector("nav");
    let vh=window.innerHeight;
    let verticalScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    let paragraf2=document.querySelector(".paragraf2");
    let para2_h=paragraf1.offsetHeight + nav.offsetHeight + ((paragraf2.offsetHeight)/3) - vh;
    
    console.log(paragraf1.offsetHeight, nav.offsetHeight, ((paragraf2.offsetHeight)/3), vh, para2_h)

    
    if(verticalScroll > para2_h)
    {
        paragraf2.classList.add("onscreen");
        ok=1;
    }

}

efect_para2();


if(ok==0){
    window.addEventListener("scroll" , efect_para2);
}



