class TimeConverter {
  constructor(obj) {
    this.data = {};
    if(obj)
      this.toDateObj(obj);
  }

  toDateObj(obj) {
    this.data.startDate = new Date(obj.startDate);
    this.data.endDate = new Date(obj.endDate);
  }

  setWithMins({ startMins, endMins }){
    let isToHrs = false;

    let newEnd = endMins;
    let newStart = Math.ceil(startMins / 60);
    

    if(newEnd >= 60){
      let totalMins = (endMins + startMins);
      newEnd = (totalMins / 60);
      isToHrs = true;
    }
    
    this.data.startDate = new Date();
    this.data.endDate = new Date();

    this.data.startDate.setHours(newStart);
    this.data.startDate.setMinutes(0);

    if(isToHrs){
      this.data.endDate.setHours(newEnd);
      this.data.endDate.setMinutes(0);
    } else {
      this.data.endDate.setHours(newStart);
      this.data.endDate.setMinutes(newEnd);
    }    
  }

  getStartMins() {
    const hrsToMins = this.data.startDate.getHours() * 60;
    const mins = this.data.startDate.getMinutes();
    return hrsToMins + mins;
  }

  getEndMins() {
    const hrsToMins = this.data.endDate.getHours() * 60;
    const mins = this.data.endDate.getMinutes();
    return hrsToMins + mins;
  }

  getTotalHrs() {
    const total = this.getEndMins() - this.getStartMins();
    return total;
  }

  getFullTime() {
    const { startDate, endDate } = this.data;
    let from = `${this.formatNum(startDate.getHours())}:${this.formatNum(startDate.getMinutes())}`;
    let to = `${this.formatNum(endDate.getHours())}:${this.formatNum(endDate.getMinutes())}`;
    return `${from} - ${to}`;
  }

  formatNum(intVal){
    if((intVal).toString().length === 1){
      return '0' + intVal;
    }
    return intVal;
  }
}

export default TimeConverter;