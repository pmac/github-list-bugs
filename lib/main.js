var data = require("self").data;
var pageMod = require("page-mod");

pageMod.PageMod({
    attachTo: ['existing', 'top'],
    contentScriptWhen: 'ready',
    include: /https:\/\/github\.com\/.+\/.+\/compare\/.+/,
    contentScriptFile: [data.url("jquery-2.0.0.min.js"),
                        data.url("contentscript.js")]
});
