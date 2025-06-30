import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken"
import { notFound } from "next/navigation";
import { Container } from "@/components/shared/container";
import { AdminPanel } from "@/components/shared/admin-panel";

export default async function AdminPanelPage() {
    const jwtCookie = await cookies()
    const token = jwtCookie.get('jwt')?.value

    let role = null
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "")
            if (typeof decoded === "object" && decoded !== null && "role" in decoded) {
                role = (decoded as JwtPayload).role as string;
            }
        } catch {
            role = null
        }
    }
    
    console.log("TOKEN:", token)

    // if (role !== "ADMIN") {
    //     return (
    //         notFound()
    //     );
    // }


    return (
        <Container>
            <AdminPanel />
        </Container>
    );
}