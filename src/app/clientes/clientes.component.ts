import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[]= [
    { id: 1, nombre: 'kevin', apellido: 'arauz', email: 'kevin@gmail.com', createAt: '2021-07-17' },
    { id: 2, nombre: 'leslie', apellido: 'arauz', email: 'liz@gmail.com', createAt: '2021-12-11' }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
