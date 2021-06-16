var links = [];

//function to display links in the chrome ext window
function showLinks() {

  for (var i = 0; i < links.length; i++) {
    //create download image and download functionality
    var download = document.createElement("img");
    download.title = "Download this video";
    download.setAttribute("url", links[i].url);
    download.onclick = function(event) {
      chrome.downloads.download({
        url: event.target.getAttribute("url"),
      });
    };
    //create collumns for name and download links
    
    var colDownload = document.createElement("td");
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

// display videos upon clicking button
document.addEventListener("DOMContentLoaded", function() {
    var checkPageButton = document.getElementById("checkPage");
    checkPageButton.addEventListener("click", function() {
        chrome.extension.onRequest.addListener(function(vidData){
            for (var i in vidData) {
              links.push(vidData[i]);
            }
            showLinks();
        });
        chrome.windows.getCurrent(function (currentWindow) {
            chrome.tabs.query({active: true, windowId: currentWindow.id}, function(activeTabs) {
                chrome.tabs.executeScript(activeTabs[0].id, {file: "video_urls.js"});
            });
        });
    });
})

