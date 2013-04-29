"use strict";


var bugRe = /\bbug (\d+)\b/i;
var bugURL = 'https://bugzilla.mozilla.org/show_bug.cgi?id=';


function getBugIds() {
    let bugIds = [];
    $('a.message, div.commit-desc pre').each(function(){
        let match = bugRe.exec(this.textContent);
        if (match) {
            let bugId = match[1];
            if (bugIds.indexOf(bugId) === -1) {
                bugIds.push(bugId);
            }
        }
    });

    return bugIds;
}


function getBugLinks(){
    let bugIds = getBugIds();

    return bugIds.map(function(k){
        return '<a href="' + bugURL + k + '" target="_blank" class="bugzilla_link">' + k + '</a>';
    });
}


var $bugsList = $([
        '<p class="explain">Bugs in commits ',
        '(<a href="#" id="open_all_bugzilla_links">open all</a>): ',
        getBugLinks().join(', '),
        '</p>'
    ].join('')).insertBefore('#commits_bucket .boxed-group:first');


$('#open_all_bugzilla_links').on('click', function(e){
    e.preventDefault();
    $bugsList.find('a.bugzilla_link').each(function(){
        window.open(this.href);
    });
});
