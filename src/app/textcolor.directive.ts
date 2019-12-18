import { AfterViewInit, Directive, ElementRef, Input } from "@angular/core";

@Directive({
    selector: "[changeText]"
})

export class ChangeTextDirective implements AfterViewInit {
    constructor(private elementr: ElementRef) { }

    @Input() textColor: string;
    @Input() textSize: string;

    ngAfterViewInit(): void {
        this.elementr.nativeElement.style.color = this.textColor;
        this.elementr.nativeElement.style.fontSize = this.textSize;
    }
}
