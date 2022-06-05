import {Component, OnInit, ViewChild} from '@angular/core';
import {Calendar, CalendarApi} from '@fullcalendar/core';
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
import {today} from "../../../../shared/variables/variables";
import {EventApi, FullCalendarComponent} from "@fullcalendar/angular";
import {element} from "screenfull";

declare var $: any;

@Component({
  selector: 'app-timeline-view',
  templateUrl: './timeline-view.component.html',
  styleUrls: ['./timeline-view.component.scss'],
  providers: [CalendarApi]
})
export class TimelineViewComponent implements OnInit {
  @ViewChild("fullcalendar", {static: false}) calendarComponent: FullCalendarComponent;
  options;
  eventDidMounted = false;
  stillEvent;
  movingEvent;
  exceptionCodes = [
    {
      title: 'Open time',
      color: 'orange',
      icon: 'fa-reddit'
    },
    {
      title: 'Permission',
      color: 'green',
      icon: 'fa-clock-o'
    },
    {
      title: 'External Assignment',
      color: 'red',
      icon: 'fa-lastfm-square'
    },
    {
      title: 'Present',
      color: 'blue',
      icon: 'fa-legal'
    },
    {
      title: 'Open time Off Campus',
      color: 'grey',
      icon: 'fa-leaf'
    },

  ]
  leaves = [
    {
      title: 'Annual',
      color: 'orange',
      overlap: true
    },
    {
      title: 'Sick',
      color: 'red',
      overlap: true
    },
    {
      title: 'Casual',
      color: 'green',
      overlap: true
    },
    {
      title: 'Public Holiday',
      color: 'grey',
      overlap: true
    }
  ]
  calendarApi: Calendar;

  constructor(private coreService: CoreService, private translateService: TranslateService, public dialog: MatDialog) {
  }

  // https://codepen.io/pen?editors=0010
  // https://stackoverflow.com/questions/71299412/fullcalendar-how-to-display-non-overlapping-events-inside-same-day-cell-in-one
  ngOnInit(): void {
    var _this = this;
    setTimeout(() => {
      let draggableEl = document.getElementById('mydraggable');
      _this.renderCalendar();
      _this.getEvents();
      // this.getResources();
      new Draggable(draggableEl, {
        itemSelector: '.dgraggable',
        eventData: function (eventEl) {
          const event = _this.leaves.find(element => element.title.toLowerCase() === eventEl.innerText.toLowerCase())
          return {
            title: eventEl.innerHTML,
            duration: '00:15',
            backgroundColor: event?.color,
            borderColor: event?.color,
          };
        }
      });
    });
  }

  ngAfterViewChecked() {
    this.calendarApi = this.calendarComponent?.getApi();
  }

