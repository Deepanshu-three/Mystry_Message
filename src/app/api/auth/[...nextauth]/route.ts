import NextAuth from "next-auth/next";
import { authOptions } from "./options";

const handler = NextAuth(authOptions)

//have to wtrite verbs like get and post otherwise it wont work
export {handler as GET, handler as POST}