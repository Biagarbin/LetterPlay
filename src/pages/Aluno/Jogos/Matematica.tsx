import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, RotateCcw, Star } from 'lucide-react'

type Questao = {
  numero1: number
  numero2: number
  resposta: number
  alternativas: number[]
}

/* =========================
   QUESTÕES DO JOGO
========================= */

const questoes: Questao[] = [
  {
    numero1: 15,
    numero2: 12,
    resposta: 3,
    alternativas: [6, 5, 3, 7],
  },
  {
    numero1: 18,
    numero2: 9,
    resposta: 9,
    alternativas: [8, 9, 7, 6],
  },
  {
    numero1: 14,
    numero2: 6,
    resposta: 8,
    alternativas: [9, 7, 8, 6],
  },
  {
    numero1: 20,
    numero2: 13,
    resposta: 7,
    alternativas: [6, 8, 7, 9],
  },
  {
    numero1: 17,
    numero2: 5,
    resposta: 12,
    alternativas: [11, 12, 13, 10],
  },
  {
    numero1: 19,
    numero2: 8,
    resposta: 11,
    alternativas: [12, 10, 11, 9],
  },
  {
    numero1: 16,
    numero2: 7,
    resposta: 9,
    alternativas: [8, 9, 10, 7],
  },
  {
    numero1: 13,
    numero2: 4,
    resposta: 9,
    alternativas: [7, 8, 9, 10],
  },
]

/* =========================
   CONFIGURAÇÕES
========================= */

const TEMPO_POR_QUESTAO = 15
const MAX_VIDAS = 2

/* =========================
   COMPONENTE
========================= */

