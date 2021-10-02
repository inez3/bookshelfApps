const STORAGE_KEY = "BOOK_APPS";

let books =[];

function isStorageExist() {
	if (typeof(Storage) === undefined) {
		alert("Browser kamu tidak mendukung local storage");
		return false
	}
	return true;
}

function saveData() {
   const parsed = JSON.stringify(books);
   localStorage.setItem(STORAGE_KEY, parsed);
   document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
   const serializedData = localStorage.getItem(STORAGE_KEY);
   
   let data = JSON.parse(serializedData);
   
   if(data !== null)
       books = data;
 
   document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
   if(isStorageExist())
       saveData();
}

function composeBookObject(judul, penulis, tahun, bukuSelesai) {
   return {
       id: +new Date(),
       judul,
       penulis,
       tahun,
       bukuSelesai
   };
}

function findBook(bookId) {
   for(book of books){
       if(book.id === bookId)
           return book;
   }
   return null;
}
function findBookIndex(bookId) {
   let index = 0
   for (book of books) {
       if(book.id === bookId)
           return index;
 
       index++;
   } 
   return -1;
}

function refreshDataFromBook() {
    const uncompletedBOOKList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);

    for(book of books) {
        const newBook = makeBook(book.judul, book.penulis, book.tahun, book.bukuSelesai);
        newBook[BOOKSHELF_ITEMID] = book.id;

        if(book.bukuSelesai) {
            listCompleted.append(newBook);
        } else {
            uncompletedBOOKList.append(newBook);
        }
    }
}

