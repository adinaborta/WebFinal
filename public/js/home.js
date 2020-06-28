var curr_promo, next_promo;

const switch_promo = () => {
    let promos=document.querySelectorAll(".nr_oferta");
    for(let i=0 ; i<promos.length ; i++)
    {
        if(promos[i].classList.contains("in_focus"))
        {   
            curr_promo=promos[i];
            if(i!=promos.length - 1)
                {next_promo=promos[i+1];}
            else
                {next_promo=promos[0];}

            break;
        }
    }
    

    curr_promo.classList.remove("in_focus");
    curr_promo.classList.add("not_in_focus");
    next_promo.classList.remove("not_in_focus");
    next_promo.classList.add("in_focus");


}

 var intervalID = window.setInterval(switch_promo, 7000);



var curr_img, next_img;


const switch_img = () => {
    let imgs=document.querySelectorAll(".imagine_local");
    for(let i=0 ; i<imgs.length ; i++)
    {
        if(imgs[i].classList.contains("in_focus_img"))
        {   
            curr_img=imgs[i];
            if(i!=imgs.length - 1)
                {next_img=imgs[i+1];}
            else
                {next_img=imgs[0];}

            break;
        }
    }
    curr_img.classList.remove("in_focus_img");
    curr_img.classList.add("not_in_focus_img");
    next_img.classList.remove("not_in_focus_img");
    next_img.classList.add("in_focus_img");

    console.log(next_img);
}


var intervalID2 = window.setInterval(switch_img, 6000);










const aliniere= () => {
    let height_forma=0;
    let navigare= document.querySelector("nav");
    let height_navigare= navigare.offsetHeight;
    let local= document.querySelector(".imagine_local");
    let height_img= local.offsetHeight;
    let forma_coffee= document.querySelectorAll('p.forma');
    let forma_coffee_div=document.querySelector('div.forma');
    forma_coffee.forEach( para => {
        height_forma= height_forma+ para.offsetHeight;
    });
    height_padding= (height_img-height_forma)/2;
    height_padding.toString();
    height_padding += "px";
    forma_coffee_div.style.padding= `${height_padding} 0px`;

    height_before_about= height_navigare + height_img;

    var w = window.innerWidth;

    if(w<=800){
        let date_footer= document.querySelector(".date_footer");
        date_footer
    }
}

aliniere();

window.onresize= aliniere;
























