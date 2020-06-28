function animatii()
{
    let vw=window.innerWidth
    let diviziunii=document.querySelectorAll(".tot");
    let verticalScroll = window.pageYOffset;
    let vh=window.innerHeight;
    let heightt=0;
    let imgs= document.querySelectorAll("div.imagini div");
    let arr=["imagine1" , "imagine2" , "imagine3" , "imagine4"]

    for(let i=0;i<=3;i++)
    {
        heightt+=diviziunii[i].offsetHeight;
    }

    let nav=document.querySelector("nav")

    heightt+=nav.offsetHeight;

    
    

    for(let i=0;i<=7; i=i+2)
    {  
        heightt= heightt+imgs[i].offsetHeight/10 - vh;
        if(verticalScroll>heightt && arr[i/2]!=0){
            imgs[i].classList.add(arr[i/2]);
            arr[i/2]=0;
            heightt+= imgs[i+1].offsetHeight;
            if(vw>1020){
                heightt+=100
            }
            else
            {
                if(vw<=550){
                    heightt+=20
                }
                else
                    heightt+=50
            }
        }
        
        heightt=heightt + 9*imgs[i].offsetHeight /10 + vh;
        
    }

}


window.addEventListener("load", animatii);
window.addEventListener("scroll", animatii);