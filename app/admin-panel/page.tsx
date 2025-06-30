// import { notFound } from "next/navigation";
import { Container } from "@/components/shared/container";
import { AdminPanel } from "@/components/shared/admin-panel";
import { useGetRoleQuery } from "@/store/apiSlice";

export default function AdminPanelPage() {
    // const jwtCookie = await cookies()
    // const token = jwtCookie.get('jwt')?.value

    // let role = null
    // if (token) {
    //     try {
    //         const decoded = jwt.verify(token, process.env.JWT_SECRET || "")
    //         if (typeof decoded === "object" && decoded !== null && "role" in decoded) {
    //             role = (decoded as JwtPayload).role as string;
    //         }
    //     } catch {
    //         role = null
    //     }
    // }

    // console.log("TOKEN:", token)

    // if (role !== "ADMIN") {
    //     return (
    //         // notFound()
    //         <div>
    //             не админ
    //             {"роль:" + role}
    //         </div>
    //     );
    // }

    const { data } = useGetRoleQuery()

    if (data?.role !== "ADMIN") {
        return (
            // notFound()
            <div>
                не админ
                {"роль:" + data?.role}
            </div>
        );
    }

    return (
        <Container>
            <AdminPanel />
        </Container>
    );
}