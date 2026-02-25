export { default } from "next-auth/middleware"

export const config = {
    // Protect all routes under /admin
    matcher: ["/admin/:path*"]
}
