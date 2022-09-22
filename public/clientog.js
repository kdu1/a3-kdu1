const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    let listItem = document.querySelector( '#listItem' )
    let dueDate  = document.querySelector( '#dueDate' )
    let priority = document.querySelector( '#priority' )
    let del = document.querySelector('#delButton')
    let json = { 
                 listItem: listItem.value,
                 dueDate: dueDate.value,
                 priority: priority.value.toLowerCase(),
                 urgent: 0,
                 del: false
                }
    body = JSON.stringify( json )

    /*fetch( '/submit', {
      method:'POST',
      body 
    })*/
    fetch( '/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body
    }).then(async function (response){
       console.log("the function response")
       console.log(response)
       let newData = await response.json() //wait until response
       console.log(newData)
       update(newData)
       console.log(newData)
    })
    return false
  }

  const update = function(newItem){
      const entry = document.getElementById("todoList")
      entry.innerHTML = "<tr><th>" + "Username" + "</th><th>" 
      + "Task" + "</th><th>" 
      + "Due Date" + "</th><th>"
      + "Priority" + "</th><th>" 
      + "Most Urgent" + "</th></tr>"

      let id = 0

      //const delButton = document.createNewElement("button")
      //button.innerHTML = "Delete"
      console.log("newItem")
      console.log(newItem)
      newItem.forEach((element, index) => {

        let newEntry = document.createElement("tr")
        newEntry.setAttribute("id", id)
        newEntry.setAttribute("value", false)

        let newEntryItem = document.createElement("td")
        newEntryItem.innerHTML = element.listItem

        let newEntryDate = document.createElement("td")
        newEntryDate.innerHTML = element.dueDate

        let newEntryPriority = document.createElement("td")
        newEntryPriority.innerHTML = element.priority

        let newEntryUrgent = document.createElement("td")
        newEntryUrgent.innerHTML = element.urgent
       
        newEntry.appendChild(newEntryItem)
        newEntry.appendChild(newEntryDate)
        newEntry.appendChild(newEntryPriority)
        newEntry.appendChild(newEntryUrgent)

        /*entry.innerHTML += 
            "<tr><td>" + element.listItem + "</td><td>" 
            + element.dueDate + "</td><td>"
            + element.priority + "</td></tr>"
           // + "<td><button id=`{$element.listItem}`>" + "Delete" + "</button></td></tr>"*/

        /*let delButton = document.createElement("button")
        delButton.innerHTML = "Remove"
        delButton.setAttribute("value", "Remove")
        delButton.setAttribute("id", id)

        newEntry.appendChild(delButton)
        //entry.appendChild(newEntry)

        newEntry.addEventListener('click', function(e) {
           //IT WORKS BUT NEEDS TO CHANGE APPDATA
           //newEntry.del = true
           //console.log(newEntry.del)
           newEntry.parentNode.removeChild(newEntry);
           
        });*/

        /*const delButton = document.querySelectorAll( 'button' )[1]
        delButton.innerHTML = "Remove"
        delButton.setAttribute("id", id)

        newEntry.appendChild(delButton)
        delButton.onclick = remove*/

        console.log(newEntry)
        entry.appendChild(newEntry)

        id += 1
      })
     
      
      console.log(entry.innerHTML)

  }

  const changeDream = function(newText){
   const index = 0
    if(index > -1){
        const chg = document.getElementById(index);
        chg.innerHTML = newText;
        dreams[index] = chg;
        
    }
    console.log(dreams)
}

  const remove = function(e){
    e.preventDefault()

    let listItem = document.querySelector( '#listItem' )
    let dueDate  = document.querySelector( '#dueDate' )
    let priority = document.querySelector( '#priority' )
    let del = document.querySelector('#delButton')
    let json = { listItem: listItem.value,
                 dueDate: dueDate.value,
                 priority: priority.value,
                 urgent: 0,
                 del: true
                }
    body = JSON.stringify( json )

    fetch( '/delete', {
      method:'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body 
    })
    .then(async function (response){
       console.log("the function response")
       console.log(response)
       let newData = await response.json() //wait until response
       update(newData)
       console.log(newData)
    })
    return false
  }

  window.onload = function() {
    const button = document.querySelector( 'button' )
    button.onclick = submit
    const delButton = document.querySelectorAll( 'button' )[1]
    delButton.onclick = remove
  }