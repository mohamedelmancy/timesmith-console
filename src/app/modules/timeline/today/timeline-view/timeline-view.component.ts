import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Calendar, CalendarApi} from '@fullcalendar/core';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import {CoreService} from "../../../../services/core.service";
import {GetLanguage} from "../../../../shared/functions/shared-functions";
import moment from "moment";
import interactionPlugin, {Draggable} from '@fullcalendar/interaction';
import enLocale from '@fullcalendar/core/locales/en-au';
import arLocale from '@fullcalendar/core/locales/ar-sa';
import {TranslateService} from "@ngx-translate/core";
import {MatDialog} from "@angular/material/dialog";
import {CreateTimelineComponent} from "../../../../modals/create-timeline/create-timeline.component";
import {dateTimeFormat, isMobile, today} from "../../../../shared/variables/variables";
import {FullCalendarComponent} from "@fullcalendar/angular";
import {first, Subject, Subscription} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import dayGridPlugin from "@fullcalendar/daygrid";

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-timeline-view',
  templateUrl: './timeline-view.component.html',
  styleUrls: ['./timeline-view.component.scss'],
  // providers: [CalendarApi]
})
export class TimelineViewComponent implements OnInit, AfterViewInit {
  @ViewChild("fullcalendar", {static: false}) calendarComponent: FullCalendarComponent;
  options;
  eventDidMounted = false;
  showDatePicker = false;
  @ViewChild('drawer', {static: true}) editEvent;
  resizeCounter: Subject<any> = new Subject();
  subscription: Subscription
  stillEvent;
  movingEvent;
  resizedEvent;
  selectedEvent;
  closeResult = '';
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
    },
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
    },
    {
      title: 'Open time Off Campus',
      color: 'grey',
      icon: 'fa-leaf',
      code: true
    },
    {
      title: 'Open time Off Campus',
      color: 'grey',
      icon: 'fa-leaf',
      code: true
    }
  ]
  leaves = [
    {
      title: 'Annual',
      color: 'orange',
      overlap: true,
      leave: true
    },
    {
      title: 'Sick',
      color: 'red',
      overlap: true,
      leave: true
    },
    {
      title: 'Casual',
      color: 'green',
      overlap: true,
      leave: true
    },
    {
      title: 'Public Holiday',
      color: 'grey',
      overlap: true,
      leave: true
    },
    {
      title: 'Public Holiday',
      color: 'grey',
      overlap: true,
      leave: true
    },
    {
      title: 'Public Holiday',
      color: 'grey',
      overlap: true,
      leave: true
    },
    {
      title: 'Public Holiday',
      color: 'grey',
      overlap: true,
      leave: true
    },
    {
      title: 'Public Holiday',
      color: 'grey',
      overlap: true,
      leave: true
    },
    {
      title: 'Public Holiday',
      color: 'grey',
      overlap: true,
      leave: true
    },
    {
      title: 'Public Holiday',
      color: 'grey',
      overlap: true,
      leave: true
    },
    {
      title: 'Public Holiday',
      color: 'grey',
      overlap: true,
      leave: true
    },
    {
      title: 'Public Holiday',
      color: 'grey',
      overlap: true,
      leave: true
    },
  ]
  attendance = [
    {
      title: 'Open time',
      color: 'green',
      overlap: true,
      leave: true
    },
    {
      title: 'Open time fro different location',
      color: 'rgb(125 201 94)',
      overlap: true,
      leave: true
    },
    {
      title: 'No show',
      color: 'red',
      overlap: true,
      leave: true
    }
  ]
  calendarApi: Calendar;
  selectedDate: any = today;
  tipso_options = {
    maxWidth: '',
    hideDelay: 0,
    background: '#000',
    size: 'small',
    tooltipHover: true,
    speed: 400,
    delay: 0,
    titleBackground: '',
    color: '#ffffff',
    titleColor: '',
    showArrow: true,
    position: 'top',
    useTitle: false,
    titleContent: '',
  }
  bsConfig;

  constructor(private coreService: CoreService,
              private translateService: TranslateService,
              public dialog: MatDialog,
              private toastr: ToastrService,
              private modalService: NgbModal) {
  }

  // https://codepen.io/pen?editors=0010
  // https://stackoverflow.com/questions/71299412/fullcalendar-how-to-display-non-overlapping-events-inside-same-day-cell-in-one
  ngOnInit(): void {
    this.bsConfig = Object.assign({}, {
      showWeekNumbers: false,
      containerClass: 'theme-default'
    });
    setTimeout(() => {
      console.log('ssss')
      this.renderCalendar();
      this.getEvents();
      this.getResources();
      this.handleDragging();
    });

  }

  ngAfterViewInit() {
    this.addAllToolTip();
    this.addCustomIcon();
  }

  addCustomIcon() {
    setTimeout(() => {
      jQuery(".fc-date-button").html('<i class="fa fa-calendar"></i>');
    });
  }

  addAllToolTip() {
    setTimeout(() => {
      const add_btn = jQuery('.fc-create-button');
      const prev_btn = jQuery('.fc-prev-button');
      const next_btn = jQuery('.fc-next-button');
      const today_btn = jQuery('.fc-today-button');
      this.AddTipso(add_btn, this.translateService.instant('Add schedule'), 100);
      this.AddTipso(prev_btn, this.translateService.instant('Previous day'), 100);
      this.AddTipso(next_btn, this.translateService.instant('Next day'), 100);
      this.AddTipso(today_btn, this.translateService.instant('Today'), 100);
    }, 500);
  }

  AddTipso(element, content, width) {
    element.tipso({
      ...this.tipso_options,
      width: width,
      content: content,
    });
  }

  handleDragging() {
    var _this = this;
    let draggableEl = document.getElementById('mydraggable');
    new Draggable(draggableEl, {
      itemSelector: '.dgraggable',
      eventData: _this.addNewEvent.bind(this)
    });
  }

  addNewEvent(eventEl) {
    console.log('eventEl', eventEl)
    var _this = this;
    const leavesEvent = _this.leaves.find(element => element.title.toLowerCase() === eventEl.innerText.toLowerCase())
    const attendanceEvent = _this.attendance.find(element => element.title.toLowerCase() === eventEl.innerText.toLowerCase())
    let isCode = false;
    let expCodeTitle = '';
    let expCodeColor = '';
    eventEl.classList.forEach(x => {
      if (x.includes('title')) { // Example title-Permission
        isCode = true;
        expCodeTitle = x.split('-')[1].replaceAll('_', ' ');
      }
      if (x.includes('color')) { // Example color-green
        isCode = true;
        expCodeColor = x.split('-')[1];
      }
    })
    let e: any = {
      title: isCode ? '' : eventEl.innerHTML,
      duration: (leavesEvent) ? '08:00' : '00:15',
      html: (leavesEvent || attendanceEvent) ? null : eventEl.innerHTML,
      durationEditable: true,
      overlap: true,
      id: Math.random(),
      type: leavesEvent ? 'leave' : attendanceEvent ? 'attendance' : 'code',
      excepTitle: (leavesEvent || attendanceEvent) ? '' : expCodeTitle,
      fColor: leavesEvent ? leavesEvent?.color : attendanceEvent ? attendanceEvent.color : expCodeColor,
      description: (leavesEvent || attendanceEvent) ? '' : expCodeTitle,
      backgroundColor: leavesEvent ? leavesEvent?.color : attendanceEvent ? attendanceEvent.color : '#ebf8fc',
      borderColor: leavesEvent ? leavesEvent?.color : attendanceEvent ? attendanceEvent.color : '#ebf8fc',
    };
    return e;
  }

  ngAfterViewChecked() {
    this.calendarApi = this.calendarComponent?.getApi();
  }

  renderCalendar() {
    let _this = this;
    // https://fullcalendar.io/docs/upgrading-from-v4#current-date
    this.options = {
      timeZone: 'local',
      plugins: [resourceTimelinePlugin,
        dayGridPlugin,
        interactionPlugin,],
      height: '70vh',
      headerToolbar: {
        // left: 'prev today next',
        left: GetLanguage() === 'en' ? 'create prev today next date' : '',
        // center: 'title',
        // right: 'resourceTimelineDay,resourceTimelineWeek'
        right: GetLanguage() === 'ar' ? 'create prev today next date' : ''
      },
      customButtons: {
        create: {
          icon: 'fc-icon fc-icon-plus-square',
          hint: `${this.translateService.instant('Add')}`,
          click: this.openDialog.bind(this), // bind is important!
        },
        today: {
          text: `${this.translateService.instant('Today')}`,
          click: this.todayClick.bind(this)
        },
        prev: {
          click: function () {
            _this.calendarApi.prev();
            _this.resetEditEvent();
          }
        },
        next: {
          click: function () {
            _this.calendarApi.next();
            _this.resetEditEvent();
          }
        },
        date: {
          // icon: 'fc-icon fc-icon-calendar',
          // bootstrapFontAwesome: 'close',
          click: function () {
            _this.showDatePicker = !_this.showDatePicker;
          }
        },
      },
      resourceLabelContent: function (arg) {
        // return { html: `<i class="fa ${arg.resource.extendedProps.icon}"></i> ${arg.resource.title}` };
        return {html: `<i class="fa fa-user-circle"></i> ${arg.resource.title}`};
      },
      initialDate: this.selectedDate, // will be parsed as local
      eventDrop: function (info) {
        console.log('eventDropped and overlapped ', info);
        _this.handleOverlapping(_this.stillEvent, _this.movingEvent, info);
      },
      drop: function (info) {
        console.log('dropping******************************** ', info);
        console.log('resource ', info.resource._resource);
      },
      eventReceive: function (info) {
        console.log('eventReceive ', info);
        console.log('calendarApi events rec', _this.calendarApi.getEvents());
        _this.addTooltip(info);
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
        _this.eventResized(info.event, info);
      },
      eventClick: (info) => {
        console.log('eventClicked ', info.event);
        // _this.openDialog(info.event);
        if (isMobile) {
          this.open(this.editEvent);
        }
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
      resourceAreaWidth: isMobile ? '45%' : '20%',
      initialView: 'resourceTimelineDay',
      schedulerLicenseKey: 'BUG ',
      dragScroll: false,
      locales: [enLocale, arLocale],
      locale: GetLanguage(),
      direction: GetLanguage() === 'ar' ? 'rtl' : 'ltr',
      resourceAreaColumns: [
        {
          field: 'title',
          headerContent: this.translateService.instant('Employee name'),
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
      resourceAreaHeaderContent: this.translateService.instant('Staff'),
      // resources: "https://fullcalendar.io/api/demo-feeds/resources.json?with-nesting&with-colors",
      resources: [{"id": "5", "title": "Taha abd Elsalam"}, {
        "id": "l",
        "title": "Saeed El Sharkawy",
        icon: 'fa-user-circle'
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

  openDatePicker() {
    jQuery('.fc-icon-calendar').DatePicker({
      flat: true,
      date: '2008-07-31',
      current: '2008-07-31',
      calendars: 1,
      starts: 1
    });
  }

  eventResized(event, info?) {
    this.resizedEvent = event;
    this.calcIconsCounter(event);
    this.subscription?.unsubscribe();
    this.addTooltip(info);
  }

  calcIconsCounter(event) {
    if (event?.extendedProps.html) {
      const diff = new Date(event._instance.range.end).getTime() - new Date(event._instance.range.start).getTime();
      const minutes = Math.floor(diff / 60000);
      const iconCount = minutes / this.calendarApi.getOption('slotDuration')['minutes'];
      this.resizeCounter.next(iconCount);
      console.log('minutes  ', minutes);
    }
  }

  eventMounted(info) {
    if (info.event?.extendedProps.html) {
      let icons = info.event.extendedProps.html;
      console.log('icons111111', icons);
      const element = info.el.querySelector('.fc-event-title');
      element.innerHTML = icons;
      this.subscription = this.resizeCounter.subscribe(data => {
        console.log('count ', data);
        console.log('info.event ', info.event);
        console.log('this.resizedEvent ', this.resizedEvent);
        if (this.resizedEvent.id === info.event.id) {
          console.log('yessssss ');
          icons = info.event.extendedProps.html;
          for (let i = 0; i < data - 1; i++) {
            // icons = icons + ((info.event.extendedProps.html).slice(0, 3) + `style="margin-right: 0 !Important; width: 32px;height: 27px;margin-left: 0px; color: ${info.event.extendedProps.fColor}; font-size: 25px "` + (info.event.extendedProps.html).slice(3));
            icons = icons + info.event.extendedProps.html;
          }
          console.log('icons', icons);
          element.innerHTML = icons;
        }
      })
    }
    this.addTooltip(info);
  }

  addTooltip(info) {
    setTimeout(() => {
      let element = void 0 || null;
      console.log('tooltip', info)
      let hours_start: any = new Date(info.event?.start).getHours();
      let hours_end: any = new Date(info.event?.end).getHours();
      let minutes_start: any = new Date(info.event?.start).getMinutes();
      let minutes_end: any = new Date(info.event?.end).getMinutes();
      var start_me = hours_start >= 12 ? 'PM' : 'AM';
      var end_me = hours_end >= 12 ? 'PM' : 'AM';
      hours_start = hours_start % 12;
      hours_start = hours_start ? hours_start : 12; // the hour '0' should be '12'
      hours_end = hours_end % 12;
      hours_end = hours_end ? hours_end : 12; // the hour '0' should be '12'
      if (hours_start < 10) {
        hours_start = `0${hours_start}`;
      }
      if (hours_end < 10) {
        hours_end = `0${hours_end}`;
      }
      if (minutes_start < 10) {
        minutes_start = `0${minutes_start}`;
      }
      if (minutes_end < 10) {
        minutes_end = `0${minutes_end}`;
      }
      let header = (info.event?.title || info.event?.extendedProps?.description)
      let duration = `From ( ${hours_start + ':' + minutes_start + ' ' + start_me} ) To ( ${hours_end + ':' + minutes_end + ' ' + end_me}) `
      let content = `${header}<br>${duration}`
      element = jQuery(info.el);
      console.log('cont', content)
      this.AddTipso(element, content, 'auto');
    }, 500)
  }

  checkOverlapping(stillEvent, movingEvent) {
    this.stillEvent = stillEvent;
    this.movingEvent = movingEvent;
    return true
  }

  handleOverlapping(stillEvent, movingEvent, info) {
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
    console.log('calendarApi events ', this.calendarApi.getEvents());
    // to rerender event HTML after dropping in case of exception code
    this.eventResized(info.event, info);
  }

  todayClick() {
    this.resetEditEvent();
    this.calendarApi.today();
  }

  resetEditEvent() {
    this.selectedEvent = void 0;
  }

  openDialog(event?) {
    this.resetEditEvent();
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
      });
      console.log('calendarApi events after dialog', this.calendarApi.getEvents())
      console.log('events', this.options.events)
    });
  }

  getEvents() {
    console.log('render')

    const colors = ['#000', '#9e32a8', '#54ab98', '#becf3e', '#d95d7c', '#35e6e3', '#c414c1']
    const today = `2023-09-${new Date().getDate()}T00:00:00Z`
    const yesterday = `2023-09-${new Date().getDate() - 1}T00:00:00Z`
    this.coreService.getRequest(`https://fullcalendar.io/api/demo-feeds/events.json?single-day=&for-resource-timeline=&start=${yesterday}&end=${today}`).subscribe(res => {
      console.log('apis res', res)
      // res.map((event, index) => {
      //   event.overlap = true;
      //   event.color = colors[index];
      //   event.id = Math.random();
      // });
      // this.options.events = res;
      console.log('events res', res)
    }, error => {

    }, () => {
      // console.log('1', new Date('Sat Jun 04 2022 09:00:00 GMT+0200').getTime())
      // console.log('2', new Date('Sat Jun 04 2022 10:00:00 GMT+0200').getTime())
      // console.log(new Date('Sat Jun 04 2022 10:00:00 GMT+0200').getTime() - new Date('Sat Jun 04 2022 09:00:00 GMT+0200').getTime())
      // this.options.events.push({
      //   "resourceId": "l",
      //   "title": "Test test test ",
      //   "start": "2022-06-05T02:10:00+00:00",
      //   "end": "2022-06-05T15:37:00+00:00",
      //   "color": 'orange',
      //   "overlap": true,
      // })
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
    this.selectedDate = ev;
    this.calendarApi.gotoDate(new Date(ev));
  }

  eventViewChange(data) {
    console.log('eventViewChange', data);
    let comingEvent;
    let previousEvent = data.event;
    let nextEvent: any;
    if (data.event.extendedProps.type === 'code') {
      const allEvents = [...this.exceptionCodes];
      nextEvent = allEvents.find(ev => ev.title === data.form.type.name);
      console.log('has html*******************');
      console.log('nextEvent', nextEvent);
      console.log('previousEvent', previousEvent);
      comingEvent = {
        start: new Date(data.start),
        end: new Date(data.end),
        "resourceId": data.event._def.resourceIds[0],
        "title": '',
        "color": nextEvent?.color,
        "backgroundColor": '#ebf8fc',
        "borderColor": '#ebf8fc',
        "overlap": true,
        id: data.event.id,
        fColor: nextEvent?.color,
        description: nextEvent?.title,
        type: 'code',
        excepTitle: nextEvent?.title,
        html: `<i style="margin-right: 0; color: ${nextEvent?.color}; font-size: 23px; width: 29px; height: 27px" class="fa ${nextEvent?.icon}"></i>`
      };
      this.insertUpdatesEvent(previousEvent, comingEvent);
    } else if (data.event.extendedProps.type === 'leave') {
      const allEvents = [...this.leaves];
      nextEvent = allEvents.find(ev => ev.title === data.form.type.name);
      let previousEvent = data.event
      console.log('nextEvent', nextEvent);
      console.log('previousEvent', previousEvent);
      comingEvent = {
        start: new Date(data.start),
        end: new Date(data.end),
        "resourceId": data.event._def.resourceIds[0],
        "title": data.form.type.name,
        "color": nextEvent?.color,
        "backgroundColor": nextEvent?.color,
        "borderColor": nextEvent?.color,
        "overlap": true,
        type: 'leave',
        id: data.event.id,
        fColor: nextEvent?.color,
      };
      this.insertUpdatesEvent(previousEvent, comingEvent);
    } else if (data.event.extendedProps.type === 'attendance') {
      const allEvents = [...this.attendance];
      nextEvent = allEvents.find(ev => ev.title === data.form.type.name);
      let previousEvent = data.event
      console.log('nextEvent', nextEvent);
      console.log('previousEvent', previousEvent);
      comingEvent = {
        start: new Date(data.start),
        end: new Date(data.end),
        "resourceId": data.event._def.resourceIds[0],
        "title": data.form.type.name,
        "color": nextEvent?.color,
        "backgroundColor": nextEvent?.color,
        "borderColor": nextEvent?.color,
        "overlap": true,
        type: 'attendance',
        id: data.event.id,
        fColor: nextEvent?.color,
      };
      this.insertUpdatesEvent(previousEvent, comingEvent);
    } else {
      this.selectedEvent.setStart(new Date(data.start));
      this.selectedEvent.setEnd(new Date(data.end));
      console.log('selectedEvent', this.selectedEvent);
      this.resetEditEvent();
      this.toastr.success('Event updated successfully!')
    }
  }

  insertUpdatesEvent(previousEvent, comingEvent) {
    const event = this.calendarApi.addEvent(comingEvent);
    previousEvent.remove();
    this.resizedEvent = null;
    this.eventResized(event);
    this.resetEditEvent();
    this.toastr.success('Event updated successfully!')
  }

  createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    // Change this to div.childNodes to support multiple top-level nodes.
    return div.firstChild;
  }

  removeEvent(ev) {
    this.resetEditEvent();
    ev.remove();
    this.toastr.success('Event removed successfully!')
  }

  closeEditEvent(event) {
    console.log('ssssss')
    this.editEvent.toggle();
  }

  open(content) {
    this.editEvent.toggle();
    // this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    //   this.closeResult = `Closed with: ${result}`;
    // }, (reason) => {
    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // });
  }

}
