const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')

const searchWeather = (address = '!') => {
    message1.textContent = 'Fetching weather data'
    message2.textContent = ''
    fetch('http://localhost:3000/weather?address='+address).then((response) => {
        // console.log(response)
        response.json().then((data)=>{
            if(data.error){
                console.log(data.error)
                message1.textContent = data.error
            }else{
                console.log(data)
                message1.textContent = data.location 
                message2.textContent = data.forcastData
            }
        })
    })
}

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    const addressValue = searchInput.value
    console.log('address value is '+addressValue)
    searchWeather(addressValue)
})