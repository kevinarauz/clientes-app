import { Component, OnDestroy , OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2'
import { Subject } from 'rxjs';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  clientes: Cliente[];

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
    this.clienteService.getClientes()
    .subscribe(clientes => {
         this.clientes = clientes;
         this.dtTrigger.next();
       }
    );
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  delete(cliente: Cliente): void {
    swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al cliente ${cliente.nombres} ${cliente.apellidos}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente._id).subscribe(
          _response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            swal.fire({
              title: 'Cliente Eliminado!',
              text: `Cliente ${cliente.nombres} eliminado con éxito.`,
              icon: 'success',
              confirmButtonColor: '#007bff'
            })
          }
        )
      }
    })
  }

}
