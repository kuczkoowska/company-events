import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IFeedback} from '../models/feedback.interface';
import {feedbackApiUrl} from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = `${feedbackApiUrl}`;

  constructor(private http: HttpClient) {
  }

  getAllFeedbacks(): Observable<IFeedback[]> {
    return this.http.get<IFeedback[]>(this.apiUrl);
  }

  createFeedback(feedback: Omit<IFeedback, 'id' | 'createdAt' | 'userId'>): Observable<IFeedback> {
    return this.http.post<IFeedback>(this.apiUrl, feedback);
  }
}
