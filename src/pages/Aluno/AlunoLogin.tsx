import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Gamepad2 } from 'lucide-react'

type Aluno = {
  id: string
  nome: string
  email: string
  senha: string
  turma: string
  nivelAlfabetico: string
  media: number
  pontuacao: number
  jogosRealizados: number
  audioAtivo: boolean
}

function AlunoLogin() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')

  function entrar(event: FormEvent) {
    event.preventDefault()

    setErro('')

    const alunosSalvos = JSON.parse(
      localStorage.getItem('letterplay_alunos') || '[]'
    ) as Aluno[]

    const alunoEncontrado = alunosSalvos.find(
      (aluno) =>
        aluno.email.toLowerCase().trim() ===
          email.toLowerCase().trim() &&
        aluno.senha === senha
    )

    if (!alunoEncontrado) {
      setErro('E-mail ou senha incorretos.')
      return
    }

    // Salva o login do aluno
    localStorage.setItem(
      'letterplay_aluno_logado',
      'true'
    )

    // Salva o nome do aluno
    localStorage.setItem(
      'letterplay_aluno_nome',
      alunoEncontrado.nome
    )

    // Salva o ID do aluno para usar em outras telas
    localStorage.setItem(
      'letterplay_aluno_id',
      alunoEncontrado.id
    )

    // Salva a turma do aluno
    localStorage.setItem(
      'letterplay_aluno_turma',
      alunoEncontrado.turma
    )

    // Vai para o dashboard
    navigate('/Aluno/dashboard')
  }

  return (
    <main className="min-h-screen bg-[#FFFBF0] px-4 py-8">

      {/* VOLTAR */}

      <button
        onClick={() => navigate('/')}
        className="mb-8 flex items-center gap-2 font-bold text-gray-600 transition hover:text-[#4ECDC4]"
      >
        <ArrowLeft size={20} />
        Voltar
      </button>

      {/* CARD */}

      <div className="mx-auto max-w-md rounded-[30px] bg-white p-8 shadow-xl">

        {/* TOPO */}

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

        {/* FORMULÁRIO */}

        <form
          onSubmit={entrar}
          className="space-y-4"
        >

          {/* E-MAIL */}

          <div>
            <label className="mb-2 block font-bold text-gray-700">
              E-mail
            </label>

            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setErro('')
              }}
              className="w-full rounded-2xl border-2 border-gray-200 px-4 py-4 outline-none transition focus:border-[#4ECDC4]"
              required
            />
          </div>

          {/* SENHA */}

          <div>
            <label className="mb-2 block font-bold text-gray-700">
              Senha
            </label>

            <input
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => {
                setSenha(e.target.value)
                setErro('')
              }}
              className="w-full rounded-2xl border-2 border-gray-200 px-4 py-4 outline-none transition focus:border-[#4ECDC4]"
              required
            />
          </div>

          {/* ERRO */}

          {erro && (
            <div className="rounded-2xl bg-red-100 p-4 text-center font-bold text-red-600">
              ❌ {erro}
            </div>
          )}

          {/* BOTÃO */}

          <button
            type="submit"
            className="w-full rounded-2xl bg-[#4ECDC4] py-4 text-lg font-black text-white transition hover:scale-[1.02] hover:bg-[#3dbbb3]"
          >
            Entrar 🎮
          </button>

        </form>

      </div>

    </main>
  )
}

export default AlunoLogin