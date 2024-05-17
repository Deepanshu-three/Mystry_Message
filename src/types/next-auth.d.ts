import 'next-auth';
import { DefaultSession } from 'next-auth';

//defining custom types to be used in sign-in function of token, session and jwt
declare module 'next-auth' {
    interface User{
        _id?: string;
        isVerified?: boolean;
        isAcceptingMessages?: boolean;
        username?: string
    }
    interface Session{
        user: {
            _id? : string;
            isVerified?: boolean;
            isAcceptingMessage?: boolean;
            username?: string 
        } & DefaultSession['user']
    }
}
//it is just another way to do above code
declare module 'next-auth/jwt'{
    interface JWT {
        _id?: string;
        isVerified?: boolean;
        isAcceptingMessage?:boolean;
        username?: string
    }
}