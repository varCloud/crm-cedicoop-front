import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'fomatoHorario' })
export class PipePipe implements PipeTransform {

  transform(value: string): any {
    let formato = [];
    let split1 = value.split('|');
    split1.pop();
    split1.map((element, index) => {
      let split2 = element.split('-');
      formato.push( split2[0] + "-> " + split2[1]+ " - "+ split2[2] + " hrs")
    })
    return formato;
  }

}
