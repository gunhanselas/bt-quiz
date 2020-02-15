
// let questionsData = buraya datayı koy;

let data = 
{
    "classID": null,
    "className":null,
    "totalUnits":null,
        "units": [],
    "questions": questionsData
};
data.classID = data.questions[0].classID;
data.className = data.questions[0].className;


let uniqs = [[],[],[]];

    
     data.questions.forEach(element => {
         delete element.classID; delete element.className;
        if(uniqs[0].includes(element.unitNumber) ) { 
            
        }
        else {
            
            uniqs[0].push(element.unitNumber);
            uniqs[1].push(element.unitName);
            

        }
        delete element.unitName; 
     });
     data.totalUnits = uniqs[0].length; 
    
uniqs[0].forEach(element => { 
    data.units.push({uNumber: element, uName: uniqs[1][element-1], totalQuestion: data.questions
    .filter(q => q.unitNumber === element).length});
    
    
});

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

let jsonData = JSON.stringify(data);
tct(jsonData);
