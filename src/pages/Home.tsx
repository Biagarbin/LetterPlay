import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <main className="min-h-screen bg-[#FFFBF0] px-6 py-10">
      <div className="mx-auto flex min-h-[90vh] max-w-6xl flex-col items-center justify-center">

        <div className="mb-12 text-center">
          <div className="mb-4 text-6xl">
            🌟
          </div>

          <h1 className="text-6xl font-black text-[#FF6B6B]">
            Letter Play
          </h1>

          <p className="mt-4 text-2xl font-bold text-[#4ECDC4]">
            Aprendendo a ler com diversão! 🌟
          </p>

          <p className="mt-3 text-lg text-gray-600">
            Sistema de Avaliação do Nível Alfabético
          </p>
        </div>

        <div className="grid w-full max-w-4xl gap-8 md:grid-cols-2">

          <button
            onClick={() => navigate('/professor/login')}
            className="group rounded-[32px] bg-[#C084FC] p-10 text-left shadow-xl transition hover:-translate-y-2 hover:scale-[1.02]"
          >
            <div className="text-7xl">
              👩‍🏫
            </div>

            <h2 className="mt-6 text-4xl font-black text-white">
              Professor
            </h2>

            <p className="mt-3 text-xl font-semibold text-white">
              Área do educador
            </p>

            <div className="mt-8 inline-block rounded-2xl bg-white px-6 py-3 font-bold text-[#C084FC]">
              Entrar 🚀
            </div>
          </button>

          <button
            onClick={() => navigate('/aluno/login')}
            className="group rounded-[32px] bg-[#4ECDC4] p-10 text-left shadow-xl transition hover:-translate-y-2 hover:scale-[1.02]"
          >
            <div className="text-7xl">
              🧒
            </div>

            <h2 className="mt-6 text-4xl font-black text-white">
              Aluno
            </h2>

            <p className="mt-3 text-xl font-semibold text-white">
              Vamos jogar!
            </p>

            <div className="mt-8 inline-block rounded-2xl bg-white px-6 py-3 font-bold text-[#4ECDC4]">
              Jogar 🎮
            </div>
          </button>

        </div>

      </div>
    </main>
  )
}

export default Home