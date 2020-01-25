import React, { Component } from 'react';

class Calendar extends Component {
    constructor() {
    super()
        this.state = {
            currentMonth: 'august',
            currentYear: 2010,
            firstDayOfCurrentMonth: 6,
            daysInCurrentMonth: 30,
            daysInLastMonth: 30,
            finalArrayForDisplay: [],
            arrayOfLastMonthDays: [],
        }
    }

    componentDidMount = () => { 
        // get the exact current date right now just once for usage throughout the app
        const currentDate = new Date();
        // this means we can use the below line of code to change the 'current' month and year shown on page. Just + 1 or -1 from getMonth or getFullYear(). This moves the date shown on the page +1 or -1 away from the actual current date
        const dateForCalendar = new Date(currentDate.getFullYear() + 0, currentDate.getMonth() + 4, currentDate.getDate())
        // get the dates for last and next months around the date you want to show. This helps fill the unused squares in the grid
        const lastMonthDate = new Date(dateForCalendar.getFullYear(), dateForCalendar.getMonth() -1, dateForCalendar.getDate())
        // use the two functions further down to store the 'current' month and year and then set it to state further down so we can display on the page as the header text 
        let monthArray = this.getCurrentMonth(dateForCalendar)
        let year = this.getCurrentYear(dateForCalendar)
        // use the functions lower down to get the week day the 1) 'current' month starts on weekday 2) the number of days in 'current' month 3) the number of days in the last month
        let startWeekDayOfCurrentMonth = this.getStartDate(dateForCalendar)
        let numberOfDaysInCurrentMonth = this.getLengthOfMonth(dateForCalendar);
        let numberOfDaysInLastMonth = this.getLengthOfMonth(lastMonthDate);

        // set in state i) current month and year for header text ii) other variables needed in working out days needed to be looped to page in createArrayForLooping
        //  then run that function only once state has finished setting using a callback as the 2nd parameter
        this.setState({
            currentMonth: monthArray[0],
            currentYear: year,
            firstDayOfCurrentMonth: startWeekDayOfCurrentMonth,
            daysInCurrentMonth: numberOfDaysInCurrentMonth,
            daysInLastMonth: numberOfDaysInLastMonth,
        }, function () {this.createArrayForLooping()})
    }

