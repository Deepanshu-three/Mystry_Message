//helper to send verification email

import { resend } from "@/lib/resent";
import VerificationEmail from "../../emails/verificationEmail";

import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verificationCode: string
): Promise<ApiResponse>{

    try{

        const data = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Mystry Message | Verifiaction code',
            react: VerificationEmail({username, otp: verificationCode}),
        });


        return {
            success: true,
            message: "Verification email send successfully"
        }

    }catch(emailError){
        console.log("Error sending verification email", emailError)
        return {
            success: false,
            message: "Failed to send verification email",
        }
    }

}