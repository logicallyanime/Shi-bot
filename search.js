var all = document.querySelectorAll(".SetPreview-cardHeader .UILink");
all.forEach(link => {
    let web = new XMLHttpRequest();
    let parse = new DOMParser();

    web.onreadystatechange = function() {
        console.log(web.readystate);
        if (this.readyState == 4 && this.status == 200) {
            let set = parse.parseFromString(web.responseText,"text/html");
            flashjson(set);
        }
    }

    web.open("GET", link.href, true);
    web.send()

});



function flashjson(set){
    let flashcards = {};
    flashcards.data = {};
    // Get set title
    flashcards.data.title = set.getElementsByClassName("UIHeading UIHeading--one")[0].innerHTML;
    // Get Terms
    let nodelist = set.querySelectorAll(".SetPageTerms-term");

    //Splatter the cards into array
    flashcards.data.cards = Array.prototype.map.call(nodelist, function(element){ 

        let card = {};

        // Get Question
        card.question = element
        .getElementsByClassName("SetPageTerm-wordText")[0]
        .lastChild
        .innerHTML;

        // Get Answer
        card.answer = element
        .getElementsByClassName("SetPageTerm-definitionText")[0]
        .lastChild
        .innerHTML;
        return card
    });

    if(!flashcards) {
        console.error('Console.save: No data')
        quit;
    }

    let filename = flashcards.data.title.replaceAll(" ", "_") + ".json";

    if(typeof flashcards === "object"){
        flashcards = JSON.stringify(flashcards, undefined, 4);
    }

    var blob = new Blob([flashcards], {type: 'text/json'}),
        e    = document.createEvent('MouseEvents'),
        a    = document.createElement('a');

    a.download = filename;
    a.href = window.URL.createObjectURL(blob);
    a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':');
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
}