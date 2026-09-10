import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  CheckCircle,
  RotateCcw,
  Pencil,
} from 'lucide-react'

type Palavra = {
  numero: number
  palavra: string
  dica: string
  direcao: 'horizontal' | 'vertical'
  linha: number
  coluna: number
}

type Celula = {
  linha: number
  coluna: number
  ativa: boolean
  numero?: number
}


const palavras: Palavra[] = [
  {
    numero: 1,
    palavra: 'BANANA',
    dica: 'Fruta amarela, comprida e curva',
    direcao: 'vertical',
    linha: 0,
    coluna: 1,
  },
  {
    numero: 2,
    palavra: 'GATO',
    dica: 'Animal peludo que faz miau',
    direcao: 'horizontal',
    linha: 1,
    coluna: 0,
  },
  {
    numero: 3,
    palavra: 'ANEL',
    dica: 'Joia que se usa no dedo',
    direcao: 'horizontal',
    linha: 2,
    coluna: 0,
  },
  {
    numero: 4,
    palavra: 'MALA',
    dica: 'Bolsa para guardar roupas em viagem',
    direcao: 'horizontal',
    linha: 3,
    coluna: 0,
  },
]



const grade: Celula[][] = [
  [
    {
      linha: 0,
      coluna: 0,
      ativa: false,
    },
    {
      linha: 0,
      coluna: 1,
      ativa: true,
      numero: 1,
    },
    {
      linha: 0,
      coluna: 2,
      ativa: false,
    },
    {
      linha: 0,
      coluna: 3,
      ativa: false,
    },
  ],

  [
    {
      linha: 1,
      coluna: 0,
      ativa: true,
      numero: 2,
    },
    {
      linha: 1,
      coluna: 1,
      ativa: true,
    },
    {
      linha: 1,
      coluna: 2,
      ativa: true,
    },
    {
      linha: 1,
      coluna: 3,
      ativa: true,
    },
  ],

  [
    {
      linha: 2,
      coluna: 0,
      ativa: true,
      numero: 3,
    },
    {
      linha: 2,
      coluna: 1,
      ativa: true,
    },
    {
      linha: 2,
      coluna: 2,
      ativa: true,
    },
    {
      linha: 2,
      coluna: 3,
      ativa: true,
    },
  ],

  [
    {
      linha: 3,
      coluna: 0,
      ativa: true,
      numero: 4,
    },
    {
      linha: 3,
      coluna: 1,
      ativa: true,
    },
    {
      linha: 3,
      coluna: 2,
      ativa: true,
    },
    {
      linha: 3,
      coluna: 3,
      ativa: true,
    },
  ],

  [
    {
      linha: 4,
      coluna: 0,
      ativa: false,
    },
    {
      linha: 4,
      coluna: 1,
      ativa: true,
    },
    {
      linha: 4,
      coluna: 2,
      ativa: false,
    },
    {
      linha: 4,
      coluna: 3,
      ativa: false,
    },
  ],

  [
    {
      linha: 5,
      coluna: 0,
      ativa: false,
    },
    {
      linha: 5,
      coluna: 1,
      ativa: true,
    },
    {
      linha: 5,
      coluna: 2,
      ativa: false,
    },
    {
      linha: 5,
      coluna: 3,
      ativa: false,
    },
  ],
]

