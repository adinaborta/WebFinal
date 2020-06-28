let submit_pic = document.querySelector("#submit_pic");
let next = document.getElementById("next");
let adauga_pic = document.getElementById("adauga_foto");
let main = document.querySelector("main");
let nav = document.querySelector("nav");
let footer = document.querySelector("footer");
let send = document.querySelector("#send");
let edit = document.querySelectorAll(".edit")
let ok = 0;
const id_user = sessionStorage.getItem("userId");

const press_plus = () => {
    let add_btn = document.getElementById("plus");
    console.log("in plus");
    submit_pic.style.opacity = "1";
    submit_pic.style.transform = "translateX(0vw)";
    submit_pic.style.transition = "transform 0.5s ease-in-out"
    adauga_pic.style.display = "block";
    main.style.opacity = "0.05";
    nav.style.opacity = "0.05";
    footer.style.opacity = "0.05";
    add_btn.style.display = "none";
    ok = 1;
    event.stopPropagation();
    main.addEventListener('click', exit);
    send.addEventListener('click', save_pic);
    next.addEventListener('click', press_next);
}
const press_next = () => {
    submit_pic.style.transform = "translateX(-100vw)";
    submit_pic.style.transition = "transform 0.5s ease-in-out";
    ok = 2;
}

const exit = () => {
    let add_btn = document.getElementById("plus");
    submit_pic.style.opacity = "0";
    if (ok == 1) {
        submit_pic.style.transform = "translateX(100vw)";
    } else if (ok == 2) {
        submit_pic.style.transform = "translateX(200vw)";
    }
    submit_pic.style.transition = "transform 0.5s 0.5s ease-in-out, opacity 0.5s ease"
    adauga_pic.style.display = "none";
    main.style.opacity = "1";
    nav.style.opacity = "1";
    footer.style.opacity = "1";
    add_btn.style.display = "block";
    ok = 0;
    main.removeEventListener('click', exit);
}



