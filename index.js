

// global array which contain the objects od data;
var upvoteid=1;
var downvoteid=100;
let dataArray=[];


// creating setInterval to set the timer in the question
setInterval(function(){
    // console.log('a');
let Time=document.getElementById('question-container');
if(dataArray.length>0){
for(let i=0;i<dataArray.length;i++)
{
    // console.log('b');
    for(let j=0;j<Time.children.length;j++)
    {
        // console.log(Time.children.length);
        if(dataArray[i].id==Time.children[j].id)
        {
            let minute=Math.floor(((Date.now()-Time.children[j].id)/1000)/60);
            let second=Math.floor(((Date.now()-Time.children[j].id)/1000)%60);
            // console.log('inside');
            Time.children[j].children[3].innerHTML=`${String(minute).padStart(2,'0')} min : ${String(second).padStart(2,'0')} sec ago`
        }
    }
}
}},1000)





// // page after refreshing


if(localStorage.getItem('discussionApp')){
    dataArray=JSON.parse(localStorage.getItem('discussionApp'));
    let questionContainingDiv=document.getElementById('question-container');
    console.log(dataArray.length);
for(let i=0;i<dataArray.length;i++)
{
    let dataobj={};
             dataobj.id=dataArray[i].id;
            dataobj.questionSubject=dataArray[i].questionSubject;
            dataobj.questionAsked=dataArray[i].questionAsked;
            dataobj.responses=dataArray[i].responses;
            dataobj.checked=dataArray[i].checked;
            dataobj.upvote=dataArray[i].upvote;
            dataobj.downvote=dataArray[i].downvote;
            dataobj.totalvote=dataArray[i].totalvote;

    let newElement=document.createElement('div');
    newElement.setAttribute('id',dataArray[i].id);
    let k=dataobj.id;
    newElement.innerHTML=`<i class="bi bi-star" id="${k}" sign="uncheck"></i> <h4>${dataArray[i].questionSubject}</h4> <p>${dataArray[i].questionAsked}</p> <span></span> <i class="bi bi-hand-thumbs-up">${dataobj.upvote}</i> <i class="bi bi-hand-thumbs-down">${dataobj.downvote}</i> <hr>`;
    questionContainingDiv.appendChild(newElement);
    //  adding back the dataArray to the localStorage
    localStorage.setItem('discussionApp',JSON.stringify(dataArray));
    
    // adding functionality for the upvote and downvote  
    let upvote=newElement.querySelector('.bi-hand-thumbs-up');
    let downvote=newElement.querySelector('.bi-hand-thumbs-down');
    upvote.addEventListener('click',function(event){
        event.stopPropagation();
        dataArray[i].upvote++;
        dataobj.upvote++;
        dataobj.totalvote=dataobj.upvote-dataobj.downvote;
        dataArray[i].totalvote=dataArray[i].upvote-dataArray[i].downvote;
        let c=newElement.querySelector('.bi-hand-thumbs-up');
          c.textContent=`${dataArray[i].upvote}`;
        // // sort the data Array
        // dataArray.sort(function(a,b){
        //     return b.totalvote-a.totalvote;
        // });
        localStorage.setItem('discussionApp',JSON.stringify(dataArray));
        // traversing the question containing div
        let childy=questionContainingDiv.children;
       
        for(let i=0;i<childy.length;i++)
        {
           
            if(childy[i].children[0] && childy[i].children[0].style.color!='red')
            {
                // update index j
                // console.log('hello');
               for(let j=0;j<dataArray.length;j++)
               {
                let value=childy[i].getAttribute('id');
                if(dataArray[j].id==value)
                {
                    if(dataArray[j].totalvote<=dataobj.totalvote)
                    {
                        console.log('working');
                        questionContainingDiv.insertBefore(newElement,childy[i]);
                        j=dataArray.length;
                        i=childy.length;
                    }
                }
               }
            }
        }
        
        localStorage.setItem('discussionApp',JSON.stringify(dataArray));
    });

        // creating functioning for the down vote
        downvote.addEventListener('click',function(event){
            event.stopPropagation();
            dataArray[i].downvote++;
            dataobj.downvote++;
            dataobj.totalvote=dataobj.upvote-dataobj.downvote;
            dataArray[i].totalvote=dataArray[i].upvote-dataArray[i].downvote;
            let c=newElement.querySelector('.bi-hand-thumbs-down');
              c.textContent=`${dataobj.downvote}`;
            // // sort the data Array
            // dataArray.sort(function(a,b){
            //     return b.totalvote-a.totalvote;
            // });
            localStorage.setItem('discussionApp',JSON.stringify(dataArray));
            // traversing the question containing div
            let childy=questionContainingDiv.children;
           let flag=true;
            for(let i=0;i<childy.length;i++)
            {
               
                if(childy[i].children[0] && childy[i].children[0].style.color!='red')
                {
                    let value=childy[i].getAttribute('id');
                    if(value==dataobj.id)
                    continue;
                    // update index j
                    // console.log('hello');
                   for(let j=0;j<dataArray.length;j++)
                   {
                    //  let value=childy[i].getAttribute('id');
                    if(dataArray[j].id==value)
                    {
                        if(dataArray[j].totalvote<=dataobj.totalvote)
                        {
                            questionContainingDiv.insertBefore(newElement,childy[i]);
                            j=dataArray.length;
                            i=childy.length;
                            flag=false;
                        }
                    }
                   }
                }
            }
            if(flag==true)
            {
                questionContainingDiv.appendChild(newElement);
            }
            
            localStorage.setItem('discussionApp',JSON.stringify(dataArray));
        }); 

           //  creating functioning for the favorite button;
           let favoriteBtn=newElement.firstElementChild;
                
           favoriteBtn.addEventListener('click',function(event){
             event.stopPropagation();
           //    dataArray=JSON.parse(localStorage.getItem('discussionApp'));
           for(let i=0;i<dataArray.length;i++)
              {
                if(dataArray[i].id===dataobj.id){
           //    let element1=newElement;
           //    let element2=newElement;
              console.log("inside the favorite");
              let element=newElement.querySelector('.bi-star');
                      if(dataArray[i].checked==="false")
                      {   
                          dataArray[i].checked="true";
                       
                       //removing the existing node and adding new node at the top of the parent element
                       //   element1.innerHTML=`<i class="bi bi-star" id="${k}" checked="true"></i> <h4>${dataArray[i].questionSubject}</h4> <p>${dataArray[i].questionAsked}</p> <hr>`;
                       //   element1.firstElementChild.style.color='red';
                       //   element2.remove();
                            element.style.color='red';
                            element.sign="check";
                         let firstChild=questionContainingDiv.firstChild;
                         questionContainingDiv.insertBefore(newElement,firstChild);

                          localStorage.setItem('discussionApp',JSON.stringify(dataArray));

                      }
                      else if(dataArray[i].checked==="true"){
                          dataArray[i].checked="false";
                       //    console.log("element is pressed when checked is True");
                       // removing the existing node and insert it in the last to decrese its importance
                       //    element1.innerHTML=`<i class="bi bi-star" id="${k}" checked="false"></i> <h4>${dataArray[i].questionSubject}</h4> <p>${dataArray[i].questionAsked}</p> <hr>`;
                       //    element1.firstElementChild.style.color="black";
                       //    console.log("here to ucheck");
                       //    element1.firstElementChild.style.backgroundColor="rgb(243, 237, 237)";
                       //    element2.remove();
                       //    questionContainingDiv.appendChild(element1);
                       let childy=questionContainingDiv.children;
                       element.style.color='black';
                           element.sign="uncheck";
                       let flag=false;
                       for(let i=0;i<childy.length;i++)
                       {
                          
                           if(childy[i].children[0] && childy[i].children[0].style.color!='red')
                           {
                               // update index j
                               // console.log('hello');
                              for(let j=0;j<dataArray.length;j++)
                              {
                               let value=childy[i].getAttribute('id');
                               if(dataArray[j].id==value && value!=dataobj.id)
                               {
                                   if(dataArray[j].totalvote<=dataobj.totalvote)
                                   {
                                       console.log('working');
                                       questionContainingDiv.insertBefore(newElement,childy[i]);
                                       flag=true;
                                       j=dataArray.length;
                                       i=childy.length;
                                   }
                               }
                              }
                           }
                       }
                       if(flag==false)
                       {
                           questionContainingDiv.appendChild(newElement);
                       }

                       
                    //    localStorage.setItem('discussionApp',JSON.stringify(dataArray));
                    //        element.style.color='black';
                    //        element.sign="uncheck";
                    //        questionContainingDiv.appendChild(newElement);
                          localStorage.setItem('discussionApp',JSON.stringify(dataArray));
                      }
                   }
               }
          });


     //  adding back the dataArray to the localStorage
     localStorage.setItem('discussionApp',JSON.stringify(dataArray));



     // Adding the eventlistener to the newly creted "div" on left side
     newElement.addEventListener('click',function(){
         // changing the color of the element on click
         // newElement.style.backgroundColor='rgba(13,110,253,.25)';

         parent.innerHTML=`<p>Question</p> <div id="responsive-id"><h4 >${dataobj.questionSubject}</h4> <p>${dataobj.questionAsked}</p> <button id="resolved-btn" type="submit" resolved="false">Resolve</button></div>`

         // adding all the previous responses on the clicked question

         let ele0=document.createElement('div');
         ele0.setAttribute('id','previous-responses');
         parent.appendChild(ele0);
         dataArray=JSON.parse(localStorage.getItem('discussionApp'));
         for(let i=0;i<dataArray.length;i++)
         {
             if(dataobj.id===dataArray[i].id)
             {
                 let k=dataArray[i].responses;
                 // sorting the responses array based on there upvotes and downvotes
                 k.sort(function(a,b){
                     return b.totalvotes-a.totalvotes;
                 })
                 for(let i=0;i<k.length;i++)
                 {
                     // let elementfavorite=document.createElement('i');
                     // elementfavorite.classList.add('')
                     let elementname=document.createElement('p');
                      elementname.textContent=k[i].name;
                      let elementcontent=document.createElement('h4');
                      elementcontent.textContent=k[i].content;
                       // add timestamp to response
                        let elementtime=document.createElement('p');
                        
                        let time = new Date().getTime()/1000;
                        let exactTime=Math.floor((time-k[i].timetocreate)/60);
                        elementtime.textContent=`${exactTime} min ago`;
                     //  setting upvote
                     let elementupvote=document.createElement('i');
                     elementupvote.classList.add('bi-hand-thumbs-up');
                     elementupvote.textContent=k[i].upvotes;
                     // setting downvote
                     let elementdownvote=document.createElement('i');
                     elementdownvote.classList.add('bi-hand-thumbs-down');
                     elementdownvote.textContent=k[i].downvotes;
                      let horizontalLine=document.createElement('hr');
                     //  appending the elements created above here
                      ele0.appendChild(elementname);
                      ele0.appendChild(elementcontent);
                      ele0.appendChild(elementupvote);
                      ele0.appendChild(elementdownvote);
                      ele0.appendChild(elementtime);
                     //  ele0.appendChild()
                      ele0.appendChild(horizontalLine);
                   
                     //  adding eventlistener to the upvote
                     elementupvote.addEventListener('click',function(){
                         k[i].upvotes++;
                         k[i].totalvotes=k[i].upvotes-k[i].downvotes;
                         elementupvote.textContent=k[i].upvotes;
                         localStorage.setItem('discussionApp',JSON.stringify(dataArray));
                     })

                  //  adding evenetlistener to the downvote
                       elementdownvote.addEventListener('click',function(){
                         k[i].downvotes++;
                         k[i].totalvotes=k[i].upvotes-k[i].downvotes;
                         elementdownvote.textContent=k[i].downvotes;
                         localStorage.setItem('discussionApp',JSON.stringify(dataArray));
                       })  
                      

                 }
                  
             }
         }
         
         
         localStorage.setItem('discussionApp',JSON.stringify(dataArray));

           
           let ele1=document.createElement('h3');
           ele1.setAttribute('id','add-response');
           ele1.textContent='Add Response';
           
           let ele2=document.createElement('input');
           ele2.setAttribute('id','name');
           ele2.setAttribute('type','text');
           ele2.placeholder="Enter Name";

           let ele3=document.createElement('textarea');
           ele3.setAttribute('id','answer')
         //   ele3.setAttribute('cols','35');
         //   ele3.setAttribute('rows',4);
           ele3.placeholder="Enter the comment...";

           let ele4=document.createElement('button');
           ele4.setAttribute('id','submit-response');
           ele4.setAttribute('type','button');
           ele4.textContent='Submit';

           
           parent.appendChild(ele1);
           parent.appendChild(ele2);
           parent.appendChild(ele3);
           parent.appendChild(ele4);
          

         //  making the submit button of response responsive
        ele4.addEventListener('click',function(){
         if(ele2.value.trim()!='' && ele3.value.trim()!='')
         {
             // console.log("I am inside the submit response")
             let responseobj={};
             responseobj.name=ele2.value;
             responseobj.content=ele3.value;
             responseobj.upvotes=0;
             responseobj.downvotes=0;
             responseobj.totalvotes=responseobj.upvotes+responseobj.downvotes;
             responseobj.timetocreate=new Date().getTime()/1000;
             for(let i=0;i<dataArray.length;i++)
             {
                 if(dataobj.id===dataArray[i].id)
                 {
                     dataArray[i].responses.push(responseobj);
     localStorage.setItem('discussionApp',JSON.stringify(dataArray));
                 // let localStArray=JSON.parse(localStorage.getItem('discussionApp'));
                 for(let i=0;i<dataArray.length;i++)
                 {
                     if(dataobj.id===dataArray[i].id)
                     {
                         let k=dataArray[i].responses; 
                         k.sort(function(a,b){
                             return b.totalvotes-a.totalvotes;
                         })                 
                         for(let i=0;i<k.length;i++)
                         {
                          
                         if(i===k.length-1){
                             let currentTime=new Date().getTime()/1000;
                     ele0.innerHTML+=`
                      <p>${k[i].name}</p> <h4>${k[i].content}</h4> <i class="bi bi-hand-thumbs-up" id="${upvoteid}">${k[i].upvotes}</i> <i class="bi bi-hand-thumbs-down" id="${downvoteid}">${k[i].downvotes}</i> <p>few seconds ago</p> <hr>` ;
                     //  adding eventlistener to the upvote
                        
                          let elementupvote=document.getElementById(upvoteid);
                          elementupvote.addEventListener('click',function(){
                          k[i].upvotes++;
                          k[i].totalvotes=k[i].upvotes-k[i].downvotes;
                          elementupvote.textContent=k[i].upvotes;
                          localStorage.setItem('discussionApp',JSON.stringify(dataArray));
                      });
                         // adding eventListener to the down vote 
                         let elementdownvote=document.getElementById(downvoteid);
                         elementdownvote.addEventListener('click',function(){
                             k[i].downvotes++;
                             k[i].totalvotes=k[i].upvotes-k[i].downvotes;
                             elementdownvote.textContent=k[i].downvotes;
                             localStorage.setItem('discussionApp',JSON.stringify(dataArray));
                           }); 
                           upvoteid++;
                           downvoteid++;

                                          }
                         }
                     }
                 }
                  
                 }
             }
             ele2.value='';
             ele3.value='';
         }
         // ele2.value='';
         // ele3.value='';
        })
     //  click on the resolve button of the question
     let resolveButton=document.getElementById('resolved-btn');
     resolveButton.addEventListener('click',function(){
         newElement.style.display='none';
         parent.innerHTML='';
         for(let i=0;i<dataArray.length;i++)
         {
             if(dataobj.id===dataArray[i].id)
             {
                 dataArray.splice(i,1);
                 i--;
             }
         }
         // setting the dataArray to the localStorage after deletion
         localStorage.setItem('discussionApp',JSON.stringify(dataArray));
         
         // once the resolve button is clicked right portion should have
         // question ask set up
         parent.innerHTML=`<h1>Welcome to Discussion Portal</h1>
         <p>Enter a subject and question to get started</p>
         
         <input type="text" placeholder="Subject" required>
         
         <textarea name="text" id="question-area" cols="80%" rows="5" placeholder="Question..." required></textarea>
     
         <button type="submit" class="btn btn-primary" id="question-submit-btn">Submit</button>`

         // changing the text of question form to 'Click to enter the question';
         newQuestion.innerHTML='New question form'
     })
      



});
// code for searching for the question present so far in the div
// applying eventlistener to the search box
let searchInputs=document.getElementById('search-bar');

searchInputs.addEventListener('input', function () {
    let questionList = document.getElementById('question-container');
    let searchTerms = this.value.toLowerCase();
  
    // loop through all the questions in the list
    for (let i = 0; i < questionList.children.length; i++) {
      let questionFavoriteIcon = questionList.children[i].children[0];
      let questionSubject = questionList.children[i].children[1];
      let question = questionList.children[i].children[2];
      let questionText = question.textContent.toLowerCase();
  
      if (questionText.indexOf(searchTerms) > -1) {
        // show the question
        questionFavoriteIcon.style.display = '';
        questionSubject.style.display = '';
        question.style.display = '';
        questionList.children[i].children[3].style.display = '';
        questionList.children[i].children[4].style.display = '';
        questionList.children[i].children[5].style.display = '';
        questionList.children[i].children[6].style.display = '';
  
        // highlight the searched text
        let regex = new RegExp(searchTerms, 'gi');
        let highlightedText = questionText.replace(regex, (match) => {
          return `<span class="highlight">${match}</span>`;
        });
        question.innerHTML = highlightedText;
      } else {
        // hide the question
        questionSubject.style.display = 'none';
        question.style.display = 'none';
        questionList.children[i].children[3].style.display = 'none';
        questionList.children[i].children[0].style.display = 'none';
        questionList.children[i].children[4].style.display = 'none';
        questionList.children[i].children[5].style.display = 'none';
        questionList.children[i].children[6].style.display = 'none';
      }
    }
  });



}
}




































