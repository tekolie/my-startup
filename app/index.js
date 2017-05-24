/*import component from './component';
import './style.scss';
import react from 'react';

document.body.appendChild(component());*/

import Calendar from './otherProjects/calendar';
import './otherProjects/cal-style.scss';

// Add BootStrap
const linkRel = document.createElement('link');
linkRel.setAttribute('rel','stylesheet');
linkRel.setAttribute('href','https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css');
document.head.appendChild(linkRel);

const domApp = document.createElement('div');
domApp.id = 'app';
document.body.appendChild(domApp);

const data = [
  {
    'startDate': '2017-05-23 01:00',
    'endDate': '2017-05-23 02:00',
    'notes': 'Choir rehearsal',
  },
  {
    'startDate': '2017-05-23 03:00',
    'endDate': '2017-05-23 04:00',
    'notes': 'Job Interview',
  },
];


const App = new Calendar(domApp);
App.setData(data);
App.show();
