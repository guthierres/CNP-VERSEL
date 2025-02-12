import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Book, User, UserPlus } from "lucide-react"

export function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Book className="h-8 w-8 text-blue-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">CNP Brasil</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
            </Link>
            <Link href="/cadastro">
              <Button variant="ghost" size="sm">
                <UserPlus className="h-4 w-4 mr-2" />
                Cadastro
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

