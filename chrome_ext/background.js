// the unique id for each extension installation:
var USER_ID = chrome.i18n.getMessage("@@extension_id");

function trackEpisodeView(netflix_id) {
	// sent it to the backend
}

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if(request.message == "EPISODE_LOAD") {
			trackEpisodeView(request.netflix_id);
		}	
	});