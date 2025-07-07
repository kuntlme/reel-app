import { getToken } from "next-auth/jwt";
import withAuth from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
    async function middleware(req: NextRequest){
        const { pathname} = req.nextUrl;
        const token = await getToken({
            req: req,
            secret: process.env.AUTH_SECRET
        });

        if(pathname === "/"){
            if(!!token){
                return NextResponse.redirect(new URL("/home", req.url));
            }
            else{
                return NextResponse.next()
            }
        }

        return NextResponse.next()
    },
    {
        callbacks:{
            authorized: ({token, req}) => {
                const {pathname} = req.nextUrl;

                //allow auth related routes
                if(
                    pathname.startsWith("/api/auth") || 
                    pathname === "/login" ||
                    pathname === "/register" 

                ){
                    return true;
                }
                if(pathname === "/" || pathname.startsWith("/api/videos")){
                    return true;
                }
                
                return !!token
            }
        }
    }
)

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)"],
};