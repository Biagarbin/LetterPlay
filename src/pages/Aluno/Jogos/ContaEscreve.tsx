import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, RotateCcw, Star } from 'lucide-react'

type Conta = {
  numero1: number
  numero2: number
  resposta: number
}

const contas: Conta[] = [
  { numero1: 4, numero2: 3, resposta: 1 },
  { numero1: 5, numero2: 2, resposta: 3 },
  { numero1: 7, numero2: 4, resposta: 3 },
  { numero1: 6, numero2: 2, resposta: 4 },
  { numero1: 8, numero2: 5, resposta: 3 },
  { numero1: 9, numero2: 4, resposta: 5 },
  { numero1: 7, numero2: 2, resposta: 5 },
  { numero1: 10, numero2: 6, resposta: 4 },
  { numero1: 9, numero2: 3, resposta: 6 },
  { numero1: 10, numero2: 5, resposta: 5 },
]

const numerosPorExtenso: Record<number, string> = {
  0: 'ZERO',
  1: 'UM',
  2: 'DOIS',
  3: 'TRÊS',
  4: 'QUATRO',
  5: 'CINCO',
  6: 'SEIS',
  7: 'SETE',
  8: 'OITO',
  9: 'NOVE',
  10: 'DEZ',
}

const coresNumeros = [
  '#60A5FA',
  '#F472B6',
  '#A78BFA',
  '#34D399',
  '#FB923C',
  '#FBBF24',
]

function embaralhar<T>(lista: T[]) {
  return [...lista].sort(() => Math.random() - 0.5)
}

function criarOpcoes(resposta: number) {
  const opcoes = new Set<number>()

  opcoes.add(resposta)

  while (opcoes.size < 4) {
    const variacao =
      resposta + Math.floor(Math.random() * 5) - 2

    if (variacao >= 0 && variacao <= 10) {
      opcoes.add(variacao)
    }
  }

  return embaralhar(
    Array.from(opcoes).map((numero) => ({
      numero,
      texto: numerosPorExtenso[numero],
    }))
  )
}

