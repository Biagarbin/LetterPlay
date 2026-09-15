import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Aluno = {
  id: string
  nome: string
  email: string
  turma: string
  nivelAlfabetico?: string
  media?: number
  pontuacao?: number
  jogosRealizados?: number
  audioAtivo?: boolean
}

type Turma = {
  id: string
  ano: string
  letra: string
}

type Atividade = {
  id: string
  alunoId?: string
  jogo: string
  nota: number
  pontuacao: number
  data: string
}

function ProfessorDashboard() {
  const navigate = useNavigate()

  const [nome, setNome] = useState('Professora')
  const [alunos, setAlunos] = useState<Aluno[]>([])
  const [turmas, setTurmas] = useState<Turma[]>([])
  const [atividades, setAtividades] = useState<Atividade[]>([])

  useEffect(() => {
    const logado = localStorage.getItem('letterplay_professor_logado')

    if (logado !== 'true') {
      navigate('/professor/login')
      return
    }

    const nomeProfessor =
      localStorage.getItem('letterplay_professor_nome') || 'Professora'

    setNome(nomeProfessor)

    const alunosSalvos: Aluno[] = JSON.parse(
      localStorage.getItem('letterplay_alunos') || '[]'
    )

    const turmasSalvas: Turma[] = JSON.parse(
      localStorage.getItem('letterplay_turmas') || '[]'
    )

    const atividadesSalvas: Atividade[] = JSON.parse(
      localStorage.getItem('letterplay_atividades') || '[]'
    )

    setAlunos(alunosSalvos)
    setTurmas(turmasSalvas)
    setAtividades(atividadesSalvas)
  }, [navigate])

  function sair() {
    localStorage.removeItem('letterplay_professor_logado')
    localStorage.removeItem('letterplay_professor_nome')

    navigate('/')
  }

  const mediaGeral =
    alunos.length > 0
      ? Math.round(
          alunos.reduce(
            (total, aluno) => total + Number(aluno.media || 0),
            0
          ) / alunos.length
        )
      : 0

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
          height: '100px',
          background: '#FFFFFF',
          borderBottom: '1px solid #EEEEEE',
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
              lineHeight: 1,
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
                letterSpacing: '-1px',
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
              Olá, {nome}! 👋
            </p>
          </div>
        </div>

        <button
          onClick={sair}
          style={{
            background: '#FFFFFF',
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

      
      <main
        style={{
          maxWidth: '1060px',
          margin: '30px auto',
          padding: '0 20px',
        }}
      >
       
        <nav
          style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            width: 'fit-content',
            boxShadow: '0 5px 15px rgba(0,0,0,0.06)',
            marginBottom: '38px',
          }}
        >
          <button
            onClick={() => navigate('/Professor/ProfessorTurmas')}
            style={menuButton(true)}
          >
            🏫 <span>Turmas</span>
          </button>

          <button
            onClick={() => navigate('/Professor/ProfessorAluno')}
            style={menuButton(false)}
          >
            👥 <span>Alunos</span>
          </button>

          <button
            onClick={() => navigate('/Professor/ProfessorDesempenho')}
            style={menuButton(false)}
          >
            📊 <span>Turma</span>
          </button>

          <button
            onClick={() => navigate('/Professor/ProfessorHistorico/1')}
            style={menuButton(false)}
          >
            📋 <span>Histórico</span>
          </button>
        </nav>

       
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '28px',
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: '38px',
              fontWeight: 900,
              color: '#26364D',
            }}
          >
            Dashboard 
          </h2>
        </div>


        
        <div
          style={{
            marginTop: '30px',
            background: '#FFFFFF',
            borderRadius: '24px',
            padding: '25px 30px',
            boxShadow: '0 7px 17px rgba(0,0,0,0.06)',
          }}
        >
          <h3
            style={{
              margin: '0 0 10px',
              fontSize: '22px',
              fontWeight: 900,
            }}
          >
            📈 Média geral
          </h3>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <div
              style={{
                flex: 1,
                height: '14px',
                background: '#F0F1F3',
                borderRadius: '20px',
                overflow: 'hidden',
              }}
            >
              
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}



function menuButton(ativo: boolean) {
  return {
    border: 'none',
    background: ativo ? '#FF6B6B' : 'transparent',
    color: ativo ? '#FFFFFF' : '#777777',
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



type ResumoCardProps = {
  emoji: string
  titulo: string
  valor: number
  cor: string
}

function ResumoCard({
  emoji,
  titulo,
  valor,
  cor,
}: ResumoCardProps) {
  const textoEscuro = cor === '#FFD93D'

  return (
    <div
      style={{
        background: cor,
        borderRadius: '24px',
        padding: '22px',
        minHeight: '150px',
        boxSizing: 'border-box',
        boxShadow: '0 7px 15px rgba(0,0,0,0.08)',
      }}
    >
      <div
        style={{
          fontSize: '30px',
          marginBottom: '12px',
        }}
      >
        {emoji}
      </div>

      <div
        style={{
          fontSize: '17px',
          fontWeight: 800,
          color: textoEscuro ? '#26364D' : '#FFFFFF',
        }}
      >
        {titulo}
      </div>

      <div
        style={{
          fontSize: '34px',
          fontWeight: 900,
          color: textoEscuro ? '#26364D' : '#FFFFFF',
          marginTop: '2px',
        }}
      >
        {valor}
      </div>
    </div>
  )
}



type AcaoCardProps = {
  emoji: string
  titulo: string
  descricao: string
  cor: string
  onClick: () => void
}

function AcaoCard({
  emoji,
  titulo,
  descricao,
  cor,
  onClick,
}: AcaoCardProps) {
  return (
    <button
      onClick={onClick}
      style={{
        background: '#FFFFFF',
        border: 'none',
        borderRadius: '24px',
        padding: '28px',
        textAlign: 'left',
        cursor: 'pointer',
        minHeight: '180px',
        boxShadow: '0 7px 17px rgba(0,0,0,0.07)',
        transition: 'transform 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <div
        style={{
          fontSize: '38px',
          marginBottom: '15px',
        }}
      >
        {emoji}
      </div>

      <h3
        style={{
          margin: 0,
          fontSize: '22px',
          fontWeight: 900,
          color: '#111111',
        }}
      >
        {titulo}
      </h3>

      <p
        style={{
          margin: '8px 0 0',
          fontSize: '16px',
          color: '#999999',
        }}
      >
        {descricao}
      </p>

      <div
        style={{
          marginTop: '15px',
          color: cor,
          fontWeight: 800,
          fontSize: '15px',
        }}
      >
        Acessar →
      </div>
    </button>
  )
}

export default ProfessorDashboard