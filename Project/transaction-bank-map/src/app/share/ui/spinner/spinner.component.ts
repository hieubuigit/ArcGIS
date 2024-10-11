import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './spinner.component.html',
  providers: [LoadingService],
  styles: `
    .spinner-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}
  `,
})
export class SpinnerComponent {
  isLoading = true;
  constructor(private loadingService: LoadingService){
    this.loadingService.loading$.subscribe(loading => {
      setTimeout(() => {
        this.isLoading = loading;
      }, 1000);
    });
  }

  show() {
    this.isLoading = true;
  }

  hide() {
    this.isLoading = false;
  }
}
