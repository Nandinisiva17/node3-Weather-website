console.log('JS has been set up!')

// fetch ('http://localhost:3000/weather?address=!').then((response) => {
//     response.json().then(({ error, forecast, loation }) => {
//         if (error){
//             console.log(error);
//             return;
//         }
//         console.log('Forecase: ', forecast);
//         console.log('Location: ', location)
//     })
// })

const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = searchInput.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch (`/weather?address=${location}`).then((response) => {
    response.json().then(({ error, forecast, loation }) => {
        if (error){
            console.log(error);
            messageOne.textContent = error;
            
            return;
        }
        messageOne.textContent = `Forecast: ${forecast}`
        messageTwo.textContent = `Location: ${location}`
        console.log('Forecase: ', forecast);
        console.log('Location: ', location)
    })
})

})