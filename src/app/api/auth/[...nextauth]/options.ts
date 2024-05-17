import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export const authOptions: NextAuthOptions = {
    //creating custom provider for authentication using next auth
    providers: [
        //defining creadentials and logig of authentication
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email", type: "text",
                
                },
                password: {label:"Password", type: "password" }
            },
            async authorize(credentials: any):Promise<any>{
                await dbConnect()

                try {

                    const user = await UserModel.findOne({
                        $or: [
                            {email: credentials.identifier},
                            {username: credentials.identifier}
                        ]
                    })

                    if(!user){
                        throw new Error("No user found with this email")
                    }

                    if(user.isVerified){
                        throw new Error("Please verify your account before login")

                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)
                    
                    if(isPasswordCorrect){
                        return user
                    }else{
                        throw new Error("Incorrect username or password")
                    }


                } catch (error:any) {
                    throw new Error(error)
                }
            }
        })
    ],
    //defining callback 
    callbacks:{

        //providing extra information to session and jwt token so that we can get all the information required 
        //from the user in the token or the session
        async session({ session, token }) {
            if(token){
                //these values types have to be defined in ../types/next-auth so that typescript wont give error
                session.user._id = token._id
                session.user.isVerified = token.isVerified
                session.user.isAcceptingMessage = token.isAcceptingMessage
                session.user.username = token.username
            }
            return session
        },
        async jwt({ token, user }) {

            if(user){
                //these values types have to be defined in ../types/next-auth so that typescript wont give error
                token._id = user._id?.toString()
                token.isVerified = user.isVerified
                token.isAcceptingMessages = user.isAcceptingMessages
                token.username = user.username
            }
            return token
        }
    },
    //giving the statergy fo the sign-in
    session: {
        strategy: "jwt"
    },
    //providing the custom secret
    secret: process.env.NEXT_AUTH_SECRET,
    //defining route
    pages: {
        signIn: '/sign-in'
    },

}