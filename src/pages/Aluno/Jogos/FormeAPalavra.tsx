import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Palavra = {
  imagem: string
  palavra: string
}

const palavras: Palavra[] = [
  {
    imagem: '🏔️',
    palavra: 'LAGO',
  },
  {
    imagem: '🐱',
    palavra: 'GATO',
  },
  {
    imagem: '🏠',
    palavra: 'CASA',
  },
  {
    imagem: '🐸',
    palavra: 'SAPO',
  },
  {
    imagem: '☀️',
    palavra: 'SOL',
  },
]

function embaralhar(letras: string[]) {
  return [...letras].sort(() => Math.random() - 0.5)
}

function CorridaDasPalavras() {
  const navigate = useNavigate()

  const [indice, setIndice] = useState(0)
  const [resposta, setResposta] = useState<string[]>([])
  const [letras, setLetras] = useState<string[]>(() =>
    embaralhar(palavras[0].palavra.split(''))
  )
  const [erros, setErros] = useState(0)
  const [mensagem, setMensagem] = useState('')
  const [finalizado, setFinalizado] = useState(false)

  const atual = palavras[indice]

  const proximaLetra =
    atual.palavra[resposta.length]

  function clicarLetra(letra: string, index: number) {
    if (mensagem) return

    if (letra === proximaLetra) {
      const novaResposta = [...resposta, letra]

      setResposta(novaResposta)

      setLetras(
        letras.filter((_, i) => i !== index)
      )

      if (novaResposta.length === atual.palavra.length) {
        setMensagem('🎉 Muito bem! Você acertou!')

        setTimeout(() => {
          if (indice + 1 >= palavras.length) {
            setFinalizado(true)
            return
          }

          const proximo = indice + 1

          setIndice(proximo)
          setResposta([])
          setLetras(
            embaralhar(
              palavras[proximo].palavra.split('')
            )
          )
          setMensagem('')
        }, 1200)
      }
    } else {
      setErros(erros + 1)
      setMensagem('❌ Ops! Tente novamente!')

      setTimeout(() => {
        setMensagem('')
      }, 800)
    }
  }

  function reiniciar() {
    setIndice(0)
    setResposta([])
    setLetras(
      embaralhar(palavras[0].palavra.split(''))
    )
    setErros(0)
    setMensagem('')
    setFinalizado(false)
  }

  if (finalizado) {
    const acertos = palavras.length
    const porcentagem = Math.max(
      0,
      Math.round(
        ((acertos * 100) /
          (acertos + erros)) *
          1
      )
    )

    return (
      <main className="min-h-screen bg-[#FFFBF0] px-6 py-10">

        <div className="mx-auto flex min-h-[80vh] max-w-2xl flex-col items-center justify-center text-center">

          <div className="text-8xl">
            🏆
          </div>

          <h1 className="mt-6 text-5xl font-black text-[#FF6B6B]">
            Corrida finalizada!
          </h1>

          <p className="mt-4 text-2xl font-bold text-gray-600">
            Você completou todas as palavras! 🎉
          </p>

          <div className="mt-8 rounded-[30px] bg-white p-8 shadow-xl">

            <p className="text-lg text-gray-500">
              Palavras completadas
            </p>

            <p className="mt-2 text-5xl font-black text-[#4ECDC4]">
              {acertos}/{palavras.length}
            </p>

            <p className="mt-4 text-lg font-bold text-gray-600">
              ⭐ Pontuação: {porcentagem}%
            </p>

          </div>

          <div className="mt-8 flex gap-4">

            <button
              onClick={reiniciar}
              className="rounded-2xl bg-[#4ECDC4] px-6 py-4 font-black text-white"
            >
              🔄 Jogar novamente
            </button>

            <button
              onClick={() => navigate('/aluno/dashboard')}
              className="rounded-2xl bg-[#C084FC] px-6 py-4 font-black text-white"
            >
              🏠 Voltar
            </button>

          </div>

        </div>

      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#FFFBF0] px-4 py-6">

      <div className="mx-auto max-w-3xl">

       

        <button
          onClick={() => navigate('/aluno/dashboard')}
          className="mb-4 font-bold text-gray-500"
        >
          ← Voltar
        </button>

        

        <div className="relative h-14 overflow-hidden rounded-b-[30px] bg-gray-100">

          <div
            className="absolute left-0 top-0 h-1 rounded-full bg-[#FFD93D]"
            style={{
              width: `${
                ((indice + resposta.length / atual.palavra.length) /
                  palavras.length) *
                100
              }%`,
            }}
          />

          <div
            className="absolute top-2 transition-all duration-500"
            style={{
              left: `${
                ((indice + resposta.length / atual.palavra.length) /
                  palavras.length) *
                90
              }%`,
            }}
          >
            🏎️
          </div>

        </div>

        

        <div className="mt-5 flex flex-col items-center">

          <div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-3xl bg-white text-8xl shadow-lg">
            {atual.imagem}
          </div>

         

          <div className="mt-3 flex gap-2 text-3xl">
            <span className="text-red-500">
              ❤️
            </span>

            <span className={erros >= 2 ? 'grayscale' : ''}>
              ❤️
            </span>
          </div>

        </div>

        

        <div className="mx-auto mt-5 max-w-xl rounded-3xl border-2 border-[#FFD93D] bg-[#FFFBF0] px-5 py-4 text-center">

          <p className="font-black text-[#D97706]">

            💡 DICA: a próxima letra é{' '}

            <span className="text-[#FF6B6B]">
              {proximaLetra}
            </span>

            {' '}— faltam{' '}

            {atual.palavra.length - resposta.length}

            {' '}letras

          </p>

        </div>


        <div className="mt-5 flex justify-center gap-2">

          {atual.palavra.split('').map((_, index) => (

            <div
              key={index}
              className="flex h-12 w-12 items-center justify-center rounded-xl border-[3px] border-gray-300 bg-white text-2xl font-black text-[#25364D]"
            >
              {resposta[index] || ''}
            </div>

          ))}

        </div>

        

        <div className="mt-6 rounded-[30px] bg-white p-6 shadow-lg">

          <div className="flex flex-wrap justify-center gap-3">

            {letras.map((letra, index) => (

              <button
                key={`${letra}-${index}`}
                onClick={() => clicarLetra(letra, index)}
                className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-gray-200 bg-[#FFFBF0] text-3xl font-black text-[#25364D] shadow-sm transition hover:-translate-y-1 hover:scale-105 active:scale-95"
              >
                {letra}
              </button>

            ))}

          </div>

        </div>

       

        {mensagem && (

          <div className="mt-5 rounded-2xl bg-[#4ADE80] p-4 text-center text-xl font-black text-white">

            {mensagem}

          </div>

        )}

        <p className="mt-5 text-center text-sm font-semibold tracking-wide text-gray-400">
          CLIQUE NAS LETRAS NA ORDEM CERTA!
        </p>

      </div>

    </main>
  )
}

export default CorridaDasPalavras