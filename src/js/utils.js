export const $ = {};
$.loadJSON = function (url, callback) {
    const request = new XMLHttpRequest();
    request.overrideMimeType('application/json');

    request.onload = function () {
        if (request.status === 200) {
            callback(JSON.parse(request.responseText));
        }
    };

    request.open('get', url, true);
    request.send();
};
