import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTimeInput]',
  standalone: true,
})
export class TimeInputDirective {
  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Allow control keys (Backspace, Delete, Arrow keys)
    if (
      event.ctrlKey ||
      event.metaKey ||
      event.key === 'Tab' ||
      event.key === 'Enter' ||
      event.key === 'Escape'
    ) {
      return;
    }

    // Prevent non-numeric input
    if (!/[0-9]/.test(event.key) && event.key !== 'Backspace') {
      event.preventDefault();
    }

    // Stop input after 5 characters (HH:MM)
    if (this.el.nativeElement.value.length >= 5) {
      event.preventDefault();
    }
  }

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = this.el.nativeElement.value.replace(/:/g, '');
    let formattedTime = '';

    console.log(input);


    // Add colon after the first two digits if there are enough digits
    if (input.length >= 2) {
      formattedTime = `${input.slice(0, 2)}:${input.slice(2, 4)}`;
    } else {
      formattedTime = input; // Just show the input if less than 2
    }

    // Update the input value
    this.el.nativeElement.value = formattedTime;
  }

  @HostListener('blur')
  onBlur() {
    const time = this.el.nativeElement.value;
    // Validate the time format when input loses focus
    if (!this.isValidTime(time)) {
      this.el.nativeElement.value = ''; // Clear input on invalid
    }
  }

  private isValidTime(time: string): boolean {
    // Regex to match the HH:MM format
    const timePattern = /^(?:[01]\d|2[0-3]):[0-5]\d$/; // 00:00 to 23:59
    return timePattern.test(time);
  }
}
