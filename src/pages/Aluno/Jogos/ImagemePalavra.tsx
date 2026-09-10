import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, RotateCcw } from 'lucide-react'

type Item = {
  id: number
  palavra: string
  imagem: string
}

const itens: Item[] = [
  {
    id: 1,
    palavra: 'BANANA',
    imagem:
      'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600',
  },

  {
    id: 2,
    palavra: 'ABACAXI',
    imagem:
      'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=600',
  },

  {
    id: 3,
    palavra: 'CHOCOLATE',
    imagem:
      'https://images.unsplash.com/photo-1575377427642-087cf684f04d?w=600',
  },

  {
    id: 4,
    palavra: 'BICICLETA',
    imagem:
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600',
  },
]

const palavras = [
  'ABACAXI',
  'BANANA',
  'XOCOLATE',
  'CHOCOLATE',
  'BICICLETA',
  'CACHORRO',
]

function embaralhar(array: string[]) {
  return [...array].sort(() => Math.random() - 0.5)
}

function ImagemEPalavra() {
  const navigate = useNavigate()

  const [imagemSelecionada, setImagemSelecionada] = useState<number | null>(
    null
  )

  const [palavrasEmbaralhadas, setPalavrasEmbaralhadas] = useState<string[]>(
    embaralhar(palavras)
  )

  const [paresEncontrados, setParesEncontrados] = useState<number[]>([])

  const [mensagem, setMensagem] = useState('')

  const [acertos, setAcertos] = useState(0)

  const [terminou, setTerminou] = useState(false)

  function selecionarImagem(id: number) {
    if (paresEncontrados.includes(id)) return

    setImagemSelecionada(id)
    setMensagem('')
  }

  function selecionarPalavra(palavra: string) {
    if (imagemSelecionada === null) {
      setMensagem('👆 Primeiro clique em uma imagem!')
      return
    }

    const item = itens.find(
      (item) => item.id === imagemSelecionada
    )

    if (!item) return

    if (item.palavra === palavra) {
      const novosPares = [
        ...paresEncontrados,
        imagemSelecionada,
      ]

      setParesEncontrados(novosPares)

      setAcertos((valor) => valor + 1)

      setMensagem('Muito bem! 🎉')

      setImagemSelecionada(null)

      if (novosPares.length === itens.length) {
        setTimeout(() => {
          setTerminou(true)
        }, 1000)
      }
    } else {
      setMensagem('Ops! Essa não combina. Tente novamente! 💪')

      setTimeout(() => {
        setMensagem('')
        setImagemSelecionada(null)
      }, 1000)
    }
  }

  function reiniciar() {
    setImagemSelecionada(null)

    setPalavrasEmbaralhadas(
      embaralhar(palavras)
    )

    setParesEncontrados([])

    setMensagem('')

    setAcertos(0)

    setTerminou(false)
  }

  if (terminou) {
    const porcentagem = Math.round(
      (acertos / itens.length) * 100
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
            Você encontrou todas as palavras!
          </p>

          <div className="mt-8 w-full rounded-3xl bg-white p-8 text-center shadow-lg">

            <p className="text-gray-500">
              Sua pontuação
            </p>

            <strong className="text-6xl font-black text-[#4ECDC4]">
              {porcentagem}%
            </strong>

            <p className="mt-3 font-bold">
              {acertos} de {itens.length} pares
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

      {/* CABEÇALHO */}

      <header className="flex items-center justify-between px-6 py-5">

        <button
          onClick={() => navigate('/aluno/dashboard')}
          className="flex items-center gap-2 font-bold text-gray-600"
        >
          <ArrowLeft size={20} />
          Voltar
        </button>

        <h1 className="text-3xl font-black text-gray-800">
          Imagem e Palavra
          <span className="ml-2">🖼️</span>
        </h1>

        <div className="text-xl font-black text-[#FF6B6B]">
          ⭐ {acertos}/{itens.length}
        </div>

      </header>


      {/* BARRA DE PROGRESSO */}

      <div className="mx-4 h-2 rounded-full bg-gray-200">

        <div
          className="h-2 rounded-full bg-[#4ECDC4] transition-all duration-500"
          style={{
            width: `${(acertos / itens.length) * 100}%`,
          }}
        />

      </div>


      {/* INSTRUÇÃO */}

      <div className="mx-auto max-w-4xl px-6 pt-7 text-center">

        <p className="text-xl font-medium text-gray-500">
          Clique em uma imagem para começar! 👆
        </p>

      </div>


      {/* TÍTULOS */}

      <div className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-6 px-6">

        <h2 className="text-center text-lg font-black text-gray-400">
          Imagens
        </h2>

        <h2 className="text-center text-lg font-black text-gray-400">
          Palavras
        </h2>

      </div>


      {/* JOGO */}

      <div className="mx-auto mt-5 grid max-w-3xl grid-cols-2 gap-6 px-6">

        {/* COLUNA DAS IMAGENS */}

        <div className="flex flex-col gap-4">

          {itens.map((item) => {

            const encontrado =
              paresEncontrados.includes(item.id)

            const selecionado =
              imagemSelecionada === item.id

            return (
              <button
                key={item.id}
                onClick={() => selecionarImagem(item.id)}
                disabled={encontrado}
                className={`
                  overflow-hidden
                  rounded-[25px]
                  border-[3px]
                  bg-white
                  p-2
                  shadow-sm
                  transition

                  ${
                    selecionado
                      ? 'scale-[1.02] border-[#C084FC] shadow-lg'
                      : 'border-gray-200'
                  }

                  ${
                    encontrado
                      ? 'border-[#4ADE80] opacity-60'
                      : ''
                  }

                  hover:scale-[1.02]
                `}
              >

                <img
                  src={item.imagem}
                  alt={item.palavra}
                  className="h-52 w-full rounded-[18px] object-cover"
                />

              </button>
            )
          })}

        </div>


        {/* COLUNA DAS PALAVRAS */}

        <div className="flex flex-col gap-4">

          {palavrasEmbaralhadas.map((palavra, index) => {

            const itemRelacionado = itens.find(
              (item) => item.palavra === palavra
            )

            const encontrada =
              itemRelacionado &&
              paresEncontrados.includes(itemRelacionado.id)

            return (
              <button
                key={`${palavra}-${index}`}
                onClick={() =>
                  selecionarPalavra(palavra)
                }
                disabled={!!encontrada}
                className={`
                  min-h-[82px]
                  rounded-[22px]
                  border-[3px]
                  bg-white
                  px-4
                  text-2xl
                  font-black
                  text-gray-800
                  shadow-sm
                  transition

                  ${
                    encontrada
                      ? 'border-[#4ADE80] bg-[#DCFCE7] text-[#22C55E]'
                      : 'border-gray-200'
                  }

                  hover:-translate-y-1
                  hover:border-[#C084FC]

                  disabled:cursor-not-allowed
                  disabled:opacity-60
                `}
              >

                {palavra}

                {encontrada && (
                  <span className="ml-2">
                    ✓
                  </span>
                )}

              </button>
            )
          })}

        </div>

      </div>


      {/* MENSAGEM */}

      <div className="mx-auto mt-6 min-h-[45px] max-w-3xl px-6 text-center">

        {mensagem && (
          <div
            className={`
              rounded-2xl
              p-3
              text-lg
              font-black
              ${
                mensagem.includes('Muito')
                  ? 'bg-[#DCFCE7] text-[#22C55E]'
                  : 'bg-[#FEE2E2] text-[#EF4444]'
              }
            `}
          >
            {mensagem}
          </div>
        )}

      </div>

    </main>
  )
}

export default ImagemEPalavra