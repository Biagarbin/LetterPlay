import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Aluno = {
  id: string
  nome: string
  email: string
  turma: string
  nivelAlfabetico: string
  media: number
  pontuacao: number
  jogosRealizados: number
  audioAtivo: boolean
}

type Atividade = {
  id: string
  alunoId?: string
  jogo: string
  nota: number
  pontuacao: number
  data: string
}

type Turma = {
  id: string
  ano: string
  letra: string
}

const jogos = [
  {
    nome: 'Arraste e Solte',
    icone: '🔤',
  },
  {
    nome: 'Quiz de Ortografia',
    icone: '🔤',
  },
  {
    nome: 'Corrida',
    icone: '🏎️',
  },
  {
    nome: 'Caça-Palavras',
    icone: '🔎',
  },
  {
    nome: 'Imagem e Palavra',
    icone: '🖼️',
  },
  {
    nome: 'Cruzadinha',
    icone: '✏️',
  },
  {
    nome: 'Matemática',
    icone: '🔢',
  },
  {
    nome: 'Desenho Livre',
    icone: '🎨',
  },
  {
    nome: 'Conta e Escreve',
    icone: '📝',
  },
]

function ProfessorDesempenho() {
  const navigate = useNavigate()

  const [alunos, setAlunos] = useState<Aluno[]>([])
  const [turmas, setTurmas] = useState<Turma[]>([])
  const [atividades, setAtividades] = useState<Atividade[]>([])

  const [filtroTurma, setFiltroTurma] = useState('Todas')

  useEffect(() => {
    const logado = localStorage.getItem(
      'letterplay_professor_logado'
    )

    if (logado !== 'true') {
      navigate('/professor/login')
      return
    }

    const alunosSalvos = JSON.parse(
      localStorage.getItem('letterplay_alunos') || '[]'
    )

    const turmasSalvas = JSON.parse(
      localStorage.getItem('letterplay_turmas') || '[]'
    )

    const atividadesSalvas = JSON.parse(
      localStorage.getItem('letterplay_atividades') || '[]'
    )

    setAlunos(alunosSalvos)
    setTurmas(turmasSalvas)
    setAtividades(atividadesSalvas)
  }, [navigate])

  function sair() {
    localStorage.removeItem(
      'letterplay_professor_logado'
    )

    localStorage.removeItem(
      'letterplay_professor_nome'
    )

    navigate('/')
  }

  const alunosFiltrados = useMemo(() => {
    if (filtroTurma === 'Todas') {
      return alunos
    }

    return alunos.filter(
      (aluno) => aluno.turma === filtroTurma
    )
  }, [alunos, filtroTurma])

  const mediaGeral = useMemo(() => {
    if (alunosFiltrados.length === 0) return 0

    const total = alunosFiltrados.reduce(
      (soma, aluno) => soma + Number(aluno.media || 0),
      0
    )

    return Math.round(
      total / alunosFiltrados.length
    )
  }, [alunosFiltrados])

  const jogosRealizados = useMemo(() => {
    return alunosFiltrados.reduce(
      (soma, aluno) =>
        soma + Number(aluno.jogosRealizados || 0),
      0
    )
  }, [alunosFiltrados])

  const turmasFiltradas = useMemo(() => {
    if (filtroTurma === 'Todas') {
      return turmas
    }

    return turmas.filter(
      (turma) =>
        `${turma.ano} – Turma ${turma.letra}` ===
        filtroTurma
    )
  }, [turmas, filtroTurma])

  function mediaDaTurma(nomeTurma: string) {
    const alunosDaTurma = alunos.filter(
      (aluno) => aluno.turma === nomeTurma
    )

    if (alunosDaTurma.length === 0) return 0

    const total = alunosDaTurma.reduce(
      (soma, aluno) =>
        soma + Number(aluno.media || 0),
      0
    )

    return Math.round(
      total / alunosDaTurma.length
    )
  }

  function mediaDoJogo(nomeJogo: string) {
    const alunosIds = alunosFiltrados.map(
      (aluno) => aluno.id
    )

    const resultados = atividades.filter(
      (atividade) =>
        atividade.jogo === nomeJogo &&
        (!atividade.alunoId ||
          alunosIds.includes(atividade.alunoId))
    )

    if (resultados.length === 0) {
      return null
    }

    const total = resultados.reduce(
      (soma, atividade) =>
        soma + Number(atividade.nota || 0),
      0
    )

    return Math.round(
      total / resultados.length
    )
  }

  const ranking = [...alunosFiltrados].sort(
    (a, b) =>
      Number(b.media || 0) -
      Number(a.media || 0)
  )

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#FFFBF0',
        fontFamily: 'Nunito, Arial, sans-serif',
        color: '#26364D',
      }}
    >
     

      <header
        style={{
          height: '105px',
          background: '#ffffff',
          borderBottom: '1px solid #eeeeee',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 11%',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          <div
            style={{
              fontSize: '40px',
            }}
          >
            📚
          </div>

          <div>
            <h1
              style={{
                margin: 0,
                color: '#FF6B6B',
                fontSize: '29px',
                fontWeight: 900,
              }}
            >
              Letter Play
            </h1>

            <p
              style={{
                margin: '2px 0 0',
                color: '#999999',
                fontSize: '15px',
              }}
            >
              Olá, Professora Ana! 👋
            </p>
          </div>
        </div>

        <button
          onClick={sair}
          style={{
            background: '#ffffff',
            border: '2px solid #E1E4E8',
            borderRadius: '16px',
            padding: '10px 22px',
            color: '#777777',
            fontSize: '16px',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Sair
        </button>
      </header>

      

      <main
        style={{
          maxWidth: '1065px',
          margin: '32px auto',
          padding: '0 20px 60px',
        }}
      >
      

        <nav
          style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '8px',
            display: 'flex',
            gap: '5px',
            width: 'fit-content',
            boxShadow:
              '0 5px 15px rgba(0,0,0,0.06)',
            marginBottom: '35px',
          }}
        >
          <button
            onClick={() =>
              navigate('/Professor/ProfessorTurmas')
            }
            style={menuButton(false)}
          >
            🏫 Turmas
          </button>

          <button
            onClick={() =>
              navigate('/Professor/ProfessorAluno')
            }
            style={menuButton(false)}
          >
            👥 Alunos
          </button>

          <button
            style={menuButton(true)}
          >
            📊 Desempenho
          </button>

          <button
            onClick={() =>
              navigate('/Professor/ProfessorHistorico')
            }
            style={menuButton(false)}
          >
            📋 Histórico
          </button>
        </nav>

        

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '22px',
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: '30px',
              fontWeight: 900,
            }}
          >
            📊 Desempenho
          </h2>

          <span
            style={{
              color: '#7657FF',
              fontWeight: 900,
              fontSize: '17px',
            }}
          >
            Todas as Turmas
          </span>
        </div>

      

        <div
          style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            marginBottom: '30px',
          }}
        >
          <button
            onClick={() =>
              setFiltroTurma('Todas')
            }
            style={filtroButton(
              filtroTurma === 'Todas'
            )}
          >
            🌐 Todas
          </button>

          {turmas.map((turma) => {
            const nomeTurma =
              `${turma.ano} – Turma ${turma.letra}`

            return (
              <button
                key={turma.id}
                onClick={() =>
                  setFiltroTurma(nomeTurma)
                }
                style={filtroButton(
                  filtroTurma === nomeTurma
                )}
              >
                🏫 {nomeTurma}
              </button>
            )
          })}
        </div>

        

        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(4, 1fr)',
            gap: '16px',
            marginBottom: '25px',
          }}
        >
          <StatCard
            icone="👥"
            numero={alunosFiltrados.length}
            texto="Alunos"
            cor="#60A5FA"
          />

          <StatCard
            icone="📊"
            numero={`${mediaGeral}%`}
            texto="Média Geral"
            cor="#4ECDC4"
          />

          <StatCard
            icone="🎮"
            numero={jogosRealizados}
            texto="Já Jogaram"
            cor="#FB923C"
          />

          <StatCard
            icone="🏫"
            numero={turmasFiltradas.length}
            texto="Turmas"
            cor="#C084FC"
          />
        </div>

       

        <section style={sectionStyle}>
          <h3 style={sectionTitle}>
            Comparativo entre Turmas
          </h3>

          {turmas.length === 0 ? (
            <p style={emptyText}>
              Nenhuma turma cadastrada.
            </p>
          ) : (
            turmas.map((turma) => {
              const nomeTurma =
                `${turma.ano} – Turma ${turma.letra}`

              const media =
                mediaDaTurma(nomeTurma)

              const qtd =
                alunos.filter(
                  (aluno) =>
                    aluno.turma === nomeTurma
                ).length

              return (
                <div
                  key={turma.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns:
                      '155px 1fr 55px 80px',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '18px',
                  }}
                >
                  <strong>
                    {nomeTurma}
                  </strong>

                  <ProgressBar
                    valor={media}
                    cor={
                      media >= 80
                        ? '#4ADE80'
                        : media >= 50
                        ? '#60A5FA'
                        : '#FFD93D'
                    }
                  />

                  <strong
                    style={{
                      color:
                        media >= 80
                          ? '#4ADE80'
                          : media >= 50
                          ? '#60A5FA'
                          : '#FFD93D',
                    }}
                  >
                    {media}%
                  </strong>

                  <span
                    style={{
                      color: '#AAAAAA',
                      fontSize: '14px',
                    }}
                  >
                    {qtd} alunos
                  </span>
                </div>
              )
            })
          )}
        </section>

        

        <section style={sectionStyle}>
          <h3 style={sectionTitle}>
            Média por Jogo
            {filtroTurma === 'Todas'
              ? ' – Todas as Turmas'
              : ` – ${filtroTurma}`}
          </h3>

          {jogos.map((jogo) => {
            const media =
              mediaDoJogo(jogo.nome)

            return (
              <div
                key={jogo.nome}
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    '40px 180px 1fr 55px',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '15px',
                }}
              >
                <span
                  style={{
                    fontSize: '25px',
                  }}
                >
                  {jogo.icone}
                </span>

                <strong
                  style={{
                    fontSize: '15px',
                  }}
                >
                  {jogo.nome}
                </strong>

                <ProgressBar
                  valor={media || 0}
                  cor={
                    media === null
                      ? '#E5E7EB'
                      : media >= 80
                      ? '#4ADE80'
                      : '#60A5FA'
                  }
                />

                <strong
                  style={{
                    color:
                      media === null
                        ? '#C8C8C8'
                        : media >= 80
                        ? '#4ADE80'
                        : '#60A5FA',
                  }}
                >
                  {media === null
                    ? '—'
                    : `${media}%`}
                </strong>
              </div>
            )
          })}
        </section>

        

        <section style={sectionStyle}>
          <h3 style={sectionTitle}>
            🏆 Ranking
            {filtroTurma === 'Todas'
              ? ' – Todas as Turmas'
              : ` – ${filtroTurma}`}
          </h3>

          {ranking.length === 0 ? (
            <p style={emptyText}>
              Nenhum aluno cadastrado.
            </p>
          ) : (
            ranking.map((aluno, index) => {
              const posicao = index + 1

              return (
                <div
                  key={aluno.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns:
                      '70px 1fr 70px',
                    alignItems: 'center',
                    gap: '15px',
                    padding: '15px 18px',
                    borderRadius: '18px',
                    background:
                      posicao === 1
                        ? '#FFFBEB'
                        : '#ffffff',
                    marginBottom: '5px',
                  }}
                >
                  

                  <div
                    style={{
                      fontSize: '18px',
                      textAlign: 'center',
                    }}
                  >
                    {posicao === 1
                      ? '🏅 🌟'
                      : posicao === 2
                      ? '🥈 ⭐'
                      : posicao === 3
                      ? '🥉 ⭐'
                      : `${posicao}.`}
                  </div>

              

                  <div>
                    <strong
                      style={{
                        display: 'block',
                        fontSize: '18px',
                      }}
                    >
                      {aluno.nome}
                    </strong>

                    <span
                      style={{
                        color: '#A8A8A8',
                        fontSize: '14px',
                      }}
                    >
                      {aluno.turma}
                    </span>
                  </div>

                 

                  <strong
                    style={{
                      fontSize: '20px',
                      color:
                        Number(aluno.media) >= 80
                          ? '#4ADE80'
                          : Number(aluno.media) >=
                            50
                          ? '#60A5FA'
                          : '#FB923C',
                      textAlign: 'right',
                    }}
                  >
                    {Number(aluno.media || 0)}%
                  </strong>
                </div>
              )
            })
          )}
        </section>
      </main>
    </div>
  )
}



