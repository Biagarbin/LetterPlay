import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle, RotateCcw } from 'lucide-react'

type Palavra = {
  palavra: string
  emoji: string
}

const palavras: Palavra[] = [
  {
    palavra: 'BOLA',
    emoji: '⚽',
  },
  {
    palavra: 'GATO',
    emoji: '🐱',
  },
  {
    palavra: 'CASA',
    emoji: '🏠',
  },
  {
    palavra: 'SAPO',
    emoji: '🐸',
  },
  {
    palavra: 'PATO',
    emoji: '🦆',
  },
]

function embaralhar(letras: string[]) {
  return [...letras].sort(() => Math.random() - 0.5)
}

function FormeAPalavra() {
  const navigate = useNavigate()

  const [indice, setIndice] = useState(0)
  const [letrasEscolhidas, setLetrasEscolhidas] = useState<string[]>([])
  const [letrasDisponiveis, setLetrasDisponiveis] = useState<string[]>(
    embaralhar(palavras[0].palavra.split(''))
  )
  const [mensagem, setMensagem] = useState('')
  const [acertos, setAcertos] = useState(0)
  const [terminou, setTerminou] = useState(false)

  const palavraAtual = palavras[indice]

  function escolherLetra(letra: string, index: number) {
    setLetrasEscolhidas([...letrasEscolhidas, letra])

    setLetrasDisponiveis(
      letrasDisponiveis.filter((_, i) => i !== index)
    )
  }

  function removerLetra(index: number) {
    const letra = letrasEscolhidas[index]

    setLetrasEscolhidas(
      letrasEscolhidas.filter((_, i) => i !== index)
    )

    setLetrasDisponiveis([
      ...letrasDisponiveis,
      letra,
    ])
  }

  function verificar() {
    const resposta = letrasEscolhidas.join('')

    if (resposta === palavraAtual.palavra) {
      setMensagem('Muito bem! 🎉 Você acertou!')

      setAcertos(acertos + 1)

      setTimeout(() => {
        proximaPalavra()
      }, 1200)
    } else {
      setMensagem('Ops! Tente novamente. 💪')
    }
  }

  function proximaPalavra() {
    if (indice + 1 >= palavras.length) {
      setTerminou(true)
      return
    }

    const proximoIndice = indice + 1

    setIndice(proximoIndice)

    setLetrasEscolhidas([])

    setLetrasDisponiveis(
      embaralhar(
        palavras[proximoIndice].palavra.split('')
      )
    )

    setMensagem('')
  }

  function reiniciar() {
    setIndice(0)
    setAcertos(0)
    setLetrasEscolhidas([])
    setLetrasDisponiveis(
      embaralhar(palavras[0].palavra.split(''))
    )
    setMensagem('')
    setTerminou(false)
  }

  if (terminou) {
    const porcentagem = Math.round(
      (acertos / palavras.length) * 100
    )

    return (
      <main className="min-h-screen bg-[#FFFBF0] px-6 py-10">

        <div className="mx-auto flex min-h-[80vh] max-w-2xl flex-col items-center justify-center">

          <div className="text-8xl">
            🏆
          </div>

          <h1 className="mt-6 text-center text-4xl font-black text-[#FF6B6B]">
            Parabéns! 🎉
          </h1>

          <p className="mt-4 text-center text-2xl font-bold text-gray-700">
            Você terminou o jogo!
          </p>

          <div className="mt-8 rounded-3xl bg-white p-8 text-center shadow-lg">

            <p className="text-gray-500">
              Sua pontuação
            </p>

            <strong className="text-6xl font-black text-[#4ECDC4]">
              {porcentagem}%
            </strong>

            <p className="mt-3 font-bold">
              {acertos} de {palavras.length} palavras
            </p>

          </div>

          <div className="mt-8 flex gap-4">

            <button
              onClick={reiniciar}
              className="flex items-center gap-2 rounded-2xl bg-[#4ECDC4] px-6 py-4 font-black text-white"
            >
              <RotateCcw size={20} />
              Jogar novamente
            </button>

            <button
              onClick={() => navigate('/aluno/dashboard')}
              className="rounded-2xl bg-[#C084FC] px-6 py-4 font-black text-white"
            >
              Voltar
            </button>

          </div>

        </div>

      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#FFFBF0] px-6 py-8">

      <div className="mx-auto max-w-4xl">

        <button
          onClick={() => navigate('/aluno/dashboard')}
          className="flex items-center gap-2 font-bold text-gray-600"
        >
          <ArrowLeft size={20} />
          Voltar aos jogos
        </button>

        <div className="mt-8 rounded-[35px] bg-[#FF6B6B] p-8 text-center text-white shadow-lg">

          <h1 className="text-4xl font-black">
            🔤 Forme a Palavra
          </h1>

          <p className="mt-3 text-lg">
            Organize as letras e descubra a palavra!
          </p>

        </div>

        <div className="mt-6 flex justify-between rounded-2xl bg-white p-5 shadow">

          <span className="font-bold">
            Palavra {indice + 1} de {palavras.length}
          </span>

          <span className="font-bold text-[#4ECDC4]">
            ⭐ Acertos: {acertos}
          </span>

        </div>

        <div className="mt-8 rounded-[35px] bg-white p-8 text-center shadow-lg">

          <div className="text-8xl">
            {palavraAtual.emoji}
          </div>

          <p className="mt-4 text-xl font-bold text-gray-500">
            Qual é a palavra?
          </p>

          {/* LETRAS ESCOLHIDAS */}

          <div className="mt-8 flex min-h-20 flex-wrap justify-center gap-3">

            {letrasEscolhidas.map((letra, index) => (

              <button
                key={index}
                onClick={() => removerLetra(index)}
                className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFD93D] text-3xl font-black text-gray-800 shadow-md transition hover:scale-105"
              >
                {letra}
              </button>

            ))}

          </div>

          {/* LETRAS DISPONÍVEIS */}

          <div className="mt-8 flex flex-wrap justify-center gap-3">

            {letrasDisponiveis.map((letra, index) => (

              <button
                key={index}
                onClick={() => escolherLetra(letra, index)}
                className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#60A5FA] text-3xl font-black text-white shadow-md transition hover:scale-105"
              >
                {letra}
              </button>

            ))}

          </div>

          {mensagem && (
            <div className="mt-8 rounded-2xl bg-[#4ADE80] p-4 text-xl font-black text-white">
              {mensagem}
            </div>
          )}

          <button
            onClick={verificar}
            disabled={letrasEscolhidas.length !== palavraAtual.palavra.length}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#C084FC] py-4 text-xl font-black text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            <CheckCircle size={24} />
            Conferir resposta
          </button>

        </div>

      </div>

    </main>
  )
}

export default FormeAPalavra