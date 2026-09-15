import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

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

function ProfessorTurmas() {
  const navigate = useNavigate()

  const [turmas, setTurmas] = useState<Turma[]>([])
  const [alunos, setAlunos] = useState<Aluno[]>([])

  const [ano, setAno] = useState('3º Ano')
  const [letra, setLetra] = useState('A')
  const [mostrarCriar, setMostrarCriar] = useState(false)

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

  function sair() {
    localStorage.removeItem('letterplay_professor_logado')
    localStorage.removeItem('letterplay_professor_nome')

    navigate('/')
  }

  function criarTurma() {
    const jaExiste = turmas.some(
      (turma) =>
        turma.ano === ano &&
        turma.letra === letra
    )

    if (jaExiste) {
      alert('Essa turma já existe!')
      return
    }

    const novaTurma: Turma = {
      id: `${Date.now()}`,
      ano,
      letra,
    }

    const novasTurmas = [...turmas, novaTurma]

    setTurmas(novasTurmas)

    localStorage.setItem(
      'letterplay_turmas',
      JSON.stringify(novasTurmas)
    )

    setMostrarCriar(false)
  }

  function excluirTurma(turma: Turma) {
    const quantidadeAlunos = alunos.filter(
      (aluno) => pertenceATurma(aluno, turma)
    ).length

    if (quantidadeAlunos > 0) {
      alert(
        `Não é possível excluir essa turma porque ela possui ${quantidadeAlunos} aluno(s).`
      )
      return
    }

    const confirmar = window.confirm(
      `Deseja excluir ${turma.ano} – Turma ${turma.letra}?`
    )

    if (!confirmar) return

    const novasTurmas = turmas.filter(
      (item) =>
        String(item.id) !== String(turma.id)
    )

    setTurmas(novasTurmas)

    localStorage.setItem(
      'letterplay_turmas',
      JSON.stringify(novasTurmas)
    )
  }

  function quantidadeAlunos(turma: Turma) {
    return alunos.filter(
      (aluno) => pertenceATurma(aluno, turma)
    ).length
  }

  function pertenceATurma(
    aluno: Aluno,
    turma: Turma
  ) {
    const turmaAluno = normalizarTurma(aluno.turma)

    const turmaAtual = normalizarTurma(
      `${turma.ano} ${turma.letra}`
    )

    return turmaAluno === turmaAtual
  }

  function normalizarTurma(valor: string) {
    return valor
      .toLowerCase()
      .replace(/–/g, '-')
      .replace(/—/g, '-')
      .replace(/turma/g, '')
      .replace(/\s+/g, ' ')
      .trim()
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
              navigate('/Professor/ProfessorTurma')
            }
            style={menuButton(true)}
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
              navigate('/Professor/desempenho')
            }
            style={menuButton(false)}
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
            marginBottom: '25px',
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: '30px',
              fontWeight: 900,
            }}
          >
            Minhas Turmas ({turmas.length})
          </h2>

          <button
            onClick={() =>
              setMostrarCriar(true)
            }
            style={{
              border: 'none',
              background:
                'linear-gradient(90deg, #FF6B6B, #FB923C)',
              color: '#ffffff',
              borderRadius: '17px',
              padding: '14px 22px',
              fontSize: '16px',
              fontWeight: 900,
              cursor: 'pointer',
            }}
          >
            + Criar Turma
          </button>
        </div>

       

        {turmas.length === 0 ? (
          <div
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              padding: '50px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '55px' }}>
              🏫
            </div>

            <h3>Você ainda não criou nenhuma turma.</h3>

            <p style={{ color: '#999999' }}>
              Clique em "+ Criar Turma" para começar.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '18px',
            }}
          >
            {turmas.map((turma) => {
              const quantidade =
                quantidadeAlunos(turma)

              return (
                <div
                  key={String(turma.id)}
                  style={{
                    background: '#ffffff',
                    borderRadius: '24px',
                    padding: '25px',
                    boxShadow:
                      '0 6px 18px rgba(0,0,0,0.06)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent:
                        'space-between',
                      alignItems: 'flex-start',
                    }}
                  >
                    <h3
                      style={{
                        margin: 0,
                        fontSize: '23px',
                        fontWeight: 900,
                      }}
                    >
                      {turma.ano} – Turma {turma.letra}
                    </h3>

                    <button
                      onClick={() =>
                        excluirTurma(turma)
                      }
                      style={{
                        border: 'none',
                        background:
                          'transparent',
                        color: '#D6D9DE',
                        fontSize: '25px',
                        cursor: 'pointer',
                      }}
                    >
                      ×
                    </button>
                  </div>

                  <p
                    style={{
                      margin:
                        '10px 0 18px',
                      color: '#999999',
                      fontSize: '16px',
                    }}
                  >
                    {quantidade}{' '}
                    {quantidade === 1
                      ? 'aluno cadastrado'
                      : 'alunos cadastrados'}
                  </p>

                  <button
                    onClick={() =>
                      navigate(
                        `/professor/turma/${turma.id}`
                      )
                    }
                    style={{
                      border: 'none',
                      background:
                        'transparent',
                      color: '#7655F5',
                      fontSize: '16px',
                      fontWeight: 900,
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  >
                    Ver turma →
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </main>

      {/* MODAL CRIAR TURMA */}

      {mostrarCriar && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background:
              'rgba(0,0,0,0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '25px',
              padding: '30px',
              width: '100%',
              maxWidth: '430px',
              boxShadow:
                '0 15px 40px rgba(0,0,0,0.15)',
            }}
          >
            <h2
              style={{
                marginTop: 0,
                fontSize: '25px',
              }}
            >
              🏫 Criar nova turma
            </h2>

            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: 800,
              }}
            >
              Ano
            </label>

            <select
              value={ano}
              onChange={(e) =>
                setAno(e.target.value)
              }
              style={{
                width: '100%',
                padding: '13px',
                borderRadius: '12px',
                border:
                  '2px solid #E5E7EB',
                marginBottom: '20px',
                fontSize: '16px',
              }}
            >
              <option>1º Ano</option>
              <option>2º Ano</option>
              <option>3º Ano</option>
              <option>4º Ano</option>
              <option>5º Ano</option>
            </select>

            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: 800,
              }}
            >
              Turma
            </label>

            <select
              value={letra}
              onChange={(e) =>
                setLetra(e.target.value)
              }
              style={{
                width: '100%',
                padding: '13px',
                borderRadius: '12px',
                border:
                  '2px solid #E5E7EB',
                marginBottom: '25px',
                fontSize: '16px',
              }}
            >
              <option>A</option>
              <option>B</option>
              <option>C</option>
              <option>D</option>
              <option>E</option>
            </select>

            <div
              style={{
                display: 'flex',
                gap: '10px',
                justifyContent:
                  'flex-end',
              }}
            >
              <button
                onClick={() =>
                  setMostrarCriar(false)
                }
                style={{
                  border: 'none',
                  background: '#F1F2F4',
                  borderRadius: '12px',
                  padding: '12px 20px',
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                Cancelar
              </button>

              <button
                onClick={criarTurma}
                style={{
                  border: 'none',
                  background: '#4ECDC4',
                  color: '#ffffff',
                  borderRadius: '12px',
                  padding: '12px 20px',
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                Criar turma
              </button>
            </div>
          </div>
        </div>
      )}
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

export default ProfessorTurmas