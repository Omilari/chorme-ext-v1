
let myLeads = []

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const deleteSpec = document.getElementById("delete-spec")
const saveTab = document.getElementById("tab-btn")
const aTag = document.getElementsByClassName('linking')

//myLeads = JSON.parse(myLeads)
//myLeads.push("www.epiclead.com")
//console.log(myLeads)

//myLead = JSON.stringify(myLeads)
//console.log(typeof myLead)

//myLeads = JSON.parse(myLeads) // turns it into an array
//myLeads.push("www.lead2.com")
//myLeads = JSON.stringify(myLeads)
const leadsFromLocalStorage= JSON.parse(localStorage.getItem("myLeads"))

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    renderLeads(myLeads)
}

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    renderLeads(myLeads)
})

inputBtn.addEventListener("click", function(){
    
    myLeads.push(inputEl.value)
    inputEl.value = ''

    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    renderLeads(myLeads)
})

saveTab.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        renderLeads(myLeads)
    })
})

//localstorage has to store strings
function renderLeads(leads){
    //innerHTML allows you to create html elements in JS
    let listItems = ""

    for (let i = 0; i < leads.length; i++){
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}' class='linking' id='linking${i}'>${leads[i]}</a>
            </li>`

        //other method
        //const li = document.createElement("li")
        //li.textContent = myLeads[i]
        //ulEl.append(li)
    }
    //DOM Manipulation comes with a cost
    //More performant w/ innerHTML outside loop
    ulEl.innerHTML = listItems

}

//local storage allows us to have data persist across refresh
//localStorage.clear() - clears your local storage


//falsy values
//0
//""
//null -> how you as a developer signilize emptiness
//undefined - how JavaScript signalizes emptiness
//false
//NaN
