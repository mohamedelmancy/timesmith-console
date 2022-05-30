import { Component, OnInit } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import {CoreService} from "../../../services/core.service";

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss']
})
export class TodayComponent implements OnInit {

  constructor(private coreService: CoreService) { }
  options;
  calendar;
  ngOnInit(): void {
    this.calendar = document.getElementById('calendar');
    setTimeout(() => {
      this.renderCalendar();
      this.getEvents();
      this.getResources();
    })
  }

  renderCalendar() {
    this.options = {
      timeZone: 'UTC',
      plugins: [ resourceTimelinePlugin ],
      height: 'auto',
      headerToolbar: {
        // left: 'prev today next',
        left: 'promptResource prev today next',
        // center: 'title',
        // right: 'resourceTimelineDay,resourceTimelineWeek'
        right: ''
      },
      customButtons: {
        promptResource: {
          text: '+ Add',
          click: this.addData.bind(this), // bind is important!
        }
      },
      editable: true,
      aspectRatio: 1.5,
      eventClick: (info) => {
        console.log('clicked ', info);
      },
      select: function(info) {
        alert('selected ' + info.startStr + ' to ' + info.endStr);
      },
      minTime: '06:30:00',
      maxTime: '19:30:00',
      // slotDuration: '00:15:00',
      slotDuration: {minutes: 15},
      // slotLabelFormat: 'h(:mm)a',
      slotLabelFormat: [
        {month: 'long',
          year: 'numeric',
          day: 'numeric',
          weekday: 'long'}, // top level of text
        // { weekday: 'short'}, // lower level of text
        {
          hour: 'numeric',
          minute: '2-digit',
          omitZeroMinute: true,
          meridiem: 'long'
        }
      ],
      resourceAreaWidth: '25%',
      initialView: 'resourceTimelineDay',
      schedulerLicenseKey: 'BUG ',
      cellClassNames: 'fc-cell',
      resourceAreaColumns: [
        {
          field: 'title',
          headerContent: 'Employee name',
          width: '25%'
        }
      ],
      resourceAreaHeaderContent: 'Staff',
      resources: [{"id":"a","title":"Ahmed abd elazeem"},{"id":"b","title":"Omar khairy","eventColor":"green"},{"id":"c","title":"Mohamed talaat","eventColor":"orange"},{"id":"d","title":"Osama yaser"},{"id":"e","title":"Noha alaa"},{"id":"f","title":"Ibrahim tarek","eventColor":"red"}],
      events: ""
    }
  }

  addData() {
  var title = prompt('Room name');
  if (title) {
    var calendarEl = document.getElementById('calendar');
    var calendar = new Calendar(calendarEl, this.options);
    calendar.addResource({
      title: title
    });
    calendar.render();
  }
}

  getEvents() {
   this.coreService.getRequest('https://fullcalendar.io/api/demo-feeds/events.json?single-day=&for-resource-timeline=&start=2022-05-30T00:00:00Z&end=2022-05-31T00:00:00Z').subscribe(res => {
     console.log('res', this.options.events)
     this.options.events = res;
   }, error => {

   }, () => {
     this.options.events.push({
       "resourceId": "a",
       "title": "Test",
       "start": "2022-05-30T07:08:00+00:00",
       "end": "2022-05-30T09:37:00+00:00",
       "color": 'orange',
     })
   })
  }

  getResources() {
   this.coreService.getRequest('https://fullcalendar.io/api/demo-feeds/resources.json?with-nesting&with-colors').subscribe(res => {
     console.log('resources', this.options.resources)
     // this.options.resources = res;
   }, error => {

   }, () => {
     setTimeout(() => {
       this.options.resources.push({"id":"g","title":"Taha abd Elsalam", eventColor: "yellow"})
     });
   })
  }


}
