function r(u,w) {
    let f1;let f2;let l1;let l2;let res= [];
    if (u == 1) {
        f1 = "";
        f2 = "";
        l1 = "}]";
        l2 = "},";
    }
    else if (u == 14) {
        f1 = "[{";
        f2= "{";
        l1 = "";
        l2= "";
    }
    else {
        f1 = "[{";
        f2 = "{";
        l1 = "}]";
        l2 = "},";
    }
    res = (w == 0 ? [f1,f2] : [l1,l2]);
    return res;
  
}
function tct (d) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.focus();
    document.execCommand("paste");
    dummy.value += d;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}
const toDataURL = async url => fetch(url)
  .then(response => response.blob())
  .then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  }));
async function b64(url) {
  try {
    return await toDataURL(url);
  } catch(err) {
    console.log(err);
  }
}
let questionsJson;
let questions = [];
let qImgs = [];
let aImgs = [];
$("#bitirButton").trigger("click");
let reg = /^[0-9]{1,2}./g;
let unitNumber = parseInt($(".container.editable > h1").text().trim().match(reg).toString().slice(0,-1));
let unitName = $(".panel-group .panel-heading h4").eq(unitNumber -1).text().replace(/([0-9]{1,2}).\s?/g,"");
let urlRegex = /(?:\/)([a-z_\d{0,2}]+)(?:\/\d+\/)/gm; let thisUrl = window.location.href; let classID = urlRegex.exec(thisUrl)[1];


$(".swiper-wrapper > .swiper-slide").each(function(index)
{ 
    let question = {classID: classID,className: $("#dersinAdi").text(), unitNumber: unitNumber,unitName: unitName, number: (index + 1), text: String,qImage: String,  answers: Array };
    let qAnswers = [];
    if($(".question", this).find("img").length === 0){
        question.text = $(".question p", this).text();
        
    }
    else {
        let imgUrl = $(".question img", this).attr("src").replace("../","https://auzefalmsstorage.blob.core.windows.net/auzefcontent/19_20_Guz/"+ className +"/");
        question.text = $(".question p", this).text();
        b64(imgUrl).then(data => {
            qImgs.push([data,question.number]);
        });
        
        
    }
        $("li" , this).each(function(i){
            if($("label" , this).find("img").length === 0){
            qAnswers.push ($(this).hasClass("dogru") ? [$("label p",this).text().trim(),null,true] : [$("label p",this).text().trim(),null,false]);  
            }
            else {
               
               let imgUrl = $("label img", this).attr("src").replace("../","https://auzefalmsstorage.blob.core.windows.net/auzefcontent/19_20_Guz/"+ className +"/");
               b64(imgUrl).then(data => {
                qAnswers.push ($(this).hasClass("dogru") ? [$("label p",this).text().trim(),data,true] : [$("label p",this).text().trim(),data,false]);
            });
                
                
            }
        });
        
        
    question.answers = qAnswers;
    questions.push(question);
}); 

setTimeout(() => {
    qImgs.map(arr => { 
    questions.filter(q => {
        if(q.number === arr[1]){
            q.qImage = arr[0];
        }
    });        
    }  );
    questionsJson = JSON.stringify(questions);
    questionsJson = questionsJson.replace(r(unitNumber,0)[0],r(unitNumber,0)[1]).replace(r(unitNumber,1)[0],r(unitNumber,1)[1]);
    tct(questionsJson);
    window.open("https://auzefalmsstorage.blob.core.windows.net/auzefcontent/19_20_Guz/"+ classID+"/"+ (unitNumber + 1) +"/index.html#konu-1","_blank");window.setTimeout(function(){this.close();},1000);

}, 500);