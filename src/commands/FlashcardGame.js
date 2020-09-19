// @flow
const fs = require('fs');
class Flashcards {
    // MasterSet: Array<Object>;
    // deck: Array<>;
    // currCard: Object;
    #i;
    #j;
    #temp;
    #random;
    
    constructor() {
        this.MasterSet = JSON.parse( this.loadData('./src/savedJason.json') );

        // this.MasterSet = [
        //   {
        //       "title": "Genki Lesson 1 Grammar",
        //       "swapQA": false,
        //       "swapable": false,
        //       "hirakata": true,
        //       "cards": [
        //           {
        //               "question": "XはYです。",
        //               "answer": "X is Y.; As for X, it is Y."
        //           },
        //           {
        //               "question": "Mr. Yamashita is a teacher. | As for Mr. Yamashita, he is a teacher.",
        //               "answer": "山下さんは、先生です。"
        //           },
        //           {
        //               "question": "(Are you) an international student?",
        //               "answer": "留学生ですか。"
        //           },
        //           {
        //               "question": "What is your major?",
        //               "answer": "専攻は何ですか。"
        //           },
        //           {
        //               "question": "What year are you in college?",
        //               "answer": "何年生ですか。"
        //           },
        //           {
        //               "question": "a student of the Japanese language",
        //               "answer": "日本語の学生"
        //           },
        //           {
        //               "question": "a college professor",
        //               "answer": "大学の先生"
        //           },
        //           {
        //               "question": "Is that so? | I see.",
        //               "answer": "そうですか"
        //           }
        //       ]
        //   }
        // ];
        this.numRight, this.numWrong = 0
      }
      
      // storeData(data, path){
        //     try {
    //       fs.writeFileSync(path, JSON.stringify(data))
    //     } catch (err) {
      //       console.error(err)
    //     }
    // }

    /**
     * Loads JSON from file, returns false if error
     * @param {String} path 
     * @returns {JSON | Boolean}
     */
    loadData(path){
      try {
          return fs.readFileSync(path, 'utf8')
        } catch (err) {
          console.error(err) //$FlowFixMe[incompatible-return]
          return false
        }
      }
      

      shuffle(array) {
        this.#i = array.length,
        this.#j = 0,
        this.#temp = 0;
    
        while (this.#i--) {
    
            this.#j = Math.floor(Math.random() * (this.#i+1));
    
            // swap randomly chosen element with current element
            array[this.#i] = array[this.#j];
            this.#temp = array[this.#i];
            array[this.#j] = this.#temp;
        }
        return array;
      }

      setDeck(setNum){
        
        this.setSelect = setNum;

        this.IsPlaying = true;
        
        this.deck = this.MasterSet[setNum];
        
        if(this.deck.swapable == true){
  
          this.#random = Math.floor((Math.random * this.deck.cards.length))

          for (this.#i = 0; this.#i < this.#random; this.#random++) {
            
            this.#temp = this.deck.cards[this.#i].question;
            this.deck.cards[this.#i].question = this.deck.cards[this.#i].answer;
            this.deck.cards[this.#i].question = this.#temp;
            
          }
          
        }
        this.deck.cards = this.shuffle(this.deck.cards)

      }

      showCard(){
        this.currCard = this.deck.cards.pop();


        if(this.deck.swapQA == true){
          this.question = this.currCard.answer;
          this.correctAns = this.currCard.question;
        }else{
          this.question = this.currCard.question;
          this.correctAns = this.currCard.answer;
        }


        return this.question;
      }

      isRight(answer){
        
        if(this.currCard.answer == answer){
          console.log("Answer is right!");
          this.numRight += 1;
          return true;
        }
        else{
          console.log(`Incorrect.\nCorrect Answer: ${this.currCard.answer}
                      \nYour Answer: ${answer}`);
          this.deck.cards.push(this.currCard);
          this.shuffle(this.deck.cards);
          this.numWrong += 1;
          return false;
        }
        

      }














      // Make fCards.data into array, so that if there is any new cards the bot will detect it and add it to the locally saved set
      // but for now just load in the cards from the json file

    //   Priorities
    //   ============
    //   1. Make flashcard api (show current flashcard, get current set, right/wrong logic, next card , cancel current set )
    //   2. make interactive
    //   3. ✨make it pretty✨
    //   4. new set checker
    //   5. leader board





}


module.exports = Flashcards;