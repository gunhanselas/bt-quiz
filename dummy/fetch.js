let questions = [];
$("#bitirButton").trigger("click");
let reg = /^[0-9]{1,2}./g;
let unitNumber = parseInt($(".container.editable > h1").text().trim().match(reg).toString().slice(0,-1));
let urlRegex = /(?:\/)([a-z_\d{0,2}]+)(?:\/\d+\/)/gm; let thisUrl = window.location.href; let className = urlRegex.exec(thisUrl)[1];
let promises = $(".swiper-wrapper > .swiper-slide").map(function(index,element) {
    let question = {className: String, unitNumber: Number, number: Number, text: String, image: String,  answers: Array };
    let qAnswers = [];
    question.className = className;
    question.unitNumber = unitNumber;
    question.number = (index + 1);
    if($(".question", this).find("img").length === 0){
        question.text = $(".question p", this).text();
        
    }
    else {

        let imgUrl = $(".question img", this).attr("src").replace("../","https://auzefalmsstorage.blob.core.windows.net/auzefcontent/19_20_Guz/"+ className +"/");
        question.text = $(".question p", this).text();

        $.when(toDataUrl(imgUrl)).then(function(data){
            question.image = data;
            console.log(data);
            
        })
    }
    $("li" , this).each(function(i){
        qAnswers.push ($(this).hasClass("dogru") ? [$(this).text(),true] : [$(this).text(),false]);
    });
    
    
question.answers = qAnswers;
questions.push(question);
    
});

/*
$(".swiper-wrapper > .swiper-slide").each(function(index)
{ 
    let question = {className: String, unitNumber: Number, number: Number, text: String, image: String,  answers: Array };
    let qAnswers = [];
    question.className = className;
    question.unitNumber = unitNumber;
    question.number = (index + 1);
    if($(".question", this).find("img").length === 0){
        question.text = $(".question p", this).text();
        
    }
    else {

        let imgUrl = $(".question img", this).attr("src").replace("../","https://auzefalmsstorage.blob.core.windows.net/auzefcontent/19_20_Guz/"+ className +"/");
        question.text = $(".question p", this).text();

        question.image =toDataUrl(imgUrl);


    }
        $("li" , this).each(function(i){
            qAnswers.push ($(this).hasClass("dogru") ? [$(this).text(),true] : [$(this).text(),false]);
        });
        
        
    question.answers = qAnswers;
    questions.push(question);
});
*/
let questionsJson = JSON.stringify(questions);

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
    

questionsJson = questionsJson.replace(r(unitNumber,0)[0],r(unitNumber,0)[1]).replace(r(unitNumber,1)[0],r(unitNumber,1)[1]);
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
tct(questionsJson);

//window.open("https://auzefalmsstorage.blob.core.windows.net/auzefcontent/19_20_Guz/"+ className +"/"+ (unitNumber + 1) +"/index.html#konu-1","_blank");window.setTimeout(function(){this.close();},1000)

function toDataUrl(url) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            var reader = new FileReader();
            reader.onloadend = function () {
                resolve(reader.result);
            };
            reader.readAsDataURL(xhr.response);
        };
        xhr.onerror = reject;
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    });
}