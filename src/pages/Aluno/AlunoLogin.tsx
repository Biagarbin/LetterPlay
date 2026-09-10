import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Gamepad2 } from 'lucide-react'

function AlunoLogin() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')

  function entrar(event: FormEvent) {
    event.preventDefault()

    // Login provisório para teste
    if (email === 'aluno@letterplay.com' && senha === '123456') {
      localStorage.setItem(
        'letterplay_aluno_logado',
        'true'
      )

      localStorage.setItem(
        'letterplay_aluno_nome',
        'João'
      )

      navigate('/aluno/dashboard')
      return
    }

    setErro('E-mail ou senha incorretos.')
  }

  return (
    <main className="min-h-screen bg-[#FFFBF0] px-4 py-8">

      <button
        onClick={() => navigate('/')}
        className="mb-8 flex items-center gap-2 font-bold text-gray-600"
      >
        <ArrowLeft size={20} />
        Voltar
      </button>

      <div className="mx-auto max-w-md rounded-[30px] bg-white p-8 shadow-xl">

        <div className="mb-8 text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#4ECDC4]">
            <Gamepad2
              size={42}
              className="text-white"
            />
          </div>

          <h1 className="mt-5 text-3xl font-black text-[#4ECDC4]">
            Login do Aluno 🧒
          </h1>

          <p className="mt-2 text-gray-500">
            Entre e comece a jogar!
          </p>

        </div>

        <form
          onSubmit={entrar}
          className="space-y-4"
        >

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full rounded-2xl border-2 border-gray-200 px-4 py-4 outline-none focus:border-[#4ECDC4]"
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            className="w-full rounded-2xl border-2 border-gray-200 px-4 py-4 outline-none focus:border-[#4ECDC4]"
          />

          {erro && (
            <div className="rounded-2xl bg-red-100 p-4 text-center font-bold text-red-600">
              {erro}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-2xl bg-[#4ECDC4] py-4 text-lg font-black text-white transition hover:scale-[1.02]"
          >
            Entrar 🎮
          </button>

        </form>

      </div>

    </main>
  )
}

export default AlunoLogin