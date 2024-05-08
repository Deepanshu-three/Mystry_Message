import {z} from 'zod'

//creating custom validation for username
export const usernameValidation = z
    .string()
    .min(2, "Username must be atleast 2 characters")
    .max(20, "Username must be no more than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special character")


//exporting the data verification for the user
export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: "Invlid email address"}),
    password: z.string().min(6, {message: "Password must be atleast 6 characters"})
})

//this will be done for rest of the schemas in this folder