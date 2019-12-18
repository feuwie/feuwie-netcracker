import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "sex"
})

export class SexPipe implements PipeTransform {
  transform(value: string): string {
      if (value.includes("вич")) {
          return value + " (м.)";
      } if (value.includes("вна")) {
          return value + " (ж.)";
      } return value;
  }
}
