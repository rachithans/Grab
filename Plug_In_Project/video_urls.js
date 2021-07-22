var videoType = ["flv", "avi", "mkv", "mov", "mp4", "mpeg", "mpg","mts",
  "mxf", "ogv", "vep", "vob", "webm", "wlmp", "wmv", "rm", "swf","jpg","png","jpeg","gif"];

//convert webpage html to single string
var htmlText = document.body.innerHTML.toString();

var videoRegex = videoType.join("|");

// pattern to match urls that point to videos
//code adapted from  https://github.com/dimofte/chrome-video-downloader/blob/master/scrape_video_urls.js
var urlRegex  = new RegExp('("|\')(http|https):\\/\\/[^("|\'|,)]*?\\.(' +videoRegex +')[^("|\')]*?("|\')','gi');


// Build the array of video urls
var urls = htmlText.match(urlRegex);
// remove quotes from strings
urls = urls.map(function(quotes) {
      return quotes.substr(1, quotes.length-2)
    });
  
var fileRegex = new RegExp('[^\/]+?\.(' + videoRegex + ')');
    
var vidData = urls.map(function(url) {
  
  return {
    name: url.match(fileRegex)[0],
    url: url
  }
});

chrome.extension.sendRequest(vidData);