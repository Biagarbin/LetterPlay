import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Eraser,
  RotateCcw,
  Trash2,
  Check,
} from 'lucide-react'

function DesenhoLivre() {
  const navigate = useNavigate()

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [desenhando, setDesenhando] = useState(false)
  const [cor, setCor] = useState('#000000')
  const [tamanho, setTamanho] = useState(8)
  const [borracha, setBorracha] = useState(false)
  const [finalizou, setFinalizou] = useState(false)

  function pegarPosicao(
    evento:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>
  ) {
    const canvas = canvasRef.current

    if (!canvas) return null

    const rect = canvas.getBoundingClientRect()

    if ('touches' in evento) {
      const toque = evento.touches[0]

      return {
        x: toque.clientX - rect.left,
        y: toque.clientY - rect.top,
      }
    }

    return {
      x: evento.clientX - rect.left,
      y: evento.clientY - rect.top,
    }
  }

  function começarDesenho(
    evento:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>
  ) {
    evento.preventDefault()

    const canvas = canvasRef.current
    const posicao = pegarPosicao(evento)

    if (!canvas || !posicao) return

    const contexto = canvas.getContext('2d')

    if (!contexto) return

    contexto.beginPath()
    contexto.moveTo(posicao.x, posicao.y)

    setDesenhando(true)
  }

  function desenhar(
    evento:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>
  ) {
    evento.preventDefault()

    if (!desenhando) return

    const canvas = canvasRef.current
    const posicao = pegarPosicao(evento)

    if (!canvas || !posicao) return

    const contexto = canvas.getContext('2d')

    if (!contexto) return

    contexto.lineWidth = tamanho
    contexto.lineCap = 'round'
    contexto.lineJoin = 'round'

    if (borracha) {
      contexto.strokeStyle = '#ffffff'
    } else {
      contexto.strokeStyle = cor
    }

    contexto.lineTo(posicao.x, posicao.y)
    contexto.stroke()
  }

  function pararDesenho() {
    setDesenhando(false)

    const canvas = canvasRef.current

    if (!canvas) return

    const contexto = canvas.getContext('2d')

    contexto?.closePath()
  }

  function limpar() {
    const canvas = canvasRef.current

    if (!canvas) return

    const contexto = canvas.getContext('2d')

    if (!contexto) return

    contexto.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    )
  }

  function finalizar() {
    setFinalizou(true)
  }

  function novoDesenho() {
    limpar()
    setFinalizou(false)
    setBorracha(false)
    setCor('#000000')
    setTamanho(8)
  }

  if (finalizou) {
    return (
      <main className="min-h-screen bg-[#FFFBF0] px-6 py-10">

        <div className="mx-auto flex min-h-[80vh] max-w-2xl flex-col items-center justify-center">

          <div className="text-8xl">
            🎨
          </div>

          <h1 className="mt-6 text-center text-4xl font-black text-[#FF6B6B]">
            Muito bem! 🎉
          </h1>

          <p className="mt-4 text-center text-2xl font-bold text-gray-700">
            Você terminou seu desenho!
          </p>

          <div className="mt-8 w-full rounded-3xl bg-white p-8 text-center shadow-lg">

            <div className="text-6xl">
              🖌️
            </div>

            <p className="mt-4 text-lg font-bold text-gray-600">
              Continue usando sua criatividade!
            </p>

          </div>

          <div className="mt-8 flex gap-4">

            <button
              onClick={novoDesenho}
              className="flex items-center gap-2 rounded-2xl bg-[#4ECDC4] px-6 py-4 font-black text-white transition hover:scale-105"
            >
              <RotateCcw size={20} />
              Desenhar novamente
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
          Desenho Livre
          <span className="ml-2">🎨</span>
        </h1>

        <div className="text-xl font-black text-[#FF6B6B]">
          🖌️
        </div>

      </header>


      {/* BARRA */}

      <div className="mx-4 h-2 rounded-full bg-gray-200">

        <div className="h-2 w-full rounded-full bg-[#4ECDC4]" />

      </div>


      {/* CONTEÚDO */}

      <div className="mx-auto max-w-4xl px-6 py-8">

        {/* TÍTULO */}

        <div className="rounded-[30px] bg-[#FF6B6B] p-7 text-center text-white shadow-lg">

          <h2 className="text-4xl font-black">
            🎨 Desenhe Livremente!
          </h2>

          <p className="mt-3 text-lg">
            Use sua criatividade e faça um desenho bem legal!
          </p>

        </div>


        {/* FERRAMENTAS */}

        <div className="mt-6 rounded-3xl bg-white p-5 shadow-lg">

          <div className="flex flex-wrap items-center justify-center gap-4">

            {/* CORES */}

            <div className="flex items-center gap-2">

              <span className="font-bold text-gray-600">
                Cor:
              </span>

              <button
                onClick={() => {
                  setCor('#000000')
                  setBorracha(false)
                }}
                className="h-9 w-9 rounded-full border-4 border-gray-300 bg-black"
              />

              <button
                onClick={() => {
                  setCor('#EF4444')
                  setBorracha(false)
                }}
                className="h-9 w-9 rounded-full border-4 border-gray-300 bg-red-500"
              />

              <button
                onClick={() => {
                  setCor('#3B82F6')
                  setBorracha(false)
                }}
                className="h-9 w-9 rounded-full border-4 border-gray-300 bg-blue-500"
              />

              <button
                onClick={() => {
                  setCor('#22C55E')
                  setBorracha(false)
                }}
                className="h-9 w-9 rounded-full border-4 border-gray-300 bg-green-500"
              />

              <button
                onClick={() => {
                  setCor('#FACC15')
                  setBorracha(false)
                }}
                className="h-9 w-9 rounded-full border-4 border-gray-300 bg-yellow-400"
              />

              <button
                onClick={() => {
                  setCor('#A855F7')
                  setBorracha(false)
                }}
                className="h-9 w-9 rounded-full border-4 border-gray-300 bg-purple-500"
              />

            </div>


            {/* TAMANHO */}

            <div className="flex items-center gap-2">

              <span className="font-bold text-gray-600">
                Tamanho:
              </span>

              <input
                type="range"
                min="2"
                max="30"
                value={tamanho}
                onChange={(evento) =>
                  setTamanho(Number(evento.target.value))
                }
                className="w-28"
              />

            </div>


            {/* BORRACHA */}

            <button
              onClick={() => setBorracha(!borracha)}
              className={`
                flex items-center gap-2
                rounded-xl
                px-4
                py-2
                font-black
                transition

                ${
                  borracha
                    ? 'bg-[#FFD93D] text-gray-800'
                    : 'bg-gray-100 text-gray-700'
                }
              `}
            >
              <Eraser size={19} />
              Borracha
            </button>


            {/* LIMPAR */}

            <button
              onClick={limpar}
              className="flex items-center gap-2 rounded-xl bg-[#FEE2E2] px-4 py-2 font-black text-red-500 transition hover:scale-105"
            >
              <Trash2 size={19} />
              Limpar
            </button>

          </div>

        </div>


        {/* ÁREA DE DESENHO */}

        <div className="mt-6 rounded-[35px] bg-white p-4 shadow-lg">

          <div className="overflow-hidden rounded-[25px] border-4 border-dashed border-gray-200">

            <canvas
              ref={canvasRef}
              width={900}
              height={550}
              className="block h-auto w-full cursor-crosshair touch-none bg-white"
              onMouseDown={começarDesenho}
              onMouseMove={desenhar}
              onMouseUp={pararDesenho}
              onMouseLeave={pararDesenho}
              onTouchStart={começarDesenho}
              onTouchMove={desenhar}
              onTouchEnd={pararDesenho}
            />

          </div>

        </div>


        {/* BOTÃO FINALIZAR */}

        <button
          onClick={finalizar}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#C084FC] py-4 text-xl font-black text-white shadow-md transition hover:scale-[1.02]"
        >
          <Check size={24} />
          Finalizar desenho
        </button>

      </div>

    </main>
  )
}

export default DesenhoLivre