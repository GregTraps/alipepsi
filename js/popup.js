chrome.runtime.sendMessage({
    aim: 'requestData'
},function (response) {
    $("#recordTable").append(response.data);
});