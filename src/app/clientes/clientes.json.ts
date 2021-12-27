import { Cliente } from './cliente';

//Se utiliza export para por usar la variable en otra clase
export const CLIENTES: Cliente[] = [
  { _id: "1", cedula:"0929542744", nombres: 'kevin', apellidos: 'arauz', edad: 24, fechaNacimiento:new Date() },
  { _id: "2", cedula:"0929542743", nombres: 'leslie', apellidos: 'arauz', edad: 20, fechaNacimiento:new Date() }
];
