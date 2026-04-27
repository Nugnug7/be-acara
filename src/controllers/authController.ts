import { Request, Response } from "express";
import * as Yup from "yup";

type TRegister = {
    fullname: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

// Validasi Register
const registerValidateSchema = Yup.object({
    fullname: Yup.string().required("Nama Lengkap Wajib Diisi"),
    username: Yup.string().required("Username Wajib Diisi"),
    email: Yup.string().email().required("Email Wajib Diisi"),
    password: Yup.string().min(8).required("Password Wajib Diisi"),
    confirmPassword: Yup.string().min(8).required("Password Konfirmasi Wajib Diisi"),
});



export default {

    async register(req: Request, res: Response) {

        // ✅ FIX: Check if req.body exists first
        if (!req.body) {
            return res.status(400).json({
                message: "Request body is missing. Please send data with Content-Type: application/json",
                data: null
            });
        }

        const { fullname, username, email, password, confirmPassword } =
            req.body as unknown as TRegister;

        try {

            await registerValidateSchema.validate({
                fullname,
                username,
                email,
                password,
                confirmPassword,
            });

            res.status(200).json({
                message: "Register Success",
                data: {
                    fullname,
                    username,
                    email,
                }
            });

        } catch (error) {
            const err = error as unknown as Error;
            res.status(400).json({
                message: err.message,
                data: null,
            })
        }
    },

}






