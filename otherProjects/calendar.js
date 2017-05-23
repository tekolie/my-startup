/*
Time calculation

1am  - 2am  == top: 60, height: 60

Total = 720px


TotalMins = 30 * 24 = 720mins
TotalHrs = TotalMins / 30 = 24hrs


Work out mins = (TotalMins / 60)
*/
const domApp = document.getElementById("app");
const data = [
  {
    startDate: '2017-05-23 01:00',
    endDate: '2017-05-23 02:00'
  },
  {
    startDate: '2017-05-23 03:00',
    endDate: '2017-05-23 03:30'
  },
  {
    startDate: '2017-05-23 14:00',
    endDate: '2017-05-23 17:00'
  }
];

class TimeConverter {
   constructor(obj){
     this.data = {};
     this.toDateObj(obj);
   }
  
   toDateObj = (obj) => {
     this.data.startDate = new Date(obj.startDate);
     this.data.endDate = new Date(obj.endDate);
   }
   
   getStartMins = () => {
     return this.data.startDate.getHours() * 30;
   }
};


/* ###################################
 # 
 #    CALENDAR
 #
 #####################################
 */
class Calendar {
  constructor(){
    this.data = {
      isMouseDwn: false,
      mHeight: 30,
      prevX: 0,
      prevY: 0,
      isDone: false,
      single: {
        mouseDwn: false,
        prevX: 0,
        prevY: 0
      },
      events: []
    };
    this.cal = document.createElement("div");
    this.cal.className = "cal-wrap";
    this.setUpCal();
    this.eventHandlers();  
  }
  
  eventHandlers = () => {
    $(this.cal).on("mousedown", this.handleMouseDwn);
    $(this.cal).on("mouseup", this.handleMouseUp);
  }
  
  show = () => {
    domApp.appendChild(this.cal);
  }
  
  setData(data){
    data.forEach((res) => {
      const convTime = new TimeConverter(res);
      
      const top = convTime.getStartMins();
      const calDiv = new Event(this.cal);
      calDiv.setMeta(top, 100, 10);
    });
  }
  
  resetData = () => {
    this.data.isMouseDwn = false;
    this.data.prevX = 0;
    this.data.prevY = 0;
  }
  
  setTimes = (stringTime) => {
    var divTime = document.createElement("div");
    divTime.className = "div-time";
    divTime.innerHTML = stringTime;
    return divTime;
  }
  
  setUpCal = () => {
    let calHr;
    
    for(var i = 0 ; i < 24; i++){
     if(i <= 9) {
       calHr = this.setHour({
         start: this.setMins('start',`0${i}:00`, this.data.mHeight),
         end: this.setMins('end','', this.data.mHeight)
       });
     } else {
       calHr = this.setHour({
         start: this.setMins('start', `${i}:00`, this.data.mHeight),
         end: this.setMins('end','', this.data.mHeight)
       });
     }
     
     this.cal.appendChild(calHr);
   } 
  }
  
  setMins = (type, stringLabel, mHeight) =>{
    let mins = document.createElement("div");
    mins.className = `cal-mins mins-${type}`;
    mins.innerHTML = stringLabel;
    mins.style.height = `${mHeight}px`;
    mins.style.lineHeight = `${mHeight}px`;
    return mins;
  }
  
  setHour = ({ start, end }) =>{
    const hr = document.createElement("div");
    hr.className = "cal-hour";
    hr.appendChild(start)
    hr.appendChild(end);
    return hr;
  }
   
  /* 
   * EVENTS 
   */
  handleMouseDwn = (e) => {
    if(!this.data.isMouseDwn){
      this.data.isMouseDwn = true;
      
      let topPos = e.pageY - 15;
      let leftPos = e.pageX - 15;
      
      if(leftPos <= 49){
        leftPos = 49;
      }
      
      this.data.prevX = leftPos;
      this.data.prevY = topPos;
  
      
      const calDiv = new Event(this.cal);
      calDiv.setMeta(topPos, leftPos);
      this.calEvnt = calDiv.getNode();
      $(this.cal).on("mousemove", this.handleMouseMove);
    }
  }
 
  handleMouseMove = (e) => {
    if(this.data.isMouseDwn){ 
      let mx = e.pageY - this.data.prevY;
      this.calEvnt.style.height = `${mx}px`;
    }
  }
  
  handleMouseUp = (e) => {
    if(this.data.isMouseDwn){
      $(this.cal).off("mousemove");
      this.resetData();
    }
  }
  
};


/* ###################################
 # 
 #    SINGLE EVENTS 
 #
 #####################################
 */
class Event {
  constructor(parentNode){
    this.calDiv = document.createElement("div");
    this.calDiv.className = "cal-event";
    parentNode.appendChild(this.calDiv);
    
    $(this.calDiv).on("mousedown", this.handleSingleEvnt);
  }
  
  handleSingleEvnt = (e) => {
    e.stopPropagation();
  }
  
  setMeta = (topPos, leftPos, height) => {
    this.calDiv.style.top = `${topPos}px`;
    this.calDiv.style.left = `${leftPos}px`;
    
    if(height){
      this.calDiv.style.height = `${height}px`;
    }
  }
  
  getNode(){
    return this.calDiv;
  }
}

const App = new Calendar(data);
App.setData(data);
App.show();