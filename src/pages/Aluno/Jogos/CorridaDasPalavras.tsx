import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function CorridaDasPalavras() {
  const navigate = useNavigate()

  const palavra = 'BORBOLETA'

  const letrasMisturadas = [
    'B',
    'T',
    'O',
    'L',
    'O',
    'A',
    'E',
    'R',
    'B',
  ]

  const [letrasEscolhidas, setLetrasEscolhidas] = useState<string[]>([])
  const [letrasDisponiveis, setLetrasDisponiveis] =
    useState(letrasMisturadas)

  const [vidas, setVidas] = useState(2)
  const [tempo, setTempo] = useState(20)

  useEffect(() => {
    if (tempo <= 0) return

    const intervalo = setInterval(() => {
      setTempo((valor) => valor - 1)
    }, 1000)

    return () => clearInterval(intervalo)
  }, [tempo])

  function escolherLetra(letra: string, index: number) {
    const proximaLetra = palavra[letrasEscolhidas.length]

    if (letra === proximaLetra) {
      setLetrasEscolhidas((anterior) => [
        ...anterior,
        letra,
      ])

      setLetrasDisponiveis((anterior) =>
        anterior.filter((_, i) => i !== index)
      )

      return
    }

    setVidas((valor) => Math.max(0, valor - 1))
  }

  function voltar() {
    navigate('/Aluno/dashboard')
  }

  return (
    <main className="min-h-screen bg-[#FFFBF0] text-[#263238]">

      {/* CABEÇALHO */}
      <header className="px-8 pt-6">

        <div className="relative flex items-center justify-between">

          <button
            onClick={voltar}
            className="text-lg font-semibold text-gray-500 transition hover:text-gray-800"
          >
            ← Voltar
          </button>

          <h1 className="absolute left-1/2 -translate-x-1/2 text-2xl font-black">
            Corrida das Palavras 🏎️
          </h1>

          <div className="text-3xl">
            ⭐
          </div>

        </div>

        {/* LINHA ABAIXO DO TÍTULO */}
        <div className="mt-4 h-2 w-full rounded-full bg-gray-200" />

      </header>


      {/* CONTEÚDO */}
      <section className="mx-auto flex w-full max-w-3xl flex-col items-center px-6 pt-7">

        {/* TEMPO + BARRA */}
        <div className="flex w-full max-w-[600px] items-center gap-8">

          <span className="text-2xl font-black text-[#4ADE80]">
            {tempo}s
          </span>

          <div className="h-4 flex-1 overflow-hidden rounded-full bg-gray-200">

            <div
              className="h-full rounded-full bg-[#4ADE80] transition-all duration-1000"
              style={{
                width: `${(tempo / 20) * 100}%`,
              }}
            />

          </div>

        </div>


        {/* PISTA */}
        <div className="mt-7 flex h-[60px] w-full max-w-[600px] items-center rounded-full bg-[#F1F2F4] px-5">

          <div className="relative flex w-full items-center">

            {/* CARRO */}
            <div className="absolute left-0 z-10 text-3xl">
              🏎️
            </div>

            {/* PISTA */}
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


        {/* IMAGEM */}
        <div className="mt-5 flex h-[150px] w-[150px] items-center justify-center overflow-hidden rounded-[24px] bg-green-100 shadow-md">

          <img
            src="/borboleta.jpg"
            alt="Borboleta"
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />

          <span className="absolute text-7xl">
            🦋
          </span>

        </div>


        {/* VIDAS */}
        <div className="mt-3 flex gap-2 text-3xl">

          <span>
            {vidas >= 1 ? '❤️' : '🩶'}
          </span>

          <span>
            {vidas >= 2 ? '❤️' : '🩶'}
          </span>

        </div>


        {/* ESPAÇOS DAS LETRAS */}
        <div className="mt-5 flex flex-wrap justify-center gap-2">

          {palavra.split('').map((_, index) => (

            <div
              key={index}
              className="flex h-[50px] w-[50px] items-center justify-center rounded-xl border-[3px] border-gray-300 bg-white text-2xl font-black"
            >
              {letrasEscolhidas[index] || ''}
            </div>

          ))}

        </div>


        {/* LETRAS */}
        <div className="mt-7 w-full max-w-[600px] rounded-[28px] bg-white px-8 py-7 shadow-sm">

          <div className="flex flex-wrap justify-center gap-3">

            {letrasDisponiveis.map((letra, index) => (

              <button
                key={`${letra}-${index}`}
                onClick={() => escolherLetra(letra, index)}
                className="flex h-[64px] w-[64px] items-center justify-center rounded-2xl border-[3px] border-gray-200 bg-[#FAFAFA] text-2xl font-black shadow-sm transition hover:-translate-y-1 hover:bg-gray-100 active:scale-95"
              >
                {letra}
              </button>

            ))}

          </div>

        </div>


        {/* TEXTO INFERIOR */}
        <p className="mt-5 pb-8 text-center text-base font-medium tracking-wide text-gray-400">
          CLIQUE NAS LETRAS NA ORDEM CERTA!
        </p>

      </section>

    </main>
  )
}

export default CorridaDasPalavras