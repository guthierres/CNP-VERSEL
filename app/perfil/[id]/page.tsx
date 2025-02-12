"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { BackToHomeButton } from "@/components/BackToHomeButton"
import { supabase } from "@/lib/supabaseClient"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Calendar, User, Book, CheckCircle } from "lucide-react"

export default function PerfilPresbitero() {
  const { id } = useParams()
  const [presbitero, setPresbitero] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPresbitero() {
      setLoading(true)
      const { data, error } = await supabase.from("presbiteros").select("*").eq("id", id).single()

      if (error) {
        console.error("Erro ao buscar dados do presbítero:", error)
      } else {
        setPresbitero(data)
      }
      setLoading(false)
    }

    fetchPresbitero()
  }, [id])

  if (loading) {
    return <div>Carregando...</div>
  }

  if (!presbitero) {
    return <div>Presbítero não encontrado</div>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <BackToHomeButton />
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold flex items-center">
              Perfil do Presbítero
              {presbitero.aprovado && <CheckCircle className="h-6 w-6 ml-2 text-green-500" />}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={presbitero.foto_perfil} alt={presbitero.nome_completo} />
                <AvatarFallback>{presbitero.nome_completo.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{presbitero.nome_completo}</h2>
                <p className="text-gray-500">{presbitero.tipo_presbitero}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="flex items-center">
                  <Calendar className="mr-2" /> Data de ordenação:{" "}
                  {new Date(presbitero.data_ordenacao).toLocaleDateString()}
                </p>
                <p className="flex items-center">
                  <User className="mr-2" /> Bispo ordenante: {presbitero.bispo_ordenante}
                </p>
                <p className="flex items-center">
                  <MapPin className="mr-2" /> Paróquia: {presbitero.nome_paroquia}
                </p>
                <p className="flex items-center">
                  <Book className="mr-2" /> Tipo de serviço: {presbitero.tipo_servico}
                </p>
              </div>
              <div className="space-y-2">
                <p>Nome da Paróquia: {presbitero.nome_paroquia}</p>
                <p>Data da Provisão: {new Date(presbitero.data_provisao).toLocaleDateString()}</p>
                <p>Contato: {presbitero.contato}</p>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Biografia</h3>
              <p>{presbitero.bio}</p>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}

