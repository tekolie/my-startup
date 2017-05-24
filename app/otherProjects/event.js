import $ from 'jquery';

class Event {
  constructor(parentNode) {
    this.obj = {};
    this.data = {
      isMouseDwn: false,
      mHeight: 30,
      prevX: 0,
      prevY: 0,
      isDragging: false,
    };
    this.calDiv = document.createElement('div');
    this.hide();
    this.calDiv.className = 'cal-event';
    this.createUI();
    this.createDeleteButton();
    this.parentNode = parentNode;
    this.setEvents();
  }

  setEvents(){
    $(this.calDiv).dblclick(this.editEvent.bind(this));
    $(this.calDiv).on('mousedown', this.handleMouseDwn.bind(this));
    $(this.calDiv).on('mouseup', this.handleMouseUp.bind(this));
  }

  handleMouseDwn(e) {
    e.stopPropagation();
    this.data.isDragging = false;
    if(!this.data.isMouseDwn) {
      this.data.isMouseDwn = true;

      let prevX = (e.target.style.left).replace('px','');
      let prevY = (e.target.style.top).replace('px','');

      this.data.prevX = parseInt(prevX);
      this.data.prevY = parseInt(prevY);

      console.log(this.data);

      $(this.calDiv).on('mousemove', this.handleMouseMove.bind(this));
    }
  }

  handleMouseMove(e) {
    e.stopPropagation();
    this.data.isDragging = true;
    if (this.data.isDragging  && this.data.isMouseDwn) {
      console.log('handleMouseMove');
      let top = e.pageY;
      console.log(this.data.prevY);
      this.setMeta(top, this.data.prevX);
    }
  }

  handleMouseUp(e) {
    e.stopPropagation();
    this.data.isDragging = false;
    if(this.data.isMouseDwn){
      console.log('handleMouseUp');
      this.data.isMouseDwn = false;
      $(this.calDiv).off('mousemove');
    }
  }

  createUI(){
    this.obj.calTitle = document.createElement('span');
    this.obj.calTitle.className = 'title';

    this.obj.calBody = document.createElement('span');
    this.obj.calInput = document.createElement('textarea');
  }

  createDeleteButton(){
    const glyphicon = document.createElement('span');
    glyphicon.className = 'glyphicon glyphicon-trash';

    this.obj.trash = document.createElement('button');
    this.obj.trash.className = 'trash';
    this.obj.trash.appendChild(glyphicon);
    this.calDiv.appendChild(this.obj.trash);

    $(this.obj.trash).on('click', this.removeEvent.bind(this));
  }

  removeEvent(e){
    e.preventDefault();
    e.stopPropagation();
    let confirmOption = confirm('Are you sure?');
    if(confirmOption === true ){
      $(this.calDiv).slideUp(300, () => { 
        this.parentNode.removeChild(this.calDiv);
      });
    }
  }

  setMeta(topPos, leftPos, height) {
    this.calDiv.style.top = `${topPos}px`;
    this.calDiv.style.left = `${leftPos}px`;

    if (height) {
      this.calDiv.style.height = `${height}px`;
    }
  }

  setHeight(intVal){
    let newHeight = Math.ceil((intVal + 1) / 10 ) * 10;
    this.calDiv.style.height = `${newHeight}px`;
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

  hide(){
    this.calDiv.style.display = 'none';
  }

  showInCal(){
    this.parentNode.appendChild(this.calDiv);
    this.calDiv.style.display = 'block';
  }


  getNode() {
    return this.calDiv;
  }
}

export default Event;