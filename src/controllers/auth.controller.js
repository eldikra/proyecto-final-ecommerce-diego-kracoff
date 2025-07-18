import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { createUser, findUserByEmail } from "../models/user.model.js"
import { logInfo, tokenGenerator } from "../../util.js";
import { logError } from "../../util.js";
import bodyParser from 'body-parser';

const JWT_SECRET = process.env.JWT_SECRET;

export async function register(req, res) {
	const { email, password, role } = req.body;
	if (!email || !password) {
		return res.status(400).json({ message: "Email y contraseña requeridos" })
	}

	const existUser = await findUserByEmail(email);
	if (existUser) {
		return res.status(400).json({ message: "El usuario ya existe" })
	} else {
		const passwordHash = await bcrypt.hash(password, 10);
		const user = await createUser({ email, password: passwordHash, role: "user", enabled: true });
		logInfo(`Usuario creado: ${user.email}`); // Log the user creation
		return res.status(201).json({ message: "Usuario creado", email: user.email })
	}
}
export async function login(req, res) {
	const { email, password } = req.body;// destructura el email y la contraseña del cuerpo de la solicitud
	if (!email || !password) {// sino se proporciona el email o la contraseña, devuelve un error 400 Bad Request
		logError(new Error("Email y contraseña requeridos"), req);
		return res.status(400).json({ message: "Email y contraseña requeridos" });
	}
	const user = await findUserByEmail(email);//busca el usuario por email en la base de datos

	if (!user) {// si no se encuentra el usuario devuelve un error 401 Unauthorized
		logError(new Error("Email o contraseña inválidos"), req);
		return res.status(401).json({ message: 'Email o contraseña inválidos' });
	} else {
		const comparacion = await bcrypt.compare(password, user.password)
		const token = tokenGenerator(user);
		try {
			if (!token) {
				throw new Error("Error al generar el token");
			}

			logInfo(`Usuario autenticado: ${user.email}`); // Log de autenticación
			res.json({ message: "Inicio de sesión exitoso", token }); // Devuelve el token
		} catch (error) {
			logError(error, req);
			res.status(500).json({ message: "Error al generar el token" });
		}
	}

}