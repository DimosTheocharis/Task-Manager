import { ApiService } from './../../Services/api.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit, OnDestroy {
  public totalStages: number = 5;
  public fakeArray: Array<number> = Array(this.totalStages); //used to loop through it in html

  public currentProgress!: number; // current progress in percentage
  public currentProgressWidth!: string;
  public timeLeft!: string;

  private sessionTimeLeftSubscription!: Subscription;

  constructor(
    private readonly apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.sessionTimeLeftSubscription = this.apiService.getSessionTimeLeftObservable().subscribe((timeLeft: number) => {
      this.currentProgress = this.apiService.computeSessionTimeLeftInPercentage(timeLeft);
      this.currentProgressWidth = `${Math.trunc(150 * this.currentProgress / 100)}px`;
      this.timeLeft = this.toShortTime(timeLeft);
    })
  }

  toShortTime(time: number): string {
    const newTime = Math.trunc(time);

    const minutes: number = Math.floor(newTime / 60);
    const seconds = newTime - minutes * 60;

    const minutesPart: string = minutes >= 10 ? `${minutes}` : `0${minutes}`;
    const secondsPart: string = seconds >= 10 ? `${seconds}` : `0${seconds}`;

    return `${minutesPart}:${secondsPart}`;
  }

  ngOnDestroy(): void {
    this.sessionTimeLeftSubscription.unsubscribe();
  }
}
