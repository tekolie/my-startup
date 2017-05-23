import $ from 'jquery';

class Event {
  constructor(parentNode) {
    this.obj = {};
    this.calDiv = document.createElement('div');
    this.calDiv.className = 'cal-event';
    this.createUI();
    parentNode.appendChild(this.calDiv);
    $(this.calDiv).dblclick(this.editEvent.bind(this));
    $(this.calDiv).on('mousedown', this.handleSingleEvnt.bind(this));
  }

  handleSingleEvnt(e) {
    e.stopPropagation();
  }

  createUI(){
    this.obj.calTitle = document.createElement('span');
    this.obj.calTitle.className = 'title';
    
    this.obj.calBody = document.createElement('span');
    this.obj.calInput = document.createElement('textarea');
  }

  setMeta(topPos, leftPos, height) {
    this.calDiv.style.top = `${topPos}px`;
    this.calDiv.style.left = `${leftPos}px`;

    if (height) {
      this.calDiv.style.height = `${height}px`;
    }
  }

  editEvent(){
    this.hideSpan();
    this.showInput();
    
    this.obj.calInput.value = this.obj.calBody.innerHTML;
    this.calDiv.appendChild(this.obj.calInput);
    $(this.obj.calInput).focus();
    $(this.obj.calInput).blur(this.saveChanges.bind(this));
  }

  saveChanges(e){
    const { calBody, calInput } = this.obj;
    calBody.innerHTML = e.target.value;
    calInput.style.display = 'none';
    this.showSpan();
  }

  setTitle(stringTitle){
    this.obj.calTitle.innerHTML = stringTitle;
    $(this.calDiv).prepend(this.obj.calTitle);
  }

  setLabel(stringText){
    this.obj.calBody.innerHTML = stringText;
    this.calDiv.appendChild(this.obj.calBody);
  }

  hideSpan(){
    this.obj.calBody.style.display = 'none';
  }

  showSpan(){
    this.obj.calBody.style.display = 'block';
  }

  hideInput(){
    this.obj.calInput.style.display = 'none';
  }

  showInput(){
    this.obj.calInput.style.display = 'block';
  }

  getNode() {
    return this.calDiv;
  }
}

export default Event;