function ContaEEscreve() {
  const navigate = useNavigate()

  const [indice, setIndice] = useState(0)
  const [acertos, setAcertos] = useState(0)
  const [vidas, setVidas] = useState(2)

  const [opcoes, setOpcoes] = useState(() =>
    criarOpcoes(contas[0].resposta)
  )

  const [selecionada, setSelecionada] = useState<number | null>(null)
  const [mensagem, setMensagem] = useState('')
  const [terminou, setTerminou] = useState(false)

  const contaAtual = contas[indice]

  function responder(numero: number) {
    if (mensagem) return

    setSelecionada(numero)

    const acertou = numero === contaAtual.resposta

    if (acertou) {
      setMensagem('Muito bem! 🎉')

      setAcertos((valor) => valor + 1)

      setTimeout(() => {
        proximaConta()
      }, 900)

      return
    }

    setMensagem('Ops! Você perdeu um coração. 💔')

    const novasVidas = vidas - 1

    setVidas(novasVidas)

    setTimeout(() => {
      if (novasVidas <= 0) {
        setTerminou(true)
        return
      }

      proximaConta()
    }, 1000)
  }

  function proximaConta() {
    if (indice + 1 >= contas.length) {
      setTerminou(true)
      return
    }

    const proximoIndice = indice + 1

    setIndice(proximoIndice)

    setSelecionada(null)

    setMensagem('')

    setOpcoes(
      criarOpcoes(
        contas[proximoIndice].resposta
      )
    )
  }

  function reiniciar() {
    setIndice(0)
    setAcertos(0)
    setVidas(2)
    setSelecionada(null)
    setMensagem('')
    setTerminou(false)

    setOpcoes(
      criarOpcoes(contas[0].resposta)
    )
  }

  const progresso =
    ((indice + 1) / contas.length) * 100

  if (terminou) {
    const porcentagem = Math.round(
      (acertos / contas.length) * 100
    )

    return (
      <main className="min-h-screen bg-[#FFFBF0] px-6 py-8">

        <div className="mx-auto flex min-h-[85vh] max-w-2xl flex-col items-center justify-center">

          <div className="text-8xl">
            {vidas > 0
              ? '🏆'
              : '💔'}
          </div>

          <h1 className="mt-6 text-center text-4xl font-black text-[#FF6B6B]">
            {vidas > 0
              ? 'Parabéns!'
              : 'Fim de jogo!'}
          </h1>

          <p className="mt-3 text-center text-xl font-bold text-gray-600">
            {vidas > 0
              ? 'Você terminou o jogo!'
              : 'Você ficou sem corações.'}
          </p>

          <div className="mt-8 w-full rounded-[30px] bg-white p-8 text-center shadow-lg">

            <p className="text-lg font-bold text-gray-500">
              Sua pontuação
            </p>

            <div className="mt-3 flex items-center justify-center gap-2">

              <Star
                size={36}
                fill="#FFD93D"
                color="#FFD93D"
              />

              <strong className="text-6xl font-black text-[#FF6B6B]">
                {acertos}/{contas.length}
              </strong>

            </div>

            <p className="mt-4 text-lg font-bold text-gray-700">
              {porcentagem}% de acertos
            </p>

          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">

            <button
              onClick={reiniciar}
              className="flex items-center gap-2 rounded-2xl bg-[#4ECDC4] px-7 py-4 text-lg font-black text-white shadow-md transition hover:scale-105"
            >
              <RotateCcw size={22} />
              Jogar novamente
            </button>

            <button
              onClick={() =>
                navigate('/aluno/dashboard')
              }
              className="rounded-2xl bg-[#C084FC] px-7 py-4 text-lg font-black text-white shadow-md transition hover:scale-105"
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

      <header className="px-4 pt-8 md:px-6">

        <div className="mx-auto flex max-w-[1400px] items-center justify-between">

          <button
            onClick={() =>
              navigate('/aluno/dashboard')
            }
            className="flex items-center gap-1 text-lg font-medium text-[#718096] transition hover:text-gray-900"
          >
            <ArrowLeft size={18} />
            Voltar
          </button>

          <div className="flex items-center gap-2">

            <h1 className="text-2xl font-black tracking-tight text-[#252525]">
              CONTA E ESCREVE
            </h1>

            <span className="flex h-8 w-8 items-center justify-center rounded bg-[#1473C9] text-[10px] font-black leading-3 text-white">
              <span>
                1 2<br />
                3 4
              </span>
            </span>

            <span className="text-2xl">
              📝
            </span>

          </div>

          <div className="flex items-center gap-2">

            <Star
              size={25}
              fill="#FFD93D"
              color="#111"
              strokeWidth={2}
            />

            <span className="text-xl font-black text-[#FF6262]">
              {acertos}/10
            </span>

          </div>

        </div>


        <div className="mx-auto mt-4 max-w-[1400px]">

          <div className="h-2.5 overflow-hidden rounded-full bg-[#E4E7EB]">

            <div
              className="h-full rounded-full bg-[#60A5FA] transition-all duration-500"
              style={{
                width: `${progresso}%`,
              }}
            />

          </div>

        </div>

      </header>

      <div className="mx-auto flex max-w-3xl flex-col items-center px-5">

        <div className="mt-7 flex gap-3 text-4xl">

          <span
            className={
              vidas >= 1
                ? ''
                : 'grayscale opacity-30'
            }
          >
            ❤️
          </span>

          <span
            className={
              vidas >= 2
                ? ''
                : 'grayscale opacity-30'
            }
          >
            ❤️
          </span>

        </div>

        <p className="mt-5 text-center text-lg font-bold tracking-wide text-[#7B8794]">
          ESCREVA O RESULTADO POR EXTENSO!
        </p>


        <div className="mt-6 flex min-h-[190px] w-full items-center justify-center rounded-[38px] border-[3px] border-[#FFC2C2] bg-white px-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">

          <div className="flex items-center justify-center gap-5 sm:gap-8">


            <div className="flex flex-col items-center">

              <span
                className="text-6xl font-black leading-none sm:text-7xl"
                style={{
                  color: coresNumeros[0],
                }}
              >
                {contaAtual.numero1}
              </span>

              <div className="mt-4 flex gap-1.5">

                {Array.from({
                  length: contaAtual.numero1,
                }).map((_, index) => (
                  <span
                    key={index}
                    className="h-3.5 w-3.5 rounded-full bg-[#60A5FA]"
                  />
                ))}

              </div>

            </div>


            <span className="text-5xl font-black text-[#111]">
              −
            </span>

   

            <div className="flex flex-col items-center">

              <span
                className="text-6xl font-black leading-none sm:text-7xl"
                style={{
                  color: coresNumeros[1],
                }}
              >
                {contaAtual.numero2}
              </span>

              <div className="mt-4 flex gap-1.5">

                {Array.from({
                  length: contaAtual.numero2,
                }).map((_, index) => (
                  <span
                    key={index}
                    className="h-3.5 w-3.5 rounded-full bg-[#F472B6]"
                  />
                ))}

              </div>

            </div>

            <span className="text-4xl font-black text-[#999]">
              =
            </span>


            <span className="text-6xl font-black text-[#CBD0D6] sm:text-7xl">
              ?
            </span>

          </div>

        </div>



        <div className="mt-7 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">

          {opcoes.map((opcao) => {

            const correta =
              opcao.numero === contaAtual.resposta

            const escolhida =
              selecionada === opcao.numero

            let classe =
              'border-[#E1E5EA] bg-white text-[#252525]'

            if (
              mensagem &&
              escolhida &&
              correta
            ) {
              classe =
                'border-[#4ADE80] bg-[#DCFCE7] text-[#15803D]'
            }

            if (
              mensagem &&
              escolhida &&
              !correta
            ) {
              classe =
                'border-[#FF6B6B] bg-[#FEE2E2] text-[#DC2626]'
            }

            return (
              <button
                key={opcao.numero}
                onClick={() =>
                  responder(opcao.numero)
                }
                disabled={!!mensagem}
                className={`
                  min-h-[82px]
                  rounded-[24px]
                  border-[3px]
                  px-5
                  py-4
                  text-2xl
                  font-black
                  shadow-sm
                  transition
                  hover:-translate-y-1
                  hover:shadow-md
                  disabled:cursor-default
                  ${classe}
                `}
              >
                {opcao.texto}
              </button>
            )
          })}

        </div>



        {mensagem && (
          <div
            className={`
              mt-6 w-full rounded-2xl p-4
              text-center text-xl font-black
              ${
                selecionada === contaAtual.resposta
                  ? 'bg-[#4ADE80] text-white'
                  : 'bg-[#FFE4E4] text-[#E05252]'
              }
            `}
          >
            {mensagem}
          </div>
        )}


        <div className="mb-8 mt-6 text-center text-sm font-bold text-gray-400">
          Questão {indice + 1} de {contas.length}
        </div>

      </div>

    </main>
  )
}

export default ContaEEscreve
