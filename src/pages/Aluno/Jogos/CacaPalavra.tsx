import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Fase = {
  palavra: string
  emoji: string
  dica: string
  grade: string[][]
}

const fases: Fase[] = [
  {
    palavra: 'GATO',
    emoji: '🐱',
    dica: 'Animal que mia',
    grade: [
      ['G', 'A', 'T', 'O', 'P'],
      ['M', 'E', 'S', 'A', 'L'],
      ['C', 'A', 'S', 'A', 'R'],
      ['B', 'O', 'L', 'A', 'D'],
      ['F', 'L', 'O', 'R', 'E'],
    ],
  },

  {
    palavra: 'BOLA',
    emoji: '⚽',
    dica: 'Usamos para brincar e jogar',
    grade: [
      ['C', 'A', 'B', 'O', 'S'],
      ['B', 'O', 'L', 'A', 'R'],
      ['P', 'E', 'I', 'X', 'E'],
      ['G', 'A', 'T', 'O', 'S'],
      ['F', 'L', 'O', 'R', 'A'],
    ],
  },

  {
    palavra: 'CASA',
    emoji: '🏠',
    dica: 'Lugar onde moramos',
    grade: [
      ['C', 'A', 'S', 'A', 'M'],
      ['P', 'E', 'I', 'X', 'E'],
      ['G', 'A', 'T', 'O', 'S'],
      ['B', 'O', 'L', 'A', 'R'],
      ['F', 'L', 'O', 'R', 'E'],
    ],
  },

  {
    palavra: 'PEIXE',
    emoji: '🐟',
    dica: 'Animal que vive na água',
    grade: [
      ['P', 'E', 'I', 'X', 'E'],
      ['C', 'A', 'S', 'A', 'R'],
      ['G', 'A', 'T', 'O', 'L'],
      ['B', 'O', 'L', 'A', 'M'],
      ['F', 'L', 'O', 'R', 'S'],
    ],
  },

  {
    palavra: 'FLOR',
    emoji: '🌸',
    dica: 'Pode ser encontrada em um jardim',
    grade: [
      ['F', 'L', 'O', 'R', 'A'],
      ['C', 'A', 'S', 'A', 'M'],
      ['P', 'E', 'I', 'X', 'E'],
      ['G', 'A', 'T', 'O', 'S'],
      ['B', 'O', 'L', 'A', 'D'],
    ],
  },
]

