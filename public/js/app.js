console.log('Client side javascript file is loaded')

const address = 'Boston'


//the argument is the part of 'index.hbs'
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1') //# is used to match the id
const messageTwo = document.querySelector('#message-2')


//first argv: string of name of the event you want to listen
//second argv: callback function, runs every single time and event occurs
weatherForm.addEventListener('submit', (e) => {
    //is going to prevent that default behavior which is to refresh the browser allowing the server to render a new page and instead it's going to do nothing
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error
            } else { 
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })