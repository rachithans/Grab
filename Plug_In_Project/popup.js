var links = [];

//function to display links in the chrome ext window
function showLinks() {
  var linksDisplay = document.getElementById('links');

  for (var i = 0; i < links.length; i++) {
    var col0 = document.createElement('td');
    var download = document.createElement('img');
    download.title = 'Download this video';
    download.setAttribute('url', links[i].url);
    download.onclick = function(event) {
      chrome.downloads.download({
        url: event.target.getAttribute('url'),
      });
    };
    col0.appendChild(download);
    var col1 = document.createElement('td');
    col1.innerText = links[i].name;

    var rows = document.createElement('tr');
    rows.appendChild(col0);
    rows.appendChild(col1);
    linksDisplay.appendChild(rows);
  }
}

// display videos upon clicking button
document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('checkPage');
    checkPageButton.addEventListener('click', function() {
        chrome.extension.onRequest.addListener(function(vidData){
            for (var i in vidData) {
              links.push(vidData[i]);
            }
            showLinks();
        });
        chrome.windows.getCurrent(function (currentWindow) {
            chrome.tabs.query({active: true, windowId: currentWindow.id}, function(activeTabs) {
                chrome.tabs.executeScript(activeTabs[0].id, {file: 'video_urls.js'});
            });
        });
    });
})

