import _ from 'lodash';
import logo from './img/icon.jpg';

export default () => {
  var element = document.createElement('div');
  var imgEle = document.createElement('img');

  /* lodash is required for the next line to work */
  element.innerHTML = _.join(['Hello','webpacks'], ' ');
  imgEle.setAttribute('src', logo);
  imgEle.setAttribute('width', 300);
  imgEle.setAttribute('height', 300);
  element.appendChild(imgEle);

  return element;
};
