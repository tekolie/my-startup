import $ from 'jquery';
import TimeConverter from './converter';
import Event from './event';

class Calendar {
  constructor(parentNode) {
    this.data = {
      isMouseDwn: false,
      mHeight: 30,
      prevX: 0,
      prevY: 0,
      isDone: false,
      single: {
        mouseDwn: false,
        prevX: 0,
        prevY: 0,
      },
      events: [],
    };
    this.domApp = parentNode;
    this.cal = document.createElement('div');
    this.cal.className = 'cal-wrap';
    this.setUpCal();
    this.eventHandlers();
  }

  eventHandlers() {
    $(this.cal).on('mousedown', this.handleMouseDwn.bind(this));
    $(this.cal).on('mouseup', this.handleMouseUp.bind(this));
  }

  show() {
    this.domApp.appendChild(this.cal);
  }

  setData(data) {
    data.forEach((res) => {
      const convTime = new TimeConverter(res);

      const top = convTime.getStartMins();
      const leftPost = 50;
      const height = convTime.getTotalHrs();

      const calDiv = new Event(this.cal);
      calDiv.setLabel(res.title);
      calDiv.setTitle(convTime.getFullTime());
      calDiv.setMeta(top, leftPost, height);
    });
  }

  resetData() {
    this.data.isMouseDwn = false;
    this.data.prevX = 0;
    this.data.prevY = 0;
  }

  setTimes(stringTime) {
    var divTime = document.createElement('div');
    divTime.className = 'div-time';
    divTime.innerHTML = stringTime;
    return divTime;
  }

  setUpCal() {
    let calHr;

    for (var i = 0; i < 24; i++) {
      if (i <= 9) {
        calHr = this.setHour({
          start: this.setMins('start', `0${i}:00`, this.data.mHeight),
          end: this.setMins('end', '', this.data.mHeight),
        });
      } else {
        calHr = this.setHour({
          start: this.setMins('start', `${i}:00`, this.data.mHeight),
          end: this.setMins('end', '', this.data.mHeight),
        });
      }

      this.cal.appendChild(calHr);
    }
  }

  setMins(type, stringLabel, mHeight) {
    let mins = document.createElement('div');
    mins.className = `cal-mins mins-${type}`;
    mins.innerHTML = stringLabel;
    mins.style.height = `${mHeight}px`;
    mins.style.lineHeight = `${mHeight}px`;
    return mins;
  }

  setHour({ start, end }) {
    const hr = document.createElement('div');
    hr.className = 'cal-hour';
    hr.appendChild(start);
    hr.appendChild(end);
    return hr;
  }

  /* 
   * EVENTS 
   */
  handleMouseDwn(e) {
    if (!this.data.isMouseDwn) {
      this.data.isMouseDwn = true;
      let tee = (e.pageY - 20);
      let topPos = Math.ceil((tee + 1) / 10 ) * 10;
      let leftPos = 50;

      if (leftPos <= 49) {
        leftPos = 49;
      }

      this.data.prevX = leftPos;
      this.data.prevY = topPos;

      this.calDiv = new Event(this.cal);
      this.calEvnt = this.calDiv.getNode();
      this.calDiv.setMeta(topPos, leftPos);
      $(this.cal).on('mousemove', this.handleMouseMove.bind(this));
    }
  }

  handleMouseMove(e) {
    if (this.data.isMouseDwn) {
      let mx = e.pageY - this.data.prevY;
      this.calEvnt.style.height = `${mx}px`;
    }
  }

  handleMouseUp(e) {
    if (this.data.isMouseDwn) {
      $(this.cal).off('mousemove');
      this.calDiv.setLabel('');

      const convTime = new TimeConverter();
      convTime.setWithMins({
        startMins: e.target.offsetTop,
        endMins: e.target.offsetHeight,
      });
      this.calDiv.setTitle(convTime.getFullTime());
      this.calDiv.editEvent();
      this.resetData();
    }
  }
}

export default Calendar;


