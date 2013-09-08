// function makeShowBox($showDiv) {
//  $.extend($showDiv, {
        
//  });
// }
var SERVER_URL = 'https://screenshades.herokuapp.com/';
var USER_ID = 'thisisrussellimhardcoded';

$(document).ready(function() {

    //////////////////// NAVIGATION /////////////////////

    // prepare the horizontal sliding up content:
    var scrollContent = $('.boxes');
    var boxSize = $('.boxes .box-1').width();
    scrollContent.width(boxSize * scrollContent.children().length + 100);

    function scroll(amount, absolute) {
        scrollContent.css('left', 
            (absolute ? 0 : parseInt(scrollContent.css('left'))) + 
            (-1 * boxSize * amount) + 'px');
    }

    function signupUser(email, password) {
        console.log('about to sign someone up with email ' + email + ' and pass ' + password);
        $.ajax({
            type: 'POST',
            url: SERVER_URL + 'signup',
            data: {
                email: email,
                password: password,
                deviceId: USER_ID
            },
            success: function(response) {
                console.log('SIGNUP WORKED!');
                console.log(response);
                scroll(1);
            }
        })
    }

    // transition hooks:
    $('.email-signup').click(function(e) {
        if($('#signupEmail').val() == '' || $('#signupPassword').val() == '')
            return;

        signupUser($('#signupEmail').val(), $('#signupPassword').val());
    });
    $('.next-button').click(function(e) {
        scroll(1);
    });
    $('.circular-button-1').click(function(e) {
        scroll(1, true);
    });
    $('.circular-button-2').click(function(e) {
        scroll(2, true);
    });
    $('.circular-button-3').click(function(e) {
        scroll(3, true);
    });


    //////////////////// SHOW SELECTION /////////////////////

    // search hook:
    var searchBox = $('#search-shows');
    searchBox.keyup(function(e) {
        if(e.keyCode === 13) { // return key
            searchBox.blur();
        }
        else {
            var searchText = searchBox.val();
            filterShows(searchText);
        }
    })

    var addedShows = [];

    function filterShows(text) {
        console.log('filtering by ' + text);

        var shows = $('.available-shows .tv-show');
        shows.each(function(index) {
            var el = $(this);
            var title = el.find('.show-title')[0].innerText;
            if(title.toLowerCase().indexOf(text.toLowerCase()) === -1) {
                el.hide();
            }
            else {
                el.show();
            }
        });
    }

    function addShow(show) {
        $('.my-shows').append(show);
        // console.log(show.find('.show-action'));
        show.find('.show-action')[0].innerText = 'REMOVE';
        show.unbind('click');
        show.click(function(e) {
            removeShow($(this));
        });
        addedShows.push(show);

        searchBox.val('');
        searchBox.keyup()
        // console.log('addedShows is now:');
        // console.log(addedShows);
    }

    function removeShow(show) {
        $('.available-shows').append(show);
        console.log(show.find('.show-action'));
        show.find('.show-action')[0].innerText = 'ADD';
        show.unbind('click');
        show.click(function(e) {
            addShow($(this));
        });
        
        console.log('removing show from array. array is currently:')
        console.log(addedShows);
        for(var i = 0; i < addedShows.length; i++) {
            if(addedShows[i] === show) {
                addedShows.splice(i, 1);
                break;
            }
        }
        console.log('array is now:');
        console.log(addedShows);
    }

    // add-show hooks:
    var showBoxes = $('.available-shows .tv-show');
    showBoxes.click(function(e) {
        addShow($(this));
    });

    // search bar dropdown:
    /*
    $('#search-shows').typeahead([
    {
        name: 'Click here to search for TV shows to add',
        local: [
            "Mercury", 
            "Venus", 
            "Earth", 
            "Mars", 
            "Jupiter", 
            "Saturn", 
            "Uranus", 
            "Neptune"
        ]
    }
    ]);
    */
})

