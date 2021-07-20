
let db = null;
function create_database() {
    const request = window.indexedDB.open('New6DB');
    request.onerror = function (event) {
        console.log("Problem opening DB.");
    }
    request.onupgradeneeded = function (event) {
        db = event.target.result;
        let objectStore = db.createObjectStore('roster', {
            keyPath: 'url'
        });
        objectStore.transaction.oncomplete = function (event) {
            console.log("ObjectStore Created.");
        }
    }
    request.onsuccess = function (event) {
        db = event.target.result;
        console.log("DB OPENED1111111.");
        getAllUrls(db);
    }
}
function getAllUrls(db) {
    const txn = db.transaction('roster', "readonly");
    const objectStore = txn.objectStore('roster');

    objectStore.openCursor().onsuccess = (event) => {
        let cursor = event.target.result;
        if (cursor) {
            let url = cursor.value;
            console.log(url);
            

            const para = document.createElement("p");
            const node = document.createTextNode(url.url);
            para.appendChild(node);
            const element = document.getElementById("urls");
            element.appendChild(para);


            // let listHTML = '<ul>';

            // listHTML += '<li>' + url.url +  '</li>';
            //   document.getElementById('urls').innerHTML = listHTML;

            // continue next record
            cursor.continue();
        }
    };
    // close the database connection
    txn.oncomplete = function () {
        db.close();
    };
}

create_database();


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
     if (request.message === 'records') {
        if (request.payload) {

            // change "Save Changes" to "Edit Record"
            console.log(11111);
            console.log(request.payload);
        }
    }
});

