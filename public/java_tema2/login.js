if (localStorage.getItem('rememberMe') === 'true') {
    const userId = localStorage.getItem('userId');
    sessionStorage.setItem('userId', userId);
    sessionStorage.setItem('loggedIn', 'true');
}

let users;
let id;

let logInButton = document.querySelector("#buton_log");
const logIn = async (event) => {
    event.preventDefault();
    const email = document.querySelector("#email_log").value;
    const password = document.querySelector("#password_log").value;
    const rememberMe = document.querySelector("#remember_me");

    const res = fetch("/api/users/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': email,
                'password': password
            })
        })
        .then(async (res) => {
            if (res.status === 400) {
                mess = await res.json();
                if (mess.msg == "Incorrect informations") {
                    Swal.fire({
                        title: 'Error!',
                        text: `Wrong password or email`,
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
                users = await res.json();
                sessionStorage.setItem('loggedIn', 'true');
                sessionStorage.setItem('userId', users.id);

                if (rememberMe.checked) {
                    localStorage.setItem('rememberMe', 'true');
                    localStorage.setItem('userId', users.id);
                }

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'You are now loged in',
                    showConfirmButton: false,
                    timer: 1500
                })

                setTimeout(() => window.location.replace(`your_acc.html?id=${users.id}`), 1500);
            }
        })
}
if (logInButton)
    logInButton.addEventListener('click', logIn);
window.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        logIn(event);
    }
})

const log_off = () => {
    sessionStorage.removeItem('loggedIn');
    sessionStorage.removeItem('userId');
    localStorage.removeItem('rememberMe');
    localStorage.removeItem('userId');

    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Logged off',
        showConfirmButton: false,
        timer: 1500
    })
    setTimeout(() => window.location.replace(`acasa.html`), 1500);
}

const delete_acc = () => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            const res = fetch(`/api/users/${id_user}`, {
                method: 'DELETE',
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
                        }
                    } else {
                        sessionStorage.removeItem('loggedIn');
                        sessionStorage.removeItem('userId');
                        localStorage.removeItem('rememberMe');
                        localStorage.removeItem('userId');

                        Swal.fire(
                            'Deleted!',
                            'Your account has been deleted.',
                            'success'
                        )
                        setTimeout(() => window.location.replace(`acasa.html`), 1500);

                    }
            })
        }
    })
    
}






//Changes based on sessionStorage.loggedIn

const powerOffLoginBtn = () => {
    if (sessionStorage.getItem('loggedIn') === 'true') {
        let poplog = document.querySelector(".log_in_pop_btn");
        if (poplog) {
            poplog.classList.remove("poplog");
            poplog.innerHTML = ""
        }
    }
}
powerOffLoginBtn();



const show_your_art_nav = () => {
    if (sessionStorage.getItem('loggedIn') === 'true') {
        let your_acc = document.querySelector(".your_acc");
        if (your_acc.classList.contains("your_acc")) {
            let id = sessionStorage.getItem('userId')
            let path_acc = your_acc.childNodes[0];
            if (path_acc.href != `${document.location.href}#`) {

                path_acc.href = `your_acc.html?id=${id}`
            } else {
                let url = new URL(path_acc.href);
                // let id = url.searchParams.get("id");
                if (!url.searchParams.get("id")) {
                    window.location.replace(`${document.location.href}?id=${id}`)
                }
            }
            your_acc.classList.remove("your_acc");
        }
    }
}
window.addEventListener('load', show_your_art_nav);

const send_404 = () => {
    if ((!sessionStorage.getItem('loggedIn') || sessionStorage.getItem('loggedIn') != "true") && window.location.href.includes("your_acc")) {
        window.location.replace("/404.html")
    }
}
send_404();