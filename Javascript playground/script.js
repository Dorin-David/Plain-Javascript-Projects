// THE DESCRIPTIONS FOR THE GAMES ARE STORED BELOW 
let descriptions = {
         //ROMAN ENCODER
          romanEncoder: "<p>Write down an integer from 1 to 4999 and have it transformed into a roman number. An example:<br>Encode:<br><code>1245 =>  &nbsp<b>MCCXLV</b><br>1847 => &nbsp<b>MDCCCXLVII</b></code><br> Decode:<br><code><b>MDLXVII</b> => &nbsp1567<br><b>MCDXCII</b> => &nbsp1492</code></p>",
           //ALTERNATE REVERSING
          alternateReversing: "<p>In this game we'll perform a simple alternate reversing on a string; this means that the first word won't be changed, the next one will be reversed, the third won't be changed and so on (an <em>alternate</em> reversing indeed!). An example:<br>Encode:<br><code>Hello world. I'm having fun coding in Javascript => <b> Hello .dlrow I'm gnivah fun gnidoc in tpircsavaJ</b></code>Decode:<br><code><b>You nac find eht code fo this tcejorp on ym Github eliforp</b> => You can find the code of this project on my Github profile </code></p>",
          //AVIATION CODE
          aviationCode: "<p>In this game we'll encode a string in the NATO phonetic alphabet (more information <a href='https://en.wikipedia.org/wiki/NATO_phonetic_alphabet' target='_blank'>here</a>). An example:<br>Encode:<br><code><b>Some times coding can be hard</b> => Sierra Oscar Mike Echo Tango India Mike Echo Sierra__Charlie Oscar Delta India November Golf__Charlie Alfa November__Bravo Echo__Hotel Alfa Romeo Delta</code><br>Decode: <br><code>Alfa__Bravo India Tango__Charlie Oscar November Foxtrot Uniform Sierra India November Golf ,__India Sierra November ' Tango__India Tango ? => <b>a bit confusing, isn't it?</b></code></p>",
          // CAMEL CASE
          camelCase: "<p>One of the first things we learn, when we study Javascript, are variables. And, almost immediately, how we should <em>write</em> them. A naming convention for variables is <em><b>camel case</b></em>, 'a practice of writing phrases without spaces or punctuation, indicating the separation of words with a single capitalized letter'(from <em>Wikipedia</em>; more information <a href='https://en.wikipedia.org/wiki/Camel_case' target='_blank'>here</a>). Confusing? No worries: check the examples below.<br>Encode:<br><code><b>valid camel case</b> => validCamelCase<br><b>snake_case_works_too</b> => snakeCaseWorksToo<br><b>and-the-so-called-kebab-case</b> => andTheSoCalledKebabCase<br><b>try_mixing-them for fun</b> => tryMixingThemForFun</code><br>Decode:<br><code><b>decodingIsEasier</b> => decoding is easier<br><b>pleaseSeparateWordsWithASingleSpace</b> => please separate words with a single space</code></p>",
           //WEIRD STRING
          weirdString: 'Have some fun with the <em>weird-case</em> encoding. No need for explanation :=)',
          //ALPHABET POSITION
          alphabetPosition: "<p>Our last game replaces a string with the position of its single characters in the alphabet. An example: <br>Encode:<br><code><b>numbers from string</b> => 14 21 13 2 5 18 19_6 18 15 13_19 20 18 9 14 7<br><b>we do like numbers</b> => 23 5_4 15_12 9 11 5_14 21 13 2 5 18 19</code></br>Decode:<br><code><b>3 18 1 22 9 14 7_3 15 6 6 5 5</b> => craving coffee<br><b>9 14_12 15 22 5_23 9 20 8_10 1 22 1 19 3 18 9 16 20</b> => in love with javascript</code></p>"
      };     
//Make sure the dropdown menu displays the default value when the page is reloaded
window.onload = () => document.getElementById('select').value = 'empty';

