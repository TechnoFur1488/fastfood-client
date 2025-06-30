import { cn } from "@/lib/utils"
import { PropsWithChildren } from "react"

interface Props {
    className?: string
}

export const Container = ({ className, children }: PropsWithChildren<Props>) => {
    return (
        <div className={cn("w-full max-w-[1440px] m-auto px-2 sm:px-4 md:px-8", className)}>
            {children}
        </div>
    )
}