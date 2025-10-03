import './App.css'
import LeftPanel from '@/components/LeftPanel'
import RightPanel from '@/components/RightPanel'

function App() {
  return (
    <div className="h-screen w-screen flex flex-col md:flex-row">
      <LeftPanel />
      <RightPanel />
    </div>
  )
}

export default App
