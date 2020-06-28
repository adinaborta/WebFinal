let full = document.querySelector(".full");

function redirect() {
    window.location.replace("/acasa.html");
}

full.addEventListener('click', redirect);





let prim = document.querySelector("#prim");


const animatie = () => {
    let vw = window.innerWidth;
    let left = Math.floor(Math.random() * (vw - 0 + 1));

    let dim = Math.floor(Math.random() * (60-30 +1) + 30)

    prim.style.left = `${left}px`;
    prim.style.width = `${dim}px`;
}

let interval = window.setInterval(animatie, 6000)
