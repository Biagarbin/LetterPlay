export type Professor = {
  id: string
  nome: string
  email: string
  senha: string
}

export type Aluno = {
  id: string
  nome: string
  email: string
  senha: string
  turmaId: string
  nivelAlfabetico: string
  audioAtivo: boolean
  pontuacao: number
  jogosRealizados: number
}

export type Turma = {
  id: string
  ano: string
  letra: string
}

export type ResultadoJogo = {
  id: string
  alunoId: string
  jogo: string
  porcentagem: number
  pontuacao: number
  data: string
}

export type UsuarioLogado = {
  id: string
  nome: string
  tipo: 'professor' | 'aluno'
}