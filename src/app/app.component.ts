import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'NicoWorkCountdown';
  date: any;
  now: any;
  targetDate: any = new Date(2024, 4, 1);
  targetTime: any = this.targetDate.getTime();
  difference!: number;
  months: Array<string> = [
    'January',
    'February',
    'March', 'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  currentTime: any = `${
    this.months[this.targetDate.getMonth()]
  } ${this.targetDate.getDate()}, ${this.targetDate.getFullYear()}`;

  @ViewChild('days', { static: true }) days!: ElementRef;
  @ViewChild('hours', { static: true }) hours!: ElementRef;
  @ViewChild('minutes', { static: true }) minutes!: ElementRef;
  @ViewChild('seconds', { static: true }) seconds!: ElementRef;

  ngAfterViewInit() {
    setInterval(() => {
      this.tickTock();
      this.difference = this.calculateWorkingDaysDifference();

      !isNaN(this.days.nativeElement.innerText)
        ? (this.days.nativeElement.innerText = Math.floor(this.difference))
        : (this.days.nativeElement.innerHTML = '<img src="https://i.gifer.com/VAyR.gif" />');
    }, 1000);
  }

  private calculateWorkingDaysDifference(): number {
    this.date = new Date();
    this.now = this.date.getTime();

    const targetDate = new Date(this.targetTime);

    const daysDiff = Math.floor((targetDate.getTime() - this.date.getTime()) / (1000 * 60 * 60 * 24));
    let workingDaysDiff = (daysDiff *0.8) - 1 - 2;

    for (let i = 0; i < daysDiff; i++) {
      const currentDate = new Date(this.date.getTime() + (i * 1000 * 60 * 60 * 24));
      const isWeekday = currentDate.getDay() >= 1 && currentDate.getDay() <= 5;

      if (!isWeekday) {
        workingDaysDiff--;
      }
    }

    return workingDaysDiff;
  }

  tickTock() {
    this.date = new Date();
    this.now = this.date.getTime();

    this.days.nativeElement.innerText = Math.floor(this.difference);
    this.hours.nativeElement.innerText = 23 - this.date.getHours();
    this.minutes.nativeElement.innerText = 60 - this.date.getMinutes();
    this.seconds.nativeElement.innerText = 60 - this.date.getSeconds();
  }
}