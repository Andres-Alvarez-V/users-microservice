export interface IUser {
	id: number;
	nombre: string;
	apellido: string;
	numero_documento: string;
	celular: string;
	fecha_nacimiento: Date | null;
	correo: string;
	clave: string;
	id_rol: number;
}
