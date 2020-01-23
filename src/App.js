// Challenge
  // Create a calendar that can change months based on code line edits

// Structure & Approach
  // First sight it looks like three divs (header, sub week names, and CSS grid)
  // Approach to loop throguh numbers and map them to page using css grid
  // Should be pretty doable

// Hard part
  // proobably how to not start the one at column 1. Every monht has different days in it and start on different days.
  // hmmm - google how to do get that
  // If I can get this, should be doable from there
  // Seems possible but will be tough for time. 5 mins of planning is up and I'd have to get i) month length (days) ii) starting weekday of month iii) ending weekday of monht

  // NOTE - Also look into moment.js if time instead of date.now

// Approach
  // Start trying to get last and first day of month, current month, current year. Store these in state
  // Then map the css grid with dummy figures first so that I deliver something by 40mins
  // With any spare time, try and update the dummy figures to real numbers from my state


  // 20mins UPdate
    // got title to work with monht live
    // short on time so might hard code with dummy data to progress faster
    // then pseudocode my final approach


  // 15 mins left Update
    // grid is coming along. 
    // as short on time I'm going to loop through the grid first with dummy data
  
  // 13 mins left
    // Dummy data now works. The problem is that, this example always has a set square box (i.e. 7x5). So we need extra days at start and end
    // next steps to sole this would be (in case I run out of time) 
      // find start date of current month (current step)
      // find end date of last month
      // start loops from those days (with math to work out how many for the grayed out)

  // UPDATE only 6 mins left
    // successfully got the first day of the current month
    // will now replicate for the last day of the last month
    // unlikely to have time to update the loops and the grids accordingly or set up the array

  // UPdate 2 mins left
    // succesffuly got the last day of the last month

  // OUT OF TIME
    // NEXT STEPS
      // 1) /* set up a multiple grid column start classes (or do them inline in the JS for easy update) then start the loop from different days (based on the current month start and end date */

      // 2/ Identify how many days are in specific months to ensure the loop doesn't go over that number

      // 3/ Ensure we can toggle the current month in the code (or if UX on click)
        // hypogthesis to do this would be to +1 to the output of getMonth() used on line 83




  


import React, { Component } from 'react';
import Calendar from './Calendar'
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    return (
      <div className="App wrapper">
        <Calendar />
        </div>
    );
  }
}

export default App;
