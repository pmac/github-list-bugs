'use strict';

var data = require("self").data;
var pageMod = require("page-mod");

pageMod.PageMod({
    attachTo: ['existing', 'top'],
    contentScriptWhen: 'ready',
    include: new RegExp('^https://github\.com/.+/.+/compare/.+'),
    contentScriptFile: data.url("list-bugs.js")
});
