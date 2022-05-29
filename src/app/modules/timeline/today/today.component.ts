import { Component, OnInit } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss']
})
export class TodayComponent implements OnInit {

  constructor() { }
  options;
  ngOnInit(): void {
    this.renderCalendar();
  }

  renderCalendar() {
    var calendarEl = document.getElementById('calendar');

    this.options = {
      timeZone: 'UTC',
      plugins: [ resourceTimelinePlugin ],
      headerToolbar: {
        left: 'promptResource today prev,next',
        center: 'title',
        right: 'resourceTimelineDay,resourceTimelineWeek'
      },
      customButtons: {
        promptResource: {
          text: '+ room',

        }
      },
      editable: true,
      aspectRatio: 1.5,
      eventClick: function(info) {
        alert('clicked ' + info);
      },
      select: function(info) {
        alert('selected ' + info.startStr + ' to ' + info.endStr);
      },
      dateClick: this.handleDateClick.bind(this), // bind is important!
      initialView: 'resourceTimelineDay',
      resourceAreaHeaderContent: 'Rooms',
      resources: 'https://fullcalendar.io/demo-resources.json?with-nesting&with-colors',
      events: [
        { title: 'event 1', date: '2022-05-01' },
        { title: 'event 2', date: '2022-05-02' },
      ]
    }
  }

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }
}
