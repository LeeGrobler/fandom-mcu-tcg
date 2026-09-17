import './App.css'
import CharacterCard from './components/Card.jsx'
import characters from './data/characters.json'

function App() {
  return (
    <main className="min-h-screen overflow-x-clip bg-zinc-950 text-zinc-50">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-zinc-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-[112rem] flex-col gap-3 px-5 py-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-red-400">Fandom Card Table</p>
            <h1 className="mt-2 text-4xl font-black tracking-normal text-white sm:text-5xl">MCU Base Cards</h1>
          </div>
          <div className="rounded-md border border-white/10 bg-white/[0.06] px-4 py-3 text-right shadow-sm">
            <p className="text-3xl font-black leading-none text-white">{characters.length}</p>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-400">Characters</p>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-[112rem] grid-cols-[repeat(auto-fill,minmax(10.5rem,1fr))] content-start items-start justify-items-center gap-6 px-5 py-8">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </section>
    </main>
  )
}

export default App
