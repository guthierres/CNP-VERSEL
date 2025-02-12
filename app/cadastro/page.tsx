"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { supabase } from "@/lib/supabaseClient"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Upload } from "lucide-react"
import { BackToHomeButton } from "@/components/BackToHomeButton"

export default function Cadastro() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nome_completo: "",
    data_ordenacao: "",
    bispo_ordenante: "",
    documento_ordenacao: null,
    foto_perfil: null,
    contato: "",
    nome_paroquia: "",
    data_provisao: "",
    tipo_presbitero: "",
    tipo_servico: "",
    bio: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const fieldName = e.target.name
      if (
        (fieldName === "foto_perfil" && file.size <= 100 * 1024) ||
        (fieldName === "documento_ordenacao" &&
          ((file.type === "application/pdf" && file.size <= 120 * 1024) ||
            (file.type.startsWith("image/") && file.size <= 100 * 1024)))
      ) {
        setFormData({ ...formData, [fieldName]: file })
      } else {
        alert("O arquivo excede o tamanho máximo permitido ou não está no formato correto.")
        e.target.value = ""
      }
    }
  }

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "")
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/)
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`
    }
    return value
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setFormData({ ...formData, contato: formatted })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      // Upload foto de perfil
      let foto_perfil_url = ""
      if (formData.foto_perfil) {
        const { data: fotoData, error: fotoError } = await supabase.storage
          .from("uploads")
          .upload(`fotos_perfil/${Date.now()}_${formData.foto_perfil.name}`, formData.foto_perfil)
        if (fotoError) throw fotoError
        foto_perfil_url = fotoData.path
      }

      // Upload documento de ordenação
      let documento_ordenacao_url = ""
      if (formData.documento_ordenacao) {
        const { data: docData, error: docError } = await supabase.storage
          .from("uploads")
          .upload(
            `documentos_ordenacao/${Date.now()}_${formData.documento_ordenacao.name}`,
            formData.documento_ordenacao,
          )
        if (docError) throw docError
        documento_ordenacao_url = docData.path
      }

      // Inserir dados no banco
      const { data, error } = await supabase.from("presbiteros").insert([
        {
          ...formData,
          foto_perfil: foto_perfil_url,
          documento_ordenacao: documento_ordenacao_url,
        },
      ])

      if (error) throw error

      alert("Cadastro realizado com sucesso! Aguarde a aprovação.")
      router.push("/")
    } catch (error) {
      alert("Erro ao realizar cadastro. Por favor, tente novamente.")
      console.error("Erro:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <BackToHomeButton />
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Cadastro de Presbítero</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nome_completo">Nome Completo</Label>
                  <Input type="text" id="nome_completo" name="nome_completo" onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="data_ordenacao">Data da Ordenação</Label>
                  <Input type="date" id="data_ordenacao" name="data_ordenacao" onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bispo_ordenante">Bispo Ordenante</Label>
                  <Input type="text" id="bispo_ordenante" name="bispo_ordenante" onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="documento_ordenacao">
                    Documento de Ordenação (PDF até 120KB ou imagem até 100KB)
                  </Label>
                  <Input
                    type="file"
                    id="documento_ordenacao"
                    name="documento_ordenacao"
                    onChange={handleFileChange}
                    accept=".pdf,image/*"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="foto_perfil">Foto de Perfil (até 100KB)</Label>
                  <Input type="file" id="foto_perfil" name="foto_perfil" onChange={handleFileChange} accept="image/*" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contato">Contato (Telefone)</Label>
                  <Input
                    type="tel"
                    id="contato"
                    name="contato"
                    value={formData.contato}
                    onChange={handlePhoneChange}
                    placeholder="(00) 00000-0000"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nome_paroquia">Nome da Paróquia</Label>
                  <Input type="text" id="nome_paroquia" name="nome_paroquia" onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="data_provisao">Data da Provisão</Label>
                  <Input type="date" id="data_provisao" name="data_provisao" onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipo_presbitero">Tipo de Presbítero</Label>
                  <Select onValueChange={(value) => handleSelectChange("tipo_presbitero", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo de presbítero" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="religioso">Religioso</SelectItem>
                      <SelectItem value="diocesano">Diocesano</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipo_servico">Tipo de Serviço</Label>
                  <Select onValueChange={(value) => handleSelectChange("tipo_servico", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo de serviço" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paroco">Pároco</SelectItem>
                      <SelectItem value="vigario">Vigário</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Biografia</Label>
                <Textarea id="bio" name="bio" onChange={handleChange} className="h-32" />
              </div>
              <div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Enviar Cadastro
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}

