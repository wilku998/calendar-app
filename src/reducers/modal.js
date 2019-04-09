const initialState={
    modalIsOpen: true,
    selectedDay: {
        day: 'Fri',
        calendarRowPos: 5,
        dayNum: '5',
        monthNum: '04',
        year: '2019',
        weather: [
          {
            dt: 1554422400,
            main: {
              temp: 10.26,
              temp_min: 10.26,
              temp_max: 10.26,
              pressure: 1005.08,
              sea_level: 1005.08,
              grnd_level: 992.36,
              humidity: 57,
              temp_kf: 0
            },
            weather: [
              {
                id: 801,
                main: 'Clouds',
                description: 'few clouds',
                icon: '02n'
              }
            ],
            clouds: {
              all: 12
            },
            wind: {
              speed: 4.91,
              deg: 143.5
            },
            sys: {
              pod: 'n'
            },
            dt_txt: '2019-04-05 00:00:00'
          },
          {
            dt: 1554433200,
            main: {
              temp: 9.41,
              temp_min: 9.41,
              temp_max: 9.41,
              pressure: 1005.9,
              sea_level: 1005.9,
              grnd_level: 993.12,
              humidity: 59,
              temp_kf: 0
            },
            weather: [
              {
                id: 801,
                main: 'Clouds',
                description: 'few clouds',
                icon: '02n'
              }
            ],
            clouds: {
              all: 24
            },
            wind: {
              speed: 4.58,
              deg: 124.501
            },
            sys: {
              pod: 'n'
            },
            dt_txt: '2019-04-05 03:00:00'
          },
          {
            dt: 1554444000,
            main: {
              temp: 9.4,
              temp_min: 9.4,
              temp_max: 9.4,
              pressure: 1006.86,
              sea_level: 1006.86,
              grnd_level: 994.01,
              humidity: 63,
              temp_kf: 0
            },
            weather: [
              {
                id: 800,
                main: 'Clear',
                description: 'clear sky',
                icon: '01d'
              }
            ],
            clouds: {
              all: 0
            },
            wind: {
              speed: 5.12,
              deg: 111
            },
            sys: {
              pod: 'd'
            },
            dt_txt: '2019-04-05 06:00:00'
          },
          {
            dt: 1554454800,
            main: {
              temp: 14.48,
              temp_min: 14.48,
              temp_max: 14.48,
              pressure: 1007.8,
              sea_level: 1007.8,
              grnd_level: 995.2,
              humidity: 68,
              temp_kf: 0
            },
            weather: [
              {
                id: 800,
                main: 'Clear',
                description: 'clear sky',
                icon: '01d'
              }
            ],
            clouds: {
              all: 0
            },
            wind: {
              speed: 4.67,
              deg: 108.504
            },
            sys: {
              pod: 'd'
            },
            dt_txt: '2019-04-05 09:00:00'
          },
          {
            dt: 1554465600,
            main: {
              temp: 16.5,
              temp_min: 16.5,
              temp_max: 16.5,
              pressure: 1007.57,
              sea_level: 1007.57,
              grnd_level: 995.11,
              humidity: 68,
              temp_kf: 0
            },
            weather: [
              {
                id: 800,
                main: 'Clear',
                description: 'clear sky',
                icon: '01d'
              }
            ],
            clouds: {
              all: 0
            },
            wind: {
              speed: 5.66,
              deg: 88.5053
            },
            sys: {
              pod: 'd'
            },
            dt_txt: '2019-04-05 12:00:00'
          },
          {
            dt: 1554476400,
            main: {
              temp: 16.14,
              temp_min: 16.14,
              temp_max: 16.14,
              pressure: 1007.57,
              sea_level: 1007.57,
              grnd_level: 995.14,
              humidity: 62,
              temp_kf: 0
            },
            weather: [
              {
                id: 800,
                main: 'Clear',
                description: 'clear sky',
                icon: '01d'
              }
            ],
            clouds: {
              all: 0
            },
            wind: {
              speed: 6.16,
              deg: 88.0031
            },
            sys: {
              pod: 'd'
            },
            dt_txt: '2019-04-05 15:00:00'
          },
          {
            dt: 1554487200,
            main: {
              temp: 12.75,
              temp_min: 12.75,
              temp_max: 12.75,
              pressure: 1008.82,
              sea_level: 1008.82,
              grnd_level: 996.3,
              humidity: 58,
              temp_kf: 0
            },
            weather: [
              {
                id: 800,
                main: 'Clear',
                description: 'clear sky',
                icon: '01n'
              }
            ],
            clouds: {
              all: 0
            },
            wind: {
              speed: 6.16,
              deg: 78.0019
            },
            sys: {
              pod: 'n'
            },
            dt_txt: '2019-04-05 18:00:00'
          },
          {
            dt: 1554498000,
            main: {
              temp: 10.03,
              temp_min: 10.03,
              temp_max: 10.03,
              pressure: 1010.54,
              sea_level: 1010.54,
              grnd_level: 997.75,
              humidity: 61,
              temp_kf: 0
            },
            weather: [
              {
                id: 800,
                main: 'Clear',
                description: 'clear sky',
                icon: '01n'
              }
            ],
            clouds: {
              all: 0
            },
            wind: {
              speed: 6.11,
              deg: 80.0046
            },
            sys: {
              pod: 'n'
            },
            dt_txt: '2019-04-05 21:00:00'
          }
        ],
        containTasks: true,
        containExpenses: true,
        containIncomes: true
      }
}

export default (state={...initialState}, action) => {
    const { type } = action;
    
    switch(type){
        case 'TOGGLE_MODAL':
            const { modalIsOpen, selectedDay } = action;
            console.log(modalIsOpen)
            return {
                modalIsOpen,
                selectedDay
            }
        default:
            return state
    }
}