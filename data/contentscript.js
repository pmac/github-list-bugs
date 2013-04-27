"use strict";


var bugRe = /\bbug (\d+)\b/i;
var bugURL = 'https://bugzilla.mozilla.org/show_bug.cgi?id=';


function getBugLinks() {
    var bugIds = [];
    $('a.message, div.commit-desc pre').each(function(){
        var $el = $(this);
        var match = bugRe.exec($el.text());
        if (match) {
            bugIds.push(match[1]);
        }
    });

    // uniquify bugs
    // via http://paulirish.com/2010/duck-punching-with-jquery/
    bugIds = $.grep(bugIds, function(v, k){
        return $.inArray(v, bugIds) === k;
    });

    return $.map(bugIds, function(k){
        return '<a href="' + bugURL + k + '" target="_blank" class="bugzilla-link">' + k + '</a>';
    });
}


var $bugsList = $([
    '<p class="explain" id="bugzilla-links">Bugs in commits: ',
    getBugLinks().join(', '),
    '</p>'
].join('')).insertBefore('#commits_bucket .boxed-group:first');

$('<p class="explain"><a href="#">Open all in tabs</a></p>')
    .insertAfter($bugsList)
    .find('a').on('click', function(e){
        e.preventDefault();
        $('#bugzilla-links a').each(function(){
            window.open($(this).attr('href'));
        });
    });
