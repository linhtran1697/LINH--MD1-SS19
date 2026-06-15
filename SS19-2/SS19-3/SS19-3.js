const VALID_EMAIL = "admin@gmail.com";
const VALID_PASSWORD = "123456";
window.onload = function () {

    const data =
        JSON.parse(localStorage.getItem("rememberLogin"));

    if (data) {

        const now = new Date().getTime();

        if (now < data.expiredTime) {
            window.location.href = "home.html";
        } else {
            localStorage.removeItem("rememberLogin");
        }
    }
};
const togglePassword =
    document.getElementById("togglePassword");

const passwordInput =
    document.getElementById("password");

togglePassword.addEventListener("click", () => {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";
        togglePassword.classList.remove("fa-eye");
        togglePassword.classList.add("fa-eye-slash");

    } else {

        passwordInput.type = "password";
        togglePassword.classList.remove("fa-eye-slash");
        togglePassword.classList.add("fa-eye");
    }
});
document
    .getElementById("loginBtn")
    .addEventListener("click", login);

function login() {

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;

    const remember =
        document.getElementById("rememberMe").checked;

    const message =
        document.getElementById("message");

    message.innerHTML = "";
    }
    if (email === "") {
        message.innerHTML =
            "Email không được bỏ trống";
        return;
    }
    if (password === "") {
        message.innerHTML =
            "Password không được bỏ trống";
        return;
    }
    if (
        email === VALID_EMAIL &&
        password === VALID_PASSWORD
    ) {
        if (remember) {

            const expiredTime =
                new Date().getTime() +
                24 * 60 * 60 * 1000;

            localStorage.setItem(
                "rememberLogin",
                JSON.stringify({
                    email: email,
                    expiredTime: expiredTime
                })
            );
        } 
        alert("Đăng nhập thành công!");

        // Chuyển trang chủ
        window.location.href = "home.html";

    } else {

        message.innerHTML =
            "Email hoặc Password không đúng";
    }
