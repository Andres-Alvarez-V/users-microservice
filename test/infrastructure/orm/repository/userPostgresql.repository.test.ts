import { IUser } from '../../../../src/modules/domain/entities/user';
import { UserPostgresqlRepository } from '../../../../src/modules/infrastructure/orm/repository/userPostgresql.repository';

describe('UserPostgresqlRepository', () => {
	let repository: UserPostgresqlRepository;
	let userMock: IUser | null = null;
	let encryptedPassword: string;
	let mockToken: string;
	beforeEach(() => {
		repository = new UserPostgresqlRepository();
	});

	it('should create a new user', async () => {
		const date = new Date();
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');

		const dateString = `${year}-${month}-${day}`;
		const userMockTemp: Omit<IUser, 'id'> = {
			nombre: 'test',
			apellido: 'test',
			numero_documento: '123456789',
			fecha_nacimiento: date,
			correo: 'test@mail.com',
			clave: '123456',
			celular: '123456789',
			id_rol: 2,
		};
		const user = await repository.create(userMockTemp);
		userMock = user;
		expect(user).toMatchObject({
			...userMockTemp,
			id: expect.any(Number),
			fecha_nacimiento: dateString,
		});
	});

	it('should find a user by id', async () => {
		const user = await repository.findById(userMock!.id);
		expect(user).toMatchObject(userMock as IUser);
	});

	it('should not find a user by id and return null', async () => {
		const user = await repository.findById(0);
		expect(user).toBeNull();
	});

	it('should find a user by email', async () => {
		const user = await repository.findByEmail(userMock!.correo);
		expect(user).toMatchObject(userMock as IUser);
	});

	it('should not find a user by email and return null', async () => {
		const user = await repository.findByEmail('mockemailnotexist@mailnotexist.com');
		expect(user).toBeNull();
	});

	it('should encrypt a password', async () => {
		encryptedPassword = await repository.encryptPassword(userMock!.clave);
		expect(encryptedPassword).toBeDefined();
		expect(encryptedPassword).not.toEqual(userMock!.clave);
	});

	it('should compare a password', async () => {
		const isMatch = await repository.comparePassword(userMock!.clave, encryptedPassword);
		expect(isMatch).toBeTruthy();
	});

	it('should generate a JWT', () => {
		mockToken = repository.generateJWT(userMock!.id, userMock!.id_rol);
		expect(mockToken).toBeDefined();
	});

	it('should verify a JWT', () => {
		const { payload, error } = repository.verifyJWT(mockToken);
		expect(payload).toBeDefined();
		expect(error).toBeNull();
	});

	it('should not verify a JWT and return an error for invalid JWT', () => {
		const tempToken = `${mockToken}invalid`;
		const { payload, error } = repository.verifyJWT(tempToken);
		expect(payload).toBeNull();
		expect(error).toBeDefined();
	});
});
