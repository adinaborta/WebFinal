//switch sign to log
let log_in = document.querySelector(".log_in");
let sign_in = document.querySelector(".sign_in");


const switch_sl = () => {
    let form1 = document.querySelector(".show");
    let form2 = document.querySelector(".dontShow");

    let infocus = document.querySelector(".the_one");
    let outfocus = document.querySelector(".other");

    let sign_w = infocus.offsetWidth;
    let sign_h = infocus.offsetHeight;

    form1.classList.remove("show");
    form1.classList.add("dontShow");
    form2.classList.remove("dontShow");
    form2.classList.add("show");
    infocus.classList.remove("the_one");
    infocus.classList.add("other");
    outfocus.classList.remove("other");
    outfocus.classList.add("the_one");
    outfocus.style.width = `${sign_w}px`;
    outfocus.style.height = `${sign_h}px`;

    setDim();
}
log_in.addEventListener('click', switch_sl);
sign_in.addEventListener('click', switch_sl);





const signUpButtton = document.querySelector("#buton_sign");
const signUp = async (event) => {
    event.preventDefault();
    const name = document.querySelector("#nume_sign").value;
    const email = document.querySelector("#email_sign").value;
    const password = document.querySelector("#password_sign").value;
    const rpassword = document.querySelector("#rpassword_sign").value;
    const terms = document.querySelector("#termeni").value;

    const res = fetch("/api/users/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'name': name,
                'email': email,
                'password': password,
                'rpassword': rpassword
            })
        })
        .then(async (res) => {
            mess = await res.json();
            if (res.status === 400) {
                if (mess.msg === 'Passwords dont match') {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Please make sure your passwords match',
                        icon: 'error',
                        confirmButtonText: 'Go back'
                    })
                } else if (mess.msg === 'Please include all informations') {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Please enter all the informations needed',
                        icon: 'error',
                        confirmButtonText: 'Go back'
                    })
                }
            } else {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    onOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer);
                        toast.addEventListener('mouseleave', Swal.resumeTimer);
                    }
                });

                Toast.fire({
                    icon: 'success',
                    title: 'Signed in successfully'
                });
                setTimeout(switch_sl, 3000);
            }
        });
}

signUpButtton.addEventListener('click', signUp);
// window.addEventListener('keypress', (event) => {
//   if (event.key === 'Enter') {
//     signUp(event);
//   }
// });