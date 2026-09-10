import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/professor/login"
          element={
            <div className="flex min-h-screen items-center justify-center bg-[#FFFBF0]">
              <h1 className="text-4xl font-bold text-[#C084FC]">
                Login do Professor 👩‍🏫
              </h1>
            </div>
          }
        />

        <Route
          path="/aluno/login"
          element={
            <div className="flex min-h-screen items-center justify-center bg-[#FFFBF0]">
              <h1 className="text-4xl font-bold text-[#4ECDC4]">
                Login do Aluno 🧒
              </h1>
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App