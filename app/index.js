/*import component from './component';
import './style.scss';
import react from 'react';

document.body.appendChild(component());*/

import Calendar from './otherProjects/calendar';
import './otherProjects/cal-style.scss';

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
    'endDate': '2017-05-23 03:30',
    'notes': 'Job Interview',
  },
  {
    'startDate': '2017-05-23 05:00',
    'endDate': '2017-05-23 08:30',
    'notes': 'Singing lessons',
  },
  {
    'startDate': '2017-05-23 10:00',
    'endDate': '2017-05-23 12:30',
    'notes': 'oops! Singing lessons',
  },
];


const App = new Calendar(domApp);
App.setData(data);
App.show();
