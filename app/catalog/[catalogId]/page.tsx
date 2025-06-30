import { CatalogPage } from "@/components/shared/catalog-page";
import { Container } from "@/components/shared/container";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken"

export default async function PageCatalog() {
    const jwtCookie = await cookies()
    const token = jwtCookie.get('jwt')?.value

    let role = null
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "")
            if (typeof decoded === "object" && decoded !== null && "role" in decoded) {
                role = (decoded as JwtPayload).role as string;
            }
        } catch (err) {
            role = null
        }
    }

    return (
        <Container>
            <CatalogPage role={role} />
        </Container>
    )
}