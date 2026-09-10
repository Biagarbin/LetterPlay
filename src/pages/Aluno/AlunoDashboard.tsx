import { useNavigate } from 'react-router-dom'
import {
  LogOut,
  Star,
  Trophy,
  Gamepad2,
} from 'lucide-react'

function AlunoDashboard() {
  const navigate = useNavigate()

  const nome =
    localStorage.getItem('letterplay_aluno_nome') || 'Aluno'

  function sair() {
    localStorage.removeItem('letterplay_aluno_logado')
    localStorage.removeItem('letterplay_aluno_nome')

    navigate('/')
  }

  const jogos = [
  {
    nome: 'Forme a Palavra',
    emoji: '🔤',
    cor: '#FF6B6B',
    rota: '/Aluno/Jogos/formeAPalavra',
  },
  {
    nome: 'Quiz de Ortografia',
    emoji: '📝',
    cor: '#4ECDC4',
    rota: '/Aluno/Jogos/QuizDeOrtografia',
  },
  {
    nome: 'Corrida das Palavras',
    emoji: '🏎️',
    cor: '#FB923C',
    rota: '/Aluno/Jogos/corridaDasPalavras',
  },
  {
    nome: 'Caça-Palavras',
    emoji: '🔎',
    cor: '#FFD93D',
    rota: '',
  },
  {
    nome: 'Imagem e Palavra',
    emoji: '🖼️',
    cor: '#C084FC',
    rota: '/Aluno/Jogos/ImagemePalavra',
  },
  {
    nome: 'Cruzadinha',
    emoji: '✏️',
    cor: '#4ADE80',
    rota: '/Aluno/Jogos/Cruzadinha',
  },
  {
    nome: 'Matemática',
    emoji: '🔢',
    cor: '#60A5FA',
    rota: '/Aluno/Jogos/Matematica',
  },
  {
    nome: 'Desenho Livre',
    emoji: '🎨',
    cor: '#FB923C',
    rota: '/Aluno/Jogos/DesenhoLivre',
  },
  {
    nome: 'Conta e Escreve',
    emoji: '✍️',
    cor: '#FF6B6B',
    rota: '/Aluno/Jogos/ContaEscreve',
  },

  ]

  return (
    <main className="min-h-screen bg-[#FFFBF0]">

      

      <header className="bg-white px-6 py-5 shadow-sm">

        <div className="mx-auto flex max-w-7xl items-center justify-between">

          <div>

            <h1 className="text-3xl font-black text-[#FF6B6B]">
              Letter Play 🌟
            </h1>

            <p className="text-gray-500">
              Aprendendo a ler com diversão!
            </p>

          </div>

          <button
            onClick={sair}
            className="flex items-center gap-2 rounded-xl bg-red-100 px-4 py-3 font-bold text-red-600"
          >
            <LogOut size={18} />
            Sair
          </button>

        </div>

      </header>

      <section className="mx-auto max-w-7xl px-6 py-8">



        <div className="rounded-[30px] bg-[#4ECDC4] p-8 text-white shadow-lg">

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div>

              <p className="text-xl font-bold">
                Olá, {nome}! 👋
              </p>

              <h2 className="mt-2 text-4xl font-black">
                Vamos aprender brincando? 🎮
              </h2>

              <p className="mt-3 text-lg">
                Escolha um jogo para começar!
              </p>

            </div>

            <div className="text-8xl">
              🧒
            </div>

          </div>

        </div>

        

        <div className="mt-8 grid gap-5 md:grid-cols-3">

          <div className="rounded-3xl bg-white p-6 shadow-md">

            <div className="flex items-center gap-3">

              <div className="rounded-2xl bg-[#C084FC] p-3">
                <Star
                  className="text-white"
                  size={28}
                />
              </div>

              <div>
                <p className="text-gray-500">
                  Nível
                </p>

                <strong className="text-xl">
                  Alfabético
                </strong>
              </div>

            </div>

          </div>

          <div className="rounded-3xl bg-white p-6 shadow-md">

            <div className="flex items-center gap-3">

              <div className="rounded-2xl bg-[#FFD93D] p-3">
                <Trophy
                  className="text-gray-800"
                  size={28}
                />
              </div>

              <div>
                <p className="text-gray-500">
                  Média
                </p>

                <strong className="text-xl">
                  0%
                </strong>
              </div>

            </div>

          </div>

          <div className="rounded-3xl bg-white p-6 shadow-md">

            <div className="flex items-center gap-3">

              <div className="rounded-2xl bg-[#60A5FA] p-3">
                <Gamepad2
                  className="text-white"
                  size={28}
                />
              </div>

              <div>
                <p className="text-gray-500">
                  Pontuação
                </p>

                <strong className="text-xl">
                  0 pontos
                </strong>
              </div>

            </div>

          </div>

        </div>

        

        <div className="mt-8 rounded-3xl bg-white p-6 shadow-md">

          <div className="flex justify-between">

            <h3 className="text-xl font-black">
              Seu progresso 🚀
            </h3>

            <span className="font-bold text-[#4ECDC4]">
              0%
            </span>

          </div>

          <div className="mt-4 h-5 overflow-hidden rounded-full bg-gray-200">

            <div
              className="h-full rounded-full bg-[#4ECDC4]"
              style={{ width: '0%' }}
            />

          </div>

        </div>


        <div className="mt-10">

          <div className="mb-6 flex items-center gap-3">

            <Gamepad2
              size={34}
              className="text-[#FF6B6B]"
            />

            <h2 className="text-3xl font-black">
              Escolha um jogo 🎮
            </h2>

          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {jogos.map((jogo) => (

              <button
                key={jogo.nome}
                onClick={() => navigate(jogo.rota)}
                className="group rounded-[28px] bg-white p-6 text-left shadow-md transition hover:-translate-y-2 hover:shadow-xl"
              >

                <div
                  className="flex h-20 w-20 items-center justify-center rounded-3xl text-5xl"
                  style={{
                    backgroundColor: jogo.cor,
                  }}
                >
                  {jogo.emoji}
                </div>

                <h3 className="mt-5 text-xl font-black">
                  {jogo.nome}
                </h3>

                <p className="mt-2 font-semibold text-gray-500">
                  Jogar agora →
                </p>

              </button>

            ))}

          </div>

        </div>

      </section>

    </main>
  )
}

export default AlunoDashboard