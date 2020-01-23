import React, { Component } from 'react';

class Calendar extends Component {
    constructor() {
    super()
        this.state = {
            currentMonth: 'February',
            currentYear: 2010,
            firstDayOfCurrentMonth: 'Monday',
            lastDayOfCurrentMonth: 'Monday',
        }
    }

    componentDidMount = () => {
        let monthArray = this.getCurrentMonth()
        let year = this.getCurrentYear()
        this.setState({
            currentMonth: monthArray[0],
            currentYear: year,
        })
        // with more time I would refactor the code to make it cleaner by using the same function for first and last
        let startDayOfCurrentMonth = this.getStartDate()
        let lastDayOfLastMonth = this.getLastDate()

        this.setState({
            firstDayOfCurrentMonth: startDayOfCurrentMonth,
            lastDayOfCurrentMonth: lastDayOfLastMonth,
        })
    }

    getStartDate = () => {
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).toString();
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).toString();
        console.log(firstDay)
        // actually use .includes
        if (firstDay.includes('Mon')) {
            firstDay = 'Monday'
        } else if (firstDay.includes('Tue')) {
            firstDay = 'Tuesday'
        } else if (firstDay.includes('Wed')) {
            firstDay = 'Wednesday'
        } else if (firstDay.includes('Thur')) {
            firstDay = 'Thursday'
        } else if (firstDay.includes('Fri')) {
            firstDay = 'Friday'
        } else if (firstDay.includes('Sat')) {
            firstDay = 'Saturday'
        } else if (firstDay.includes('Sun')) {
            firstDay = 'Sunday'
        }
        return firstDay
        // console.log(lastDay)
    }

    getLastDate = () => {
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).toString();
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 0, 0).toString();
        // but change this to last month not current. got lucky:)
        console.log(lastDay)
        if (lastDay.includes('Mon')) {
            lastDay = 'Monday'
        } else if (lastDay.includes('Tue')) {
            lastDay = 'Tuesday'
        } else if (lastDay.includes('Wed')) {
            lastDay = 'Wednesday'
        } else if (lastDay.includes('Thur')) {
            lastDay = 'Thursday'
        } else if (lastDay.includes('Fri')) {
            lastDay = 'Friday'
        } else if (lastDay.includes('Sat')) {
            lastDay = 'Saturday'
        } else if (lastDay.includes('Sun')) {
            lastDay = 'Sunday'
        }
        return lastDay
    }
    // function to get current monht
    getCurrentMonth = () => {
        let thisMonthNum = new Date().getMonth()
        console.log(thisMonthNum)
        let arrayOfMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        // map through it. Compare this thisMonthNum to index to get the name
        // for changing the month, we should be able to add one to this filter to change state
        let newArray = arrayOfMonths.filter((month, index) => {
            if (index === thisMonthNum) {
                return month
            }
        })
        return newArray;
    }

    getCurrentYear = () => {
        let thisYearNum = new Date().getFullYear()
        return thisYearNum;
    }
    
    render() { 
        let daysOfTheWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

        let daysOfTheMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];


        return ( 
            <div>
                {/* // build three divs */}
                <div className='headSection'>
                    <h1>{this.state.currentMonth} {this.state.currentYear}</h1>
                </div>
                <div className='subHeadSection'>
                   { daysOfTheWeek.map((day) => {
                        return (
                            <div className='gridItem'>{day}</div>
                        )
                    })
                    }
                </div>
                <div className='gridSection'>
                    {
                        daysOfTheMonth.map((date) => {
                            return (
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