//
/**
 * Created by greg on 17-6-1.
 */
chrome.runtime.onMessage.addListener(function (request, sender, sendRes) {
    var recordTable = sessionStorage.getItem('data')?sessionStorage.getItem('data'):false;//读取上次账单记录
    if (sender.tab && request.aim == 'sendData'){
        // console.log("sender.tab.id:"+sender.tab.id);
        // console.log(sender);
        var newRecordsNumber = compareData(request.data,recordTable);//对比新数据,返回新交易记录或null
        // console.log(newRecordsNumber);
        sendRes({info : "session data :"+newRecordsNumber});
        if (newRecordsNumber){
            //popup 添加table
            sessionStorage.setItem('data', request.data);
            var messageData = createNotiData(newRecordsNumber,request.data);
            var popData = {
                aim : 'popup',
                opt : {
                    type: "list",
                    title: "新的交易",
                    message: "交易详情",
                    iconUrl: "url_to_small_icon",
                    items: messageData
                }
            };
            sendRes({info : "recieved"});
            // chrome.runtime.sendMessage(popData);
            chrome.notifications.create(popData.opt); //发送桌面通知
        }
        sendRes({info : "recieved"});
    }
    if (request.aim == 'requestData'){
        // var recordTable = sessionStorage.getItem('recordTable')?sessionStorage.getItem('recordTable'):'';
        sendRes({
            data:recordTable
        });
    }
});
//检查对比是否有新数据
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

//整理出新的记录发送内容
function createNotiData(numb, data) {
    var res = [];
    for(i=0;i<numb;i++){
        var content = {};
        var currentTr = $(data).find('tr.J-item').eq(i);
        content.title = currentTr.find('td.name p.consume-title a').text();
        content.message = currentTr.find('td.amount span.amount-pay').text();
        res.push(content);
    }
    return res;
}
