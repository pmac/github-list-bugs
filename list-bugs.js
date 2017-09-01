"use strict";

var bugRe = /\b(ticket|bug|tracker item|issue)s?:? *([\d ,\+&#and]+)\b/i;
var bugURL = 'https://bugzilla.mozilla.org/show_bug.cgi?id=';
var bugListURL = 'https://bugzilla.mozilla.org/buglist.cgi?bug_id=';


function getBugIds() {
    var bugIds = [];
    let elements = document.querySelectorAll('a.message, div.commit-desc pre');
    Array.prototype.forEach.call(elements, function(el){
        let match = bugRe.exec(el.textContent);
        if (match) {
            match[2].split(/\D+/).forEach(function(bugId){
                if (bugId && bugIds.indexOf(bugId) === -1) {
                    bugIds.push(bugId);
                }
            })
        }
    });
    return bugIds;
}


function getBugLinks(bugIds){
    return bugIds.map(function(k){
        let bugLink = document.createElement('a');
        bugLink.href = bugURL + k;
        bugLink.target = '_blank';
        bugLink.className = 'bugzilla_link';
        bugLink.appendChild(document.createTextNode(k));
        return bugLink;
    });
}


function createBugsList(){
    var bugIds = getBugIds();
    var bugsListContainer = document.createElement('p');
    bugsListContainer.className = 'subtext';
    bugsListContainer.appendChild(document.createTextNode('Bugs in commits ('));

    var openAll = document.createElement('a');
    openAll.href = bugListURL + bugIds.join(',');
    openAll.id = 'open_all_bugzilla_links';
    openAll.target = '_blank';
    openAll.appendChild(document.createTextNode('open all'));
    bugsListContainer.appendChild(openAll);
    bugsListContainer.appendChild(document.createTextNode('): '));

    var separator = document.createTextNode(', ');
    getBugLinks(bugIds).forEach(function(bugLink, i){
        if (i > 0) {
            bugsListContainer.appendChild(separator.cloneNode(false));
        }
        bugsListContainer.appendChild(bugLink);
    });

    return bugsListContainer;
}


(function addBugListToPage() {
    var insertBeforeEl = document.getElementById('commits_bucket');
    var parentElement = insertBeforeEl.parentElement;
    parentElement.insertBefore(createBugsList(), insertBeforeEl);
})();