export interface AuthResponse{
  idUsuario: number;
  token:string;
  nombre:string;
  apellido:string;
  correoElectronico?:string;
  rol:string;
  idParticipante: number;
}
