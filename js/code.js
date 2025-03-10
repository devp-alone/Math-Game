// write js

let playing = false;
let score;
let timeremaining;
let correctanswer;

//if user clicks on start btn

document.querySelector("#startreset").onclick = ()=>{

    //if we are playing
    if( playing == true){
        location.reload();
    }
    else{
        // not playing change the mode of playing

        playing = true;
        score = 0;
        document.querySelector("#scorevalue").innerHTML=score;

        //show the countdown box
        show("timeremaining");
        timeremaining = 60;

        document.querySelector("#trvalue")
        .innerHTML=timeremaining;

        //showcountdfown
        showCountDown();
        document.querySelector("#startreset").innerHTML = "Reset";

        //generate qa
        generateQA();






    }
}

//show fuunction and hide function

function show(id){
    document.getElementById(id).style.display = "block";
}
function hide(id){
    document.getElementById(id).style.display = "none";
}

//functoin  for countdown and stopcountdown
function showCountDown(){
    action = setInterval(()=>{
        timeremaining--;
        
        document.querySelector("#trvalue")
        .innerHTML=timeremaining;

        if(timeremaining == 0){

            //gave overflow
            stopCountDown();
            show("gameover");
            document.querySelector("#gameover").innerHTML
            =`<p>Game Over!</p>
            <p>Your Score is ${score}</p> `;

            hide("wrong");
            hide("correct");
            hide("timeremaining");
    
            playing = false;
            document.querySelector("#startreset").innerHTML = "Start Game"
 
            // auto refresh page afters 2sec
            setInterval(()=>{
                location.reload();
               



            }, 2000);
        
            
        }
      
         




    },1000);

}
function stopCountDown(){
    clearInterval(action);
}

//func for generating qs 
function generateQA(){

    let x = Math.floor(Math.random()*9)+1;

    let y = Math.floor(Math.random()*9)+1

    correctanswer = x * y;
     
    document.querySelector("#question").innerHTML = x + "x" + y;

    let correctposition = 1 + Math.round(Math.random()*3);

    document.querySelector("#box" + correctposition).innerHTML = correctanswer;

    // fill wrong Answer in wrong bosxes

    var answer = [correctanswer];

    for(i = 1; i<5; i++){

        if(i != correctposition){
            let wronganswer;
            do{
                wronganswer = (1+Math.floor(Math.random()*9) ) *(1+Math.floor(Math.random()*9));

            }while(answer.indexOf(wronganswer) > -1);
            answer.push(wronganswer);
            document.querySelector("#box" + i).innerHTML = wronganswer;
        }
    }



}

// if we click on answer box 
 for ( i =1; i<5; i++){

    document.querySelector("#box" + i).onclick =function(){

        //if we are playing 
        if(playing == true){
            
            if( this.innerHTML == correctanswer){
                //increase the score
                score++;
                //update the score
                document.querySelector("#scorevalue").innerHTML= score;
                show("correct");
                hide("wrong");
                setInterval(()=>{
                    hide("correct");
                },1000);
                generateQA();

            }
            else{
                //wrong answer
                hide("correct");
                show("wrong");
                setInterval(()=>{
                    hide("wrong");
                },1000);
            }
        }
    }


 }
