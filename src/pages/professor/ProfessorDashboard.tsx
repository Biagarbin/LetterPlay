import { useNavigate } from 'react-router-dom'
import {
  Users,
  School,
  Trophy,
  Gamepad2,
  LogOut,
} from 'lucide-react'

  function ProfessorDashboard() {
  const navigate = useNavigate()

  function sair() {
    localStorage.removeItem('letterplay_professor_logado')
    navigate('/')
  }

  return (
    <main className="min-h-screen bg-[#FFFBF0]">

      <header className="border-b bg-white px-6 py-5 shadow-sm">

        <div className="mx-auto flex max-w-7xl items-center justify-between">

          <div>
            <h1 className="text-3xl font-black text-[#C084FC]">
              Letter Play 🌟
            </h1>

            <p className="text-gray-500">
              Olá, Professor! 👋
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

      <section className="mx-auto max-w-7xl px-6 py-10">

        <h2 className="mb-8 text-4xl font-black text-gray-800">
          Dashboard 📊
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-3xl bg-[#60A5FA] p-6 text-white shadow-lg">
            <Users size={36} />

            <p className="mt-4 text-lg font-bold">
              Alunos
            </p>

            <strong className="text-4xl">
              0
            </strong>
          </div>

          <div className="rounded-3xl bg-[#4ECDC4] p-6 text-white shadow-lg">
            <School size={36} />

            <p className="mt-4 text-lg font-bold">
              Turmas
            </p>

            <strong className="text-4xl">
              0
            </strong>
          </div>

          <div className="rounded-3xl bg-[#FFD93D] p-6 text-gray-800 shadow-lg">
            <Trophy size={36} />

            <p className="mt-4 text-lg font-bold">
              Atividades
            </p>

            <strong className="text-4xl">
              0
            </strong>
          </div>

          <div className="rounded-3xl bg-[#FB923C] p-6 text-white shadow-lg">
            <Gamepad2 size={36} />

            <p className="mt-4 text-lg font-bold">
              Jogos realizados
            </p>

            <strong className="text-4xl">
              0
            </strong>
          </div>

        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">

          <button className="rounded-3xl bg-white p-8 text-left shadow-lg transition hover:-translate-y-1">
            <Users
              className="text-[#60A5FA]"
              size={40}
            />

            <h3 className="mt-4 text-2xl font-black">
              Gerenciar alunos
            </h3>

            <p className="mt-2 text-gray-500">
              Adicione e acompanhe seus alunos.
            </p>
          </button>

          <button className="rounded-3xl bg-white p-8 text-left shadow-lg transition hover:-translate-y-1">
            <School
              className="text-[#4ECDC4]"
              size={40}
            />

            <h3 className="mt-4 text-2xl font-black">
              Gerenciar turmas
            </h3>

            <p className="mt-2 text-gray-500">
              Organize suas turmas.
            </p>
          </button>

          <button className="rounded-3xl bg-white p-8 text-left shadow-lg transition hover:-translate-y-1">
            <Trophy
              className="text-[#FB923C]"
              size={40}
            />

            <h3 className="mt-4 text-2xl font-black">
              Desempenho
            </h3>

            <p className="mt-2 text-gray-500">
              Veja a evolução dos alunos.
            </p>
          </button>

        </div>

      </section>

    </main>
  )
}

export default ProfessorDashboard