// page without refreshing

// action when new-question-btn is pressed

// setting display of right side text to "none" until the "new question button is not clicked"

let parent=document.getElementById('right-side-text');
parent.style.display="none";
let newQuestion=document.getElementById('question-btn');
newQuestion.addEventListener('click',function(){
    // changing the text of button
    newQuestion.innerHTML='Write your Que';
    parent.style.display="block";
    
    // let dataobj={};


    // id for to set in the local storage
    let localStorageId=new Date().getTime();
    

    // get the element where we need to set the question
    // let parent=document.getElementById('right-side-text');
    parent.innerHTML=`<h1>Welcome to Discussion Portal</h1>
    <p>Enter a subject and question to get started</p>
    
    <input type="text" placeholder="Subject" required>
    
    <textarea name="text" id="question-area" cols="80%" rows="5" placeholder="Question..." required></textarea>

<button type="submit" class="btn btn-primary" id="question-submit-btn">Submit</button>   
    `
    
    // acees the submit button
    let submitBtn=document.getElementById('question-submit-btn');
    submitBtn.addEventListener('click',function(){
        if(submitBtn.previousSibling.previousSibling.previousSibling.previousSibling.value.trim()=='' || submitBtn.previousSibling.previousSibling.value.trim()=='')
        {
            alert("please fill out both the fields");
        }
        else if(submitBtn.previousSibling.previousSibling.previousSibling.previousSibling.value.trim()!='' && submitBtn.previousSibling.previousSibling.value.trim()!='')
        {
             // id for to set in the local storage
            let localStorageId=new Date().getTime();

            // local object
            let dataobj={};

            // console.log('submit button is pressed')
            dataobj.id=localStorageId;
            let qask=submitBtn.previousSibling.previousSibling.value;
            let qsub=submitBtn.previousSibling.previousSibling.previousSibling.previousSibling.value;
            // creating all the things of the dataobj
            dataobj.questionSubject=qsub;
            dataobj.questionAsked=qask;
            dataobj.responses=[];
            dataobj.checked="false";
            dataobj.upvote=0;
            dataobj.downvote=0;
            dataobj.totalvote=0;
            
            // pushing the object inside the data array;
            dataArray.push(dataobj);
            localStorage.setItem('discussionApp',JSON.stringify(dataArray));
        // clear the content inside the quesAsk and queSub
        submitBtn.previousSibling.previousSibling.value='';
        submitBtn.previousSibling.previousSibling.previousSibling.previousSibling.value='';
        // once the submit button is clicked post the question on the left

        let questionContainingDiv=document.getElementById('question-container')
        dataArray=JSON.parse(localStorage.getItem('discussionApp'));
        for(let i=0;i<dataArray.length;i++)
        {
            if(dataArray[i].id===dataobj.id){
                let newElement=document.createElement('div');
                newElement.setAttribute('id',dataobj.id);
                let k=dataobj.id;
                newElement.innerHTML=`<i class="bi bi-star" id="${k}" sign="uncheck"></i> <h4>${dataArray[i].questionSubject}</h4> <p>${dataArray[i].questionAsked}</p> <span>Few seconds ago</span> <i class="bi bi-hand-thumbs-up">${dataobj.upvote}</i> <i class="bi bi-hand-thumbs-down">${dataobj.downvote}</i> <hr>`;
                questionContainingDiv.appendChild(newElement);
                //  adding back the dataArray to the localStorage
                localStorage.setItem('discussionApp',JSON.stringify(dataArray));
                
                // adding functionality for the upvote and downvote  
                let upvote=newElement.querySelector('.bi-hand-thumbs-up');
                let downvote=newElement.querySelector('.bi-hand-thumbs-down');
                upvote.addEventListener('click',function(event){
                    event.stopPropagation();
                    dataArray[i].upvote++;
                    dataobj.upvote++;
                    dataobj.totalvote=dataobj.upvote-dataobj.downvote;
                    dataArray[i].totalvote=dataArray[i].upvote-dataArray[i].downvote;
                    let c=newElement.querySelector('.bi-hand-thumbs-up');
                      c.textContent=`${dataobj.upvote}`;
                    // // sort the data Array
                    // dataArray.sort(function(a,b){
                    //     return b.totalvote-a.totalvote;
                    // });
                    localStorage.setItem('discussionApp',JSON.stringify(dataArray));
                    // traversing the question containing div
                    let childy=questionContainingDiv.children;
                   
                    for(let i=0;i<childy.length;i++)
                    {
                       
                        if(childy[i].children[0] && childy[i].children[0].style.color!='red')
                        {
                            // update index j
                            // console.log('hello');
                           for(let j=0;j<dataArray.length;j++)
                           {
                            let value=childy[i].getAttribute('id');
                            if(dataArray[j].id==value)
                            {
                                if(dataArray[j].totalvote<=dataobj.totalvote)
                                {
                                    console.log('working');
                                    questionContainingDiv.insertBefore(newElement,childy[i]);
                                    j=dataArray.length;
                                    i=childy.length;
                                }
                            }
                           }
                        }
                    }
                    
                    localStorage.setItem('discussionApp',JSON.stringify(dataArray));
                });

                // creating functioning for the down vote
                downvote.addEventListener('click',function(event){
                    event.stopPropagation();
                    dataArray[i].downvote++;
                    dataobj.downvote++;
                    dataobj.totalvote=dataobj.upvote-dataobj.downvote;
                    dataArray[i].totalvote=dataArray[i].upvote-dataArray[i].downvote;
                    let c=newElement.querySelector('.bi-hand-thumbs-down');
                      c.textContent=`${dataobj.downvote}`;
                    // // sort the data Array
                    // dataArray.sort(function(a,b){
                    //     return b.totalvote-a.totalvote;
                    // });
                    localStorage.setItem('discussionApp',JSON.stringify(dataArray));
                    // traversing the question containing div
                    let childy=questionContainingDiv.children;
                   let flag=true;
                    for(let i=0;i<childy.length;i++)
                    {
                       
                        if(childy[i].children[0] && childy[i].children[0].style.color!='red')
                        {
                            let value=childy[i].getAttribute('id');
                            if(value==dataobj.id)
                            continue;
                            // update index j
                            // console.log('hello');
                           for(let j=0;j<dataArray.length;j++)
                           {
                            //  let value=childy[i].getAttribute('id');
                            if(dataArray[j].id==value)
                            {
                                if(dataArray[j].totalvote<=dataobj.totalvote)
                                {
                                    questionContainingDiv.insertBefore(newElement,childy[i]);
                                    j=dataArray.length;
                                    i=childy.length;
                                    flag=false;
                                }
                            }
                           }
                        }
                    }
                    if(flag==true)
                    {
                        questionContainingDiv.appendChild(newElement);
                    }
                    
                    localStorage.setItem('discussionApp',JSON.stringify(dataArray));
                }); 

         //  creating functioning for the favorite button;
                let favoriteBtn=newElement.firstElementChild;
                
                favoriteBtn.addEventListener('click',function(event){
                  event.stopPropagation();
                //    dataArray=JSON.parse(localStorage.getItem('discussionApp'));
                for(let i=0;i<dataArray.length;i++)
                   {
                     if(dataArray[i].id===dataobj.id){
                //    let element1=newElement;
                //    let element2=newElement;
                   console.log("inside the favorite");
                   let element=newElement.querySelector('.bi-star');
                           if(dataArray[i].checked==="false")
                           {   
                               dataArray[i].checked="true";
                            
                            //removing the existing node and adding new node at the top of the parent element
                            //   element1.innerHTML=`<i class="bi bi-star" id="${k}" checked="true"></i> <h4>${dataArray[i].questionSubject}</h4> <p>${dataArray[i].questionAsked}</p> <hr>`;
                            //   element1.firstElementChild.style.color='red';
                            //   element2.remove();
                                 element.style.color='red';
                                 element.sign="check";
                              let firstChild=questionContainingDiv.firstChild;
                              questionContainingDiv.insertBefore(newElement,firstChild);

                               localStorage.setItem('discussionApp',JSON.stringify(dataArray));

                           }
                           else if(dataArray[i].checked==="true"){
                               dataArray[i].checked="false";
                            //    console.log("element is pressed when checked is True");
                            // removing the existing node and insert it in the last to decrese its importance
                            //    element1.innerHTML=`<i class="bi bi-star" id="${k}" checked="false"></i> <h4>${dataArray[i].questionSubject}</h4> <p>${dataArray[i].questionAsked}</p> <hr>`;
                            //    element1.firstElementChild.style.color="black";
                            //    console.log("here to ucheck");
                            //    element1.firstElementChild.style.backgroundColor="rgb(243, 237, 237)";
                            //    element2.remove();
                            //    questionContainingDiv.appendChild(element1);
                                element.style.color='black';
                                let childy=questionContainingDiv.children;
                                let flag=false;
                                for(let i=0;i<childy.length;i++)
                                {
                                   
                                    if(childy[i].children[0] && childy[i].children[0].style.color!='red')
                                    {
                                        // update index j
                                        // console.log('hello');
                                       for(let j=0;j<dataArray.length;j++)
                                       {
                                        let value=childy[i].getAttribute('id');
                                        if(dataArray[j].id==value && value!=dataobj.id)
                                        {
                                            if(dataArray[j].totalvote<=dataobj.totalvote)
                                            {
                                                console.log('working');
                                                questionContainingDiv.insertBefore(newElement,childy[i]);
                                                flag=true;
                                                j=dataArray.length;
                                                i=childy.length;
                                            }
                                        }
                                       }
                                    }
                                }
                                if(flag==false)
                                {
                                    questionContainingDiv.appendChild(newElement);
                                }

                                
                                localStorage.setItem('discussionApp',JSON.stringify(dataArray));
                           }
                        }
                    }
               });
            
                 
                


               //  adding back the dataArray to the localStorage
            localStorage.setItem('discussionApp',JSON.stringify(dataArray));



                // Adding the eventlistener to the newly creted "div" on left side
                newElement.addEventListener('click',function(){
                    // changing the color of the element on click
                    // newElement.style.backgroundColor='rgba(13,110,253,.25)';

                    parent.innerHTML=`<p>Question</p> <div id="responsive-id"><h4 >${dataobj.questionSubject}</h4> <p>${dataobj.questionAsked}</p> <button id="resolved-btn" type="submit" resolved="false">Resolve</button></div>`

                    // adding all the previous responses on the clicked question

                    let ele0=document.createElement('div');
                    ele0.setAttribute('id','previous-responses');
                    parent.appendChild(ele0);
                    dataArray=JSON.parse(localStorage.getItem('discussionApp'));
                    for(let i=0;i<dataArray.length;i++)
                    {
                        if(dataobj.id===dataArray[i].id)
                        {
                            let k=dataArray[i].responses;
                            // sorting the responses array based on there upvotes and downvotes
                            k.sort(function(a,b){
                                return b.totalvotes-a.totalvotes;
                            })
                            for(let i=0;i<k.length;i++)
                            {
                                // let elementfavorite=document.createElement('i');
                                // elementfavorite.classList.add('')
                                let elementname=document.createElement('p');
                                 elementname.textContent=k[i].name;
                                 let elementcontent=document.createElement('h4');
                                 elementcontent.textContent=k[i].content;
                                  // add timestamp to response
                                   let elementtime=document.createElement('p');
                                   
                                   let time = new Date().getTime()/1000;
                                   let exactTime=Math.floor((time-k[i].timetocreate)/60);
                                   elementtime.textContent=`${exactTime} min ago`;
                                //  setting upvote
                                let elementupvote=document.createElement('i');
                                elementupvote.classList.add('bi-hand-thumbs-up');
                                elementupvote.textContent=k[i].upvotes;
                                // setting downvote
                                let elementdownvote=document.createElement('i');
                                elementdownvote.classList.add('bi-hand-thumbs-down');
                                elementdownvote.textContent=k[i].downvotes;
                                 let horizontalLine=document.createElement('hr');
                                //  appending the elements created above here
                                 ele0.appendChild(elementname);
                                 ele0.appendChild(elementcontent);
                                 ele0.appendChild(elementupvote);
                                 ele0.appendChild(elementdownvote);
                                 ele0.appendChild(elementtime);
                                //  ele0.appendChild()
                                 ele0.appendChild(horizontalLine);
                              
                                //  adding eventlistener to the upvote
                                elementupvote.addEventListener('click',function(){
                                    k[i].upvotes++;
                                    k[i].totalvotes=k[i].upvotes-k[i].downvotes;
                                    elementupvote.textContent=k[i].upvotes;
                                    localStorage.setItem('discussionApp',JSON.stringify(dataArray));
                                })

                             //  adding evenetlistener to the downvote
                                  elementdownvote.addEventListener('click',function(){
                                    k[i].downvotes++;
                                    k[i].totalvotes=k[i].upvotes-k[i].downvotes;
                                    elementdownvote.textContent=k[i].downvotes;
                                    localStorage.setItem('discussionApp',JSON.stringify(dataArray));
                                  })  
                                 

                            }
                             
                        }
                    }
                    
                    
                    localStorage.setItem('discussionApp',JSON.stringify(dataArray));

                      
                      let ele1=document.createElement('h3');
                      ele1.setAttribute('id','add-response');
                      ele1.textContent='Add Response';
                      
                      let ele2=document.createElement('input');
                      ele2.setAttribute('id','name');
                      ele2.setAttribute('type','text');
                      ele2.placeholder="Enter Name";

                      let ele3=document.createElement('textarea');
                      ele3.setAttribute('id','answer')
                    //   ele3.setAttribute('cols','35');
                    //   ele3.setAttribute('rows',4);
                      ele3.placeholder="Enter the comment...";

                      let ele4=document.createElement('button');
                      ele4.setAttribute('id','submit-response');
                      ele4.setAttribute('type','button');
                      ele4.textContent='Submit';

                      
                      parent.appendChild(ele1);
                      parent.appendChild(ele2);
                      parent.appendChild(ele3);
                      parent.appendChild(ele4);
                     

                    //  making the submit button of response responsive
                   ele4.addEventListener('click',function(){
                    if(ele2.value.trim()!='' && ele3.value.trim()!='')
                    {
                        // console.log("I am inside the submit response")
                        let responseobj={};
                        responseobj.name=ele2.value;
                        responseobj.content=ele3.value;
                        responseobj.upvotes=0;
                        responseobj.downvotes=0;
                        responseobj.totalvotes=responseobj.upvotes+responseobj.downvotes;
                        responseobj.timetocreate=new Date().getTime()/1000;
                        for(let i=0;i<dataArray.length;i++)
                        {
                            if(dataobj.id===dataArray[i].id)
                            {
                                dataArray[i].responses.push(responseobj);
                localStorage.setItem('discussionApp',JSON.stringify(dataArray));
                            // let localStArray=JSON.parse(localStorage.getItem('discussionApp'));
                            for(let i=0;i<dataArray.length;i++)
                            {
                                if(dataobj.id===dataArray[i].id)
                                {
                                    let k=dataArray[i].responses; 
                                    k.sort(function(a,b){
                                        return b.totalvotes-a.totalvotes;
                                    })                 
                                    for(let i=0;i<k.length;i++)
                                    {
                                     
                                    if(i===k.length-1){
                                        let currentTime=new Date().getTime()/1000;
                                ele0.innerHTML+=`
                                 <p>${k[i].name}</p> <h4>${k[i].content}</h4> <i class="bi bi-hand-thumbs-up" id="${upvoteid}">${k[i].upvotes}</i> <i class="bi bi-hand-thumbs-down" id="${downvoteid}">${k[i].downvotes}</i> <p>few seconds ago</p> <hr>` ;
                                //  adding eventlistener to the upvote
                                   
                                     let elementupvote=document.getElementById(upvoteid);
                                     elementupvote.addEventListener('click',function(){
                                     k[i].upvotes++;
                                     k[i].totalvotes=k[i].upvotes-k[i].downvotes;
                                     elementupvote.textContent=k[i].upvotes;
                                     localStorage.setItem('discussionApp',JSON.stringify(dataArray));
                                 });
                                    // adding eventListener to the down vote 
                                    let elementdownvote=document.getElementById(downvoteid);
                                    elementdownvote.addEventListener('click',function(){
                                        k[i].downvotes++;
                                        k[i].totalvotes=k[i].upvotes-k[i].downvotes;
                                        elementdownvote.textContent=k[i].downvotes;
                                        localStorage.setItem('discussionApp',JSON.stringify(dataArray));
                                      }); 
                                      upvoteid++;
                                      downvoteid++;

                                                     }
                                    }
                                }
                            }
                             
                            }
                        }
                        ele2.value='';
                        ele3.value='';
                    }
                    // ele2.value='';
                    // ele3.value='';
                   })
                //  click on the resolve button of the question
                let resolveButton=document.getElementById('resolved-btn');
                resolveButton.addEventListener('click',function(){
                    newElement.style.display='none';
                    parent.innerHTML='';
                    for(let i=0;i<dataArray.length;i++)
                    {
                        if(dataobj.id===dataArray[i].id)
                        {
                            dataArray.splice(i,1);
                            i--;
                        }
                    }
                    // setting the dataArray to the localStorage after deletion
                    localStorage.setItem('discussionApp',JSON.stringify(dataArray));
                    
                    // once the resolve button is clicked right portion should have
                    // question ask set up
                    parent.innerHTML=`<h1>Welcome to Discussion Portal</h1>
                    <p>Enter a subject and question to get started</p>
                    
                    <input type="text" placeholder="Subject" required>
                    
                    <textarea name="text" id="question-area" cols="80%" rows="5" placeholder="Question..." required></textarea>
                
                    <button type="submit" class="btn btn-primary" id="question-submit-btn">Submit</button>`

                    // changing the text of question form to 'Click to enter the question';
                    newQuestion.innerHTML='New question form'
                })
                 



        })
                

                
            
            
            }
             

            }

        }
        // console.log("submit is clicked");
    })
    // code for searching for the questions present so far in the div whose id="question container"
    // applying eventlistener to the searchbox
    let searchInputs=document.getElementById('search-bar');

    searchInputs.addEventListener('input', function () {
        let questionList = document.getElementById('question-container');
        let searchTerms = this.value.toLowerCase();
      
        // loop through all the questions in the list
        for (let i = 0; i < questionList.children.length; i++) {
          let questionFavoriteIcon = questionList.children[i].children[0];
          let questionSubject = questionList.children[i].children[1];
          let question = questionList.children[i].children[2];
          let questionText = question.textContent.toLowerCase();
      
          if (questionText.indexOf(searchTerms) > -1) {
            // show the question
            questionFavoriteIcon.style.display = '';
            questionSubject.style.display = '';
            question.style.display = '';
            questionList.children[i].children[3].style.display = '';
            questionList.children[i].children[4].style.display = '';
            questionList.children[i].children[5].style.display = '';
            questionList.children[i].children[6].style.display = '';
      
            // highlight the searched text
            let regex = new RegExp(searchTerms, 'gi');
            let highlightedText = questionText.replace(regex, (match) => {
              return `<span class="highlight">${match}</span>`;
            });
            question.innerHTML = highlightedText;
          } else {
            // hide the question
            questionSubject.style.display = 'none';
            question.style.display = 'none';
            questionList.children[i].children[3].style.display = 'none';
            questionList.children[i].children[0].style.display = 'none';
            questionList.children[i].children[4].style.display = 'none';
            questionList.children[i].children[5].style.display = 'none';
            questionList.children[i].children[6].style.display = 'none';
          }
        }
      });
      
       
})