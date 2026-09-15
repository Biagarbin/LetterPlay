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

type Turma = {
  id: string
  ano: string
  letra: string
}

const coral = '#FF6B6B'
const azul = '#60A5FA'
const turquesa = '#4ECDC4'
const roxo = '#C084FC'
const laranja = '#FB923C'
const verde = '#4ADE80'

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
    (item) => item.id === id
  )

  const nomeTurma = turma
    ? `${turma.ano} – Turma ${turma.letra}`
    : ''

  const alunosDaTurma = useMemo(() => {
    if (!turma) return []

    return alunos.filter(
      (aluno) =>
        aluno.turma === `${turma.ano} ${turma.letra}` ||
        aluno.turma === `${turma.ano} – Turma ${turma.letra}` ||
        aluno.turma === `${turma.ano} - Turma ${turma.letra}` ||
        aluno.turma === `Turma ${turma.letra}`
    )
  }, [alunos, turma])

  function sair() {
    localStorage.removeItem(
      'letterplay_professor_logado'
    )

    localStorage.removeItem(
      'letterplay_professor_nome'
    )

    navigate('/')
  }

  function editarAluno(aluno: Aluno) {
    alert(`Editar aluno: ${aluno.nome}`)
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


  function corDaMedia(media: number) {
    if (media >= 80) return verde
    if (media >= 50) return azul
    return laranja
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
          fontFamily: 'Nunito, Arial, sans-serif',
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

          <h2>Turma não encontrada</h2>

          <button
            onClick={() =>
              navigate('/professor/turmas')
            }
            style={{
              border: 'none',
              background: coral,
              color: '#ffffff',
              borderRadius: '14px',
              padding: '12px 22px',
              fontWeight: 800,
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
        fontFamily: 'Nunito, Arial, sans-serif',
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
                color: coral,
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
              navigate('/professor/turmas')
            }
            style={menuButton(true)}
          >
            🏫 Turmas
          </button>

          <button
            onClick={() =>
              navigate('/professor/alunos')
            }
            style={menuButton(false)}
          >
            👥 Alunos
          </button>

          <button
            onClick={() =>
              navigate('/professor/desempenho')
            }
            style={menuButton(false)}
          >
            📊 Turma
          </button>

          <button
            onClick={() =>
              navigate('/professor/historico')
            }
            style={menuButton(false)}
          >
            📋 Histórico
          </button>
        </nav>

        

        <button
          onClick={() =>
            navigate('/professor/turmas')
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
            justifyContent: 'space-between',
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
            🏫 {nomeTurma} ({alunosDaTurma.length}{' '}
            {alunosDaTurma.length === 1
              ? 'aluno'
              : 'alunos'}
            )
          </h2>

          <button
            onClick={() =>
              navigate('/professor/alunos')
            }
            style={{
              border: 'none',
              background: turquesa,
              color: '#ffffff',
              borderRadius: '17px',
              padding: '14px 22px',
              fontSize: '16px',
              fontWeight: 900,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            + Adicionar aluno
          </button>
        </div>

        

        {alunosDaTurma.length === 0 ? (
          <section
            style={{
              background: '#ffffff',
              borderRadius: '25px',
              padding: '55px 30px',
              textAlign: 'center',
              boxShadow:
                '0 6px 18px rgba(0,0,0,0.05)',
            }}
          >
            <div
              style={{
                fontSize: '55px',
                marginBottom: '10px',
              }}
            >
              👥
            </div>

            <h3
              style={{
                fontSize: '22px',
                margin: '0 0 8px',
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
              Adicione alunos para começar a
              acompanhar essa turma.
            </p>

            <button
              onClick={() =>
                navigate('/professor/alunos')
              }
              style={{
                border: 'none',
                background: turquesa,
                color: '#ffffff',
                borderRadius: '15px',
                padding: '13px 22px',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              + Adicionar aluno
            </button>
          </section>
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
                    borderRadius: '22px',
                    padding: '17px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '18px',
                    boxShadow:
                      '0 5px 14px rgba(0,0,0,0.05)',
                  }}
                >
                  

                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background:
                        index % 3 === 0
                          ? '#EAF3FF'
                          : index % 3 === 1
                          ? '#FFF9E5'
                          : '#E8F9EF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
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
                      minWidth: 0,
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
                      fontSize: '23px',
                      color: corDaMedia(
                        Number(
                          aluno.media || 0
                        )
                      ),
                      minWidth: '50px',
                      textAlign: 'right',
                    }}
                  >
                    {Number(
                      aluno.media || 0
                    )}
                    %
                  </strong>


                

                  <button
                    onClick={() =>
                      editarAluno(aluno)
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
                      excluirAluno(aluno)
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
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  }
}

export default ProfessorTurma