//*** ENCODE FUNCTIONS ***  
    let encodeFunctions = {
          //ROMAN ENCODER
          romanEncoder: function(integer){
              let deposit = [['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'], ['X', 'XX', 'XXX','XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'], ['C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM']];
                return 'M'.repeat(integer.toString().slice(0, -3)) + integer.toString().slice(-3).split('').reverse().map((el, ind,) => deposit[ind][el-1]).reverse().join('')
          },    
          //ALTERNATE REVERSING
          alternateReversing: function(str){
              return str.trim().split(' ').map((el, i) => i > 0 && i % 2 != 0 ? el.split('').reverse().join('') : el).join(' ')
          },
          //AVIATION CODE
          aviationCode: function(string){
              let natoCode = {
  A: 'Alfa', B: 'Bravo', C: 'Charlie', D: 'Delta', E: 'Echo', F: 'Foxtrot', G: 'Golf', H: 'Hotel', I: 'India', J: 'Juliett', K: 'Kilo', L: 'Lima', M: 'Mike', N: 'November', O: 'Oscar', P: 'Papa', Q: 'Quebec', R: 'Romeo', S: 'Sierra', T: 'Tango', U: 'Uniform', V: 'Victor',W: 'Whiskey',X: 'Xray',Y: 'Yankee',Z: 'Zulu'
                  
};
               return string.trim().toUpperCase().split(' ')
  .map(el => el.split('').map(item => natoCode[item] ? natoCode[item] : item).join(' ')).join('__')
          },
          // CAMEL CASE
          camelCase: function(string){
              return string.toLowerCase().replace(/(\s|-|_)(\w)/g, (m, p1, p2) => p2.toUpperCase())
          },
          //WEIRD STRING
          weirdString: function(string){
               return string.split(' ').map(el => el.split('').map((el, ind) => ind % 2 == 0 ? el.toUpperCase() : el.toLowerCase()).join('')).join(' ')
          },
          //ALPHABET POSITION
          alphabetPosition: function(text){
              let letters = '.abcdefghijklmnopqrstuvwxyz'
            return  text.toLowerCase().split(' ').map(el=> el.split('').map(el => letters.indexOf(el)).join(' ')).join('_')
          }
      };

  //*** DECODE FUNCTIONS ***
      let decodeFunctions = {
          //ROMAN DECODER
           romanEncoder: function(string){
             //this function is the only I haven't writte my self; it was taken from the solution of a kata on @Codewars
             let conversion = {M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1};
             return string.match(/CM|CD|XC|XL|IX|IV|\w/g).reduce((accum, roman) => accum + conversion[roman], 0);
          },
          //ALTERNATE REVERSING DECODER
          alternateReversing: function(str){
              return str.trim().split(' ').map((el, i) => i > 0 && i % 2 != 0 ? el.split('').reverse().join('') : el).join(' ')
          },
          //AVIATION DECODER
          aviationCode: function(string){  
   return string.toLowerCase().split('__').map(el => el.length > 1 ? el.split(' ').map(item => item[0]).join('') : '').join(' ')
          },
         //CAMEL CASE DECODER
          camelCase: function(string){
              return string.replace(/([A-Z])/g, ' $&').toLowerCase();
          },
          // WEIRD STRING DECODER
          weirdString: function(string){
              return string.split(' ').map(el => el.split('').map((el, ind) => ind % 2 == 0 ? el.toLowerCase() : el.toLowerCase()).join('')).join(' ')
          },
          //ALPHABET POSITION DECODER
          //same problem as with nato code, doesn't handle double space
          alphabetPosition: function(text){
              let letters = '.abcdefghijklmnopqrstuvwxyz';
    return text.split('_').map(el => el.split(' ').map(el => letters[el]).join('')).join(' ')
          }
      }
     

document.getElementById('select').addEventListener('click', function(){
    document.getElementById('select').addEventListener('click', function(){
        document.getElementById('txt-description').innerHTML = descriptions[document.getElementById('select').value];
    })
    
})

//event for pressing enter on the input bar
document.getElementById('input').addEventListener('keydown', 
   function(e){
    let currentGame = document.getElementById('select').value; 
    
       if(e.key == 'Enter') {
           //output result
          let outputText = encodeFunctions[currentGame].call(this, document.querySelector('#input').value);
          let newNode =  document.createElement('p');
          newNode.appendChild(document.createTextNode(outputText));
           document.querySelector('.window').appendChild(newNode);
           document.getElementById('input').value = '';
       }
           
   });
//event for clicking 'Encode' button
   document.getElementById('encode').addEventListener('click', function(){
      let currentGame = document.getElementById('select').value; 
       let outputText = encodeFunctions[currentGame].call(this, document.querySelector('#input').value);
       let newNode =  document.createElement('p');
           newNode.appendChild(document.createTextNode(outputText));
           document.querySelector('.window').appendChild(newNode);
       document.getElementById('input').value = '';
   });

//event for clicking 'Decode' button
   document.getElementById('decode').addEventListener('click', function(){
       let currentGame = document.getElementById('select').value; 
       let outputText = decodeFunctions[currentGame].call(this, document.querySelector('#input').value);
       let newNode =  document.createElement('p');
           newNode.appendChild(document.createTextNode(outputText));
           document.querySelector('.window').appendChild(newNode);
       document.getElementById('input').value = '';
      /*document.querySelector('.window').innerHTML += decodeFunctions[currentGame].call(null, document.querySelector('#input').value);*/
   })
 
//add event for delete button 
   document.getElementById('delete').addEventListener('click', function(){
       document.querySelector('.window').innerHTML = '';
       document.getElementById('input').value = '';
   })
    
