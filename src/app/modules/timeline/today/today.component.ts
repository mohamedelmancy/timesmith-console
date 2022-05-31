import { Component, OnInit } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import {CoreService} from "../../../services/core.service";
import {today} from "../../../shared/variables/variables";
declare var $: any;
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
    var _this = this;
    document.addEventListener('readystatechange', function() {
      _this.renderCalendar();
      _this.getEvents();
      // this.getResources();
    });
    setTimeout(() => {

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
      // validRange: {
      //   start: today
      // },
      aspectRatio: 1.5,
      eventClick: (event) => {
        console.log('clicked ', event);
      },
      // select: function(info) {
      //   alert('selected ' + info.startStr + ' to ' + info.endStr);
      // },
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
      resourceAreaColumns: [
        {
          field: 'title',
          headerContent: 'Employee name',
          width: '25%'
        }
      ],
      editable: true,
      droppable: true,
      eventResizableFromStart: true,
      eventDurationEditable: true,
      resourceAreaHeaderContent: 'Staff',
      resources: "https://fullcalendar.io/api/demo-feeds/resources.json?with-nesting&with-colors",
      // resources: [{"id":"g","title":"Taha abd Elsalam", eventColor: "yellow"}, {"id":"l","title":"Saeed El Sharkawy", eventColor: "yellow"}, {"id":"a","title":"Ahmed abd elazeem"},{"id":"b","title":"Omar khairy","eventColor":"green"},{"id":"c","title":"Mohamed talaat","eventColor":"orange"},{"id":"d","title":"Osama yaser"},{"id":"e","title":"Noha alaa"},{"id":"f","title":"Ibrahim tarek","eventColor":"red"}],
      events: "https://fullcalendar.io/api/demo-feeds/events.json?single-day=&for-resource-timeline"
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
    // calendar.render();
  }
}

  getEvents() {
   this.coreService.getRequest('https://fullcalendar.io/api/demo-feeds/events.json?single-day=&for-resource-timeline=&start=2022-05-31T00:00:00Z&end=2022-06-01T00:00:00Z').subscribe(res => {
     console.log('res', this.options.events)
     this.options.events = res;
   }, error => {

   }, () => {
     this.options.events.push({
       "resourceId": "a",
       "title": "Test",
       "start": "2022-05-31T07:08:00+00:00",
       "end": "2022-05-31T09:37:00+00:00",
       "color": 'orange',
       "editable": true,
       "startEditable": true,
       "durationEditable": true,
       "resourceEditable": true
     })
   })
  }

  getResources() {
   this.coreService.getRequest('https://fullcalendar.io/api/demo-feeds/resources.json?with-nesting&with-colors').subscribe(res => {
     console.log('resources', this.options.resources)
     this.options.resources = res;
   }, error => {

   }, () => {
     setTimeout(() => {
       this.options.resources.push({"id":"a","title":"Taha abd Elsalam", eventColor: "yellow"})
     });
   })
  }


}
