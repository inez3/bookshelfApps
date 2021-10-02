const UNCOMPLETED_LIST_BOOK_ID = "incompleteBookshelfList";

const COMPLETED_LIST_BOOK_ID = "completeBookshelfList";

const BOOKSHELF_ITEMID = "itemId";

function addBook() {
    
    const uncompletedBOOKList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID );
    const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
    
    const judulBuku = document.getElementById("inputBookTitle").value;
    const penulisBuku = document.getElementById("inputBookAuthor").value;
    const tahunBuku = document.getElementById("inputBookYear").value;
    
    let bukuSelesai = document.getElementById("inputBookIsComplete");
    
    if (bukuSelesai.checked) {
        bukuSelesai = true;
    } else {
        bukuSelesai = false;
    }
 
    const newBookshelf = makeBook(judulBuku, penulisBuku, tahunBuku, bukuSelesai);
    const bookObject = composeBookObject(judulBuku, penulisBuku, tahunBuku, bukuSelesai);
 
    newBookshelf[BOOKSHELF_ITEMID] = bookObject.id;
    books.push(bookObject);
 
    if(bukuSelesai){
        listCompleted.append(newBookshelf);
    } else {
        uncompletedBOOKList.append(newBookshelf);
    }
 
    updateDataToStorage();
        
    }

function makeBook(judul, penulis, tahun, bukuSelesai) {

    const judulBuku = document.createElement("h3");
    judulBuku.innerText = judul;

    const penulisBuku = document.createElement("p");
    penulisBuku.innerHTML = penulis;
    
    const tahunBuku = document.createElement("p");
    tahunBuku.classList.add("textTahun");
    tahunBuku.innerText = tahun;
    
    const bookItem = document.createElement("article");
    bookItem.classList.add("book_item");
    bookItem.append(judulBuku, penulisBuku, tahunBuku);

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("action");

    if(bukuSelesai) {
        bookItem.append(
            createUndoButton(), 
            createTrashButton());
        bookItem.append(buttonContainer);
    } else {
        bookItem.append(
            createCheckButton(), 
            createTrashButton());
        bookItem.append(buttonContainer);
    }
    
    return bookItem;
}   



function createButton(buttonTypeClass, buttonText, eventListener){
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.innerText = buttonText;
    button.addEventListener("click", function(event){
        eventListener(event);
        event.stopPropagation();
    });
    return button;
}


function addBookToCompleted(bookElement) {
    
    const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
    
    const judulBuku = bookElement.querySelector(".book_item > h3").innerText;
    const penulisBuku = bookElement.querySelector(".book_item > p").innerText;
    const tahunBuku = bookElement.querySelector(".book_item > .textTahun").innerText;
    
    const newBookshelf = makeBook(judulBuku, penulisBuku, tahunBuku, true);

    const book = findBook(bookElement[BOOKSHELF_ITEMID]);
    book.bukuSelesai = true;
    newBookshelf[BOOKSHELF_ITEMID] = book.id;

    listCompleted.append(newBookshelf);

    bookElement.remove();

    updateDataToStorage();

}

function createCheckButton() {
    return createButton("green", "Selesai dibaca", function(event){
        addBookToCompleted(event.target.parentElement);
    })
}

function removeTaskFromCompleted(bookElement) {
    const bookPosition = findBookIndex(bookElement[BOOKSHELF_ITEMID]);
    books.splice(bookPosition, 1);

    let confirmation = confirm("apakah anda yakin ingin menghapus buku?");

        if (confirmation) {
            const cardParent = document.getElementById(bookElement);

            bookElement.remove();
            updateDataToStorage();
        }
    
}
          

function createTrashButton() {
    return createButton("red", "Hapus", function(event){
        removeTaskFromCompleted(event.target.parentElement);
    })
}


function undoTaskFromCompleted(bookElement){

    const listUnCompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);

    const judulBuku = bookElement.querySelector(".book_item > h3").innerText;
    const penulisBuku = bookElement.querySelector(".book_item > p").innerText;
    const tahunBuku = bookElement.querySelector(".book_item > .textTahun").innerText;

    const newBookshelf = makeBook(judulBuku, penulisBuku, tahunBuku, false);

    const book = findBook(bookElement[BOOKSHELF_ITEMID]);
    book.bukuSelesai = false;
    newBookshelf[BOOKSHELF_ITEMID] = book.id;

    listUnCompleted.append(newBookshelf);

    bookElement.remove();
    updateDataToStorage();
}

function createUndoButton() {
    return createButton("green", "Belum Selesai dibaca", function(event){
        undoTaskFromCompleted(event.target.parentElement);
    });
}


function bookSearch(keyword) {
    const filter = keyword.toUpperCase();
    const titles = document.querySelectorAll("article");

    for (let i = 0; i < titles.length; i++) {
        const titlesText = titles[i].textContent || titles[i].innerText;

        if (titlesText.toUpperCase().indexOf(filter) > -1) {
            titles[i].style.display = "";
        } else {
            titles[i].style.display = "none";
        }
    }
}