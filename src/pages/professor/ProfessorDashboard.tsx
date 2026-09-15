import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ProfessorDashboard() {
  const navigate = useNavigate()

  const [nome, setNome] = useState('Professora')
  const [alunos, setAlunos] = useState<any[]>([])
  const [turmas, setTurmas] = useState<any[]>([])
  const [atividades, setAtividades] = useState<any[]>([])

  useEffect(() => {
    const logado = localStorage.getItem('letterplay_professor_logado')

    if (logado !== 'true') {
      navigate('/professor/login')
      return
    }

    const nomeProfessor =
      localStorage.getItem('letterplay_professor_nome') || 'Professora'

    setNome(nomeProfessor)

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
    localStorage.removeItem('letterplay_professor_logado')
    localStorage.removeItem('letterplay_professor_nome')

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

      
      <main
        style={{
          maxWidth: '1060px',
          margin: '30px auto',
          padding: '0 20px',
        }}
      >
     
        <nav
          style={{
            background: '#ffffff',
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
            onClick={() => navigate('/Professor/Turma')}
            style={menuButton(false)}
          >
            🏫 <span>Turmas</span>
          </button>

          <button
            onClick={() => navigate('/Professor/Aluno')}
            style={menuButton(false)}
          >
            👥 <span>Alunos</span>
          </button>

          <button
            onClick={() => navigate('/Professor/Desempenho')}
            style={menuButton(true)}
          >
            📊 <span>Desempenho</span>
          </button>

          <button
            onClick={() => navigate('/Professor/Historico/1')}
            style={menuButton(false)}
          >
            📋 <span>Histórico</span>
          </button>
        </nav>       

      
      </main>
    </div>
  )
}


function menuButton(ativo: boolean) {
  return {
    border: 'none',
    background: ativo ? '#FF6B6B' : 'transparent',
    color: ativo ? '#ffffff' : '#777777',
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
  return (
    <div
      style={{
        background: cor,
        borderRadius: '24px',
        padding: '22px',
        minHeight: '135px',
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
          color:
            cor === '#FFD93D'
              ? '#26364D'
              : '#ffffff',
        }}
      >
        {titulo}
      </div>

      <div
        style={{
          fontSize: '34px',
          fontWeight: 900,
          color:
            cor === '#FFD93D'
              ? '#26364D'
              : '#ffffff',
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
        background: '#ffffff',
        border: 'none',
        borderRadius: '24px',
        padding: '28px',
        textAlign: 'left',
        cursor: 'pointer',
        minHeight: '170px',
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
          fontSize: '23px',
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