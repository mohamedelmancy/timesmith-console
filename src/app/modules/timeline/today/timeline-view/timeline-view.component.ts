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
import {dateTimeFormat, today} from "../../../../shared/variables/variables";
import {EventApi, FullCalendarComponent} from "@fullcalendar/angular";
import {element} from "screenfull";
import {Subject, Subscription} from "rxjs";

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
  resizeCounter: Subject<any> = new Subject();
  subscription: Subscription
  stillEvent;
  movingEvent;
  resizedEvent;
  selectedEvent;
  exceptionCodes = [
    {
      title: 'Open time',
      color: 'orange',
      icon: 'fa-reddit',
      code: true
    },
    {
      title: 'Permission',
      color: 'green',
      icon: 'fa-clock-o',
      code: true
    },
    {
      title: 'External Assignment',
      color: 'red',
      icon: 'fa-s15',
      code: true
    },
    {
      title: 'Present',
      color: 'blue',
      icon: 'fa-legal',
      code: true
    },
    {
      title: 'Open time Off Campus',
      color: 'grey',
      icon: 'fa-leaf',
      code: true
    },{
      title: 'Open time',
      color: 'orange',
      icon: 'fa-reddit',
      code: true
    },
    {
      title: 'Permission',
      color: 'green',
      icon: 'fa-clock-o',
      code: true
    },
    {
      title: 'External Assignment',
      color: 'red',
      icon: 'fa-s15',
      code: true
    },
    {
      title: 'Present',
      color: 'blue',
      icon: 'fa-legal',
      code: true
    },
    {
      title: 'Open time Off Campus',
      color: 'grey',
      icon: 'fa-leaf',
      code: true
    },{
      title: 'Open time',
      color: 'orange',
      icon: 'fa-reddit',
      code: true
    },
    {
      title: 'Permission',
      color: 'green',
      icon: 'fa-clock-o',
      code: true
    },
    {
      title: 'External Assignment',
      color: 'red',
      icon: 'fa-s15',
      code: true
    },
    {
      title: 'Present',
      color: 'blue',
      icon: 'fa-legal',
      code: true
    },
    {
      title: 'Open time Off Campus',
      color: 'grey',
      icon: 'fa-leaf',
      code: true
    },{
      title: 'Open time',
      color: 'orange',
      icon: 'fa-reddit',
      code: true
    },
    {
      title: 'Permission',
      color: 'green',
      icon: 'fa-clock-o',
      code: true
    },
    {
      title: 'External Assignment',
      color: 'red',
      icon: 'fa-s15',
      code: true
    },
    {
      title: 'Present',
      color: 'blue',
      icon: 'fa-legal',
      code: true
    },
    {
      title: 'Open time Off Campus',
      color: 'grey',
      icon: 'fa-leaf',
      code: true
    },{
      title: 'Open time',
      color: 'orange',
      icon: 'fa-reddit',
      code: true
    },
    {
      title: 'Permission',
      color: 'green',
      icon: 'fa-clock-o',
      code: true
    },
    {
      title: 'External Assignment',
      color: 'red',
      icon: 'fa-s15',
      code: true
    },
    {
      title: 'Present',
      color: 'blue',
      icon: 'fa-legal',
      code: true
    },
    {
      title: 'Open time Off Campus',
      color: 'grey',
      icon: 'fa-leaf',
      code: true
    },{
      title: 'Open time',
      color: 'orange',
      icon: 'fa-reddit',
      code: true
    },
    {
      title: 'Permission',
      color: 'green',
      icon: 'fa-clock-o',
      code: true
    },
    {
      title: 'External Assignment',
      color: 'red',
      icon: 'fa-s15',
      code: true
    },
    {
      title: 'Present',
      color: 'blue',
      icon: 'fa-legal',
      code: true
    },
    {
      title: 'Open time Off Campus',
      color: 'grey',
      icon: 'fa-leaf',
      code: true
    },{
      title: 'Open time',
      color: 'orange',
      icon: 'fa-reddit',
      code: true
    },
    {
      title: 'Permission',
      color: 'green',
      icon: 'fa-clock-o',
      code: true
    },
    {
      title: 'External Assignment',
      color: 'red',
      icon: 'fa-s15',
      code: true
    },
    {
      title: 'Present',
      color: 'blue',
      icon: 'fa-legal',
      code: true
    },
    {
      title: 'Open time Off Campus',
      color: 'grey',
      icon: 'fa-leaf',
      code: true
    },{
      title: 'Open time',
      color: 'orange',
      icon: 'fa-reddit',
      code: true
    },
    {
      title: 'Permission',
      color: 'green',
      icon: 'fa-clock-o',
      code: true
    },
    {
      title: 'External Assignment',
      color: 'red',
      icon: 'fa-s15',
      code: true
    },
    {
      title: 'Present',
      color: 'blue',
      icon: 'fa-legal',
      code: true
    },
    {
      title: 'Open time Off Campus',
      color: 'grey',
      icon: 'fa-leaf',
      code: true
    },{
      title: 'Open time',
      color: 'orange',
      icon: 'fa-reddit',
      code: true
    },
    {
      title: 'Permission',
      color: 'green',
      icon: 'fa-clock-o',
      code: true
    },
    {
      title: 'External Assignment',
      color: 'red',
      icon: 'fa-s15',
      code: true
    },
    {
      title: 'Present',
      color: 'blue',
      icon: 'fa-legal',
      code: true
    },
    {
      title: 'Open time Off Campus',
      color: 'grey',
      icon: 'fa-leaf',
      code: true
    },{
      title: 'Open time',
      color: 'orange',
      icon: 'fa-reddit',
      code: true
    },
    {
      title: 'Permission',
      color: 'green',
      icon: 'fa-clock-o',
      code: true
    },
    {
      title: 'External Assignment',
      color: 'red',
      icon: 'fa-s15',
      code: true
    },
    {
      title: 'Present',
      color: 'blue',
      icon: 'fa-legal',
      code: true
    },
    {
      title: 'Open time Off Campus',
      color: 'grey',
      icon: 'fa-leaf',
      code: true
    },{
      title: 'Open time',
      color: 'orange',
      icon: 'fa-reddit',
      code: true
    },
    {
      title: 'Permission',
      color: 'green',
      icon: 'fa-clock-o',
      code: true
    },
    {
      title: 'External Assignment',
      color: 'red',
      icon: 'fa-s15',
      code: true
    },
    {
      title: 'Present',
      color: 'blue',
      icon: 'fa-legal',
      code: true
    },
    {
      title: 'Open time Off Campus',
      color: 'grey',
      icon: 'fa-leaf',
      code: true
    },{
      title: 'Open time',
      color: 'orange',
      icon: 'fa-reddit',
      code: true
    },
    {
      title: 'Permission',
      color: 'green',
      icon: 'fa-clock-o',
      code: true
    },
    {
      title: 'External Assignment',
      color: 'red',
      icon: 'fa-s15',
      code: true
    },
    {
      title: 'Present',
      color: 'blue',
      icon: 'fa-legal',
      code: true
    },
    {
      title: 'Open time Off Campus',
      color: 'grey',
      icon: 'fa-leaf',
      code: true
    },{
      title: 'Open time',
      color: 'orange',
      icon: 'fa-reddit',
      code: true
    },
    {
      title: 'Permission',
      color: 'green',
      icon: 'fa-clock-o',
      code: true
    },
    {
      title: 'External Assignment',
      color: 'red',
      icon: 'fa-s15',
      code: true
    },
    {
      title: 'Present',
      color: 'blue',
      icon: 'fa-legal',
      code: true
    },
    {
      title: 'Open time Off Campus',
      color: 'grey',
      icon: 'fa-leaf',
      code: true
    },{
      title: 'Open time',
      color: 'orange',
      icon: 'fa-reddit',
      code: true
    },
    {
      title: 'Permission',
      color: 'green',
      icon: 'fa-clock-o',
      code: true
    },
    {
      title: 'External Assignment',
      color: 'red',
      icon: 'fa-s15',
      code: true
    },
    {
      title: 'Present',
      color: 'blue',
      icon: 'fa-legal',
      code: true
    },
    {
      title: 'Open time Off Campus',
      color: 'grey',
      icon: 'fa-leaf',
      code: true
    },{
      title: 'Open time',
      color: 'orange',
      icon: 'fa-reddit',
      code: true
    },
    {
      title: 'Permission',
      color: 'green',
      icon: 'fa-clock-o',
      code: true
    },
    {
      title: 'External Assignment',
      color: 'red',
      icon: 'fa-s15',
      code: true
    },
    {
      title: 'Present',
      color: 'blue',
      icon: 'fa-legal',
      code: true
    },
    {
      title: 'Open time Off Campus',
      color: 'grey',
      icon: 'fa-leaf',
      code: true
    },{
      title: 'Open time',
      color: 'orange',
      icon: 'fa-reddit',
      code: true
    },
    {
      title: 'Permission',
      color: 'green',
      icon: 'fa-clock-o',
      code: true
    },
    {
      title: 'External Assignment',
      color: 'red',
      icon: 'fa-s15',
      code: true
    },
    {
      title: 'Present',
      color: 'blue',
      icon: 'fa-legal',
      code: true
    },
    {
      title: 'Open time Off Campus',
      color: 'grey',
      icon: 'fa-leaf',
      code: true
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
    setTimeout(() => {
      this.renderCalendar();
      this.getEvents();
      // this.getResources();
      this.handleDragging();
    });
  }

  handleDragging() {
    var _this = this;
    let draggableEl = document.getElementById('mydraggable');
    new Draggable(draggableEl, {
      itemSelector: '.dgraggable',
      eventData: function (eventEl) {
        const leavesEvent = _this.leaves.find(element => element.title.toLowerCase() === eventEl.innerText.toLowerCase())
        let isCode = false;
        let expCodeTitle = '';
        let expCodeColor = '';
        eventEl.classList.forEach(x=> {
          if (x.includes('title')) { // Example title-Permission
            isCode = true;
            expCodeTitle = x.split('-')[1];
          }
          if (x.includes('color')) { // Example color-green
            isCode = true;
            expCodeColor = x.split('-')[1];
          }
        })
        console.log('eventEl', expCodeColor)
        return {
          title:  isCode ? '' : eventEl.innerHTML,
          duration: leavesEvent ? '04:00' : '00:15',
          html: leavesEvent ? null : eventEl.innerHTML,
          durationEditable: true,
          overlap: true,
          id: Math.random(),
          excepTitle: leavesEvent ? '' : expCodeTitle,
          fColor: leavesEvent ? leavesEvent?.color : expCodeColor,
          description: leavesEvent ? '' : expCodeTitle,
          backgroundColor:  leavesEvent ? leavesEvent?.color : 'white',
          borderColor: leavesEvent ? leavesEvent?.color : 'white',
        };
      }
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
        left: GetLanguage() === 'en' ? 'create prev today next' : '',
        // center: 'title',
        // right: 'resourceTimelineDay,resourceTimelineWeek'
        right: GetLanguage() === 'ar' ? 'create prev today next' : ''
      },
      customButtons: {
        create: {
          text: `+ ${this.translateService.instant('Add')}`,
          click: this.openDialog.bind(this), // bind is important!
        },
        today: {
          text: `${this.translateService.instant('Today')}`,
          click: this.todayClick.bind(this)
        }
      },
      initialDate: today, // will be parsed as local
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
        console.log('eventWillUnmount ', info);
      },
      // eventDidMount: function(event, element, view) {
      // console.log('eventDidMount')
      // $(".fc-resource-timeline table tbody tr .fc-datagrid-cell div").addClass('fc-resized-row');
      // $(".fc-content table tbody tr .fc-widget-content div").addClass('fc-resized-row');
      // $(".fc-body .fc-resource-area .fc-cell-content").css('padding', '0px');
      // },
      eventDidMount: function (info) {
        console.log('eventDidMount *******************', info);
        _this.eventMounted(info);
      },
      eventResize: function (info) {
        console.log('eventResize ', info.event);
        _this.eventResized(info);
      },
      eventClick: (info) => {
        console.log('eventClicked ', info.event);
        // _this.openDialog(info.event);
        _this.selectedEvent = info.event;
      },
      eventOverlap: this.checkOverlapping.bind(this),
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
    setTimeout(() => {
      this.calendarApi.addResource({"id": "m", "title": "Yousef Essam"}, true)

    }, 2000)
  }

  eventResized(info) {
    this.resizedEvent = info.event;
    if (info.event?.extendedProps.html) {
      const diff = new Date(info.event._instance.range.end).getTime() - new Date(info.event._instance.range.start).getTime();
      const minutes = Math.floor(diff / 60000);
      const iconCount = minutes / this.calendarApi.getOption('slotDuration')['minutes'];
      this.resizeCounter.next(iconCount);
      console.log('minutes  ', minutes);
    }
    this.subscription.unsubscribe();
  }

  eventMounted(info) {
    if (info.event?.extendedProps.html) {
      let icons = info.event.extendedProps.html;
      const element = info.el.querySelector('.fc-event-title');
      element.innerHTML = icons;
      this.subscription = this.resizeCounter.subscribe(data => {
        console.log('count ', data);
        console.log('_this.resizedEvent ', this.resizedEvent);
        console.log('info.event ', info.event);
        if (this.resizedEvent.id === info.event.id) {
          icons = info.event.extendedProps.html;
          for (let i = 0; i < data - 1; i ++) {
            icons = icons + ((info.event.extendedProps.html).slice(0, 3) + `style="margin-right: 0 !Important; width: 32px;height: 27px;margin-left: 0px; color: ${info.event.extendedProps.fColor}; font-size: 25px "` + (info.event.extendedProps.html).slice(3));
          }
          element.innerHTML = icons;
        }
      })
    }
    this.addTooltip(info);
  }

  addTooltip(info) {
   setTimeout(() => {
     const header = (info.event.title || info.event.extendedProps.description)
     const content = `From ( ${moment(info.event.star).format(dateTimeFormat)} )To ( ${moment(info.event.end).format(dateTimeFormat)}) `
     // $(info.el).tooltip({
     //   title: info.event.title || info.event.extendedProps.description,
     //   placement: "top",
     //   trigger: "hover",
     //   container: "body"
     // });
     // $(info.el).popover({
     //   title: header.slice(0, 1).toUpperCase() + header.slice(1),
     //   placement: "top",
     //   trigger: "hover",
     //   container: "body",
     //   content: content,
     // });
   }, 200)
  }

  checkOverlapping(stillEvent, movingEvent) {
    this.stillEvent = stillEvent;
    this.movingEvent = movingEvent;
    return true
  }

  handleOverlapping(stillEvent, movingEvent) {
    console.log('stillEvent', stillEvent)
    console.log('movingEvent', movingEvent)
    console.log('dates >> old', new Date(stillEvent?.start).getTime(), 'new ', new Date(movingEvent?.start).getTime())
    if (new Date(movingEvent?.start).getTime() <= new Date(stillEvent?.start).getTime()) {
      if (new Date(stillEvent?.end).getTime() > new Date(movingEvent?.end).getTime()) {
        // if the moving event start before the still event the moving event will take this overlapping zone and the still event will start after it
        stillEvent.setStart(movingEvent.end);
      } else {
        // if the moving event duration will cover all still event duration the remove the still event
        stillEvent.remove()
      }
      console.log('move to end', stillEvent)
    } else {
      // stillEvent.setEnd(movingEvent.start);
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
    this.coreService.getRequest('https://fullcalendar.io/api/demo-feeds/events.json?single-day=&for-resource-timeline=&start=2022-06-07T00:00:00Z&end=2022-06-08T00:00:00Z').subscribe(res => {
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

  eventViewChange(ev) {
    this.selectedEvent.setStart(new Date(ev.dateFrom));
    this.selectedEvent.setEnd(new Date(ev.dateTo));
  }

}
