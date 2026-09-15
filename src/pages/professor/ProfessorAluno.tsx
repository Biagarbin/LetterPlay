import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Aluno = {
  id: string
  nome: string
  email: string
  senha: string
  turma: string
  nivelAlfabetico: string
  media: number
  pontuacao: number
  jogosRealizados: number
  audioAtivo: boolean
}

function ProfessorAlunos() {
  const navigate = useNavigate()

  const [alunos, setAlunos] = useState<Aluno[]>([])
  const [mostrarForm, setMostrarForm] = useState(false)

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [turma, setTurma] = useState('3º Ano – Turma A')

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

    setAlunos(alunosSalvos)
  }, [navigate])

  function salvarAluno(e: React.FormEvent) {
    e.preventDefault()

    if (!nome.trim() || !email.trim() || !senha.trim()) {
      alert(
        'Preencha o nome, o e-mail e a senha do aluno.'
      )
      return
    }

    if (senha.length < 4) {
      alert('A senha deve ter pelo menos 4 caracteres.')
      return
    }

    const novoAluno: Aluno = {
      id: Date.now().toString(),
      nome: nome.trim(),
      email: email.trim(),
      senha: senha,
      turma,
      nivelAlfabetico: 'Em avaliação',
      media: 0,
      pontuacao: 0,
      jogosRealizados: 0,
      audioAtivo: true,
    }

    const novaLista = [...alunos, novoAluno]

    setAlunos(novaLista)

    localStorage.setItem(
      'letterplay_alunos',
      JSON.stringify(novaLista)
    )

    setNome('')
    setEmail('')
    setSenha('')
    setTurma('3º Ano – Turma A')
    setMostrarForm(false)

    alert('Aluno cadastrado com sucesso! 🎉')
  }

  function excluirAluno(id: string) {
    const confirmar = window.confirm(
      'Tem certeza que deseja excluir este aluno?'
    )

    if (!confirmar) return

    const novaLista = alunos.filter(
      (aluno) => aluno.id !== id
    )

    setAlunos(novaLista)

    localStorage.setItem(
      'letterplay_alunos',
      JSON.stringify(novaLista)
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
                color: '#999999',
                fontSize: '15px',
              }}
            >
              Olá, Professora! 👋
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
            color: '#777777',
            fontWeight: 700,
            fontSize: '16px',
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
            gap: '5px',
            width: 'fit-content',
            boxShadow: '0 5px 15px rgba(0,0,0,0.06)',
            marginBottom: '38px',
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
            style={menuButton(true)}
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
            onClick={() =>
              navigate('/Professor/ProfessorHistorico')
            }
            style={menuButton(false)}
          >
            📋 Histórico
          </button>
        </nav>

        {/* TÍTULO */}

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '28px',
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: '30px',
                fontWeight: 900,
              }}
            >
              Meus Alunos ({alunos.length})
            </h2>

            <p
              style={{
                margin: '6px 0 0',
                color: '#999999',
                fontSize: '16px',
              }}
            >
              Gerencie e acompanhe seus alunos.
            </p>
          </div>

          <button
            onClick={() =>
              setMostrarForm(!mostrarForm)
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
            + Adicionar aluno
          </button>
        </div>

        {/* FORMULÁRIO */}

        {mostrarForm && (
          <form
            onSubmit={salvarAluno}
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              padding: '25px',
              marginBottom: '25px',
              boxShadow:
                '0 7px 17px rgba(0,0,0,0.07)',
            }}
          >
            <h3
              style={{
                marginTop: 0,
                fontSize: '22px',
              }}
            >
              Novo aluno 👤
            </h3>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns:
                  'repeat(2, 1fr)',
                gap: '15px',
              }}
            >
              {/* NOME */}

              <div>
                <label style={labelStyle}>
                  Nome do aluno
                </label>

                <input
                  type="text"
                  placeholder="Digite o nome"
                  value={nome}
                  onChange={(e) =>
                    setNome(e.target.value)
                  }
                  style={inputStyle}
                />
              </div>

              {/* EMAIL */}

              <div>
                <label style={labelStyle}>
                  E-mail
                </label>

                <input
                  type="email"
                  placeholder="Digite o e-mail"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  style={inputStyle}
                />
              </div>

              {/* SENHA */}

              <div>
                <label style={labelStyle}>
                  Senha
                </label>

                <input
                  type="password"
                  placeholder="Digite a senha"
                  value={senha}
                  onChange={(e) =>
                    setSenha(e.target.value)
                  }
                  style={inputStyle}
                />

                <small
                  style={{
                    display: 'block',
                    marginTop: '5px',
                    color: '#999999',
                    fontSize: '12px',
                  }}
                >
                  Mínimo de 4 caracteres
                </small>
              </div>

              {/* TURMA */}

              <div>
                <label style={labelStyle}>
                  Turma
                </label>

                <select
                  value={turma}
                  onChange={(e) =>
                    setTurma(e.target.value)
                  }
                  style={inputStyle}
                >
                  <option>
                    1º Ano – Turma A
                  </option>

                  <option>
                    1º Ano – Turma B
                  </option>

                  <option>
                    2º Ano – Turma A
                  </option>

                  <option>
                    2º Ano – Turma B
                  </option>

                  <option>
                    3º Ano – Turma A
                  </option>

                  <option>
                    3º Ano – Turma B
                  </option>

                  <option>
                    4º Ano – Turma A
                  </option>

                  <option>
                    5º Ano – Turma A
                  </option>
                </select>
              </div>
            </div>

            {/* BOTÕES */}

            <div
              style={{
                display: 'flex',
                gap: '10px',
                marginTop: '20px',
              }}
            >
              <button
                type="submit"
                style={{
                  border: 'none',
                  background: '#FF6B6B',
                  color: '#ffffff',
                  padding: '12px 22px',
                  borderRadius: '14px',
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                💾 Salvar aluno
              </button>

              <button
                type="button"
                onClick={() => {
                  setMostrarForm(false)
                  setNome('')
                  setEmail('')
                  setSenha('')
                }}
                style={{
                  border: 'none',
                  background: '#eeeeee',
                  padding: '12px 22px',
                  borderRadius: '14px',
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        {/* SEM ALUNOS */}

        {alunos.length === 0 ? (
          <div
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              padding: '60px 30px',
              textAlign: 'center',
              boxShadow:
                '0 7px 17px rgba(0,0,0,0.06)',
            }}
          >
            <div style={{ fontSize: '55px' }}>
              👥
            </div>

            <h3
              style={{
                fontSize: '23px',
                marginBottom: '8px',
              }}
            >
              Nenhum aluno cadastrado
            </h3>

            <p
              style={{
                color: '#999999',
              }}
            >
              Clique em "+ Adicionar aluno" para
              começar.
            </p>
          </div>
        ) : (
          /* LISTA DE ALUNOS */

          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(2, 1fr)',
              gap: '18px',
            }}
          >
            {alunos.map((aluno) => (
              <div
                key={aluno.id}
                style={{
                  background: '#ffffff',
                  borderRadius: '24px',
                  padding: '23px',
                  boxShadow:
                    '0 7px 17px rgba(0,0,0,0.06)',
                }}
              >
                {/* CABEÇALHO DO ALUNO */}

                <div
                  style={{
                    display: 'flex',
                    justifyContent:
                      'space-between',
                    alignItems: 'flex-start',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      gap: '14px',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '50%',
                        background: '#FFE5E5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent:
                          'center',
                        fontSize: '25px',
                      }}
                    >
                      👤
                    </div>

                    <div>
                      <h3
                        style={{
                          margin: 0,
                          fontSize: '20px',
                          fontWeight: 900,
                        }}
                      >
                        {aluno.nome}
                      </h3>

                      <p
                        style={{
                          margin: '4px 0 0',
                          color: '#999999',
                          fontSize: '14px',
                        }}
                      >
                        {aluno.email}
                      </p>
                    </div>
                  </div>

                  <span
                    style={{
                      background: '#FFF1F1',
                      color: '#FF6B6B',
                      padding: '6px 10px',
                      borderRadius: '10px',
                      fontSize: '13px',
                      fontWeight: 800,
                    }}
                  >
                    {aluno.turma}
                  </span>
                </div>

                {/* INFORMAÇÕES */}

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns:
                      'repeat(3, 1fr)',
                    gap: '10px',
                    marginTop: '22px',
                  }}
                >
                  <Info
                    titulo="Nível"
                    valor={aluno.nivelAlfabetico}
                  />

                  <Info
                    titulo="Média"
                    valor={`${aluno.media}%`}
                  />

                  <Info
                    titulo="Jogos"
                    valor={aluno.jogosRealizados}
                  />
                </div>

                {/* BOTÕES */}

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                    marginTop: '20px',
                  }}
                >
                  <button
                    onClick={() =>
                      navigate(
                        '/Professor/ProfessorHistorico'
                      )
                    }
                    style={actionButton(
                      '#EEE8FF',
                      '#6D3DF5'
                    )}
                  >
                    📋 Histórico
                  </button>

                  <button
                    onClick={() =>
                      alert(
                        'A edição será adicionada em seguida.'
                      )
                    }
                    style={actionButton(
                      '#FFF5D9',
                      '#D99D00'
                    )}
                  >
                    ✏️ Editar
                  </button>

                  <button
                    onClick={() =>
                      excluirAluno(aluno.id)
                    }
                    style={actionButton(
                      '#FFE9E9',
                      '#E05252'
                    )}
                  >
                    🗑️ Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

/* MENU */

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

/* INFORMAÇÕES */

function Info({
  titulo,
  valor,
}: {
  titulo: string
  valor: string | number
}) {
  return (
    <div
      style={{
        background: '#FFFBF0',
        borderRadius: '14px',
        padding: '10px',
      }}
    >
      <div
        style={{
          fontSize: '12px',
          color: '#999999',
          marginBottom: '3px',
        }}
      >
        {titulo}
      </div>

      <strong
        style={{
          fontSize: '15px',
        }}
      >
        {valor}
      </strong>
    </div>
  )
}

/* BOTÃO DE AÇÃO */

function actionButton(
  background: string,
  color: string
) {
  return {
    border: 'none',
    background,
    color,
    borderRadius: '12px',
    padding: '9px 12px',
    fontSize: '13px',
    fontWeight: 800,
    cursor: 'pointer',
  }
}

/* LABEL */

const labelStyle = {
  display: 'block',
  marginBottom: '6px',
  fontSize: '14px',
  fontWeight: 800,
  color: '#555555',
}



const inputStyle = {
  width: '100%',
  boxSizing: 'border-box' as const,
  border: '2px solid #eeeeee',
  borderRadius: '14px',
  padding: '13px',
  fontSize: '15px',
  outline: 'none',
  background: '#FFFBF0',
}



export default ProfessorAlunos