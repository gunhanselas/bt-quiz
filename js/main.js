shuffle = (array) => array.sort(() => Math.random() - 0.5);

const quizer = (cID,qType) => {
   let d = data.filter(d => d.classID === cID)[0];
   
   let totalQA = 20;
   let midtermQA = (totalQA * 0.4); // Vize'den %40 gelmesi lazım. Toplam sorusayısı * 0.4.
   let finalQA = (totalQA * 0.6);
   let midtermQuestions = [] ;
   let finalQuestions = [] ;
   let ourQuiz=[];
   if(qType === "midTerm") {
       while (ourQuiz.length < totalQA) {
        let randomUnit = Math.floor(Math.random() * d.totalUnits / 2) +1;
        let randomQuestion = Math.floor(Math.random() * d.units[randomUnit-1].totalQuestion) + 1 ;
        
        if(!JSON.stringify(ourQuiz).includes(JSON.stringify([randomUnit, randomQuestion])))
        {
            ourQuiz.push([randomUnit, randomQuestion]);
        }
        
        
       
}
ourQuiz =  shuffle(ourQuiz);
   }
else if(qType === "final") {
    while(  ourQuiz.length < totalQA  ){
        let randomUnit;
        if(ourQuiz.length  < midtermQA ) {
         randomUnit = Math.floor(Math.random() * d.totalUnits / 2) +1;
        }
        else{
             randomUnit = Math.floor(Math.random() * d.totalUnits / 2) + (d.totalUnits / 2) + 1;
        } 
            let randomQuestion = Math.floor(Math.random() * d.units[randomUnit - 1].totalQuestion) + 1 ;
            if(!JSON.stringify(ourQuiz).includes(JSON.stringify([randomUnit, randomQuestion]))){ourQuiz.push([randomUnit, randomQuestion])}
            
           
            
            


    }
    ourQuiz =  shuffle(ourQuiz);
}

    ourQuiz.forEach(function(e,qqn) {
         d.questions.filter(function(q) {
             
             if(q.unitNumber === e[0] && q.number === e[1]){
                
                let questionTemplate = `<div class="col-md-6 mb-2">
                <div class="card">
                    <div class="card-header">
                        <h5><cite title="Ünite ${q.unitNumber} ${d.units[q.unitNumber-1].uName} ${q.number}. soru ">${qqn + 1}</cite>) ${q.text}</h5>
                      </div>
                      <div class="card-body">
                          <form class="form">`;
                q.answers.forEach(function(a, ia) {

                    
                    questionTemplate += `<div class="inputGroup">
                    <input class="d-none" id="radio${e[0]}-${e[1]}-${ia}" name="${qqn + 1}" type="radio" value="${a[2]}"/>
                    <label  for="radio${e[0]}-${e[1]}-${ia}">${a[0]}</label>
                </div>`;
                    
                });
                questionTemplate +=` </form>   
                                       
                </div>
                <div class="card-footer text-muted">
                Ünite ${q.unitNumber} ${d.units[q.unitNumber-1].uName} ${q.number}. soru
              </div>  
          </div>
          
        </div>`;
        $(".row").append(questionTemplate);
        
             }
             
             
         });
         
    });
    
    $("#quizerSelf").append(`<button type="button" class="btn btn-dark btn-lg btn-block" onclick="calculate()">Bitir!</button><br>`);

}
data.forEach(e => {
    
    $("#class").append('<option value="'+e.classID+'">'+ e.className + '</option>');
          
});
function start() {
      let seri = $("#quizerForm").serializeArray();
      $("#quizerSelf").html("");
      $("#quizerSelf").html(`<div class="row"></div>`);

      quizer(seri[0].value,seri[1].value);
          
          
      
          };
function calculate() {
    let sAnswers = $(".form").serializeArray();
    let totalQA = $(".card").length;
    let i = 0;
        while(sAnswers.length < totalQA) {
            if(!sAnswers[i]){sAnswers[i] = {name:(i+1).toString(), value:"noAnswer"};}
                if(!(parseInt(sAnswers[i].name) === i + 1)) { 
                sAnswers.splice(i,0,{name:(i+1).toString(),value:"noAnswer"});
                }
                i++
        }
        let correctLength = sAnswers.filter(el => el.value === "true").length;
        let wrongLength = sAnswers.filter(el => el.value === "false").length;
        let noAnswerLength = totalQA - (correctLength + wrongLength);
        let totalScore = correctLength - (wrongLength/4);

        $(".row").prepend(`${totalQA} soruda ${correctLength} doğru ${wrongLength} yanlış ${noAnswerLength} boş. Toplam puanın ${totalScore}. </br>`);
        sAnswers.forEach(function(el,index){
            console.log(el);
            if(el.value === "true") {
            $(".card").eq(index).addClass("border-success");
            $(".card-footer").eq(index).addClass("bg-success text-white");   $(".card-footer").eq(index).removeClass("text-muted");
            let checkedInput = $("input:checked");
            let radioID = $(".card").eq(index).find(checkedInput).attr("id");
            $("label[for='"+ radioID +"']").addClass("bg-success");
            }
            else if (el.value === "false") {
                $(".card").eq(index).addClass("border-danger");
                $(".card-footer").eq(index).addClass("bg-danger text-white");   $(".card-footer").eq(index).removeClass("text-muted");
                let checkedInput = $("input:checked");
                let correctAnswerRadioID = $("input[value='true']").eq(index).attr("id");
                let radioID = $(".card").eq(index).find(checkedInput).attr("id");
                $("label[for='"+ radioID +"']").addClass("bg-danger");
                $("label[for='"+ correctAnswerRadioID +"']").addClass("bg-success text-white");
            }
            else {
                $(".card").eq(index).addClass("border-warning");
                let correctAnswerRadioID = $("input[value='true']").eq(index).attr("id");
                $("label[for='"+ correctAnswerRadioID +"']").addClass("bg-success text-white");
                $(".card-footer").eq(index).addClass("bg-warning text-white");   $(".card-footer").eq(index).removeClass("text-muted");
            }

        });
        

     
}