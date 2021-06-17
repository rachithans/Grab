var videoType = ["flv", "avi", "mkv", "mov", "mp4", "mpeg", "mpg","mts",
  "mxf", "ogv", "vep", "vob", "webm", "wlmp", "wmv", "rm", "swf"];

//convert webpage html to single string
var htmlText = document.body.innerHTML.toString();

var videoRegex = videoType.join("|");

// pattern to match urls that point to videos
//code adapted from  https://github.com/dimofte/chrome-video-downloader/blob/master/scrape_video_urls.js
var urlRegex = new RegExp('("|\')(http|https):\\/\\/[^("|\'|,)]*?\\.(' + videoRegex + ")[^(\"|\')]*?(\"|\')", "gi");

// Build  array of urls by matching with regex
var urls = htmlText.match(urlRegex);

// remove quotes from the matched URLS
var fileRegex = new RegExp('[^\/]+?\.(' + videoRegex + ")", "i");
//map the URLs to the array.
var vidData = urls.map(function(url) {
  return {name: url.match(fileRegex)}
});
//send data
chrome.extension.sendRequest(vidData);