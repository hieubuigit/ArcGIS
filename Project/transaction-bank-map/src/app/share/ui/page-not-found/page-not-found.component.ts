import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="size-full flex items-center justify-center">
      <div
        class="flex flex-col items-center text-5xl font-bold text-gray-500 my-0 mx-auto"
      >
        <mat-icon aria-hidden="false" aria-label="Search icon" fontIcon="search"></mat-icon>
        <div>Page Not Found</div>
      </div>
    </div>
  `,
  styles: `
  .mat-icon {
    width: 100px;
    height: 100px;
    font-size: 90px;
  }
  `,
})
export class PageNotFoundComponent {}
