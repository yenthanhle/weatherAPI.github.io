// units=metric -> °C
// cnt=4 -> số ngày
// appid=53fbf527d52d4d773e828243b90c1f8e -> API key
var url = 'https://api.openweathermap.org/data/2.5/forecast/daily?q=Saigon&lang=vi&units=metric&cnt=4&appid=53fbf527d52d4d773e828243b90c1f8e'
const $ = document.querySelector.bind(document)
const $$ = document.querySelector.bind(document)
var daysName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const app = {
    location: 'Thành phố Hồ Chí Minh',
    day: new Date().toString().split(' '),
    getData(callback) {
        fetch(url)
            .then(data => {
                return data.json()
            })
            .then(callback)
    },
    loadAllDay(data) {
        // Load at firrst time
        this.loadDetailOneDay(data, 0)
        var html = data.list.map((x, index) => {
            return `<li day-index=${index} class="day${index == 0 ? ' active' : ''}">
                <i class="day-icon" data-feather="sun"></i>
                <span class="day-name">${daysName[new Date().getDay() + index]}</span>
                <span class="day-temp">${Math.floor(x.temp.day)} °C</span>
            </li>`
        })
        const htmls = html.join('')
        $('.week-list').innerHTML = htmls
    },

    loadDetailOneDay(data, index) {
        // Load infor of seleted day
        const weathersInfor = this.convertDataToObject(data)
        $('.date-dayname').innerText = weathersInfor[index].dayName
        $('.date-day').innerText = `${this.day[2]} ${this.day[1]} ${this.day[3]}`
        $('.location').innerText = `${data.city.name}, ${data.city.country}`
        $('.weather-temp').innerText = weathersInfor[index].temp
        $('.weather-desc').innerText = weathersInfor[index].description
        $('.humidity .value').innerText = weathersInfor[index].humidity
        $('.pressure .value').innerText = weathersInfor[index].pressure
        $('.mintemp .value').innerText = weathersInfor[index].mintemp
        $('.maxtemp .value').innerText = weathersInfor[index].maxtemp

    },

    convertDataToObject: function (data) {
        var weathersObject = []
        for (let i in data.list) {
            const weatherInfor = {
                dayName: daysName[new Date().getDay() + Number(i)],
                temp: `${Math.floor(data.list[i].temp.day)} °C`,
                description: data.list[i].weather[0].description,
                humidity: `${data.list[i].humidity} %`,
                pressure: `${data.list[i].pressure} atm`,
                mintemp: `${Math.floor(data.list[i].temp.min)} °C`,
                maxtemp: `${Math.floor(data.list[i].temp.max)} °C`
            }
            weathersObject.push(weatherInfor)
        }
        return weathersObject

    },

    // Select a day in week list
    handleEnvent(data) {
        _this = this
        $('.week-list').onclick = function (e) {
            $('.day.active').classList.remove('active')
            e.target.closest('.day').classList.add('active')
            const dayIndex = e.target.closest('.day').getAttribute('day-index')
            _this.loadDetailOneDay(data, dayIndex)
        }

    },
    start() {
        this.getData(resutl => {
            this.loadAllDay(resutl)
            this.handleEnvent(resutl)
        })
    }
}

app.start()

