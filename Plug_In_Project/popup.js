var links = [];

function add_Records(url){
    chrome.runtime.sendMessage({
        message: 'insert',
        payload: [{
            "url": url

        }]
    });
}

//function to display links in the chrome ext window
function showLinks() {
    for (var i = 0; i < links.length; i++) {
        //create download image and download functionality
        var download = document.createElement("img");
        download.title = "Download this video";
        download.src = 'download.png';
        download.style.height = "50px";
        download.style.width = "60px";
        download.setAttribute("url", links[i].url);
        download.onclick = function(event) {
            chrome.downloads.download({
                url: event.target.getAttribute("url"),
            });
            console.log(event.target.getAttribute("url"));
            add_Records(event.target.getAttribute("url"))
        };
        //create collumns for name and download links
        var colDownload = document.createElement("td");
        colDownload.className += "download";
        colDownload.appendChild(download);
        var colName = document.createElement("td");
        colName.innerText = links[i].name;

        //append collumns to the row
        var rows = document.createElement("tr");
        rows.appendChild(colDownload);
        rows.appendChild(colName);

        var linksDisplay = document.getElementById("links");
        linksDisplay.appendChild(rows);
    }
    
}

//function used by the download all button
function downloadAll(){
    for (var i = 0; i < links.length; i++) {

        var download = document.createElement("tr");
        download.setAttribute("url", links[i].url);

        chrome.downloads.download({
            url: download.getAttribute("url"),
        });
          console.log(download.getAttribute("url"));
          add_Records(download.getAttribute("url"))
    };
}


// display videos upon clicking button
document.addEventListener("DOMContentLoaded", function() {
    var av = 0;
    var checkPageButton = document.getElementById("checkPage");
    if(checkPageButton){
        checkPageButton.addEventListener("click", function() {
            chrome.extension.onRequest.addListener(function(vidData){
                for (var i in vidData) {
                    links.push(vidData[i]);
                    av = 1;
                }
                showLinks();
            });
            chrome.windows.getCurrent(function (currentWindow) {
                chrome.tabs.query({active: true, windowId: currentWindow.id}, function(activeTabs) {
                    chrome.tabs.executeScript(activeTabs[0].id, {file: "video_urls.js"});
                });
            });
            if (av==0){
                alert("no link");
            }
        });
    }
    var hist = document.getElementById("history");
    if(hist){
        hist.addEventListener("click",function(){
            console.log('history button clicked')
            chrome.runtime.sendMessage({
                message: 'get_records'
            });
        });
    }
})

//download all button
document.addEventListener("DOMContentLoaded", function() {
    var downloadAllButton = document.getElementById("downloadAll");
    if(downloadAllButton){
        downloadAllButton.addEventListener("click", function() {
            chrome.extension.onRequest.addListener(function(vidData){
                for (var i in vidData) {
                    links.push(vidData[i]);
                }
                downloadAll();
                alert("start download");
            });
            chrome.windows.getCurrent(function (currentWindow) {
                chrome.tabs.query({active: true, windowId: currentWindow.id}, function(activeTabs) {
                    chrome.tabs.executeScript(activeTabs[0].id, {file: "video_urls.js"});
                });
            });
        });
    }
})




