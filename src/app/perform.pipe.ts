import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "perform"
})

export class PerformPipe implements PipeTransform {
  transform(value: number): string {
    if (value >= 1 && value < 2) {
        return String(value) + " (прогульщик)";
    }
    if (value >= 2 && value < 3) {
        return String(value) + " (двоечник)";
    }
    if (value >= 3 && value < 4) {
        return String(value) + " (ударник)";
    }
    if (value >= 4 && value < 5) {
        return String(value) + " (хорошист)";
    }
    if (value >= 5 && value < 6) {
        return String(value) + " (отличник)";
    }
  }
}
