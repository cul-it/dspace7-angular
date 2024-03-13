import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  standalone: false,
  // eslint-disable-next-line @angular-eslint/pipe-prefix
  name: 'camelCaseToLowerCaseWords'
})
export class CamelCaseToLowerCaseWordsPipe implements PipeTransform {

  // Define the list of values to ignore
  private readonly ignoreValues = ['ChemML', 'MathML'];
  transform(value: string): string {
    if (!value) {return value;}
    if (this.ignoreValues.includes(value)) {return value;}
    let words = value.split(/(?<![A-Z])(?=[A-Z])/).join(' ').toLowerCase();
    // capitalize PDF
    words = words.replace(/pdf/gi, 'PDF');
    return words;
  }
}
