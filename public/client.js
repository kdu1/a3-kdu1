// client-side js
// run by the browser each time your view template is loaded

console.log("hello world :o");

// our default array of dreams
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

let i = 0;

// define variables that reference elements on our page
const dreamsList = document.getElementById("dreams");
const dreamsForm = document.forms[0];
const dreamsModifyForm = document.forms[1];
const dreamInput = dreamsForm.elements["dream"];
const dreamRemove = document.getElementById("remove-dream");
const dreamModify = document.getElementById("modify-dream");
const dreamModifyInput = dreamsModifyForm.elements["dreamModify"];
//why does this get rid of the list?
const lis = document.getElementById("dream").getElementsByTagName("li");

// a helper function that creates a list item for a given dream
const appendNewDream = function(dream) {
  const newListItem = document.createElement("li");
  newListItem.innerHTML = dream;
  newListItem.id = i;
  console.log(newListItem.id);
  dreamsList.appendChild(newListItem);
  i++;
};

//removes dream at index
const deleteDream = function(){
  const index = 0
    if(index > -1){
        const rmv = document.getElementById(index);
        rmv.remove();
        lis.forEach(function (dream){
          dream.id = dream.id - 1;
        });
        dreams.splice(index, 1);
        i--;
    }
    console.log(dreams)
}

//edit dream: similar process, just replace innerhtml with new text
//make a new form to get new text, default text is the current text
const changeDream = function(newText){
   const index = 0
    if(index > -1){
        const chg = document.getElementById(index);
        chg.innerHTML = newText;
        dreams[index] = chg;
        
    }
    console.log(dreams)
}


// iterate through every dream and add it to our page
dreams.forEach(function(dream) {
  appendNewDream(dream);
});

// listen for the form to be submitted and add a new dream when it is
dreamsForm.onsubmit = function(event) {
  // stop our form submission from refreshing the page
  event.preventDefault();

  // get dream value and add it to the list
  dreamInput.value.id = i;
  i++;
  dreams.push(dreamInput.value);
  appendNewDream(dreamInput.value);

  // reset form
  dreamInput.value = "";
  dreamInput.focus();
};

dreamRemove.onclick = function(){
  deleteDream();
}

//change dream form
dreamsModifyForm.onsubmit = function(event) {
  // stop our form submission from refreshing the page
  event.preventDefault();
  
  changeDream(dreamModifyInput.value);

  // reset form
  dreamModifyInput.value = "";
  dreamModifyInput.focus();
};

/*const appdata = [
]

//gets soonest dated task that has high priority
const getMin = function(array){
    let date = 10000;
    let indexPrev = [];
    for(let i = 0; i < array.length; i++){
        curDate = parseInt(array[i].dueDate)
        curPrior = array[i].priority
        if(curDate < date){
            if(curPrior === "high"){
                if(indexPrev.length > 0){
                    for(let j = 0; j < indexPrev.length; j++){
                        array[indexPrev[j]].urgent = 0
                    }
                    indexPrev = []
                }
                date = curDate
                indexPrev.push(i)
            }
        }
        else if(curDate === date){
            if(curPrior === "high"){
                indexPrev.push(i)
            }
        }
        console.log("indexPrev")
        console.log(indexPrev)
    }
    console.log("date")
    console.log(date)
    return date
}

const remove = function(array){
    const index = 0
    if(index > -1){
        array.splice(index, 1)
    }
    console.log(array)
}*/