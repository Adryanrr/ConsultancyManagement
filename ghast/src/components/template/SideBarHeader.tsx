import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

interface SidebarHeaderProps {
  companyName?: string
  email?: string
  logo?: string
}

export default function SidebarHeader({ 
  companyName = "Ghast Consultoria",
  email = "ghast@admin.com",
  logo = "/placeholder.svg?height=40&width=40"
}: SidebarHeaderProps) {
  return (
    <Card className="border-none bg-transparent">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 rounded-lg">
            <AvatarImage src={logo} alt={companyName} />
            <AvatarFallback className="rounded-lg bg-gradient-to-br from-[#CB3CFF] to-[#7F25FB] text-white">
              GC
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h2 className="text-sm font-semibold text-white">
              {companyName}
            </h2>
            <p className="text-xs text-gray-400">
              {email}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}