    getLengthOfMonth = (date) => {
        // get current month first day then convert it to string and pull out just the number of days in it. Then do the same for the last day
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).toString().substr(8, 2);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).toString().substr(8, 2);

        // convert the string number of days into a number then find the difference between the first and last day to get the current month length
        let daysInMonth = ((parseInt(lastDay)) - (parseInt(firstDay)) + 1)

        return daysInMonth;

    }

    getStartDate = (date) => {
        // find the first day of each month in date object format and convert it to a string
        let firstDay = new Date(date.getFullYear(), date.getMonth(), 1).toString();
        // use .includes to convert the first day string into a number. This means we can compare that number to indices and columns later for displaying and calculations
        if (firstDay.includes('Mon')) {
            firstDay = 1
        } else if (firstDay.includes('Tue')) {
            firstDay = 2
        } else if (firstDay.includes('Wed')) {
            firstDay = 3
        } else if (firstDay.includes('Thur')) {
            firstDay = 4
        } else if (firstDay.includes('Fri')) {
            firstDay = 5
        } else if (firstDay.includes('Sat')) {
            firstDay = 6
        } else if (firstDay.includes('Sun')) {
            firstDay = 0
        }
        return firstDay
    }

    getCurrentMonth = (date) => {
        let thisMonthNum = date.getMonth()
        let arrayOfMonths = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER']
        // filter through the array of calendar names. If the number given from .getMonth() === index then that is our current month from the array
        let newArray = arrayOfMonths.filter((month, index) => {
            if (index === thisMonthNum) {
                return month
            }
        })
        return newArray;
    }

    getCurrentYear = (date) => {
        // simply return the current year 
        let thisYearNum = date.getFullYear()
        return thisYearNum;
    }

    createArrayForLooping = () => {
        // second main function to run after component did mount
        // use function below to create an array of the all the  days of the 'current' month that need to be in bold black on the page
        let arrayOfCurrentMonthDays = this.createCurrentMonthDaysArray()
        // use a function below that uses the days of the 'current' month combined with the starting weekday to work out how many days from the prior month are needed to fill the first row. Then put these in an array!
        let arrayOfLastMonthDays = this.createLastMonthDaysArray()
        // concat these two arrays together
        let arrayOfLastAndCurrentDays = arrayOfLastMonthDays.concat(arrayOfCurrentMonthDays)

        // use function below that identify if days from the next month are needed to fill the final row of the grid. If days are needed then create an array of those days 
        let arrayOfNextMonthDays = this.createNextMonthDaysArray(arrayOfLastAndCurrentDays);
        // concat these next month days to our current days going in the grid
        const finalArrayForDisplay = arrayOfLastAndCurrentDays.concat(arrayOfNextMonthDays);
        // set to state i) the final array of days ready for appending to the page ii) also store number of days in the last month to help graying these out later
        this.setState({
            finalArrayForDisplay: finalArrayForDisplay,
            arrayOfLastMonthDays: arrayOfLastMonthDays,
        })
    }

    createCurrentMonthDaysArray = () => {
        let arrayOfCurrentMonthDays = [];
        // use the current month length to push the correct amount of days needed to be shown for the current month
        for (let i = 1; i <= this.state.daysInCurrentMonth; i++) {
            arrayOfCurrentMonthDays.push(i)
        }
        return arrayOfCurrentMonthDays

    }

    createLastMonthDaysArray = () => { 
        // work out the number of boxes we need to fill at the start of the 1st row that are grayed out days from last month. Do this by minusing 1 from the number set in state that represents the weekday column
        let lastMonthDaysNeeded = this.state.firstDayOfCurrentMonth - 1;

        let arrayOfLastMonthDays = [];
        // push the number of days needed from the last month to be shown on the page into an array 
        for (let i = (this.state.daysInLastMonth - lastMonthDaysNeeded); i <= this.state.daysInLastMonth; i++) {
            arrayOfLastMonthDays.push(i)

        }
        // return this ready to be concated with array before the days of the current month
        return arrayOfLastMonthDays
    }

    createNextMonthDaysArray = (array) => {
        let arrayOfNextMonthDays = [];
        // work out the number of boxes we need to fill at the end of the final row that are grayed out days from next month. 
        // This can be three options i) if the current display grid is 5x7 then add no days from next monht ii) if current display grid is over 35, then ensure we add a whole extra row of days from the next month iii) else then add enough days from the next month that we reach a grid size of 35
        if (array.length === 35) {
            // if length of calendar is equal to 35, return it empty
            return arrayOfNextMonthDays;
        } else if (array.length > 35) {
            // if length of calendar is greater than 35, return enough numbers to fill it to a new grid size of 42
            let nextMonthDaysNeeded = 42 - array.length;
            for (let i = 1; i <= nextMonthDaysNeeded; i++) {
                arrayOfNextMonthDays.push(i)

            }
            return arrayOfNextMonthDays;
        } else {
            // else minus the days needed from the next month from 35 to fill the last row
            let nextMonthDaysNeeded = 35 - array.length;
            for (let i = 1; i <= nextMonthDaysNeeded; i++) {
                arrayOfNextMonthDays.push(i)

            }
            // return this ready to be concated with array and displayed on the page after the days of the current month
            return arrayOfNextMonthDays
        }

    }

    
    
    render() { 
        // hard code the days of the week to append at column headers
        let daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return ( 
            <div>
                {/* // structure the HTML into three divs */}
                {/* 1. Header Section*/}
                <div className='headSection'>
                    {/* make the header dynamic with current month and year from state */}
                    <h1>{this.state.currentMonth} {this.state.currentYear}</h1>
                </div>
                {/* 2. SubHeader of Columns Section*/}
                <div className='subHeadSection'>
                    {/* map the hard coded days of the week to page and give them a css grid to align with grid below*/}
                   { daysOfTheWeek.map((day) => {
                        return (
                            <div className='gridItem'>{day}</div>
                        )
                    })
                    }
                </div>
                {/* 3. Days Grid Section*/}
                <div className='gridSection'>
                    {/* map the dynamically calculated right amount of days to fill an entire calendar page of 35 or 42 squares */}
                    {
                        this.state.finalArrayForDisplay.map((date, index) => {
                            
                            //CSS Challenge:  to gray out the numbers that are not from the current month --> use a ternary operator to compare the index of the map to 1) the current month's start weekday 2) the length of the month + the length of last month days included - 1
                            return (
                                index < this.state.firstDayOfCurrentMonth || index > this.state.daysInCurrentMonth + this.state.arrayOfLastMonthDays.length - 1
                                ?
                                <div className='gridItem2 gridItemGray'>{date}</div>

                                :
                                <div className='gridItem2'>{date}</div>
                            )
                        })
                    }
                </div>
            </div>
         );
    }
}
 
export default Calendar;