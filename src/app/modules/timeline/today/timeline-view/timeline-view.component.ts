import {Component, OnInit} from '@angular/core';
import {Calendar} from '@fullcalendar/core';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import {CoreService} from "../../../../services/core.service";
import {GetLanguage} from "../../../../shared/functions/shared-functions";
import {FormControl, FormGroup} from "@angular/forms";
import moment from "moment";
import interactionPlugin, {Draggable} from '@fullcalendar/interaction';
import enLocale from '@fullcalendar/core/locales/en-au';
import arLocale from '@fullcalendar/core/locales/ar-sa';
import {TranslateService} from "@ngx-translate/core";
import {MatDialog} from "@angular/material/dialog";
import {CreateTimelineComponent} from "../../../../modals/create-timeline/create-timeline.component";
import {date} from "ng2-validation/dist/date";

@Component({
  selector: 'app-timeline-view',
  templateUrl: './timeline-view.component.html',
  styleUrls: ['./timeline-view.component.scss']
})
export class TimelineViewComponent implements OnInit {
  options;
  calendar;
  exceptionCodes = [
    {
      title: 'Open time',
      color: 'orange'
    },
    {
      title: 'Permission',
      color: 'green'
    },
    {
      title: 'External Assignment',
      color: 'red'
    },
    {
      title: 'Present',
      color: 'blue'
    },
    {
      title: 'Open time Off Campus',
      color: 'grey'
    },

  ]
  leaves = [
    {
      title: 'Annual',
      color: 'grey'
    },
    {
      title: 'Sick',
      color: 'red'
    },
    {
      title: 'Casual',
      color: 'green'
    },
    {
      title: 'Public Holiday',
      color: 'grey'
    }
  ]

  constructor(private coreService: CoreService, private translateService: TranslateService, public dialog: MatDialog) {
  }

  // https://codepen.io/pen?editors=0010
  ngOnInit(): void {
    this.calendar = document.getElementById('calendar');
    var _this = this;
    setTimeout(() => {
      let draggableEl = document.getElementById('mydraggable');
      _this.renderCalendar();
      _this.getEvents();
      // this.getResources();
      new Draggable(draggableEl, {
        itemSelector: '.dgraggable',
        eventData: function (eventEl) {
          return {
            title: eventEl.innerText,
            duration: '03:00'
          };
        }
      });
    });
  }

