import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, RotateCcw } from 'lucide-react'

type Pergunta = {
  palavra: string
  imagem: string
  opcoes: string[]
}

const perguntas: Pergunta[] = [
  {
    palavra: 'CHOCOLATE',
    imagem:
      'https://images.unsplash.com/photo-1575377427642-087cf684f04d?w=600',
    opcoes: [
      'XOCOLATE',
      'CHOKOLATE',
      'CHOCOLATE',
      'CHOCOLATHLE',
    ],
  },

  {
    palavra: 'CACHORRO',
    imagem:
      'https://images.unsplash.com/photo-1558788353-f76d92427f16?w=600',
    opcoes: [
      'CACHORO',
      'CACHORRO',
      'KACHORRO',
      'CACHORU',
    ],
  },

  {
    palavra: 'SAPATO',
    imagem:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600',
    opcoes: [
      'SAPATO',
      'ZAPATO',
      'SAPATTO',
      'SAPATU',
    ],
  },

  {
    palavra: 'BANANA',
    imagem:
      'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600',
    opcoes: [
      'BANANA',
      'BANANNA',
      'VANANA',
      'BANANAU',
    ],
  },

  {
    palavra: 'COMPUTADOR',
    imagem:
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600',
    opcoes: [
      'COMPUTADOR',
      'KOMPUTADOR',
      'COMPUTADÔ',
      'COMPUTADHOR',
    ],
  },
]

function QuizDeOrtografia() {
  const navigate = useNavigate()

  const [indice, setIndice] = useState(0)
  const [vidas, setVidas] = useState(2)
  const [acertos, setAcertos] = useState(0)
  const [respondeu, setRespondeu] = useState(false)
  const [mensagem, setMensagem] = useState('')
  const [terminou, setTerminou] = useState(false)

  const perguntaAtual = perguntas[indice]

  function responder(opcao: string) {
    if (respondeu) return

    if (opcao === perguntaAtual.palavra) {
      setRespondeu(true)
      setMensagem('Muito bem! 🎉')
      setAcertos((valor) => valor + 1)

      setTimeout(() => {
        proximaPergunta()
      }, 1000)
    } else {
      const novasVidas = vidas - 1

      setVidas(novasVidas)
      setMensagem('Ops! Tente novamente. 💪')

      if (novasVidas <= 0) {
        setRespondeu(true)

        setTimeout(() => {
          setTerminou(true)
        }, 1000)
      }
    }
  }

  function proximaPergunta() {
    if (indice + 1 >= perguntas.length) {
      setTerminou(true)
      return
    }

    setIndice((valor) => valor + 1)
    setRespondeu(false)
    setMensagem('')
  }

  function reiniciar() {
    setIndice(0)
    setVidas(2)
    setAcertos(0)
    setRespondeu(false)
    setMensagem('')
    setTerminou(false)
  }

  if (terminou) {
    const porcentagem = Math.round(
      (acertos / perguntas.length) * 100
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
            Você terminou o quiz!
          </p>

          <div className="mt-8 w-full rounded-3xl bg-white p-8 text-center shadow-lg">
            <p className="text-gray-500">
              Sua pontuação
            </p>

            <strong className="text-6xl font-black text-[#4ECDC4]">
              {porcentagem}%
            </strong>

            <p className="mt-3 font-bold">
              {acertos} de {perguntas.length} perguntas
            </p>
          </div>

          <div className="mt-8 flex gap-4">

            <button
              onClick={reiniciar}
              className="flex items-center gap-2 rounded-2xl bg-[#4ECDC4] px-6 py-4 font-black text-white transition hover:scale-105"
            >
              <RotateCcw size={20} />
              Jogar novamente
            </button>

            <button
              onClick={() => navigate('/aluno/dashboard')}
              className="rounded-2xl bg-[#C084FC] px-6 py-4 font-black text-white transition hover:scale-105"
            >
              Voltar
            </button>

          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#FFFBF0]">

    

      <header className="flex items-center justify-between px-6 py-5">

        <button
          onClick={() => navigate('/aluno/dashboard')}
          className="flex items-center gap-2 font-bold text-gray-600"
        >
          <ArrowLeft size={20} />
          Voltar
        </button>

        <h1 className="text-3xl font-black text-gray-800">
          Quiz de Ortografia
          <span className="ml-2">🔤</span>
        </h1>

        <div className="text-xl font-black text-[#FF6B6B]">
          ⭐ {acertos}/{perguntas.length}
        </div>

      </header>


     

      <div className="mx-4 h-2 rounded-full bg-gray-200">

        <div
          className="h-2 rounded-full bg-[#4ECDC4] transition-all duration-500"
          style={{
            width: `${(indice / perguntas.length) * 100}%`,
          }}
        />

      </div>


      

      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-8">

        {/* VIDAS */}

        <div className="mb-5 text-4xl">
          {vidas >= 1 ? '❤️' : '🖤'}
          {' '}
          {vidas >= 2 ? '❤️' : '🖤'}
        </div>


       

        <h2 className="mb-5 text-xl font-bold tracking-wide text-gray-500">
          COMO SE ESCREVE?
        </h2>


    

        <div className="overflow-hidden rounded-[30px] shadow-lg">

          <img
            src={perguntaAtual.imagem}
            alt={perguntaAtual.palavra}
            className="h-52 w-52 object-cover"
          />

        </div>


       

        <div className="mt-5 grid w-full max-w-2xl grid-cols-2 gap-4">

          {perguntaAtual.opcoes.map((opcao) => {

            const correta =
              opcao === perguntaAtual.palavra

            return (
              <button
                key={opcao}
                onClick={() => responder(opcao)}
                disabled={respondeu}
                className={`
                  min-h-[82px]
                  rounded-[22px]
                  border-[3px]
                  border-gray-200
                  bg-white
                  px-4
                  text-2xl
                  font-black
                  text-gray-800
                  shadow-sm
                  transition
                  hover:-translate-y-1
                  hover:border-[#C084FC]
                  disabled:cursor-not-allowed
                  ${
                    respondeu && correta
                      ? 'border-[#4ADE80] bg-[#DCFCE7]'
                      : ''
                  }
                `}
              >
                {opcao}
              </button>
            )
          })}

        </div>


       

        <div className="mt-6 min-h-[40px] text-xl font-black">

          {mensagem && (
            <span
              className={
                mensagem.includes('Muito')
                  ? 'text-[#22C55E]'
                  : 'text-[#EF4444]'
              }
            >
              {mensagem}
            </span>
          )}

        </div>

      </div>

    </main>
  )
}

export default QuizDeOrtografia