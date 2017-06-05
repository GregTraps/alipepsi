chrome.runtime.sendMessage({
    aim: 'requestData'
},function (response) {
    $("#recordTable > tbody").append(response.data);
    $('#recordTable tbody tr:nth-child(odd)').css("background-color","lightgrey").next().css("background-color","lightblue");
    $('td.detail a.record-icon.icon-detail.icon-detail-trigger').html('<img src="images/icon.png" alt="detail">').attr("target","_blank");
});