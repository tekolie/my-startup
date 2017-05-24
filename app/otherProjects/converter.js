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
    let isHrs = false;
    let newEnd = endMins;
    let newStart = Math.ceil(startMins / 60);

    if(newEnd >= 60){
      isHrs = true;
      let totalMins = (endMins + startMins);
      newEnd = (totalMins / 60);
    }
    
    this.data.startDate = new Date();
    this.data.endDate = new Date();

    this.data.startDate.setHours(newStart);
    this.data.startDate.setMinutes(0);

    this.data.endDate.setHours( (isHrs) ? newEnd : newStart);
    this.data.endDate.setMinutes((isHrs) ? this.getMinsFromHrs(newEnd) : newEnd);   
  }

  getMinsFromHrs(intVal){
    if(intVal >= 60) {
      return intVal;
    }
    let toMins = (intVal % 1) * 60;
    return toMins;
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

  getTimeRangeFormat() {
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