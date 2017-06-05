/**
 * Created by greg on 17-6-1.
 */
var recordTable = document.querySelector('#J_home-record-container table tbody');
var data = recordTable.innerHTML;
chrome.runtime.sendMessage({
    aim: 'sendData',
    data:data
},function (response) {
    console.log(response.info);
});
// chrome.alarms.reate('refresh',1);
// chrome.alarms.onAlarm.addListener(function () {
//     chrome.tabs.update({
//         "url": chrome.tabs.url,
//         active: false
//     })
// });

window.setTimeout(function () {
    // chrome.tabs.update({
    //     "url": chrome.tabs.url,
    //     active: false
    // })
    location.reload();
},60000);




//4test
console.log(compareData(recordTable,false));


function compareData(newOne,oldOne) {
    var newId = [];
    var oldId = [];
    // $(newOne).find("a#J-tradeNo-1").attr('title');//td.name a.J-tradeNo-copy.J-tradeNo
    $(newOne).find("td.name a.J-tradeNo-copy.J-tradeNo").each(function (i, ele) {
        newId[i] = $(ele).attr('title');
    });
    if (oldOne){
        $(oldId).find("td.name a.J-tradeNo-copy.J-tradeNo").each(function (i, ele) {
            newId[i] = $(ele).attr('title');
        });
        for(i=0 ,count = 0;i < newId.length;i++){
            if (newId[i] != oldId[i]){
                count++;
            }else {
                break;
            }
        }
    }else {
        count = newId.length;
    }
    return count;
}
