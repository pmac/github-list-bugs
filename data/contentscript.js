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
        $bugsList.find('a').each(function(){
            window.open(this.href);
        });
    });
