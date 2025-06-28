import withAuth from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
    function middleware(req: NextRequest){
        const { pathname} = req.nextUrl;

        if(pathname === "/"){
            return NextResponse.redirect(new URL("/home", req.url));
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