import type {
  Professor,
  Aluno,
  Turma,
  ResultadoJogo,
} from '../types'

const KEYS = {
  professores: 'letterplay_professores',
  alunos: 'letterplay_alunos',
  turmas: 'letterplay_turmas',
  resultados: 'letterplay_resultados',
}

function getData<T>(key: string): T[] {
  const data = localStorage.getItem(key)

  if (!data) {
    return []
  }

  return JSON.parse(data)
}

function saveData<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data))
}

export const storage = {
  getProfessores(): Professor[] {
    return getData<Professor>(KEYS.professores)
  },

  saveProfessores(data: Professor[]) {
    saveData(KEYS.professores, data)
  },

  getAlunos(): Aluno[] {
    return getData<Aluno>(KEYS.alunos)
  },

  saveAlunos(data: Aluno[]) {
    saveData(KEYS.alunos, data)
  },

  getTurmas(): Turma[] {
    return getData<Turma>(KEYS.turmas)
  },

  saveTurmas(data: Turma[]) {
    saveData(KEYS.turmas, data)
  },

  getResultados(): ResultadoJogo[] {
    return getData<ResultadoJogo>(KEYS.resultados)
  },

  saveResultados(data: ResultadoJogo[]) {
    saveData(KEYS.resultados, data)
  },
}