function Cruzadinha() {
  const navigate = useNavigate()

 

  const [respostas, setRespostas] = useState<
    Record<string, string>
  >({})

  const [mensagem, setMensagem] = useState('')

  const [terminou, setTerminou] = useState(false)

  const [acertos, setAcertos] = useState(0)

  const [celulaSelecionada, setCelulaSelecionada] =
    useState<{
      linha: number
      coluna: number
    } | null>(null)



  function chave(
    linha: number,
    coluna: number
  ) {
    return `${linha}-${coluna}`
  }



  function selecionarCelula(
    linha: number,
    coluna: number
  ) {
    setCelulaSelecionada({
      linha,
      coluna,
    })

    setMensagem('')
  }


  function digitarLetra(
    event: React.ChangeEvent<HTMLInputElement>,
    linha: number,
    coluna: number
  ) {
    const valor = event.target.value
      .replace(/[^a-zA-ZÀ-ÿ]/g, '')
      .toUpperCase()
      .slice(-1)

    setRespostas((estadoAtual) => ({
      ...estadoAtual,
      [chave(linha, coluna)]: valor,
    }))

    setMensagem('')
  }


  function verificar() {
    let quantidadeAcertos = 0

    palavras.forEach((palavra) => {
      let resposta = ''

      for (
        let i = 0;
        i < palavra.palavra.length;
        i++
      ) {
        const linha =
          palavra.direcao === 'horizontal'
            ? palavra.linha
            : palavra.linha + i

        const coluna =
          palavra.direcao === 'horizontal'
            ? palavra.coluna + i
            : palavra.coluna

        resposta +=
          respostas[chave(linha, coluna)] || ''
      }

      if (resposta === palavra.palavra) {
        quantidadeAcertos++
      }
    })

    setAcertos(quantidadeAcertos)

    if (quantidadeAcertos === palavras.length) {
      setMensagem(
        'Muito bem! 🎉 Você completou a cruzadinha!'
      )

      setTimeout(() => {
        setTerminou(true)
      }, 1200)
    } else {
      setMensagem(
        `Quase! Você acertou ${quantidadeAcertos} de ${palavras.length} palavras. 💪`
      )
    }
  }


  function reiniciar() {
    setRespostas({})
    setMensagem('')
    setTerminou(false)
    setAcertos(0)
    setCelulaSelecionada(null)
  }


  function voltar() {
    navigate('/aluno/dashboard')
  }


  if (terminou) {
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
            Você completou a cruzadinha!
          </p>

          <div className="mt-8 rounded-[30px] bg-white p-8 text-center shadow-lg">

            <p className="text-gray-500">
              Sua pontuação
            </p>

            <strong className="text-6xl font-black text-[#4ECDC4]">
              100%
            </strong>

            <p className="mt-3 font-bold text-gray-700">
              {acertos} de {palavras.length} palavras
            </p>

          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">

            <button
              onClick={reiniciar}
              className="flex items-center gap-2 rounded-2xl bg-[#4ECDC4] px-6 py-4 font-black text-white shadow-md transition hover:scale-105"
            >
              <RotateCcw size={20} />
              Jogar novamente
            </button>

            <button
              onClick={voltar}
              className="rounded-2xl bg-[#C084FC] px-6 py-4 font-black text-white shadow-md transition hover:scale-105"
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

      <div className="mx-auto max-w-5xl">


        <button
          onClick={voltar}
          className="flex items-center gap-2 font-bold text-gray-600 transition hover:text-gray-900"
        >
          <ArrowLeft size={20} />
          Voltar
        </button>

        <div className="mt-5 flex items-center justify-center gap-2">

          <h1 className="text-3xl font-black text-[#263238]">
            Cruzadinha
          </h1>

          <Pencil
            size={27}
            className="rotate-[-15deg] text-[#263238]"
          />

        </div>

        <p className="mt-2 text-center font-bold text-gray-400">
          4 palavras
        </p>



        <div className="mt-8 grid items-start gap-10 lg:grid-cols-[1fr_1fr]">


          <div className="flex justify-center">

            <div className="rounded-[30px] bg-white p-7 shadow-[0_10px_35px_rgba(0,0,0,0.08)]">

              <div className="grid grid-cols-4 gap-[3px]">

                {grade.flat().map((celula) => {


                  if (!celula.ativa) {
                    return (
                      <div
                        key={chave(
                          celula.linha,
                          celula.coluna
                        )}
                        className="h-[82px] w-[82px] rounded-[14px] bg-[#2D3436]"
                      />
                    )
                  }


                  const selecionada =
                    celulaSelecionada?.linha ===
                      celula.linha &&
                    celulaSelecionada?.coluna ===
                      celula.coluna

          

                  return (
                    <div
                      key={chave(
                        celula.linha,
                        celula.coluna
                      )}
                      className={`relative h-[82px] w-[82px] rounded-[14px] border-[3px] bg-white transition ${
                        selecionada
                          ? 'border-[#4ECDC4] bg-[#F0FFFD]'
                          : 'border-[#D1D5DB]'
                      }`}
                    >



                      {celula.numero && (
                        <span className="absolute left-1.5 top-0.5 z-10 text-sm font-bold text-[#718096]">
                          {celula.numero}
                        </span>
                      )}

            

                      <input
                        type="text"
                        maxLength={1}
                        value={
                          respostas[
                            chave(
                              celula.linha,
                              celula.coluna
                            )
                          ] || ''
                        }
                        onChange={(event) =>
                          digitarLetra(
                            event,
                            celula.linha,
                            celula.coluna
                          )
                        }
                        onFocus={() =>
                          selecionarCelula(
                            celula.linha,
                            celula.coluna
                          )
                        }
                        className="h-full w-full rounded-[11px] bg-transparent pt-2 text-center text-4xl font-black uppercase text-[#263238] outline-none"
                        aria-label={`Linha ${
                          celula.linha + 1
                        }, coluna ${
                          celula.coluna + 1
                        }`}
                      />

                    </div>
                  )
                })}

              </div>

            </div>

          </div>


          <div className="space-y-8">

            <section>

              <h2 className="flex items-center gap-2 text-xl font-black text-[#35C6C6]">
                <span>→</span>
                Horizontal
              </h2>

              <div className="mt-5 space-y-5">

                {palavras
                  .filter(
                    (palavra) =>
                      palavra.direcao ===
                      'horizontal'
                  )
                  .map((palavra) => (

                    <button
                      key={palavra.numero}
                      onClick={() =>
                        selecionarCelula(
                          palavra.linha,
                          palavra.coluna
                        )
                      }
                      className="group flex w-full items-start gap-2 text-left"
                    >

                      <span className="text-lg font-black text-[#FF6B6B]">
                        {palavra.numero}.
                      </span>

                      <span className="font-medium text-[#374151] transition group-hover:text-[#35C6C6]">
                        {palavra.dica}
                      </span>

                    </button>

                  ))}

              </div>

            </section>


            <section>

              <h2 className="flex items-center gap-2 text-xl font-black text-[#B26BFF]">
                <span>↓</span>
                Vertical
              </h2>

              <div className="mt-5">

                {palavras
                  .filter(
                    (palavra) =>
                      palavra.direcao ===
                      'vertical'
                  )
                  .map((palavra) => (

                    <button
                      key={palavra.numero}
                      onClick={() =>
                        selecionarCelula(
                          palavra.linha,
                          palavra.coluna
                        )
                      }
                      className="group flex w-full items-start gap-2 text-left"
                    >

                      <span className="text-lg font-black text-[#FF6B6B]">
                        {palavra.numero}.
                      </span>

                      <span className="font-medium text-[#374151] transition group-hover:text-[#B26BFF]">
                        {palavra.dica}
                      </span>

                    </button>

                  ))}

              </div>

            </section>

          </div>

        </div>


        {mensagem && (
          <div
            className={`mx-auto mt-8 max-w-2xl rounded-2xl p-4 text-center text-lg font-black ${
              acertos === palavras.length
                ? 'bg-[#4ADE80] text-white'
                : 'bg-[#FFF3CD] text-[#8A6116]'
            }`}
          >
            {mensagem}
          </div>
        )}

      

        <div className="mt-8 flex justify-center">

          <button
            onClick={verificar}
            className="flex min-w-[220px] items-center justify-center gap-2 rounded-2xl bg-[#C084FC] px-8 py-4 text-lg font-black text-white shadow-md transition hover:scale-[1.02] hover:bg-[#A855F7]"
          >
            <CheckCircle size={23} />
            Verificar ✓
          </button>

        </div>

      </div>

    </main>
  )
}

export default Cruzadinha