const save_pic = () => {
    event.preventDefault();
    let desc = document.querySelector("#desc").value;
    let link_ph = document.querySelector("#link").value;

    const res = fetch(`/api/users/add_pic/${id_user}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'link_ph': link_ph,
                'desc': desc
            })
        })
        .then(async (res) => {
            if (res.status === 400) {
                mess = await res.json();
                if (mess.msg == `There is no user with the id of ${id_user}`) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'There is no user with this email and password',
                        icon: 'error',
                        confirmButtonText: 'Go back'
                    })
                } else if (mess.msg === `Please insert all informations needed`) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Please enter all the informations needed',
                        icon: 'error',
                        confirmButtonText: 'Go back'
                    })
                }
            } else {
                exit();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your picture has been submitted',
                    showConfirmButton: false,
                    timer: 1500
                })
                var wrap_pics_div = document.querySelectorAll(".wrap_single");

                get_pers(id_user);
            }

        })
    document.getElementById('link').value = ''
}

// const edit_img = () => {
//     edit = event.target;
//     let i = edit.id.replace(/\D+/g, '');
//     let para = document.querySelector(`#description${i}`);
//     let desc_old = document.querySelector(`#description${i}`).innerHTML;
//     let link_ph = document.querySelector(`#link${i}`).src;
//     para.outerHTML = `<textarea name="desc_new" id="desc_new${i}" maxlength="400" class="desc_new">${desc_old}</textarea>`
//     let wrap_single = document.querySelector(`#wrap_single${i}`);
    
// }
const delete_img = () => {
    del = event.target;
    let i = del.id.replace(/\D+/g, '');
    let desc = document.querySelector(`#description${i}`).innerHTML;
    let link_ph = document.querySelector(`#link${i}`).src;

    const res = fetch(`/api/users/delete_pic/${id_user}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'link_ph': link_ph,
                'desc': desc
            })
           
        })
        .then(async (res) => {
            if (res.status === 400) {
                mess = await res.json();
                if (mess.msg == `There is no user with the id of ${id_user}`) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'There is no user with this email and password',
                        icon: 'error',
                        confirmButtonText: 'Go back'
                    })
                } else if (mess.msg === `Please insert all informations needed`) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Please enter all the informations needed',
                        icon: 'error',
                        confirmButtonText: 'Go back'
                    })
                }
            } else {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your picture has been deleted',
                    showConfirmButton: false,
                    timer: 1500
                })
                get_pers(id_user);
            }

        })
    
 }





const get_pers = (id) => {
    const res = fetch(`/api/users/${id}`)
        .then(async (res) => {
            let person = await res.json();
            let photos = person.photos;
            let name = person.name;



            const display_photos = (photos, name) => {
                let wrap_pics = document.querySelector(".wrap_pics");
                var wrap_pics_div = document.getElementsByClassName("wrap_single");
                let add_btn = document.getElementById("plus");
                wrap_pics.innerHTML = add_btn.outerHTML;
                for (let i = 0; i < photos.length; i++) {
                    let new_div = `
                        <div class = "wrap_single" id="wrap_single${i}">
                            <img src =${photos[i].link_ph} id = "link${i}" alt = "">
                            <div class = "description" >
                                <h1> ${name} </h1>
                                <h3>~Artist</h3>
                                <h2> ~Description </h3>
                                <p id="description${i}">${photos[i].desc}</p>
                            </div>
                            <div class="svguri"> 
                                <img class="trash" id="trash${i}" onclick="delete_img()" src="/img/iconmonstr-trash-can-2-240.png  " alt="">
                                 <img class="edit" id="edit${i}" onclick="edit_img()" src="/img/iconmonstr-pencil-13-240.png" alt="">
                            </div>
                        </div>`
                    wrap_pics.innerHTML = new_div + wrap_pics.innerHTML;
                }


                for (let i = 0; i < wrap_pics_div.length; i++) {
                    wrap_pics_div[i].addEventListener('click', flip = () => {
                        let wrap = wrap_pics_div[i];
                        let img = wrap.childNodes[1];
                        let descr = document.querySelectorAll(".description")[i];
                        let svg_trash = document.querySelectorAll(".trash");
                        let svg_edit = document.querySelectorAll(".edit");
                        var style = window.getComputedStyle(img);
                        var col = style.getPropertyValue('color');
                        if (col == "rgb(255, 255, 255)") {
                            svg_trash[i].style.display = "block";
                            svg_edit[i].style.display = "block";
                            let img_height = `${img.offsetHeight-10}px`;
                            let img_width = `${img.offsetWidth-10}px`;
                            img.style.color = "rgb(255, 0, 0)";
                            img.style.transform = "rotateY(90deg)";
                            img.style.transition = "transform 0.5s ease-in-out"
                            descr.style.transform = "rotateY(0deg)";
                            descr.style.transition = "0.4s 0.5s ease-in-out"
                            descr.style.height = img_height;
                            descr.style.width = img_width;
                        }
                    });
                }

                for (let i = 0; i < wrap_pics_div.length; i++) {
                    wrap_pics_div[i].childNodes[3].addEventListener('click', flip_back = () => {
                        let wrap = wrap_pics_div[i];
                        let img = wrap.childNodes[1];
                        let descr = wrap.childNodes[3];
                        let svg_trash = document.querySelectorAll(".trash");
                        let svg_edit = document.querySelectorAll(".edit");
                        var style = window.getComputedStyle(img);
                        var col = style.getPropertyValue('color')
                        if (col == "rgb(255, 0, 0)") {
                            img.style.transform = "rotateY(0deg)";
                            svg_trash[i].style.display = "none";
                            svg_edit[i].style.display = "none";
                            img.style.color = "rgb(255, 255, 255)";
                            img.style.transition = "0.4s 0.5s ease-in-out"
                            descr.style.transform = "rotateY(90deg)";
                            descr.style.transition = "0.5s ease-in-out"
                        }
                    })
                }
            }
            display_photos(photos, name);
        })
}
get_pers(id_user);