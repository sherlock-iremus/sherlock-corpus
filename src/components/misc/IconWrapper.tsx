import { ReactElement } from 'react'
import { cn } from "@nextui-org/react"

type IconWrapperProps = {
    children: ReactElement,
    className?: string,
}

export default function IconWrapper({ children, className }: IconWrapperProps) {
    return (
        <div className={cn(className, "flex items-center rounded-small justify-center w-7 h-7")}>
            {children}
        </div>)
}