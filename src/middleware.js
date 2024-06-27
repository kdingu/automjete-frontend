import {SESSION_KEY} from "@/configs/constants";

export function middleware(request) {
    const currentUser = request.cookies.get(SESSION_KEY)?.value

    if (!currentUser && request.nextUrl.pathname.startsWith('/account')) {
        return Response.redirect(new URL('/authentication', request.url));
    }

    if (currentUser && request.nextUrl.pathname.startsWith('/authentication')) {
        return Response.redirect(new URL('/account', request.url));
    }
}

export const config = {
    matcher: ["/account", "/account(.*)", "/authentication"],
}