function CacaPalavras() {
  const navigate = useNavigate()

  const [fase, setFase] = useState(0)
  const [selecionadas, setSelecionadas] = useState<
    string[]
  >([])
  const [mensagem, setMensagem] = useState('')
  const [pontos, setPontos] = useState(0)

  const atividade = fases[fase]

  function selecionarLetra(
    linha: number,
    coluna: number,
  ) {
    if (mensagem) return

    const chave = `${linha}-${coluna}`

    const novasSelecionadas = [
      ...selecionadas,
      chave,
    ]

    setSelecionadas(novasSelecionadas)

    const letrasSelecionadas = novasSelecionadas
      .map((posicao) => {
        const [l, c] = posicao.split('-').map(Number)

        return atividade.grade[l][c]
      })
      .join('')

    if (
      letrasSelecionadas === atividade.palavra
    ) {
      setPontos((valor) => valor + 100)

      setMensagem(
        '🎉 Muito bem! Você encontrou a palavra!',
      )
    } else if (
      letrasSelecionadas.length >=
      atividade.palavra.length
    ) {
      setMensagem(
        '😅 Essa não é a palavra! Tente novamente.',
      )
    }
  }

  function tentarNovamente() {
    setSelecionadas([])
    setMensagem('')
  }

  function proximaFase() {
    if (fase < fases.length - 1) {
      setFase((valor) => valor + 1)
      setSelecionadas([])
      setMensagem('')
    } else {
      setMensagem(
        '🏆 Parabéns! Você terminou o Caça-Palavras!',
      )
    }
  }

  function voltar() {
    navigate('/Aluno/dashboard')
  }

  function letraSelecionada(
    linha: number,
    coluna: number,
  ) {
    return selecionadas.includes(`${linha}-${coluna}`)
  }

  return (
    <main className="min-h-screen bg-[#FFFBF0]">

      

      <header className="px-6 pt-6">

        <div className="flex items-center justify-between">

          <button
            onClick={voltar}
            className="text-lg font-bold text-gray-500 transition hover:text-gray-800"
          >
            ← Voltar
          </button>

          <h1 className="text-2xl font-black text-[#263238]">
            Caça-Palavras 🔎
          </h1>

          <div className="text-3xl">
            ⭐
          </div>

        </div>

        <div className="mt-5 h-2 rounded-full bg-gray-200">

          <div
            className="h-full rounded-full bg-[#FFD93D] transition-all"
            style={{
              width: `${((fase + 1) / fases.length) * 100}%`,
            }}
          />

        </div>

      </header>


      

      <section className="mx-auto flex max-w-3xl flex-col items-center px-6 py-8">

       

        <p className="mb-3 font-bold text-gray-400">
          FASE {fase + 1} DE {fases.length}
        </p>


        

        <h2 className="text-center text-3xl font-black text-[#FF6B6B]">
          Encontre a palavra! 🔎
        </h2>

        <p className="mt-2 text-center text-gray-500">
          Clique nas letras na ordem correta.
        </p>


        

        <div className="mt-6 flex h-28 w-28 items-center justify-center rounded-[28px] bg-white text-6xl shadow-md">
          {atividade.emoji}
        </div>


       

        <div className="mt-5 w-full max-w-[550px] rounded-2xl border-2 border-[#FFD93D] bg-[#FFFDF3] px-5 py-4 text-center">

          <p className="font-bold text-[#D97706]">
            💡 DICA: {atividade.dica}
          </p>

        </div>


        

        <div className="mt-5">

          <p className="text-center text-sm font-bold text-gray-400">
            PALAVRA
          </p>

          <div className="mt-2 flex justify-center gap-2">

            {atividade.palavra
              .split('')
              .map((_, index) => (
                <div
                  key={index}
                  className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-gray-300 bg-white text-xl font-black"
                >
                  {selecionadas[index]
                    ? atividade.palavra[index]
                    : ''}
                </div>
              ))}

          </div>

        </div>


        

        <div className="mt-7 rounded-[30px] bg-white p-5 shadow-lg">

          <div className="grid grid-cols-5 gap-2">

            {atividade.grade.map(
              (linha, linhaIndex) =>
                linha.map(
                  (letra, colunaIndex) => {

                    const selecionada =
                      letraSelecionada(
                        linhaIndex,
                        colunaIndex,
                      )

                    return (
                      <button
                        key={`${linhaIndex}-${colunaIndex}`}
                        onClick={() =>
                          selecionarLetra(
                            linhaIndex,
                            colunaIndex,
                          )
                        }
                        disabled={!!mensagem}
                        className={`flex h-14 w-14 items-center justify-center rounded-xl border-2 text-xl font-black transition hover:-translate-y-1 ${
                          selecionada
                            ? 'border-[#4ECDC4] bg-[#4ECDC4] text-white'
                            : 'border-gray-200 bg-[#FAFAFA] text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {letra}
                      </button>
                    )
                  },
                ),
            )}

          </div>

        </div>


        

        {mensagem && (

          <div className="mt-6 flex flex-col items-center gap-4">

            <p
              className={`text-center text-xl font-black ${
                mensagem.includes('🎉') ||
                mensagem.includes('🏆')
                  ? 'text-[#4ECDC4]'
                  : 'text-[#FF6B6B]'
              }`}
            >
              {mensagem}
            </p>


           

            {mensagem.includes('🎉') &&
              fase < fases.length - 1 && (

                <button
                  onClick={proximaFase}
                  className="rounded-2xl bg-[#4ECDC4] px-7 py-3 font-black text-white shadow-md transition hover:scale-105"
                >
                  Próxima palavra 🚀
                </button>

              )}


        

            {mensagem.includes('🏆') && (

              <button
                onClick={voltar}
                className="rounded-2xl bg-[#FF6B6B] px-7 py-3 font-black text-white shadow-md transition hover:scale-105"
              >
                Voltar para os jogos 🎮
              </button>

            )}


            

            {mensagem.includes('😅') && (

              <button
                onClick={tentarNovamente}
                className="rounded-2xl bg-[#FFD93D] px-7 py-3 font-black text-gray-800 shadow-md transition hover:scale-105"
              >
                Tentar novamente 🔄
              </button>

            )}

          </div>

        )}


       

        <div className="mt-6 flex gap-6 pb-8 text-sm font-bold text-gray-400">

          <span>
            ⭐ {pontos} pontos
          </span>

          <span>
            🔎 {fase + 1}/{fases.length}
          </span>

        </div>

      </section>

    </main>
  )
}

export default CacaPalavras