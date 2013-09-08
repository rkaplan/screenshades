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
if(host == "twitter.com") {
    $('head').append(" \
        <style type='text/css'> \
            .shades-overlay { \
                -webkit-filter: blur(0px) brightness(1) saturate(100%); \
                position: absolute; \
                top: 0px; \
                left: 0px; \
                z-index: 100; \
                // width: 510px; \
                // height: 95px; \
            } \
            \
            .blurred-tweet { \
                -webkit-filter: blur(3.5px) brightness(1.07) saturate(120%); \
            } \
 \
            .blurred-tweet:hover { \
                -webkit-filter: blur(3.8px) brightness(1.09) saturate(40%) \
            } \
        </style> \
    ");

    var tweets = $($('#stream-items-id')[0]).find('li');
    for (var i = 0; i < tweets.length; i++) {
        var twitterHandle = $(tweets[i]).find('.content .username b').text();
        var time = $(tweets[i]).find('.content ._timestamp').attr('data-time');
        var body = $(tweets[i]).find('.content p.tweet-text').text();
        var uid = $(tweets[i]).find('.content .tweet-timestamp').attr('href');

        if (twitterHandle && time && body && uid) {
            chrome.runtime.sendMessage({
                message: "UNPROCESSED_TWEET",
                twitterHandle: twitterHandle,
                time: time,
                body: body,
                uid: uid
            }, function(response) {
                if (response.blur_tweet) {
                    var all_tweets = $('#stream-items-id').find('li').get();
                    for (var i = 0; i < all_tweets.length; i++) {
                        if ($($('#stream-items-id').find('li').get()[i]).find('.tweet-timestamp').attr('href') == response.uid) {
                            $(all_tweets[i]).addClass('blurred-tweet');
                            // $($(all_tweets[i]).find('.original-tweet')).append('<div class="shades-overlay"><h1>This tweet may contain spoilers for <b/>Breaking Bad</b></h1></div>').addClass('shades-overlay');
                            // $('body').append('<div class="shades-overlay"><h1>This tweet may contain spoilers for <b/>Breaking Bad</b></h1></div>').addClass('shades-overlay').css('top', pos.top + 'px');
                        }
                        
                    }
                }
            })
        }
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