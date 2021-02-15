import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[numberDirective]'
})
export class NumberDirective {

    @Input() onlyNumber: boolean = false;

    private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];

    constructor(private el: ElementRef) { }

    @HostListener('keydown', ['$event'])

    onKeyDown(event: KeyboardEvent) {

        if (this.specialKeys.indexOf(event.key) !== -1) {
            return;
        }

        let currentRegex: RegExp = new RegExp(/^\d*\.?\d{0,2}$/g);
        
        if (this.onlyNumber) {
            currentRegex = new RegExp(/^[0-9]*$/g);
        }
        let current: string = this.el.nativeElement.value;
        const position = this.el.nativeElement.selectionStart;

        const next: string = [current.slice(0, position), event.key == 'Decimal' ? '.' : event.key, current.slice(position)].join('');
        if (next && !String(next).match(currentRegex)) {
            event.preventDefault();
        }
    }
}