  renderCalendar() {
    this.options = {
      timeZone: 'UTC',
      plugins: [resourceTimelinePlugin],
      height: '70vh',
      headerToolbar: {
        // left: 'prev today next',
        left: GetLanguage() === 'en' ? 'promptResource prev today next' : '',
        // center: 'title',
        // right: 'resourceTimelineDay,resourceTimelineWeek'
        right: GetLanguage() === 'ar' ? 'promptResource prev today next' : ''
      },
      customButtons: {
        promptResource: {
          text: `+ ${this.translateService.instant('Add')}`,
          click: this.addData.bind(this), // bind is important!
        },
        today: {
          text: `${this.translateService.instant('Today')}`,
        }
      },
      eventResize: function (info) {
        console.log('info.event ', info.event);

        alert(info.event.title + " start is now " + info.event.start.toISOString() + ' and end in ' + info.event.end.toISOString());

        if (!confirm("is this okay?")) {
          info.revert();
        }
      },
      eventDrop: function (info) {
        console.log('info.event ', info.event);

        alert(info.event.title + " start is now " + info.event.start.toISOString() + ' and end in ' + info.event.end.toISOString());

        if (!confirm("is this okay?")) {
          info.revert();
        }
      },
      drop: function (data) {
        console.log('data ', data);
        alert(" start is now " + data.dateStr + ' and end in ' + data.date + "for " + data.resource.title);

        if (!confirm("is this okay?")) {
          data.revert();
        }
      },
      // validRange: {
      //   start: today
      // },
      aspectRatio: 1.5,
      eventClick: (info) => {
        console.log('info.event ', info.event);
        alert(info.event.title + " start is now " + info.event.start.toISOString() + ' and end in ' + info.event.end.toISOString());
      },
      // select: function(info) {
      //   alert('selected ' + info.startStr + ' to ' + info.endStr);
      // },
      // slotDuration: '00:15:00',
      slotDuration: {minutes: 15},
      // slotLabelFormat: 'h(:mm)a',
      slotLabelFormat: [
        {
          month: 'long',
          year: 'numeric',
          day: 'numeric',
          weekday: 'long'
        }, // top level of text
        // { weekday: 'short'}, // lower level of text
        {
          hour: 'numeric',
          minute: '2-digit',
          omitZeroMinute: true,
          meridiem: 'long'
        }
      ],
      slotWidth: 20,
      resourceAreaWidth: '20%',
      initialView: 'resourceTimelineDay',
      schedulerLicenseKey: 'BUG ',
      locales: [enLocale, arLocale],
      locale: GetLanguage(),
      direction: GetLanguage() === 'ar' ? 'rtl' : 'ltr',
      resourceAreaColumns: [
        {
          field: 'title',
          headerContent: 'Employee name',
          width: '100%',
          cellClassNames: 'resource-cell'
        }
      ],
      editable: true,
      droppable: true,
      eventResizableFromStart: true,
      eventDurationEditable: true,
      eventResourceEditable: true,
      resourceAreaHeaderContent: 'Staff',
      // resources: "https://fullcalendar.io/api/demo-feeds/resources.json?with-nesting&with-colors",
      resources: [{"id": "5", "title": "Taha abd Elsalam", eventColor: "yellow"}, {
        "id": "l",
        "title": "Saeed El Sharkawy",
        eventColor: "yellow"
      }, {"id": "a", "title": "Ahmed abd elazeem"}, {
        "id": "b",
        "title": "Omar khairy",
        "eventColor": "green"
      }, {"id": "c", "title": "Mohamed talaat", "eventColor": "orange"}, {
        "id": "d",
        "title": "Osama yaser"
      }, {"id": "e", "title": "Noha alaa"}, {"id": "f", "title": "Ibrahim tarek", "eventColor": "red"}],
      events: "https://fullcalendar.io/api/demo-feeds/events.json?single-day=&for-resource-timeline"
    }
  }

  addData() {
    const dialogRef = this.dialog.open(CreateTimelineComponent, {
      data: {},
      direction: GetLanguage() === 'ar' ? 'rtl' : 'ltr',
      minHeight: '50%',
      width: window.innerWidth > 1199 ? '35%' : '90%',
      hasBackdrop: false
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', new Date(result?.data?.dateFrom));
      const id = 'g';
      this.options.resources = [...this.options.resources, {title: result?.data?.name, id, 'eventColor': 'green'}];
      this.options.events.push({
        "resourceId": 'g',
        "title": result?.data?.name,
        // "start": new Date(result?.data?.dateFrom),
        // "end": new Date(result?.data?.dateTo),
        "start": '2022-06-02T09:00:00+00:00',
        "end": '2022-06-02T10:00:00+00:00',
      })
      console.log('ee', this.options.events)
      console.log('ss', this.options.resources)
    });
  }

  getEvents() {
    this.coreService.getRequest('https://fullcalendar.io/api/demo-feeds/events.json?single-day=&for-resource-timeline=&start=2022-06-02T00:00:00Z&end=2022-06-03T00:00:00Z').subscribe(res => {
      console.log('res', this.options.events)
      this.options.events = res;
    }, error => {

    }, () => {
      this.options.events.push({
        "resourceId": "a",
        "title": "Test",
        "start": "2022-06-02T07:08:00+00:00",
        "end": "2022-06-02T09:37:00+00:00",
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
        this.options.resources.push({"id": "a", "title": "Taha abd Elsalam", eventColor: "yellow"})
      });
    })
  }

  showAll(type) {
    if (type === 'codes') {
      for (let i = 0; i < 10; i++) {
        this.exceptionCodes.push(this.exceptionCodes[0]);
      }
    } else {
      for (let i = 0; i < 10; i++) {
        this.leaves.push(this.leaves[0]);
      }
    }
  }

}
