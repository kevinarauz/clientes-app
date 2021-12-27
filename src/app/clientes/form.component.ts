import { Component, OnInit } from '@angular/core';
import {Cliente} from './cliente'
import {ClienteService} from './cliente.service'
import {Router, ActivatedRoute} from '@angular/router'
import swal from 'sweetalert2'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  public titulo: string = "Crear Cliente";

  errores: string[];

  constructor(private clienteService: ClienteService,
  private router: Router,
  private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCliente()
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.clienteService.getCliente(id).subscribe(
          (cliente) => {
            this.cliente = cliente;
          });
      }
    });
  }

  create(): void {
  this.clienteService.getClienteCedula(this.cliente.cedula).subscribe(
    (cliente) => {
      if(cliente!=null){
        swal.fire('Error al crear cliente', "La cedula ya existe", 'error');
        return;
      }
    },err => {
      console.log("Error: "+err);
      swal.fire('Nuevo cliente', `El cliente ${this.cliente.nombres} ha sido creado con éxito`, 'success');
      this.clienteService.create(this.cliente)
        .subscribe(
          cliente => {
            console.log(cliente);
            this.router.navigate(['/clientes']);
          },
          err => {
            this.errores = err.error.errors as string[];
            console.error('Código del error desde el backend: ' + err.status);
            console.error(err.error.errors);
            swal.fire('Error al crear cliente', err.status, 'error');
          }
        );
    });
  }

  update(): void {
    this.clienteService.update(this.cliente)
      .subscribe(
        json => {
          this.router.navigate(['/clientes']);
          swal.fire('Cliente Actualizado', `Cliente: ${json.cliente.nombres}`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
          swal.fire('Error al actualizar cliente', err.status, 'error');
        }
      )
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}
