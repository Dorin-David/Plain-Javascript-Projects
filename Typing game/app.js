  //import words
  import { wordList } from './words.js'
  //clear input when reloading page
  window.onload = () => document.getElementById('challenge').value = '';        
  
  //begin logic when 'Start' button is pressed
   document.getElementById('btn').addEventListener('click', function(){
    //hide the start button   
    this.style.display = 'none';
    //clear input field (for scenario where user didn't manage to write last word during last game, and then presses 'Start' for a new game)
    document.getElementById('word').innerHTML = '';
    
       
   //the 'time' variables stores the initial message, then the time counter
   let time = document.getElementById('time');
   //below a reference to the words that will be displayed
   let word = document.getElementById('word');
    //variables for time and score
    let counter = 10; 
    let score = 0;
    //display 'Ready' message
    setTimeout(function(){
        time.innerHTML = 'Ready?'
    }, 0);
    //after 'Ready?' message, wait one second
    setTimeout(function(){
        //display 'Go!' message 
        time.innerHTML = 'Go!';
        // parse first word from list
        word.innerHTML = wordList[Math.floor(Math.random() * wordList.length)];
        // increase the size of the word to be written
        word.style['font-size'] = '40px';
        //display current score (which has a 'display: none' when the page is loaded)
        document.getElementById('points').style.display = 'block';
        //document.getElementById('word').style.display = 'block';
        
    }, 1000);

    //start counter logic
  let interval = setTimeout(function inner(){ //named IIF calls itself
      //update counter every second
      time.innerHTML = `<span>time:</span>${counter}`;
      counter--;
      if(counter == 0){ //base case for ending loop
          time.innerHTML = `You have scored ${score} point(s)!`; //display final score
           document.getElementById('points').style.display = 'none';
          document.getElementById('btn').style.display = 'block';
          document.getElementById('word').style.display = 'none';
          return 
      }
      interval = setTimeout(inner, 1000); //calls itself till base case is reached (counter reaches 0)
  }, 2000); //set initial delay to 2000; the logic, and the counter, begin when 'Go' message is displayed

   //Below, the logic for the input field where words will be written
document.getElementById('challenge').addEventListener('keydown', (function(){ //IIF
   let currentWord = ''; //here
return function(e){
      //consider only alphabetical characters
     if(e.keyCode >= 65 && e.keyCode <= 122) currentWord += e.key;
     //if user presses Backspace update 'currentWord' (delete last char)
     if(e.keyCode == 8) currentWord = currentWord.slice(0, -1)
     if(counter == 0) return //base case, time has finished
    document.getElementById('challenge').addEventListener('keyup', function(){
         if(counter == 0) return //base case, time has finished
         //if the current word written by the user matches the displayed one
      if(word.innerHTML == currentWord) { 
        score++; //update score
        currentWord = ''; //clear current word
        document.getElementById('points').innerHTML = `<span>score:</span> ${score}`; //update score
        word.innerHTML = wordList[Math.floor(Math.random() * wordList.length)]; // get next word
        this.value = ''; //clear input field
    }
         
 })                
}}()))});
