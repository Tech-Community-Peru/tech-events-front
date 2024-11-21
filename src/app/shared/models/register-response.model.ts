export interface RegisterResponse {
  id: number;
  correoElectronico: string;
  idParticipante: number;
  nombre: string;
  apellido: string;
  cargo: string | null;
  especialidad: string | null;
  paisOrigen: string;



  habilidades: string;
  linkedin: string;
  informacionAdicional: string;
  ubicacion: string;
  edad: number;
}
