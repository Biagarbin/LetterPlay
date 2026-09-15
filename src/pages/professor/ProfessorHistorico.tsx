import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

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
  alunoId: string
  jogo: string
  nota: number
  pontuacao: number
  data: string
}

const cores = {
  azul: '#60A5FA',
  verde: '#4ADE80',
  amarelo: '#FFD93D',
  laranja: '#FB923C',
  roxo: '#C084FC',
  coral: '#FF6B6B',
}

function ProfessorHistorico() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [alunos, setAlunos] = useState<Aluno[]>([])
  const [atividades, setAtividades] = useState<Atividade[]>([])

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

    const atividadesSalvas = JSON.parse(
      localStorage.getItem('letterplay_atividades') || '[]'
    )

    setAlunos(alunosSalvos)
    setAtividades(atividadesSalvas)
  }, [navigate])

  const aluno = alunos.find(
    (item) => item.id === id
  )

  const atividadesAluno = useMemo(() => {
    if (!aluno) return []

    return atividades
      .filter(
        (atividade) =>
          atividade.alunoId === aluno.id
      )
      .sort(
        (a, b) =>
          new Date(b.data).getTime() -
          new Date(a.data).getTime()
      )
  }, [atividades, aluno])

  const mediaCalculada = useMemo(() => {
    if (atividadesAluno.length === 0) {
      return Number(aluno?.media || 0)
    }

    const total = atividadesAluno.reduce(
      (soma, atividade) =>
        soma + Number(atividade.nota || 0),
      0
    )

    return Math.round(
      total / atividadesAluno.length
    )
  }, [atividadesAluno, aluno])

  const ultimos14Dias = useMemo(() => {
    const dias = []

    for (let i = 13; i >= 0; i--) {
      const data = new Date()

      data.setHours(0, 0, 0, 0)
      data.setDate(data.getDate() - i)

      dias.push(data)
    }

    return dias
  }, [])

  function atividadesDoDia(data: Date) {
    if (!aluno) return []

    return atividadesAluno.filter(
      (atividade) => {
        const dataAtividade =
          new Date(atividade.data)

        return (
          dataAtividade.toDateString() ===
          data.toDateString()
        )
      }
    )
  }

  function mediaDoDia(data: Date) {
    const atividades = atividadesDoDia(data)

    if (atividades.length === 0) {
      return null
    }

    const total = atividades.reduce(
      (soma, atividade) =>
        soma + Number(atividade.nota || 0),
      0
    )

    return Math.round(
      total / atividades.length
    )
  }

  function corDaNota(nota: number) {
    if (nota >= 80) return cores.verde
    if (nota >= 50) return cores.azul
    return cores.laranja
  }

  function nomeDoDia(data: Date) {
    const hoje = new Date()

    if (
      data.toDateString() ===
      hoje.toDateString()
    ) {
      return 'Hoje'
    }

    return data.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'short',
    })
  }

  function formatarData(data: string) {
    return new Date(data).toLocaleDateString(
      'pt-BR',
      {
        day: '2-digit',
        month: 'short',
      }
    )
  }

  function sair() {
    localStorage.removeItem(
      'letterplay_professor_logado'
    )

    localStorage.removeItem(
      'letterplay_professor_nome'
    )

    navigate('/')
  }

  if (!aluno) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#FFFBF0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily:
            'Nunito, Arial, sans-serif',
        }}
      >
        <div
          style={{
            background: '#ffffff',
            padding: '40px',
            borderRadius: '25px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '50px' }}>
            😕
          </div>

          <h2>Aluno não encontrado</h2>

          <button
            onClick={() =>
              navigate('/professor/alunos')
            }
            style={buttonCoral}
          >
            Voltar para alunos
          </button>
        </div>
      </div>
    )
  }

  const ultimaAtividade =
    atividadesAluno[0]

  const diasComAtividade =
    ultimos14Dias.filter(
      (dia) => atividadesDoDia(dia).length > 0
    ).length

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#FFFBF0',
        fontFamily:
          'Nunito, Arial, sans-serif',
        color: '#26364D',
      }}
    >
      

      <header
        style={{
          height: '105px',
          background: '#ffffff',
          borderBottom:
            '1px solid #eeeeee',
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
                color: cores.coral,
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
            border:
              '2px solid #E1E4E8',
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
          margin: '30px auto',
          padding:
            '0 20px 60px',
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
              navigate(
                '/professor/turmas'
              )
            }
            style={menuButton(false)}
          >
            🏫 Turmas
          </button>

          <button
            onClick={() =>
              navigate(
                '/professor/alunos'
              )
            }
            style={menuButton(false)}
          >
            👥 Alunos
          </button>

          <button
            onClick={() =>
              navigate(
                '/professor/desempenho'
              )
            }
            style={menuButton(false)}
          >
            📊 Turma
          </button>

          <button
            style={menuButton(true)}
          >
            📋 Histórico
          </button>
        </nav>

        

        <h2
          style={{
            margin:
              '0 0 8px',
            fontSize: '30px',
            fontWeight: 900,
          }}
        >
          Histórico por Aluno
        </h2>

        <p
          style={{
            margin:
              '0 0 25px',
            color: '#AAAAAA',
            fontSize: '17px',
          }}
        >
          Clique em um aluno para ver as
          sessões diárias e frequência detalhada.
        </p>

       

        <section
          style={{
            background: '#ffffff',
            borderRadius: '25px',
            padding: '25px',
            marginBottom: '22px',
            boxShadow:
              '0 6px 18px rgba(0,0,0,0.05)',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <div
            style={{
              width: '58px',
              height: '58px',
              borderRadius: '50%',
              background: '#EAF3FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
            }}
          >
            ⭐
          </div>

          <div
            style={{
              flex: 1,
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: '21px',
              }}
            >
              {aluno.nome}
            </h3>

            <p
              style={{
                margin:
                  '5px 0 0',
                color: '#999999',
                fontSize: '15px',
              }}
            >
              {aluno.nivelAlfabetico}
              {' · '}
              {aluno.email}
            </p>
          </div>

          <div
            style={{
              textAlign: 'right',
            }}
          >
            <strong
              style={{
                fontSize: '34px',
                color:
                  corDaNota(
                    mediaCalculada
                  ),
              }}
            >
              {mediaCalculada}%
            </strong>

            <div
              style={{
                color: '#AAAAAA',
                fontSize: '14px',
              }}
            >
              média
            </div>
          </div>
        </section>

       

        <section
          style={{
            background: '#ffffff',
            borderRadius: '25px',
            padding: '28px',
            marginBottom: '22px',
            boxShadow:
              '0 6px 18px rgba(0,0,0,0.05)',
          }}
        >
          <h3
            style={{
              margin:
                '0 0 18px',
              fontSize: '21px',
            }}
          >
            📅 Frequência (últimos 14 dias)
          </h3>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '18px',
            }}
          >
            <div
              style={{
                flex: 1,
                height: '10px',
                background:
                  '#F0F1F3',
                borderRadius:
                  '10px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${
                    (diasComAtividade /
                      14) *
                    100
                  }%`,
                  height: '100%',
                  background:
                    cores.laranja,
                  borderRadius:
                    '10px',
                }}
              />
            </div>

            <strong
              style={{
                color:
                  cores.laranja,
              }}
            >
              {diasComAtividade}/14d
            </strong>
          </div>

         

          <div
            style={{
              display: 'flex',
              gap: '6px',
              marginBottom: '10px',
              flexWrap: 'wrap',
            }}
          >
            {ultimos14Dias.map(
              (dia) => {
                const media =
                  mediaDoDia(dia)

                return (
                  <div
                    key={dia.toISOString()}
                    title={
                      media === null
                        ? 'Não jogou'
                        : `${media}%`
                    }
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius:
                        '50%',
                      background:
                        media === null
                          ? '#E5E7EB'
                          : corDaNota(
                              media
                            ),
                    }}
                  />
                )
              }
            )}
          </div>

          <div
            style={{
              display: 'flex',
              gap: '15px',
              flexWrap: 'wrap',
              color: '#AAAAAA',
              fontSize: '14px',
            }}
          >
            <span>
              🟢 ≥80%
            </span>

            <span>
              🔵 50–79%
            </span>

            <span>
              🟠 &lt;50%
            </span>

            <span>
              ⚪ não jogou
            </span>
          </div>
        </section>

        

        <h3
          style={{
            fontSize: '22px',
            margin:
              '30px 0 15px',
          }}
        >
          📋 Sessões e atividades
        </h3>

        {atividadesAluno.length ===
        0 ? (
          <section
            style={{
              background:
                '#ffffff',
              borderRadius:
                '25px',
              padding:
                '50px 30px',
              textAlign:
                'center',
              boxShadow:
                '0 6px 18px rgba(0,0,0,0.05)',
            }}
          >
            <div
              style={{
                fontSize: '50px',
              }}
            >
              🎮
            </div>

            <h3>
              Nenhuma atividade ainda
            </h3>

            <p
              style={{
                color:
                  '#999999',
              }}
            >
              Quando o aluno realizar
              atividades, elas aparecerão
              aqui.
            </p>
          </section>
        ) : (
          <div>
            {ultimos14Dias
              .slice()
              .reverse()
              .map((dia) => {
                const atividades =
                  atividadesDoDia(
                    dia
                  )

                if (
                  atividades.length ===
                  0
                ) {
                  return null
                }

                const media =
                  mediaDoDia(dia)

                return (
                  <section
                    key={dia.toISOString()}
                    style={{
                      background:
                        '#ffffff',
                      borderRadius:
                        '25px',
                      padding:
                        '22px 26px',
                      marginBottom:
                        '15px',
                      boxShadow:
                        '0 6px 18px rgba(0,0,0,0.05)',
                    }}
                  >
                    <div
                      style={{
                        display:
                          'flex',
                        justifyContent:
                          'space-between',
                        alignItems:
                          'center',
                        marginBottom:
                          '15px',
                      }}
                    >
                      <h3
                        style={{
                          margin: 0,
                          fontSize:
                            '19px',
                        }}
                      >
                        📅 {nomeDoDia(dia)}
                      </h3>

                      <strong
                        style={{
                          color:
                            corDaNota(
                              media || 0
                            ),
                          fontSize:
                            '18px',
                        }}
                      >
                        Média: {media}%
                      </strong>
                    </div>

                    <div
                      style={{
                        display:
                          'flex',
                        gap: '10px',
                        flexWrap:
                          'wrap',
                      }}
                    >
                      {atividades.map(
                        (
                          atividade
                        ) => (
                          <div
                            key={
                              atividade.id
                            }
                            style={{
                              border:
                                `2px solid ${
                                  corDaNota(
                                    atividade.nota
                                  )
                                }33`,
                              background:
                                '#FAFAFA',
                              borderRadius:
                                '14px',
                              padding:
                                '10px 15px',
                              display:
                                'flex',
                              alignItems:
                                'center',
                              gap: '8px',
                            }}
                          >
                            <span>
                              {iconeDoJogo(
                                atividade.jogo
                              )}
                            </span>

                            <strong>
                              {
                                atividade.jogo
                              }
                            </strong>

                            <strong
                              style={{
                                color:
                                  corDaNota(
                                    atividade.nota
                                  ),
                              }}
                            >
                              {
                                atividade.nota
                              }%
                            </strong>
                          </div>
                        )
                      )}
                    </div>
                  </section>
                )
              })}
          </div>
        )}

       

        <section
          style={{
            background:
              '#ffffff',
            borderRadius:
              '25px',
            padding:
              '25px',
            marginTop:
              '25px',
            boxShadow:
              '0 6px 18px rgba(0,0,0,0.05)',
          }}
        >
          <h3
            style={{
              margin:
                '0 0 20px',
              fontSize:
                '21px',
            }}
          >
            📈 Resumo do aluno
          </h3>

          <div
            style={{
              display:
                'grid',
              gridTemplateColumns:
                'repeat(3, 1fr)',
              gap: '15px',
            }}
          >
            <Resumo
              titulo="Atividades"
              valor={
                atividadesAluno.length
              }
              cor={
                cores.azul
              }
              icone="🎮"
            />

            <Resumo
              titulo="Pontuação"
              valor={
                aluno.pontuacao
              }
              cor={
                cores.laranja
              }
              icone="🏆"
            />

            <Resumo
              titulo="Última sessão"
              valor={
                ultimaAtividade
                  ? formatarData(
                      ultimaAtividade.data
                    )
                  : '—'
              }
              cor={
                cores.verde
              }
              icone="📅"
            />
          </div>
        </section>
      </main>
    </div>
  )
}



function menuButton(
  ativo: boolean
) {
  return {
    border: 'none',
    background: ativo
      ? '#FF6B6B'
      : 'transparent',
    color: ativo
      ? '#ffffff'
      : '#777777',
    borderRadius:
      '17px',
    padding:
      '13px 20px',
    fontSize: '16px',
    fontWeight: 800,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  }
}

function Resumo({
  titulo,
  valor,
  cor,
  icone,
}: {
  titulo: string
  valor: string | number
  cor: string
  icone: string
}) {
  return (
    <div
      style={{
        background:
          '#FFFBF0',
        borderRadius:
          '18px',
        padding:
          '18px',
        textAlign:
          'center',
      }}
    >
      <div
        style={{
          fontSize:
            '28px',
        }}
      >
        {icone}
      </div>

      <strong
        style={{
          display:
            'block',
          fontSize:
            '25px',
          color: cor,
          marginTop:
            '4px',
        }}
      >
        {valor}
      </strong>

      <span
        style={{
          color:
            '#999999',
          fontSize:
            '14px',
        }}
      >
        {titulo}
      </span>
    </div>
  )
}

function iconeDoJogo(
  jogo: string
) {
  const nome =
    jogo.toLowerCase()

  if (
    nome.includes('caça') ||
    nome.includes('caca')
  )
    return '🔎'

  if (
    nome.includes('corrida')
  )
    return '🏎️'

  if (
    nome.includes('imagem')
  )
    return '🖼️'

  if (
    nome.includes('matemática') ||
    nome.includes('matematica')
  )
    return '🔢'

  if (
    nome.includes('desenho')
  )
    return '🎨'

  if (
    nome.includes('cruzadinha')
  )
    return '✏️'

  if (
    nome.includes('ortografia')
  )
    return '🔤'

  if (
    nome.includes('conta')
  )
    return '📝'

  return '🎮'
}

const buttonCoral = {
  border: 'none',
  background: '#FF6B6B',
  color: '#ffffff',
  borderRadius: '14px',
  padding: '12px 22px',
  fontWeight: 800,
  cursor: 'pointer',
}

export default ProfessorHistorico