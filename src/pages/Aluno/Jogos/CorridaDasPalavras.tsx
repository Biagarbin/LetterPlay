import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Atividade = {
  palavra: string
  emoji: string
  dica: string
  letras: string[]
}

const atividades: Atividade[] = [
  {
    palavra: 'BORBOLETA',
    emoji: '🦋',
    dica: 'É um inseto que voa',
    letras: ['B', 'T', 'O', 'L', 'O', 'A', 'E', 'R', 'B'],
  },
  {
    palavra: 'CACHORRO',
    emoji: '🐶',
    dica: 'É um animal que late',
    letras: ['C', 'R', 'A', 'O', 'H', 'C', 'R', 'O'],
  },
  {
    palavra: 'GATO',
    emoji: '🐱',
    dica: 'É um animal que mia',
    letras: ['T', 'G', 'O', 'A'],
  },
  {
    palavra: 'FLORES',
    emoji: '🌸',
    dica: 'Podem deixar os jardins coloridos',
    letras: ['R', 'F', 'S', 'O', 'L', 'E'],
  },
  {
    palavra: 'MACA',
    emoji: '🍎',
    dica: 'É uma fruta vermelha ou verde',
    letras: ['A', 'M', 'C', 'A'],
  },
  {
    palavra: 'PEIXE',
    emoji: '🐟',
    dica: 'Vive dentro da água',
    letras: ['X', 'P', 'E', 'I', 'E'],
  },
  {
    palavra: 'ARVORE',
    emoji: '🌳',
    dica: 'Tem tronco, galhos e folhas',
    letras: ['R', 'A', 'V', 'E', 'O', 'R'],
  },
  {
    palavra: 'SOL',
    emoji: '☀️',
    dica: 'Aparece no céu durante o dia',
    letras: ['L', 'S', 'O'],
  },
  {
    palavra: 'CASA',
    emoji: '🏠',
    dica: 'É um lugar onde podemos morar',
    letras: ['S', 'A', 'C', 'A'],
  },
  {
    palavra: 'CARRO',
    emoji: '🚗',
    dica: 'Tem quatro rodas e pode nos transportar',
    letras: ['R', 'C', 'O', 'A', 'R'],
  },
]

