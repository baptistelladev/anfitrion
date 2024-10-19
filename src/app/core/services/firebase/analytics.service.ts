import { Injectable } from '@angular/core';
import { Analytics, logEvent } from '@angular/fire/analytics';
import { AnalyticsEventnameEnum } from 'src/app/shared/enums/Analytics';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private analytics: Analytics) { }

  // Rastrear um evento personalizado
  trackCustomEvent() {
    logEvent(this.analytics, 'my_custom_event', { param1: 'value1' });
  }

  public tagViewInit(eventName: AnalyticsEventnameEnum, eventParams?: {
    page_title?: string;
    page_location?: string;
    page_path?: string;
    [key: string]: any;
} ): void {
    logEvent(this.analytics, eventName, eventParams);
  }
}
