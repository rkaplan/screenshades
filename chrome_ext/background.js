// the unique id for each extension installation:
var SERVER_URL = 'https://screenshades.herokuapp.com/';
var USER_ID = 'thisisrussellimhardcoded';

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
        success: function(response) {
            console.log('HOLY SHIT IT WORKED');
            console.log(response);
        }
    });
}

console.log('we should be listening soon!')

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.message == 'EPISODE_LOAD') {
            console.log('I GOT YO MESSAGE, CONTENT')
            trackEpisodeView(request.netflixId);
        }   
    });

checkInstalled();