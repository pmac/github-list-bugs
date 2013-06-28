"use strict";


var bugRe = /\b(ticket|bug|tracker item|issue)s?:? *([\d ,\+&#and]+)\b/i;
var bugURL = 'https://bugzil.la/';


function getBugIds() {
    let bugIds = [];
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


function getBugLinks(){
    let bugIds = getBugIds();

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
    var bugsListContainer = document.createElement('p');
    bugsListContainer.className = 'subtext';
    bugsListContainer.appendChild(document.createTextNode('Bugs in commits ('));

    var openAll = document.createElement('a');
    openAll.href = '#';
    openAll.id = 'open_all_bugzilla_links';
    openAll.appendChild(document.createTextNode('open all'));
    openAll.addEventListener('click', function(e){
        e.preventDefault();
        var elements = this.parentNode.getElementsByClassName('bugzilla_link')
        Array.prototype.forEach.call(elements, function(el){
            window.open(el.href);
        });
    }, false);
    bugsListContainer.appendChild(openAll);
    bugsListContainer.appendChild(document.createTextNode('): '));

    var separator = document.createTextNode(', ');
    getBugLinks().forEach(function(bugLink, i){
        if (i > 0) {
            bugsListContainer.appendChild(separator.cloneNode(false));
        }
        bugsListContainer.appendChild(bugLink);
    });

    return bugsListContainer;
}


var parentElement = document.getElementById('js-repo-pjax-container');
var insertBeforeEl = document.getElementById('commits_bucket');
parentElement.insertBefore(createBugsList(), insertBeforeEl);
