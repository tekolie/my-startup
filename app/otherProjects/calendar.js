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
      isDragging: false,
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
    if(data.length > 0){
      data.forEach((res) => {
        const convTime = new TimeConverter(res);

        const top = convTime.getStartMins();
        const leftPost = 50;
        const height = convTime.getTotalHrs();

        const calDiv = new Event(this.cal);
        calDiv.setLabel(res.notes);
        calDiv.setTitle(convTime.getTimeRangeFormat());
        calDiv.setMeta(top, leftPost, height);
        calDiv.showInCal();
      });
    }
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
      calHr = this.setHour({
        start: this.setMins('start', `${this.formatNum(i)}:00`, this.data.mHeight),
        end: this.setMins('end', '', this.data.mHeight),
      });

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
    this.data.isDragging = false;
    if (!this.data.isMouseDwn) {
      this.data.isMouseDwn = true;
      let topPos = (e.pageY - 20);
      topPos = Math.ceil((topPos + 1) / 10 ) * 10;
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
    console.log('handleMouseMove');
    this.data.isDragging = true;
    if (this.data.isDragging  && this.data.isMouseDwn) {
      let mx = e.pageY - this.data.prevY;
      mx = Math.ceil((mx + 1) / 10 ) * 10;
      this.calDiv.showInCal();
      this.calDiv.setHeight(mx);
    }
  }

  handleMouseUp(e) {
    this.data.isDragging = false;
    if (this.data.isMouseDwn) {
      $(this.cal).off('mousemove');
      this.calDiv.setLabel('');

      const convTime = new TimeConverter();
      convTime.setWithMins({
        startMins: e.target.offsetTop,
        endMins: e.target.offsetHeight,
      });
      this.calDiv.setTitle(convTime.getTimeRangeFormat());
      this.calDiv.editEvent();
      this.resetData();
    }
  }

  formatNum(intVal){
    if((intVal).toString().length === 1){
      return '0' + intVal;
    }
    return intVal;
  }
}

export default Calendar;