function Matematica() {
  const navigate = useNavigate()

  const [indice, setIndice] = useState(0)

  const [respostaSelecionada, setRespostaSelecionada] =
    useState<number | null>(null)

  const [acertos, setAcertos] = useState(0)

  const [vidas, setVidas] = useState(MAX_VIDAS)

  const [tempo, setTempo] =
    useState(TEMPO_POR_QUESTAO)

  const [respondendo, setRespondendo] =
    useState(true)

  const [terminou, setTerminou] =
    useState(false)

  const questaoAtual = questoes[indice]

  /* =========================
     CRONÔMETRO
  ========================= */

  useEffect(() => {
    if (terminou || !respondendo) {
      return
    }

    if (tempo <= 0) {
      perderVida()
      return
    }

    const timer = setInterval(() => {
      setTempo((valor) => valor - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [tempo, terminou, respondendo])

  /* =========================
     ESCOLHER RESPOSTA
  ========================= */

  function selecionarResposta(
    resposta: number
  ) {
    if (!respondendo) {
      return
    }

    setRespostaSelecionada(resposta)
    setRespondendo(false)

    if (resposta === questaoAtual.resposta) {
      setAcertos((valor) => valor + 1)

      setTimeout(() => {
        proximaQuestao()
      }, 900)
    } else {
      perderVida()
    }
  }

  /* =========================
     PERDER VIDA
  ========================= */

  function perderVida() {
    setRespondendo(false)

    setVidas((valor) => {
      const novasVidas = valor - 1

      if (novasVidas <= 0) {
        setTimeout(() => {
          setTerminou(true)
        }, 800)
      } else {
        setTimeout(() => {
          proximaQuestao()
        }, 900)
      }

      return novasVidas
    })
  }

  /* =========================
     PRÓXIMA QUESTÃO
  ========================= */

  function proximaQuestao() {
    if (indice + 1 >= questoes.length) {
      setTerminou(true)
      return
    }

    setIndice((valor) => valor + 1)

    setRespostaSelecionada(null)

    setTempo(TEMPO_POR_QUESTAO)

    setRespondendo(true)
  }

  /* =========================
     REINICIAR JOGO
  ========================= */

  function reiniciar() {
    setIndice(0)

    setRespostaSelecionada(null)

    setAcertos(0)

    setVidas(MAX_VIDAS)

    setTempo(TEMPO_POR_QUESTAO)

    setRespondendo(true)

    setTerminou(false)
  }

  

  if (terminou) {
    const porcentagem = Math.round(
      (acertos / questoes.length) * 100
    )

    return (
      <main className="min-h-screen bg-[#FFFBF0] px-6 py-8">

        <div className="mx-auto flex min-h-[85vh] max-w-2xl flex-col items-center justify-center">

    

          <div className="text-8xl">
            {porcentagem >= 70
              ? '🏆'
              : '💪'}
          </div>

     

          <h1 className="mt-6 text-center text-4xl font-black text-[#FF6B6B]">
            {porcentagem >= 70
              ? 'Parabéns! 🎉'
              : 'Muito bem! ⭐'}
          </h1>

          <p className="mt-3 text-center text-xl font-bold text-gray-600">
            Você terminou o jogo!
          </p>

      

          <div className="mt-8 w-full rounded-[30px] bg-white p-8 text-center shadow-lg">

            <p className="text-lg font-bold text-gray-500">
              Sua pontuação
            </p>

            <div className="mt-3 flex items-center justify-center gap-2">

              <Star
                size={40}
                fill="#FFD93D"
                color="#FFD93D"
              />

              <strong className="text-6xl font-black text-[#4ECDC4]">
                {acertos}
              </strong>

            </div>

            <p className="mt-4 text-lg font-bold text-gray-700">
              {acertos} de {questoes.length} questões
            </p>

     

            <div className="mt-6 h-5 overflow-hidden rounded-full bg-gray-200">

              <div
                className="h-full rounded-full bg-[#FFD93D] transition-all"
                style={{
                  width: `${porcentagem}%`,
                }}
              />

            </div>

            <p className="mt-3 font-bold text-gray-500">
              Aproveitamento: {porcentagem}%
            </p>

          </div>


          <div className="mt-8 flex w-full gap-4">

            <button
              onClick={reiniciar}
              className="
                flex flex-1
                items-center
                justify-center
                gap-2
                rounded-2xl
                bg-[#4ECDC4]
                px-6
                py-4
                text-lg
                font-black
                text-white
                shadow-md
                transition
                hover:scale-105
              "
            >
              <RotateCcw size={22} />

              Jogar novamente
            </button>

            <button
              onClick={() =>
                navigate('/aluno/dashboard')
              }
              className="
                flex-1
                rounded-2xl
                bg-[#C084FC]
                px-6
                py-4
                text-lg
                font-black
                text-white
                shadow-md
                transition
                hover:scale-105
              "
            >
              Voltar
            </button>

          </div>

        </div>

      </main>
    )
  }



  return (
    <main className="min-h-screen bg-[#FFFBF0] px-4 py-6 sm:px-6">

      <div className="mx-auto max-w-5xl">


        <div className="flex items-center justify-between">

       
          <button
            onClick={() =>
              navigate('/aluno/dashboard')
            }
            className="
              flex
              items-center
              gap-1
              text-lg
              font-bold
              text-gray-500
              transition
              hover:text-gray-800
            "
          >
            <ArrowLeft size={20} />

            Voltar
          </button>

      
          <div className="flex items-center gap-2">

            <span className="text-xl font-black text-gray-800 sm:text-2xl">
              MATEMÁTICA
            </span>

            <div
              className="
                grid
                grid-cols-2
                rounded-sm
                bg-[#1479C9]
                px-1
                py-1
                text-[9px]
                font-black
                leading-3
                text-white
              "
            >
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
            </div>

          </div>

      
          <div className="flex items-center gap-1">

            <Star
              size={25}
              fill="#FFD93D"
              color="#111827"
            />

            <span className="text-lg font-black text-[#FF6B6B] sm:text-xl">
              {acertos}/{questoes.length}
            </span>

          </div>

        </div>

     

        <div className="mt-5 h-3 overflow-hidden rounded-full bg-[#E5E7EB]">

          <div
            className="
              h-full
              rounded-full
              bg-[#FFD93D]
              transition-all
              duration-500
            "
            style={{
              width: `${
                ((indice + 1) /
                  questoes.length) *
                100
              }%`,
            }}
          />

        </div>

   

        <div className="mt-5 flex items-center justify-center gap-4">

          <span
            className={`
              text-xl
              font-black
              ${
                tempo <= 5
                  ? 'text-[#FF6B6B]'
                  : 'text-[#FFD93D]'
              }
            `}
          >
            {tempo}s
          </span>

          <div
            className="
              h-3
              w-full
              max-w-[535px]
              overflow-hidden
              rounded-full
              bg-[#E5E7EB]
            "
          >

            <div
              className={`
                h-full
                rounded-full
                transition-all
                duration-1000
                ${
                  tempo <= 5
                    ? 'bg-[#FF6B6B]'
                    : 'bg-[#FFD93D]'
                }
              `}
              style={{
                width: `${
                  (tempo /
                    TEMPO_POR_QUESTAO) *
                  100
                }%`,
              }}
            />

          </div>

        </div>


        <div className="mt-5 flex justify-center gap-4 text-4xl">

          {[...Array(MAX_VIDAS)].map(
            (_, index) => (

              <span
                key={index}
                className={
                  index < vidas
                    ? 'opacity-100'
                    : 'grayscale opacity-30'
                }
              >
                ❤️
              </span>

            )
          )}

        </div>


        <div className="mx-auto mt-5 max-w-2xl">

          <div
            className="
              rounded-[35px]
              border-[3px]
              border-[#FFC4C4]
              bg-[#FFF1F1]
              px-6
              py-12
              shadow-sm
            "
          >

            <div className="flex items-center justify-center gap-4 sm:gap-7">


              <span className="text-6xl font-black text-[#292929] sm:text-7xl">
                {questaoAtual.numero1}
              </span>

            

              <span className="text-5xl font-black text-[#FF6B6B] sm:text-6xl">
                −
              </span>

     
              <span className="text-6xl font-black text-[#292929] sm:text-7xl">
                {questaoAtual.numero2}
              </span>

           

              <span className="text-5xl font-black text-[#A5A5A5] sm:text-6xl">
                =
              </span>

           

              <span className="text-6xl font-black text-[#CBD0D5] sm:text-7xl">
                ?
              </span>

            </div>

          </div>


          <div className="mt-7 grid grid-cols-2 gap-4">

            {questaoAtual.alternativas.map(
              (alternativa, index) => {

                const selecionada =
                  respostaSelecionada ===
                  alternativa

                const correta =
                  alternativa ===
                  questaoAtual.resposta

                let classe =
                  'bg-white border-[#E1E3E6] text-[#202020]'

                if (
                  !respondendo &&
                  selecionada &&
                  correta
                ) {
                  classe =
                    'bg-[#4ADE80] border-[#4ADE80] text-white'
                }


                if (
                  !respondendo &&
                  selecionada &&
                  !correta
                ) {
                  classe =
                    'bg-[#FF6B6B] border-[#FF6B6B] text-white'
                }

                return (
                  <button
                    key={`${alternativa}-${index}`}
                    onClick={() =>
                      selecionarResposta(
                        alternativa
                      )
                    }
                    disabled={!respondendo}
                    className={`
                      flex
                      h-24
                      items-center
                      justify-center
                      rounded-3xl
                      border-[3px]
                      text-4xl
                      font-black
                      shadow-sm
                      transition-all
                      hover:scale-[1.02]
                      active:scale-95
                      disabled:cursor-default
                      ${classe}
                    `}
                  >
                    {alternativa}
                  </button>
                )
              }
            )}

          </div>


          <div className="mt-7 text-center">

            <span className="text-lg font-bold text-gray-400">
              Questão {indice + 1} de {questoes.length}
            </span>

          </div>

        </div>

      </div>

    </main>
  )
}

export default Matematica
