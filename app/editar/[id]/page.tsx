"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { supabase } from "@/lib/supabaseClient"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { BackToHomeButton } from "@/components/BackToHomeButton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function EditarPresbitero() {
  const router = useRouter()
  const { id } = useParams()
  const [formData, setFormData] = useState({
    nome_completo: "",
    data_ordenacao: "",
    bispo_ordenante: "",
    paroquia: "",
    tipo_servico: "",
    nome_paroquia: "",
    data_provisao: "",
    tipo_presbitero: "",
    pais_origem: "",
    bio: "",
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPresbitero()
  }, []) // Removed unnecessary dependency 'id'

  const fetchPresbitero = async () => {
    setIsLoading(true)
    const { data, error } = await supabase.from("presbiteros").select("*").eq("id", id).single()

    if (error) {
      console.error("Erro ao buscar dados do presbítero:", error)
      router.push("/painel-de-controle")
    } else {
      setFormData(data)
    }
    setIsLoading(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const { error } = await supabase.from("presbiteros").update(formData).eq("id", id)

    if (error) {
      console.error("Erro ao atualizar presbítero:", error)
      alert("Erro ao atualizar presbítero. Por favor, tente novamente.")
    } else {
      alert("Presbítero atualizado com sucesso!")
      router.push("/painel-de-controle")
    }
    setIsLoading(false)
  }

  if (isLoading) {
    return <div>Carregando...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <BackToHomeButton />
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Editar Presbítero</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="nome_completo">Nome Completo</Label>
                <Input
                  id="nome_completo"
                  name="nome_completo"
                  value={formData.nome_completo}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="data_ordenacao">Data de Ordenação</Label>
                <Input
                  id="data_ordenacao"
                  name="data_ordenacao"
                  type="date"
                  value={formData.data_ordenacao}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="bispo_ordenante">Bispo Ordenante</Label>
                <Input
                  id="bispo_ordenante"
                  name="bispo_ordenante"
                  value={formData.bispo_ordenante}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="paroquia">Paróquia</Label>
                <Input id="paroquia" name="paroquia" value={formData.paroquia} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="tipo_servico">Tipo de Serviço</Label>
                <Input
                  id="tipo_servico"
                  name="tipo_servico"
                  value={formData.tipo_servico}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="nome_paroquia">Nome da Paróquia</Label>
                <Input
                  id="nome_paroquia"
                  name="nome_paroquia"
                  value={formData.nome_paroquia}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="data_provisao">Data de Provisão</Label>
                <Input
                  id="data_provisao"
                  name="data_provisao"
                  type="date"
                  value={formData.data_provisao}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="tipo_presbitero">Tipo de Presbítero</Label>
                <Input
                  id="tipo_presbitero"
                  name="tipo_presbitero"
                  value={formData.tipo_presbitero}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="pais_origem">País de Origem</Label>
                <Input
                  id="pais_origem"
                  name="pais_origem"
                  value={formData.pais_origem}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="bio">Biografia</Label>
                <Textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} rows={4} />
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Atualizando..." : "Atualizar Presbítero"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}

