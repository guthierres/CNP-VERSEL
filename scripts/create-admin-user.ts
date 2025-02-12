import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error("Missing environment variables for Supabase")
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

async function createAdminUser() {
  const { data: userData, error: userError } = await supabase.auth.admin.createUser({
    email: "guthierresc@hotmail.com",
    password: "Gutim@2025",
    email_confirm: true,
    user_metadata: { role: "administrador" },
  })

  if (userError) {
    console.error("Erro ao criar usuário administrador:", userError.message)
    return
  }

  console.log("Usuário administrador criado com sucesso:", userData.user)

  // Create profile for the admin user
  const { data: profileData, error: profileError } = await supabase.from("profiles").upsert({
    id: userData.user.id,
    username: "administrador",
    role: "administrador",
  })

  if (profileError) {
    console.error("Erro ao criar perfil do administrador:", profileError.message)
  } else {
    console.log("Perfil do administrador criado com sucesso:", profileData)
  }
}

createAdminUser()

