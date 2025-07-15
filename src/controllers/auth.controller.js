import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { createUser, findUserByEmail } from "../models/user.model.js"
import { tokenGenerator } from "../../util.js";
import { logError } from "../../util.js";

const JWT_SECRET = process.env.JWT_SECRET;

export async function register(req, res) {
	const { email, password } = req.body;
	const passwordHash = await bcrypt.hash(password, 10);
	const user = await createUser({ email, passwordHash });

	if (!email || !password) {
		return res.status(400).json({ message: "Email y contraseña requeridos" })
	}

	const existUser = await findUserByEmail(email);
	if (existUser) {
		return res.status(400).json({ message: "El usuario ya existe" })
	}
	return res.status(201).json({ id: user.id, email: user.email })
}
export async function login(req, res) {
	const { email, password } = req.body;// Check if email and password are provided
	if (!email || !password) {// If not, return a 400 Bad Request response
		logError(new Error("Email y contraseña requeridos"), req);
		return res.status(400).json({ message: "Email y contraseña requeridos" });
	}

	const user = await findUserByEmail(email);// Find the user by email
	if (!user) {// If the user is not found, return a 404 Not Found response
		logError(new Error("Usuario no encontrado"), req);
		return res.status(404).json({ message: "Usuario no encontrado" });
	}
console.log(user)
	// const isPasswordValid = await bcrypt.compare(password, user.passwordHash);// Compare the provided password with the stored password hash
	// if (!isPasswordValid) {// If the password is invalid, return a 401 Unauthorized response
	// 	logError(new Error("Contraseña incorrecta"), req);
	// 	return res.status(401).json({ message: "Contraseña incorrecta" });
	// }
	const isPasswordValid = password === user.password;
	if (!isPasswordValid) {// If the password is invalid, return a 401 Unauthorized response
		logError(new Error("Contraseña incorrecta"), req);
		return res.status(401).json({ message: "Contraseña incorrecta" });
	}
	const token = tokenGenerator(user);
	if (!token) {// If token generation fails, log the error and return a 500 Internal Server Error response
		logError(new Error("Error al generar el token"), req);
		return res.status(500).json({ message: "Error al generar el token" });
	}else {
		res.json({ message: "Inicio de sesión exitoso", token });// Return the token in the response
	}
}