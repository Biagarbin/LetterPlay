import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

type Turma = {
  id: string | number
  ano: string
  letra: string
}

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

function ProfessorTurma() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [turmas, setTurmas] = useState<Turma[]>([])
  const [alunos, setAlunos] = useState<Aluno[]>([])

  useEffect(() => {
    const logado = localStorage.getItem(
      'letterplay_professor_logado'
    )

    if (logado !== 'true') {
      navigate('/professor/login')
      return
    }

    const turmasSalvas = JSON.parse(
      localStorage.getItem('letterplay_turmas') || '[]'
    )

    const alunosSalvos = JSON.parse(
      localStorage.getItem('letterplay_alunos') || '[]'
    )

    setTurmas(turmasSalvas)
    setAlunos(alunosSalvos)
  }, [navigate])


  const turma = turmas.find(
    (item) =>
      String(item.id) === String(id)
  )

  const alunosDaTurma = useMemo(() => {
    if (!turma) return []

    return alunos.filter((aluno) => {
      const alunoTurma =
        normalizarTurma(aluno.turma)

      const turmaAtual =
        normalizarTurma(
          `${turma.ano} ${turma.letra}`
        )

      return alunoTurma === turmaAtual
    })
  }, [alunos, turma])

  function normalizarTurma(valor: string) {
    return valor
      .toLowerCase()
      .replace(/–/g, '-')
      .replace(/—/g, '-')
      .replace(/turma/g, '')
      .replace(/\s+/g, ' ')
      .trim()
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

  function excluirAluno(aluno: Aluno) {
    const confirmar = window.confirm(
      `Deseja excluir ${aluno.nome}?`
    )

    if (!confirmar) return

    const novosAlunos = alunos.filter(
      (item) => item.id !== aluno.id
    )

    setAlunos(novosAlunos)

    localStorage.setItem(
      'letterplay_alunos',
      JSON.stringify(novosAlunos)
    )
  }

  function alternarAudio(aluno: Aluno) {
    const novosAlunos = alunos.map(
      (item) =>
        item.id === aluno.id
          ? {
              ...item,
              audioAtivo:
                !item.audioAtivo,
            }
          : item
    )

    setAlunos(novosAlunos)

    localStorage.setItem(
      'letterplay_alunos',
      JSON.stringify(novosAlunos)
    )
  }

  function editarAluno(aluno: Aluno) {
    navigate(
      `/Professor/ProfessorAluno?editar=${aluno.id}`
    )
  }

  function corMedia(media: number) {
    if (media >= 80) {
      return '#4ADE80'
    }

    if (media >= 50) {
      return '#60A5FA'
    }

    return '#FB923C'
  }

  if (!turma) {
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
            borderRadius: '25px',
            padding: '50px',
            textAlign: 'center',
            boxShadow:
              '0 10px 30px rgba(0,0,0,0.08)',
          }}
        >
          <div
            style={{
              fontSize: '55px',
            }}
          >
            😕
          </div>

          <h2
            style={{
              fontWeight: 900,
            }}
          >
            Turma não encontrada
          </h2>

          <button
            onClick={() =>
              navigate(
                '/Professor/ProfessorTurmas'
              )
            }
            style={{
              border: 'none',
              background: '#FF6B6B',
              color: '#ffffff',
              borderRadius: '14px',
              padding: '13px 25px',
              fontSize: '16px',
              fontWeight: 900,
              cursor: 'pointer',
            }}
          >
            Voltar para turmas
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#FFFBF0',
        color: '#26364D',
        fontFamily:
          'Nunito, Arial, sans-serif',
      }}
    >
     

      <header
        style={{
          height: '100px',
          background: '#ffffff',
          borderBottom:
            '1px solid #eeeeee',
          display: 'flex',
          alignItems: 'center',
          justifyContent:
            'space-between',
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
              fontSize: '38px',
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
              Olá, Professor ! 👋
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
              navigate(
                '/Professor/ProfessorTurmas'
              )
            }
            style={menuButton(true)}
          >
            🏫 Turmas
          </button>

          <button
            onClick={() =>
              navigate(
                '/Professor/Professoraluno'
              )
            }
            style={menuButton(false)}
          >
            👥 Alunos
          </button>

          <button
            onClick={() =>
              navigate(
                '/Professor/ProfessorDesempenho'
              )
            }
            style={menuButton(false)}
          >
            📊 Turma
          </button>

          <button
            onClick={() =>
              navigate(
                '/Professor/ProfessorHistorico'
              )
            }
            style={menuButton(false)}
          >
            📋 Histórico
          </button>
        </nav>

       

        <button
          onClick={() =>
            navigate(
              '/Professor/PrfessorTurmas'
            )
          }
          style={{
            border: 'none',
            background: 'transparent',
            color: '#777777',
            fontSize: '16px',
            fontWeight: 700,
            cursor: 'pointer',
            padding: 0,
            marginBottom: '28px',
          }}
        >
          ← Todas as turmas
        </button>

       

        <div
          style={{
            display: 'flex',
            justifyContent:
              'space-between',
            alignItems: 'center',
            marginBottom: '25px',
            gap: '20px',
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: '30px',
              fontWeight: 900,
            }}
          >
            🏫 {turma.ano} – Turma{' '}
            {turma.letra} (
            {alunosDaTurma.length}{' '}
            {alunosDaTurma.length === 1
              ? 'aluno'
              : 'alunos'}
            )
          </h2>

          <button
            onClick={() =>
              navigate(
                '/Professor/ProfessorAluno'
              )
            }
            style={{
              border: 'none',
              background: '#4ECDC4',
              color: '#ffffff',
              borderRadius: '17px',
              padding: '14px 22px',
              fontSize: '16px',
              fontWeight: 900,
              cursor: 'pointer',
            }}
          >
            + Adicionar aluno
          </button>
        </div>

       

        {alunosDaTurma.length === 0 ? (
          <div
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              padding: '50px',
              textAlign: 'center',
              boxShadow:
                '0 6px 18px rgba(0,0,0,0.05)',
            }}
          >
            <div
              style={{
                fontSize: '55px',
              }}
            >
              👥
            </div>

            <h3
              style={{
                fontSize: '22px',
              }}
            >
              Nenhum aluno cadastrado
            </h3>

            <p
              style={{
                color: '#999999',
              }}
            >
              Essa turma ainda não possui
              alunos.
            </p>

            <button
              onClick={() =>
                navigate(
                  '/professor/alunos'
                )
              }
              style={{
                border: 'none',
                background: '#4ECDC4',
                color: '#ffffff',
                borderRadius: '14px',
                padding: '13px 22px',
                fontWeight: 900,
                cursor: 'pointer',
              }}
            >
              + Adicionar aluno
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            {alunosDaTurma.map(
              (aluno, index) => (
                <div
                  key={aluno.id}
                  style={{
                    background: '#ffffff',
                    borderRadius: '20px',
                    padding:
                      '16px 20px',
                    display: 'flex',
                    alignItems:
                      'center',
                    gap: '17px',
                    boxShadow:
                      '0 5px 14px rgba(0,0,0,0.05)',
                  }}
                >

                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius:
                        '50%',
                      background:
                        index % 3 === 0
                          ? '#EAF3FF'
                          : index % 3 === 1
                          ? '#FFF8DF'
                          : '#E7F9EE',
                      display: 'flex',
                      alignItems:
                        'center',
                      justifyContent:
                        'center',
                      fontSize: '27px',
                      flexShrink: 0,
                    }}
                  >
                    {index % 3 === 0
                      ? '⭐'
                      : index % 3 === 1
                      ? '✨'
                      : '🌟'}
                  </div>

                  

                  <div
                    style={{
                      flex: 1,
                    }}
                  >
                    <h3
                      style={{
                        margin: 0,
                        fontSize: '18px',
                        fontWeight: 900,
                      }}
                    >
                      {aluno.nome}
                    </h3>

                    <p
                      style={{
                        margin:
                          '3px 0 0',
                        color: '#999999',
                        fontSize: '14px',
                      }}
                    >
                      {aluno.email}
                    </p>
                  </div>

                

                  <strong
                    style={{
                      fontSize: '22px',
                      color: corMedia(
                        Number(
                          aluno.media || 0
                        )
                      ),
                      minWidth: '55px',
                      textAlign:
                        'right',
                    }}
                  >
                    {Number(
                      aluno.media || 0
                    )}
                    %
                  </strong>

                

                  <button
                    onClick={() =>
                      alternarAudio(
                        aluno
                      )
                    }
                    title={
                      aluno.audioAtivo
                        ? 'Desativar áudio'
                        : 'Ativar áudio'
                    }
                    style={{
                      width: '52px',
                      height: '38px',
                      background:
                        '#F5F6F8',
                      border:
                        '2px solid #D9DDE3',
                      borderRadius:
                        '12px',
                      fontSize: '18px',
                      cursor: 'pointer',
                    }}
                  >
                    {aluno.audioAtivo
                      ? '🔊'
                      : '🔇'}
                  </button>


                  <button
                    onClick={() =>
                      editarAluno(
                        aluno
                      )
                    }
                    style={{
                      border: 'none',
                      background:
                        '#EEE8FF',
                      color: '#7655F5',
                      borderRadius:
                        '11px',
                      padding:
                        '10px 15px',
                      fontWeight: 800,
                      cursor: 'pointer',
                    }}
                  >
                    Editar
                  </button>

                  

                  <button
                    onClick={() =>
                      excluirAluno(
                        aluno
                      )
                    }
                    style={{
                      border: 'none',
                      background:
                        '#FFE1E1',
                      color: '#F04444',
                      borderRadius:
                        '11px',
                      padding:
                        '10px 15px',
                      fontWeight: 800,
                      cursor: 'pointer',
                    }}
                  >
                    Excluir
                  </button>
                </div>
              )
            )}
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
  }
}

export default ProfessorTurma