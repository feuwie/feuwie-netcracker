import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
    selector: "[filterChoose]"
})

export class FilterChooseDirective {
    @HostListener("mouseleave") onMouseLeave(): void {
        this.changecolor(null);
    }
    @HostListener("click") clicked(): void {
        this.changecolor("Green");
    }
    changecolor(colorname: string): void {
        this.elem.nativeElement.style.color = colorname;
    }
    constructor(private elem: ElementRef) {}
}
