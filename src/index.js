import './styles.css';

"use strict";
class CountdownTimer {
  constructor({ selector, date }) {
    this.selector = document.querySelector(selector);
    this.date = date;
    this._timerID = null;
    this.start();
  }
  setDate(deltaTime) {
    if (deltaTime <= Date.now) {      
      clearInterval(this._timerID);
      this.selector.innerHTML = `<div class="timer-success">FINISH</div>`;
    } else {
      let days = this.selector.querySelector('span[data-value="days"]');
      let hours = this.selector.querySelector('span[data-value="hours"]');
      let mins = this.selector.querySelector('span[data-value="mins"]');
      let secs = this.selector.querySelector('span[data-value="secs"]');
      days.textContent = Math.floor(deltaTime / (1000 * 60 * 60 * 24));
      hours.textContent = pad(Math.floor(
        (deltaTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      ));
      mins.textContent = pad(Math.floor(
        (deltaTime % (1000 * 60 * 60)) / (1000 * 60)
      ));
      secs.textContent = pad(Math.floor((deltaTime % (1000 * 60)) / 1000));
    }
    
  }
 
  makeInterval() {
    if (this._timerID === null) {
      this._timerID = setInterval(() => {
        const delta = this.date - Date.now();
        this.setDate(delta);
      }, 1000);
    }
  }
  start() {
    this.makeInterval();
  }
}

function pad(value) {
  return String(value).padStart(2, '0');
};
const timer = new CountdownTimer({
  selector: "#timer-1",
  date: new Date("Mar 8, 2021"),
});