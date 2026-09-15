import { useEffect, useState } from 'react'
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
  alunoId: string
  jogo: string
  nota: number
  pontuacao: number
  data: string
}

function ProfessorHistorico() {
  const navigate = useNavigate()

  const [alunos, setAlunos] = useState<Aluno[]>([])
  const [atividades, setAtividades] = useState<Atividade[]>([])
  const [alunoSelecionado, setAlunoSelecionado] =
    useState<Aluno | null>(null)

  useEffect(() => {
    const logado = localStorage.getItem(
      'letterplay_professor_logado'
    )

    if (logado !== 'true') {
      navigate('/professor/login')
      return
    }

    carregarDados()
  }, [navigate])

  function carregarDados() {
    const alunosSalvos: Aluno[] = JSON.parse(
      localStorage.getItem('letterplay_alunos') || '[]'
    )

    const atividadesSalvas: Atividade[] = JSON.parse(
      localStorage.getItem('letterplay_atividades') || '[]'
    )

    setAlunos(alunosSalvos)
    setAtividades(atividadesSalvas)
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

  function corMedia(media: number) {
    if (media >= 80) return '#4ADE80'
    if (media >= 50) return '#60A5FA'
    if (media > 0) return '#FB923C'
    return '#D9DDE3'
  }

  function textoNivel(aluno: Aluno) {
    return aluno.nivelAlfabetico || 'Em avaliação'
  }

  const atividadesDoAluno = alunoSelecionado
    ? atividades.filter(
        (atividade) =>
          atividade.alunoId === alunoSelecionado.id
      )
    : []

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#FFFBF0',
        fontFamily: 'Nunito, Arial, sans-serif',
        color: '#26364D',
      }}
    >

      {/* HEADER */}

      <header
        style={{
          height: '100px',
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
          <div style={{ fontSize: '40px' }}>
            📚
          </div>

          <div>
            <h1
              style={{
                margin: 0,
                fontSize: '29px',
                fontWeight: 900,
                color: '#FF6B6B',
              }}
            >
              Letter Play
            </h1>

            <p
              style={{
                margin: '2px 0 0',
                fontSize: '15px',
                color: '#999999',
              }}
            >
              Histórico dos alunos 📋
            </p>
          </div>
        </div>

        <button
          onClick={sair}
          style={{
            background: '#ffffff',
            border: '2px solid #E5E7EB',
            borderRadius: '16px',
            padding: '10px 22px',
            fontSize: '16px',
            fontWeight: 700,
            color: '#777777',
            cursor: 'pointer',
          }}
        >
          Sair
        </button>
      </header>

      {/* CONTEÚDO */}

      <main
        style={{
          maxWidth: '1060px',
          margin: '30px auto',
          padding: '0 20px',
        }}
      >

        {/* MENU */}

        <nav
          style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
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
            onClick={() =>
              navigate('/Professor/ProfessorDesempenho')
            }
            style={menuButton(false)}
          >
            📊 Desempenho
          </button>

          <button
            style={menuButton(true)}
          >
            📋 Histórico
          </button>
        </nav>

        {/* TÍTULO */}

        <div style={{ marginBottom: '28px' }}>
          <h2
            style={{
              margin: 0,
              fontSize: '30px',
              fontWeight: 900,
              color: '#26364D',
            }}
          >
            Histórico dos Alunos
          </h2>

          <p
            style={{
              marginTop: '8px',
              color: '#999999',
              fontSize: '16px',
            }}
          >
            Consulte o histórico de atividades de todos
            os alunos cadastrados.
          </p>
        </div>

        {/* LISTA */}

        {alunos.length === 0 ? (
          <div
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              padding: '50px',
              textAlign: 'center',
              boxShadow:
                '0 7px 18px rgba(0,0,0,0.06)',
            }}
          >
            <div style={{ fontSize: '55px' }}>
              👩‍🎓
            </div>

            <h3
              style={{
                fontSize: '22px',
                margin: '15px 0 8px',
              }}
            >
              Nenhum aluno cadastrado
            </h3>

            <p
              style={{
                color: '#999999',
                marginBottom: '20px',
              }}
            >
              Cadastre alunos para visualizar o histórico.
            </p>

            <button
              onClick={() =>
                navigate('/Professor/ProfessorAluno')
              }
              style={{
                border: 'none',
                background: '#4ECDC4',
                color: '#ffffff',
                padding: '13px 22px',
                borderRadius: '14px',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              Cadastrar aluno
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {alunos.map((aluno) => (
              <div key={aluno.id}>

                {/* CARD DO ALUNO */}

                <button
                  onClick={() =>
                    setAlunoSelecionado(
                      alunoSelecionado?.id === aluno.id
                        ? null
                        : aluno
                    )
                  }
                  style={{
                    width: '100%',
                    border: 'none',
                    background: '#ffffff',
                    borderRadius:
                      alunoSelecionado?.id === aluno.id
                        ? '20px 20px 0 0'
                        : '20px',
                    padding: '18px 22px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    boxShadow:
                      '0 5px 15px rgba(0,0,0,0.06)',
                  }}
                >

                  {/* ÍCONE */}

                  <div
                    style={{
                      width: '55px',
                      height: '55px',
                      borderRadius: '17px',
                      background:
                        corMedia(aluno.media),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '28px',
                      flexShrink: 0,
                    }}
                  >
                    {aluno.media >= 80
                      ? '🌟'
                      : aluno.media >= 50
                      ? '⭐'
                      : '✨'}
                  </div>

                  {/* NOME */}

                  <div style={{ flex: 1 }}>
                    <h3
                      style={{
                        margin: 0,
                        fontSize: '19px',
                        fontWeight: 900,
                        color: '#26364D',
                      }}
                    >
                      {aluno.nome}
                    </h3>

                    <p
                      style={{
                        margin: '5px 0 0',
                        fontSize: '14px',
                        color: '#999999',
                      }}
                    >
                      {aluno.turma} •{' '}
                      {textoNivel(aluno)}
                    </p>
                  </div>

                  {/* MÉDIA */}

                  <div
                    style={{
                      textAlign: 'center',
                      minWidth: '75px',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '22px',
                        fontWeight: 900,
                        color: corMedia(
                          aluno.media
                        ),
                      }}
                    >
                      {aluno.media}%
                    </div>

                    <div
                      style={{
                        fontSize: '12px',
                        color: '#AAAAAA',
                      }}
                    >
                      média
                    </div>
                  </div>

                  {/* JOGOS */}

                  <div
                    style={{
                      textAlign: 'center',
                      minWidth: '75px',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '20px',
                        fontWeight: 900,
                        color: '#8067E8',
                      }}
                    >
                      {aluno.jogosRealizados}
                    </div>

                    <div
                      style={{
                        fontSize: '12px',
                        color: '#AAAAAA',
                      }}
                    >
                      jogos
                    </div>
                  </div>

                  {/* SETA */}

                  <div
                    style={{
                      fontSize: '24px',
                      color: '#AAAAAA',
                    }}
                  >
                    {alunoSelecionado?.id ===
                    aluno.id
                      ? '⌃'
                      : '›'}
                  </div>

                </button>

                {/* DETALHES */}

                {alunoSelecionado?.id ===
                  aluno.id && (
                  <div
                    style={{
                      background: '#ffffff',
                      borderRadius:
                        '0 0 20px 20px',
                      padding:
                        '5px 25px 25px',
                      boxShadow:
                        '0 5px 15px rgba(0,0,0,0.06)',
                    }}
                  >

                    <div
                      style={{
                        borderTop:
                          '1px solid #eeeeee',
                        paddingTop: '20px',
                      }}
                    >
                      <h3
                        style={{
                          margin: '0 0 15px',
                          fontSize: '19px',
                          fontWeight: 900,
                        }}
                      >
                        📋 Atividades realizadas
                      </h3>

                      {atividadesDoAluno.length ===
                      0 ? (
                        <div
                          style={{
                            background: '#FFFBF0',
                            borderRadius: '15px',
                            padding: '20px',
                            color: '#999999',
                            textAlign: 'center',
                          }}
                        >
                          Este aluno ainda não realizou
                          atividades.
                        </div>
                      ) : (
                        <div
                          style={{
                            display: 'flex',
                            flexDirection:
                              'column',
                            gap: '8px',
                          }}
                        >
                          {atividadesDoAluno.map(
                            (atividade) => (
                              <div
                                key={atividade.id}
                                style={{
                                  display: 'flex',
                                  alignItems:
                                    'center',
                                  justifyContent:
                                    'space-between',
                                  background:
                                    '#FFFBF0',
                                  borderRadius: '14px',
                                  padding:
                                    '13px 16px',
                                }}
                              >
                                <div>
                                  <strong>
                                    {atividade.jogo}
                                  </strong>

                                  <div
                                    style={{
                                      fontSize:
                                        '13px',
                                      color:
                                        '#999999',
                                      marginTop:
                                        '3px',
                                    }}
                                  >
                                    {atividade.data}
                                  </div>
                                </div>

                                <div
                                  style={{
                                    fontSize:
                                      '18px',
                                    fontWeight: 900,
                                    color:
                                      corMedia(
                                        atividade.nota
                                      ),
                                  }}
                                >
                                  {atividade.nota}%
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </div>

                  </div>
                )}

              </div>
            ))}
          </div>
        )}

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
    gap: '7px',
  }
}

export default ProfessorHistorico