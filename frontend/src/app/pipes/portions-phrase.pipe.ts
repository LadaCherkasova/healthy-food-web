import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'portionsPhrase'})
export class PortionsPhrasePipe implements PipeTransform {
  constructor() {}

  transform(amount: number) {
    switch (amount) {
      case 1: {
        return `${amount} порция`
      }
      case 2:
      case 3:
      case 4: {
        return `${amount} порции`
      }
      default: {
        return `${amount} порций`
      }
    }
  }
}
