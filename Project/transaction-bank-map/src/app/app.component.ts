import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpinnerComponent } from "./share/ui/spinner/spinner.component";
import { LoadingService } from './share/ui/spinner/loading.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(public loadingSvc: LoadingService){}
  title = 'Transaction Bank Manage';
}
