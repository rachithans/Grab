 //background.js
 chrome.runtime.onMessage.addListener((request,sender,sendResponse) => {
     console.log("background.jssss");
     if(request.message === 'insert'){
         let req = insert_records(request.payload);
         req.then(res =>{ 
            
         chrome.runtime.sendMessage({
             message: 'insert',
             payload: res
         });
         });
     }
     
     else if(request.message === 'get_records'){
      console.log("got message");
      let req = get_record();
      req.then(res =>{
        chrome.runtime.sendMessage({
          message: 'records',
          payload: res
        });
      });
    }

 });

let roster = [{
    "url": "ssssssssssssssssssssssss1",
}]

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
        console.log("DB OPENED.");
        //  insert_records(roster);
    }
}

function insert_records(records) {
    if (db) {
      const insert_transaction = db.transaction("roster", 
                                   "readwrite");
      const objectStore = insert_transaction.objectStore("roster");
      return new Promise((resolve, reject) => {
         insert_transaction.oncomplete = function () {
             console.log("ALL INSERT TRANSACTIONS COMPLETE.");
             resolve(true);
         }
         insert_transaction.onerror = function () {
             console.log("PROBLEM INSERTING RECORDS.")
             resolve(false);
         }
         records.forEach(video => {
           let request = objectStore.add(video);
           request.onsuccess = function () {
             console.log("Added: ", video);
           }
         });
      });
    }
}

function get_record() {
    if (db) {
      const get_transaction = db.transaction("roster", "readonly");
      const objectStore = get_transaction.objectStore("roster");
      return new Promise((resolve, reject) => {
        get_transaction.oncomplete = function () {
          console.log("ALL GET TRANSACTIONS COMPLETE.");
        }
        get_transaction.onerror = function () {
          console.log("PROBLEM GETTING RECORDS.")
        }
        let request = objectStore.getAllKeys();
        request.onsuccess = function (event) {
          console.log(request.result);
          resolve(event.target.result);
        }
      });
    }
  }

 
  create_database();