  renderCalendar() {
    let _this = this;
    // https://fullcalendar.io/docs/upgrading-from-v4#current-date
    this.options = {
      timeZone: 'local',
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
          click: this.openDialog.bind(this), // bind is important!
        },
        today: {
          text: `${this.translateService.instant('Today')}`,
          click: this.todayClick.bind(this)
        }
      },
      initialDate: today, // will be parsed as local
      eventResize: function (info) {
        console.log('eventResize ', info.event);
      },
      eventDrop: function (info) {
        console.log('eventDropped ', info);
        _this.handleOverlapping(_this.stillEvent, _this.movingEvent);
      },
      drop: function (info) {
        console.log('drop ', info);
        console.log('resource ', info.resource._resource);
      },
      eventReceive: function (info) {
        console.log('eventReceive ', info);
        console.log('calendarApi events ', _this.calendarApi.getEvents());
      },
      eventWillUnmount: function (info) {

      },
      // eventDidMount: function(event, element, view) {
      // console.log('eventDidMount')
      // $(".fc-resource-timeline table tbody tr .fc-datagrid-cell div").addClass('fc-resized-row');
      // $(".fc-content table tbody tr .fc-widget-content div").addClass('fc-resized-row');
      // $(".fc-body .fc-resource-area .fc-cell-content").css('padding', '0px');
      // },
      eventDidMount: function (info) {
        console.log('eventDidMount ', info);
        console.log('title ', info.event.title);
        if (info.event?.title?.includes('class="')) {
          console.log('hey has icon  ', info.event);
           const dragged: EventApi = _this.calendarApi.getEvents().find(ev => ev.title === info.event.title);
          // dragged.remove();
          // _this.calendarApi.addEvent(info.event)
          // info.el.getElementsByClassName('.fc-event-main')[0].addClass('icon-events')
          info.el.querySelector('.fc-event-title').innerHTML = info.event.title;
        }
      },
      eventClick: (info) => {
        console.log('eventClicked ', info.event);
        _this.openDialog(info.event);
      },
      // select: function(info) {
      //   alert('selected ' + info.startStr + ' to ' + info.endStr);
      // },
      stickyHeaderDates: true,
      stickyFooterScrollbar: true,
      slotMinTime: '09:00:00', /* calendar start Timing */
      slotMaxTime: '19:00:00',  /* calendar end Timing */
      aspectRatio: 1.5,
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
      // slotMinWidth: 2,
      resourceAreaWidth: '20%',
      initialView: 'resourceTimelineDay',
      schedulerLicenseKey: 'BUG ',
      dragScroll: false,
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
      // eventResizableFromStart: true,
      // eventDurationEditable: true,
      // eventResourceEditable: true,
      // eventOverlap: true,
      // dayMaxEventRows: true,
      // dayMaxEvents: 3,
      eventOverlap: this.checkOverlapping.bind(this),
      resourceAreaHeaderContent: 'Staff',
      // resources: "https://fullcalendar.io/api/demo-feeds/resources.json?with-nesting&with-colors",
      resources: [{"id": "5", "title": "Taha abd Elsalam"}, {
        "id": "l",
        "title": "Saeed El Sharkawy",
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

  checkOverlapping(stillEvent, movingEvent) {
    // const outgoingEvent = info
    // const resId = outgoingEvent.event._def.resourceIds;
    // console.log('eventMount ', outgoingEvent.event);
    // console.log('resources ', resId);
    // const resource = this.calendarApi.getResourceById(resId);
    // const resourceEvents = resource.getEvents();
    // console.log('resource events', resourceEvents);
    // resourceEvents.map(event => {
    //   console.log('event', event.start)
    //   console.log('dates >> old',  new Date(event?.start).getTime(), 'new ', new Date(outgoingEvent?.event?.start).getTime())
    //   if (new Date(outgoingEvent?.event?.start).getTime() <= new Date(event?.start).getTime()) {
    //     console.log('hey overlap ')
    //   }
    // })
    this.stillEvent = stillEvent;
    this.movingEvent = movingEvent;
    return true
  }

  handleOverlapping(stillEvent, movingEvent) {
    console.log('stillEvent', stillEvent)
    console.log('movingEvent', movingEvent)
    console.log('dates >> old', new Date(stillEvent?.start).getTime(), 'new ', new Date(movingEvent?.start).getTime())
    // if the moving event start before the still event the moving event will take this overlapping zone
    if (new Date(movingEvent?.start).getTime() <= new Date(stillEvent?.start).getTime() && new Date(stillEvent?.end).getTime() > new Date(movingEvent?.end).getTime()) {
      console.log('move to end', stillEvent)
      stillEvent.setStart(movingEvent.end);
    } else {
      // stillEvent.setEnd(movingEvent.start);
    }


    // if the moving event duration will cover all still event duration the remove the still event
    if (new Date(movingEvent?.start).getTime() <= new Date(stillEvent?.start).getTime() && new Date(movingEvent?.end).getTime() >= new Date(stillEvent?.end).getTime()) {
      const index = this.options.events?.findIndex(ev => new Date(stillEvent?.start).getTime() === new Date(ev?.start).getTime() && new Date(stillEvent?.end).getTime() === new Date(ev?.end).getTime());
      if (index !== -1) {
        console.log('removed************************************ ', index);
        stillEvent.remove()
      }
    }
    console.log('events ', this.options.events);
    console.log('calendarApi events ', this.calendarApi.getEvents());
  }

  todayClick() {
    this.calendarApi.today();
  }

  openDialog(event?) {
    this.options.resources.forEach((res: any) => {
      res.name = res.title;
      return res
    });
    const dialogRef = this.dialog.open(CreateTimelineComponent, {
      data: {employees: this.options.resources, event},
      direction: GetLanguage() === 'ar' ? 'rtl' : 'ltr',
      minHeight: '50%',
      width: window.innerWidth > 1199 ? '35%' : '90%',
      hasBackdrop: false
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed', result);
      const id = result?.data?.employee?.id;
      // this.calendarApi.addResource({title: result?.employee?.name, id, 'eventColor': 'green'});
      if (result?.event?.title) {
        event.remove();
      }
      this.calendarApi.addEvent({
        "resourceId": id,
        "title": result?.data?.type?.name,
        "start": new Date(result?.data?.dateFrom),
        "overlap": true,
        "end": new Date(result?.data?.dateTo),
        "color": event ? result?.event.backgroundColor : 'green'
      })
      console.log('calendarApi events', this.calendarApi.getEvents())
      console.log('events', this.options.events)
    });
  }

  getEvents() {
    const colors = ['#000', '#9e32a8', '#54ab98', '#becf3e', '#d95d7c', '#35e6e3', '#c414c1']
    this.coreService.getRequest('https://fullcalendar.io/api/demo-feeds/events.json?single-day=&for-resource-timeline=&start=2022-06-05T00:00:00Z&end=2022-06-06T00:00:00Z').subscribe(res => {
      console.log('res', this.options.events)
      res.map((event, index) => {
        event.overlap = true;
        event.color = colors[index]
      });
      this.options.events = res;
    }, error => {

    }, () => {
      // console.log('1', new Date('Sat Jun 04 2022 09:00:00 GMT+0200').getTime())
      // console.log('2', new Date('Sat Jun 04 2022 10:00:00 GMT+0200').getTime())
      // console.log(new Date('Sat Jun 04 2022 10:00:00 GMT+0200').getTime() - new Date('Sat Jun 04 2022 09:00:00 GMT+0200').getTime())
      this.options.events.push({
        "resourceId": "l",
        "title": "Test test test ",
        "start": "2022-06-05T02:10:00+00:00",
        "end": "2022-06-05T15:37:00+00:00",
        "color": 'orange',
        "overlap": true,
      })
      console.log('events', this.options.events)
    })
  }

  getResources() {
    this.coreService.getRequest('https://fullcalendar.io/api/demo-feeds/resources.json?with-nesting&with-colors').subscribe(res => {
      console.log('resources', this.options.resources)
      this.options.resources = res;
    }, error => {

    }, () => {
      setTimeout(() => {
        this.options.resources.push({"id": "a", "title": "Taha abd Elsalam"})
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

  chooseDate(ev) {
    console.log('ev', ev);
    this.calendarApi.gotoDate(ev);
  }

}
