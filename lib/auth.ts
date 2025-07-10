import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByEmail } from "./query/query.user";
import { verifyPassword } from "./hash";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "text"},
                password: {label: "Password", type: "password"},

            },
            async authorize(credentials){
                if(!credentials?.email || !credentials.password){
                    throw new Error("Missing email or password");
                }

                try{
                    const user = await getUserByEmail(credentials.email);
                    if(!user){
                        throw new Error("No user found");
                    }

                    const isValid = await verifyPassword(credentials.password, user.password);  

                    if(!isValid){
                        throw new Error("Invalid Password");
                    }

                    return {
                        id: user.userid.toString(),
                        email: user.email
                    }

                } catch(error){
                    throw error;
                }
                
            }
        })
    ],
    callbacks: {
        async jwt({token, user}){
            if(user){
                token.id = user.id
            }
            return token
        },
        async session({session, token}){
            
            if(session.user){
                session.user.id = token.id as string
            }
            
            return session
        },
        
        
    },
    pages: {
        signIn: "/login",
        error: "/login"
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60
    },
    secret: process.env.NEXTAUTH_SECRET
};