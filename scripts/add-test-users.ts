import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"

dotenv.config({ path: ".env.local" })

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

const testUsers = [
  {
    nome_completo: "João da Silva",
    data_ordenacao: "2010-05-15",
    bispo_ordenante: "Dom Pedro Alves",
    paroquia: "Nossa Senhora da Conceição",
    tipo_servico: "Pároco",
    nome_paroquia: "Paróquia Nossa Senhora da Conceição",
    data_provisao: "2015-01-10",
    tipo_presbitero: "Diocesano",
    pais_origem: "Brasil",
    bio: "Dedicado à evangelização e trabalho social na comunidade.",
  },
  {
    nome_completo: "Pedro Oliveira",
    data_ordenacao: "2008-09-22",
    bispo_ordenante: "Dom José Santos",
    paroquia: "São Francisco de Assis",
    tipo_servico: "Vigário",
    nome_paroquia: "Paróquia São Francisco de Assis",
    data_provisao: "2012-03-05",
    tipo_presbitero: "Religioso",
    pais_origem: "Portugal",
    bio: "Especializado em pastoral juvenil e música sacra.",
  },
  {
    nome_completo: "Carlos Ferreira",
    data_ordenacao: "2015-11-30",
    bispo_ordenante: "Dom Antônio Luz",
    paroquia: "Santa Teresinha",
    tipo_servico: "Pároco",
    nome_paroquia: "Paróquia Santa Teresinha",
    data_provisao: "2018-07-20",
    tipo_presbitero: "Diocesano",
    pais_origem: "Brasil",
    bio: "Engajado em projetos de catequese e formação de lideranças.",
  },
  {
    nome_completo: "Antônio Rodrigues",
    data_ordenacao: "2005-04-18",
    bispo_ordenante: "Dom Francisco Lima",
    paroquia: "Nossa Senhora Aparecida",
    tipo_servico: "Vigário",
    nome_paroquia: "Paróquia Nossa Senhora Aparecida",
    data_provisao: "2009-12-01",
    tipo_presbitero: "Religioso",
    pais_origem: "Brasil",
    bio: "Dedicado à pastoral familiar e aconselhamento espiritual.",
  },
  {
    nome_completo: "José Pereira",
    data_ordenacao: "2012-08-07",
    bispo_ordenante: "Dom Luís Gonzaga",
    paroquia: "São João Batista",
    tipo_servico: "Pároco",
    nome_paroquia: "Paróquia São João Batista",
    data_provisao: "2016-02-14",
    tipo_presbitero: "Diocesano",
    pais_origem: "Brasil",
    bio: "Especialista em liturgia e história da Igreja.",
  },
  {
    nome_completo: "Manuel Santos",
    data_ordenacao: "2007-06-29",
    bispo_ordenante: "Dom Ricardo Ferreira",
    paroquia: "Santo Antônio",
    tipo_servico: "Vigário",
    nome_paroquia: "Paróquia Santo Antônio",
    data_provisao: "2011-09-15",
    tipo_presbitero: "Religioso",
    pais_origem: "Angola",
    bio: "Engajado em projetos missionários e diálogo inter-religioso.",
  },
  {
    nome_completo: "Francisco Almeida",
    data_ordenacao: "2014-10-04",
    bispo_ordenante: "Dom Paulo Cesar",
    paroquia: "São Pedro",
    tipo_servico: "Pároco",
    nome_paroquia: "Paróquia São Pedro",
    data_provisao: "2017-05-30",
    tipo_presbitero: "Diocesano",
    pais_origem: "Brasil",
    bio: "Dedicado à pastoral universitária e comunicação social.",
  },
  {
    nome_completo: "Luís Costa",
    data_ordenacao: "2009-03-19",
    bispo_ordenante: "Dom Marcos Silva",
    paroquia: "Nossa Senhora das Graças",
    tipo_servico: "Vigário",
    nome_paroquia: "Paróquia Nossa Senhora das Graças",
    data_provisao: "2013-08-22",
    tipo_presbitero: "Religioso",
    pais_origem: "Brasil",
    bio: "Especializado em acompanhamento espiritual e retiros.",
  },
  {
    nome_completo: "Paulo Ribeiro",
    data_ordenacao: "2011-12-08",
    bispo_ordenante: "Dom Eduardo Santos",
    paroquia: "Sagrado Coração de Jesus",
    tipo_servico: "Pároco",
    nome_paroquia: "Paróquia Sagrado Coração de Jesus",
    data_provisao: "2015-10-01",
    tipo_presbitero: "Diocesano",
    pais_origem: "Brasil",
    bio: "Engajado em projetos sociais e defesa dos direitos humanos.",
  },
  {
    nome_completo: "Miguel Fernandes",
    data_ordenacao: "2013-01-25",
    bispo_ordenante: "Dom Carlos Pereira",
    paroquia: "Nossa Senhora de Fátima",
    tipo_servico: "Vigário",
    nome_paroquia: "Paróquia Nossa Senhora de Fátima",
    data_provisao: "2016-11-13",
    tipo_presbitero: "Religioso",
    pais_origem: "Portugal",
    bio: "Dedicado à pastoral da saúde e acompanhamento de enfermos.",
  },
]

async function addTestUsers() {
  for (const user of testUsers) {
    const { data, error } = await supabase.from("presbiteros").insert([user])
    if (error) {
      console.error("Erro ao adicionar usuário de teste:", error)
    } else {
      console.log("Usuário de teste adicionado com sucesso:", user.nome_completo)
    }
  }
}

addTestUsers()

