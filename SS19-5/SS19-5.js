const modal = document.getElementById("modal");
const openBtn = document.getElementById("openModalBtn");
const closeBtn = document.getElementById("closeBtn");
const saveBtn = document.getElementById("saveBtn");

const siteName = document.getElementById("siteName");
const siteURL = document.getElementById("siteURL");

const bookmarkList =
    document.getElementById("bookmarkList");

let bookmarks =
    JSON.parse(localStorage.getItem("bookmarks"))
    || [];

// Mở modal
openBtn.addEventListener("click", () => {
    modal.style.display = "flex";
});

// Đóng modal
closeBtn.addEventListener("click", () => {
    closeModal();
});

window.addEventListener("click", (e) => {
    if(e.target === modal){
        closeModal();
    }
});

// Lưu bookmark
saveBtn.addEventListener("click", addBookmark);

function addBookmark(){

    const name = siteName.value.trim();
    let url = siteURL.value.trim();

    if(name === "" || url === ""){
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
    }

    if(
        !url.startsWith("http://") &&
        !url.startsWith("https://")
    ){
        url = "https://" + url;
    }

    const bookmark = {
        id: Date.now(),
        name,
        url
    };

    bookmarks.push(bookmark);

    saveToLocalStorage();

    renderBookmarks();

    closeModal();
}

// Hiển thị danh sách
function renderBookmarks(){

    bookmarkList.innerHTML = "";

    bookmarks.forEach(bookmark => {

        const card =
            document.createElement("div");

        card.className = "bookmark-card";

        card.innerHTML = `
            <a href="${bookmark.url}"
               target="_blank">
                ${bookmark.name}
            </a>

            <button
                class="delete-btn"
                onclick="deleteBookmark(${bookmark.id})">

                <i class="fa-solid fa-xmark"></i>

            </button>
        `;

        bookmarkList.appendChild(card);
    });
}

// Xóa bookmark
function deleteBookmark(id){

    bookmarks = bookmarks.filter(
        item => item.id !== id
    );

    saveToLocalStorage();

    renderBookmarks();
}

// Lưu Local Storage
function saveToLocalStorage(){

    localStorage.setItem(
        "bookmarks",
        JSON.stringify(bookmarks)
    );
}

// Đóng modal
function closeModal(){

    modal.style.display = "none";

    siteName.value = "";
    siteURL.value = "";
}

// Load dữ liệu
renderBookmarks();