function CorridaDasPalavras() {
  const navigate = useNavigate()

  const [fase, setFase] = useState(0)
  const [letrasEscolhidas, setLetrasEscolhidas] = useState<string[]>([])
  const [letrasDisponiveis, setLetrasDisponiveis] = useState<string[]>([])
  const [vidas, setVidas] = useState(2)
  const [tempo, setTempo] = useState(20)
  const [pontos, setPontos] = useState(0)
  const [mensagem, setMensagem] = useState('')

  const atividade = atividades[fase]

  
  function embaralharLetras(letras: string[]) {
    return [...letras].sort(() => Math.random() - 0.5)
  }

 
  function iniciarFase(numero: number) {
    const novaAtividade = atividades[numero]

    setLetrasEscolhidas([])
    setLetrasDisponiveis(
      embaralharLetras(novaAtividade.letras),
    )
    setVidas(2)
    setTempo(20)
    setMensagem('')
  }

  
  useEffect(() => {
    iniciarFase(fase)
  }, [fase])

  
  useEffect(() => {
    if (tempo <= 0) {
      setMensagem('⏰ O tempo acabou!')

      return
    }

    if (mensagem) {
      return
    }

    const intervalo = setInterval(() => {
      setTempo((valor) => valor - 1)
    }, 1000)

    return () => clearInterval(intervalo)
  }, [tempo, mensagem])

  function escolherLetra(letra: string, index: number) {
    if (mensagem) return

    const proximaLetra =
      atividade.palavra[letrasEscolhidas.length]

    // ACERTO
    if (letra === proximaLetra) {
      const novasEscolhidas = [
        ...letrasEscolhidas,
        letra,
      ]

      setLetrasEscolhidas(novasEscolhidas)

      setLetrasDisponiveis((anterior) =>
        anterior.filter((_, i) => i !== index),
      )

      
      if (
        novasEscolhidas.length ===
        atividade.palavra.length
      ) {
        const pontosGanhos = tempo * 5 + 50

        setPontos((valor) => valor + pontosGanhos)
        setMensagem(
          `🎉 Muito bem! +${pontosGanhos} pontos!`,
        )
      }

      return
    }

    
    const novasVidas = vidas - 1

    setVidas(novasVidas)

    if (novasVidas <= 0) {
      setMensagem(
        `😢 Acabaram as vidas! A palavra era ${atividade.palavra}.`,
      )
    }
  }

  function proximaFase() {
    if (fase < atividades.length - 1) {
      setFase((valor) => valor + 1)
    } else {
      setMensagem(
        `🏆 Parabéns! Você terminou todas as fases!`,
      )
    }
  }

  function voltar() {
    navigate('/Aluno/dashboard')
  }

  const progresso =
    ((fase + 1) / atividades.length) * 100

  const progressoTempo = (tempo / 20) * 100

  const terminouPalavra =
    letrasEscolhidas.length ===
    atividade.palavra.length

  return (
    <main className="min-h-screen bg-[#FFFBF0] text-[#263238]">

      
      <header className="px-8 pt-6">

        <div className="relative flex items-center justify-between">

          <button
            onClick={voltar}
            className="text-lg font-semibold text-gray-500 transition hover:text-gray-800"
          >
            ← Voltar
          </button>

          <h1 className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-2xl font-black">
            Corrida das Palavras 🏎️
          </h1>

          <div className="text-3xl">
            ⭐
          </div>

        </div>

        <div className="mt-4 h-2 w-full rounded-full bg-gray-200" />

      </header>


     
      <section className="mx-auto flex w-full max-w-3xl flex-col items-center px-6 pt-7">

       
        <p className="mb-4 text-sm font-bold text-gray-400">
          FASE {fase + 1} DE {atividades.length}
        </p>


       
        <div className="flex w-full max-w-[600px] items-center gap-8">

          <span className="w-12 text-2xl font-black text-[#4ADE80]">
            {tempo}s
          </span>

          <div className="h-4 flex-1 overflow-hidden rounded-full bg-gray-200">

            <div
              className="h-full rounded-full bg-[#4ADE80] transition-all duration-1000"
              style={{
                width: `${progressoTempo}%`,
              }}
            />

          </div>

        </div>


        
        <div className="mt-7 flex h-[60px] w-full max-w-[600px] items-center rounded-full bg-[#F1F2F4] px-5">

          <div className="relative flex w-full items-center">

            <div
              className="absolute z-10 text-3xl transition-all duration-500"
              style={{
                left: `${progresso * 0.85}%`,
                transform: 'translateX(-50%)',
              }}
            >
              🏎️
            </div>

            <div className="ml-7 flex w-full items-center gap-3">

              <div className="h-1 w-20 rounded-full bg-[#FFD93D]" />

              <div className="h-1 flex-1 rounded-full bg-gray-200" />

              <div className="h-1 flex-1 rounded-full bg-gray-200" />

              <div className="h-1 flex-1 rounded-full bg-gray-200" />

              <div className="h-1 flex-1 rounded-full bg-gray-200" />

              <div className="h-1 flex-1 rounded-full bg-gray-200" />

            </div>

          </div>

        </div>


       
        <div className="mt-5 flex h-[150px] w-[150px] items-center justify-center overflow-hidden rounded-[24px] bg-white text-7xl shadow-md">
          {atividade.emoji}
        </div>


        
        <div className="mt-3 flex gap-2 text-3xl">

          <span>
            {vidas >= 1 ? '❤️' : '🩶'}
          </span>

          <span>
            {vidas >= 2 ? '❤️' : '🩶'}
          </span>

        </div>


        
        <div className="mt-5 w-full max-w-[600px] rounded-2xl border-2 border-[#FFD93D] bg-[#FFFDF3] px-5 py-3 text-center">

          <p className="font-bold text-[#D97706]">
            💡 DICA: {atividade.dica}
          </p>

        </div>


       
        <div className="mt-5 flex flex-wrap justify-center gap-2">

          {atividade.palavra.split('').map(
            (_, index) => (
              <div
                key={index}
                className="flex h-[50px] w-[50px] items-center justify-center rounded-xl border-[3px] border-gray-300 bg-white text-2xl font-black"
              >
                {letrasEscolhidas[index] || ''}
              </div>
            ),
          )}

        </div>


       
        <div className="mt-7 w-full max-w-[600px] rounded-[28px] bg-white px-8 py-7 shadow-sm">

          <div className="flex flex-wrap justify-center gap-3">

            {letrasDisponiveis.map(
              (letra, index) => (

                <button
                  key={`${letra}-${index}`}
                  onClick={() =>
                    escolherLetra(letra, index)
                  }
                  disabled={!!mensagem}
                  className="flex h-[64px] w-[64px] items-center justify-center rounded-2xl border-[3px] border-gray-200 bg-[#FAFAFA] text-2xl font-black shadow-sm transition hover:-translate-y-1 hover:bg-gray-100 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {letra}
                </button>

              ),
            )}

          </div>

        </div>


        
        {mensagem && (
          <div className="mt-5 flex flex-col items-center gap-4">

            <p className="text-center text-xl font-black text-[#4ECDC4]">
              {mensagem}
            </p>

            {terminouPalavra &&
              fase < atividades.length - 1 && (
                <button
                  onClick={proximaFase}
                  className="rounded-2xl bg-[#4ECDC4] px-7 py-3 font-black text-white shadow-md transition hover:scale-105"
                >
                  Próxima palavra 🚀
                </button>
              )}

            {fase === atividades.length - 1 &&
              terminouPalavra && (
                <button
                  onClick={voltar}
                  className="rounded-2xl bg-[#FF6B6B] px-7 py-3 font-black text-white shadow-md transition hover:scale-105"
                >
                  Voltar para os jogos 🎮
                </button>
              )}

          </div>
        )}


        
        <div className="mt-5 flex gap-6 pb-8 text-sm font-bold text-gray-400">

          <span>
            ⭐ {pontos} pontos
          </span>

          <span>
            🏁 {fase + 1}/{atividades.length}
          </span>

        </div>

      </section>

    </main>
  )
}

export default CorridaDasPalavras