import {NextResponse} from "next/server"
import {authMiddleware} from "@/middlewares/api/authMiddleware";
import {logMiddleware} from "@/middlewares/api/logMiddleware";

export const config = {
    matcher: "/api/:path"
}
export default function middleware(req: Request) {
    if (req.url.includes('/api/blogs')) {
        const logResult = logMiddleware(req);
    }

    const authResult = authMiddleware(req)

    if (!authResult?.isValid){
        return new NextResponse(JSON.stringify({message: "NOT AUTHORIZED"}), {status:401});
    }

    return NextResponse.next()
}