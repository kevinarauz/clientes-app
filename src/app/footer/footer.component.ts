
import { Component } from '@angular/core';

@Component({
selector: 'app-footer',
templateUrl: './footer.component.html',
styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  //El tipo "any" sirve para crear objetos genericos que no sean de una clase en particular 
  public autor: any = {nombre:'Kevin', apellido: 'Aráuz'};
}
