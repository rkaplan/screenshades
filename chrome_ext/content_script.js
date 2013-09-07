function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getHost(url) {
    return url.substring(url.indexOf('//') + 2, url.indexOf('/', url.indexOf('//') + 2));
}

var url = window.location.href;
var host = getHost(url);

if(host == "movies.netflix.com") {
    var epId = getParameterByName('movieid');
    if(epId) {
        chrome.runtime.sendMessage({
            message: "EPISODE_LOAD",
            url: url,
            netflixId: epId
        }, function(response) {

        });
    }
}

// code for t parameter based episode classification:

    // var episode = getParameterByName('t');
    // console.log(epId + ": " + episode);
    // if(episode) {
    //  var data = episode.split(": ");

    //  if(data.length == 3) {
    //      var ep_show = data[0],
    //          ep_season = data[1].substring(data[1].indexOf(' ') + 1),
    //          ep_name = data[2];

    //      console.log(ep_show);
    //      console.log(ep_season);
    //      console.log(ep_name);
    //  }
    // }