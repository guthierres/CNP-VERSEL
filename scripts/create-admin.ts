import { createAdminUser } from "../lib/supabase-admin"

async function main() {
  try {
    const user = await createAdminUser("guthierresc@hotmail.com", "Gutim@2025")
    console.log("Usuário administrador criado com sucesso:", user)
  } catch (error) {
    console.error("Erro ao criar usuário administrador:", error)
  }
}

main()