function menuButton(ativo: boolean) {
  return {
    border: 'none',
    background: ativo
      ? '#FF6B6B'
      : 'transparent',
    color: ativo
      ? '#ffffff'
      : '#777777',
    borderRadius: '17px',
    padding: '13px 20px',
    fontSize: '16px',
    fontWeight: 800,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  }
}

function filtroButton(ativo: boolean) {
  return {
    border: ativo
      ? '2px solid #7657FF'
      : '2px solid #E0E3E8',
    background: ativo
      ? '#7657FF'
      : '#ffffff',
    color: ativo
      ? '#ffffff'
      : '#4B5563',
    borderRadius: '22px',
    padding: '11px 22px',
    fontSize: '15px',
    fontWeight: 800,
    cursor: 'pointer',
  }
}

function StatCard({
  icone,
  numero,
  texto,
  cor,
}: {
  icone: string
  numero: string | number
  texto: string
  cor: string
}) {
  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '24px',
        minHeight: '175px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow:
          '0 6px 18px rgba(0,0,0,0.05)',
      }}
    >
      <div
        style={{
          fontSize: '35px',
          marginBottom: '5px',
        }}
      >
        {icone}
      </div>

      <strong
        style={{
          color: cor,
          fontSize: '35px',
          fontWeight: 900,
        }}
      >
        {numero}
      </strong>

      <span
        style={{
          color: '#AAAAAA',
          fontSize: '14px',
          marginTop: '2px',
        }}
      >
        {texto}
      </span>
    </div>
  )
}

function ProgressBar({
  valor,
  cor,
}: {
  valor: number
  cor: string
}) {
  return (
    <div
      style={{
        width: '100%',
        height: '10px',
        background: '#F0F1F3',
        borderRadius: '10px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: `${Math.min(
            Math.max(valor, 0),
            100
          )}%`,
          height: '100%',
          background: cor,
          borderRadius: '10px',
          transition: 'width 0.3s ease',
        }}
      />
    </div>
  )
}

const sectionStyle = {
  background: '#ffffff',
  borderRadius: '25px',
  padding: '30px',
  marginBottom: '25px',
  boxShadow:
    '0 6px 18px rgba(0,0,0,0.05)',
}

const sectionTitle = {
  margin: '0 0 25px',
  fontSize: '21px',
  fontWeight: 900,
}

const emptyText = {
  color: '#999999',
  textAlign: 'center' as const,
  padding: '20px',
}

export default ProfessorDesempenho