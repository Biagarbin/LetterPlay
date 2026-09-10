import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import ProfessorLogin from './pages/professor/ProfessorLogin'
import ProfessorDashboard from './pages/professor/ProfessorDashboard'
import AlunoDashboard from './pages/Aluno/AlunoDashboard'
import AlunoLogin from './pages/Aluno/alunoLogin'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/professor/login"
          element={<ProfessorLogin />}
        />

        <Route
          path="/professor/dashboard"
          element={<ProfessorDashboard />}
        />

         <Route
          path="/ALuno/login"
          element={<AlunoLogin />}
        />

         <Route
          path="/Aluno/dashboard"
          element={<AlunoDashboard />}
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App