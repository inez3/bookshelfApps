document.addEventListener("DOMContentLoaded", function () {
 
    const submitForm = document.getElementById("inputBook");
    const searchForm = document.getElementById("searchBook");
    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addBook();
        document.getElementById("inputBookTitle").value = "";
        document.getElementById("inputBookAuthor").value = "";
        document.getElementById("inputBookYear").value = "";
        document.getElementById("inputBookIsComplete").checked = false;
    });

    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const inputSearch = document.getElementById("searchBookTitle").value;
        bookSearch(inputSearch);
    });
 
    if(isStorageExist()) {
        loadDataFromStorage();
    }

});
document.addEventListener("ondatasaved", () => {
   console.log("Data berhasil disimpan.");
});
document.addEventListener('ondataloaded', function(){
    refreshDataFromBook();
})

