import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainComponent } from "./main/main.component";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './share/authentication/interceptor.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true,
  }]
})
export class AppComponent {
  title = 'transaction-bank-map';
}
