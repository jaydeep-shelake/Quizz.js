const questionDisplay = document.getElementById('question');
const choises = document.querySelectorAll('choise-text');
const progressText = document.getElementById('progress-text');
const scoreText =document.getElementById('score');
const progressBar = document.getElementById('progress-full');
const startBtn = document.getElementById('startBtn');
const container = document.getElementById('container');
const nextBtn = document.getElementById('nextBtn');
const buttonArea = document.querySelector('.next-btn');
const ansContainer =document.querySelector('.ans-container');
let scoreDispaly = document.getElementById('score');
let score=0;
let questionCount=0;
let randomQue,currentQueIndex;
let questions=[
{
    question:'What is 2+2 ?',
    answer:[
        {text:'4',correct:true},
        {text:'2',correct:false}
    ]
},
{
    question:'Rect.js or Angular or vue ?',
    answer:[
        {text:'React .js' ,correct:false},
        {text:'Angular' ,correct:false},
        {text:'Vue' ,correct:false},
        {text:'All of the above' ,correct:true}
    ]
},
{
    question:'Who has Developed Node.js ?',
    answer:[
        {text:'Tony strak' ,correct:false},
        {text:'Rayn Dhal' ,correct:true},
        {text:'Van Dom Rosum' ,correct:false},
        {text:'Brendan Eich' ,correct:false}
    ] 
},
{
    question:'Who has Developed Deno.js ?',
    answer:[
        {text:'Tony strak' ,correct:false},
        {text:'Rayn Dhal' ,correct:true},
        {text:'Van Dom Rosum' ,correct:false},
        {text:'Brendan Eich' ,correct:false}
    ]  
},

{
    question:'Which Compnay owens react.js',
    answer:[
        {text:'Strack Industries' ,correct:false},
        {text:'Google' ,correct:false},
        {text:'Facebook' ,correct:true},
        {text:'Amazaon' ,correct:false}
    ] 
},
]

const ScorePoint =100;
const MaxQue=6;

startBtn.addEventListener('click',startGame);
nextBtn.addEventListener('click',()=>{
  currentQueIndex++;
  setNextQue();
});

function startGame(e){
    e.preventDefault();
    questionCount=0;
    score=1;
    scoreDispaly.innerHTML='0'
    console.log('clicked');
    container.classList.remove('hide');
    startBtn.classList.add('hide');
    nextBtn.classList.remove('hide');
    buttonArea.style.height='0vh';
    randomQue=questions.sort(()=>Math.random()-0.5); // arrays of question display randomly
    currentQueIndex=0;
    setNextQue();
    
    
}
//progressText.innerText=`Question:${questionCount} of ${MaxQue}`
//progressBar.style.width=`${(questionCount/MaxQue)*100}%`


function setNextQue(){
  clearPreviousQue();
  showQue(randomQue[currentQueIndex]); // function for displaying questions
  progressText.innerText=`Question:${currentQueIndex} of 5`
  progressBar.style.width=`${(currentQueIndex/MaxQue)*100}%`
}

function showQue(question){
    questionDisplay.innerText=question.question;
   question.answer.forEach((ans)=>{
     const choiseContainer = document.createElement('div');
     choiseContainer.classList.add('choise-container');
     
     const buttons = document.createElement('p');
     buttons.classList.add('choise-text');
     buttons.innerText=ans.text;
     if(ans.correct){
         buttons.dataset.correct=ans.correct;
         
     }
     
     choiseContainer.addEventListener('click',selectAns);
     choiseContainer.append(buttons);
     ansContainer.appendChild(choiseContainer);

   })
}

function clearPreviousQue(){

    nextBtn.classList.add('hide');
     while(ansContainer.firstChild){
         ansContainer.removeChild(ansContainer.firstChild)
     }
}


function selectAns(e){
  const selectedBtn = e.target;
  const correctAns = selectedBtn.firstChild.dataset.correct;
  if(correctAns){
    scoreDispaly.innerHTML=score++;
  }

  setStatusClass(selectedBtn,correctAns)

  Array.from(ansContainer.children).forEach((button)=>{
    setStatusClass(button,button.firstChild.dataset.correct)
  });
  if(randomQue.length > currentQueIndex+1){
    nextBtn.classList.remove('hide')
  }  // which means we have more questions
  else{
      startBtn.innerText='Restrat'
      startBtn.classList.remove('hide');
  }
}

 function setStatusClass(elem,correct){
  clearStatusClass(elem);
  if(correct){
     elem.classList.add('correct');
     
  }
  else{
      elem.classList.add('worng');
    
  }
 }

 function clearStatusClass(elem){
   elem.classList.remove('correct');
   elem.classList.remove('worng');
 }