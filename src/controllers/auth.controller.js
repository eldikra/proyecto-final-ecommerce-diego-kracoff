import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {createUser, findUserByEmail} from "../models/user.model.js"

const JWT_SECRET = process.env.JWT_SECRET || "secret";
export async function register(req,res){
const {email,password} = req.body;
if(!email || !password){
	return res.status(400).json({message: "Email y contraseña requeridos"})
}

const existUser = await findUserByEmail(email);
if(existUser){
	return res.status(400).json({message:"El usuario ya existe"})
}
const passwordHash = await bcrypt.hash(password,10);
const user = await createUser({email,passwordHash});
return res.status(201).json({id: user.id,email: user.email})


}