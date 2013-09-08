function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
};

// the unique id for each extension installation:
var SERVER_URL = 'https://screenshades.herokuapp.com/';
var USER_ID = chrome.i18n.getMessage('@@extension_id');

function checkInstalled() {
    if(localStorage.getItem('install_time'))
        return;

    var now = new Date().getTime();
    localStorage.setItem('install_time', now);
    chrome.tabs.create({url: 'welcome.html'});
}

function trackEpisodeView(netflixId) {
    var data = {
        userId: USER_ID,
        netflixId: netflixId
    };

    $.ajax({
        type: 'POST',
        url: SERVER_URL + 'u/show',
        data: data,
        headers: {'X-SHADES-AUTH': USER_ID},
        onSuccess: function(response) {
            console.log('HOLY SHIT IT WORKED');
            console.log(response);
        }
    });
}

console.log('we should be listening soon!')

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message == 'EPISODE_LOAD') {
            console.log('I GOT YO MESSAGE, CONTENT')
            trackEpisodeView(request.netflixId);
        }   
        if (request.message == 'UNPROCESSED_TWEET') {
            console.log(request.uid);

            if (request.twitterHandle == 'thejaymoon' || request.twitterHandle == 'russelljkaplan' || request.twitterHandle == 'imjaredz') {
                if ((function(str, suffix) {return str.indexOf(suffix, str.length - suffix.length) !== -1;})(request.body, '!')) {
                     sendResponse({blur_tweet : true, uid : request.uid});
                }
            }
            // else {
            //     if (request.uid == '/JoeSchm36591640/status/376699976128012288') {
            //         console.log('sent');
            //         sendResponse({blur_tweet : true, uid : request.uid});
            //     }
            // }   
        }
    });

checkInstalled();