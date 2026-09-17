import './App.css'
import { Check, Sparkles } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import CharacterCard from './components/Card.jsx'
import characters from './data/characters.json'

const DRAFT_SIZE = 5
const SQUAD_SIZE = 3
const BOARD_COLUMNS = 5
const BOARD_ROWS = 4
const BOARD_SIZE = BOARD_COLUMNS * BOARD_ROWS
const BOARD_START_INDEX = 11

function shuffleCards(cards) {
  const shuffled = [...cards]

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    const current = shuffled[index]
    shuffled[index] = shuffled[swapIndex]
    shuffled[swapIndex] = current
  }

  return shuffled
}

function CardBack({ isShuffling }) {
  return (
    <div className={`deck-stack ${isShuffling ? 'is-shuffling' : ''}`} aria-hidden="true">
      <div className="card-back card-back-third" />
      <div className="card-back card-back-second" />
      <div className="card-back card-back-top">
        <div className="card-back-emblem">
          <Sparkles className="size-8" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}

function App() {
  const [boardCards, setBoardCards] = useState([])
  const [dealtCards, setDealtCards] = useState([])
  const [isShuffling, setIsShuffling] = useState(true)
  const [selectedIds, setSelectedIds] = useState([])
  const shuffleTimeoutRef = useRef(null)

  const selectedCards = useMemo(
    () => selectedIds
      .map((id) => dealtCards.find((card) => card.id === id))
      .filter(Boolean),
    [dealtCards, selectedIds],
  )
  const canDeploy = selectedIds.length === SQUAD_SIZE
  const isDraftOpen = dealtCards.length > 0 && boardCards.length === 0

  useEffect(() => {
    shuffleTimeoutRef.current = window.setTimeout(() => {
      setDealtCards(shuffleCards(characters).slice(0, DRAFT_SIZE))
      setIsShuffling(false)
      shuffleTimeoutRef.current = null
    }, 1500)

    return () => {
      if (shuffleTimeoutRef.current) {
        window.clearTimeout(shuffleTimeoutRef.current)
      }
    }
  }, [])

  function toggleSelected(cardId) {
    setSelectedIds((currentIds) => {
      if (currentIds.includes(cardId)) {
        return currentIds.filter((id) => id !== cardId)
      }

      if (currentIds.length >= SQUAD_SIZE) {
        return currentIds
      }

      return [...currentIds, cardId]
    })
  }

  function deploySelectedCards() {
    if (!canDeploy) {
      return
    }

    setBoardCards(selectedCards)
  }

  return (
    <main className="game-shell bg-zinc-950 text-zinc-50">
      <section className="battlefield game-board" aria-label="Player board">
        {Array.from({ length: BOARD_SIZE }, (_, index) => {
          const boardCardIndex = index - BOARD_START_INDEX
          const card = boardCardIndex >= 0 && boardCardIndex < SQUAD_SIZE
            ? boardCards[boardCardIndex]
            : null
          const isDeploymentSlot = index >= BOARD_START_INDEX && index < BOARD_START_INDEX + SQUAD_SIZE

          return (
            <div
              className={`board-slot flex items-center justify-center rounded-md border border-white/10 bg-zinc-950/55 p-[clamp(0.25rem,0.7vmin,0.55rem)] ${isDeploymentSlot ? 'deployment-slot' : ''} ${card ? 'has-card' : ''}`}
              key={index}
            >
              {card ? (
                <CharacterCard
                  animationDelay={`${boardCardIndex * 110}ms`}
                  character={card}
                  className="board-card-enter"
                  variant="board"
                />
              ) : null}
            </div>
          )
        })}
      </section>

      {isShuffling ? (
        <section className="shuffle-overlay" aria-label="Shuffling deck">
          <div className="shuffle-stage">
            <div className="deck-counter">
              <p className="text-2xl font-black leading-none text-white">{characters.length}</p>
              <p className="text-[0.65rem] font-black uppercase tracking-[0.16em] text-zinc-500">Deck</p>
            </div>
            <CardBack isShuffling />
          </div>
        </section>
      ) : null}

      {isDraftOpen ? (
        <section className="draft-overlay" aria-label="Draft selection" aria-modal="true" role="dialog">
          <div className="draft-panel">
            <div className="draft-panel-header">
              <div>
                <p className="text-[0.64rem] font-black uppercase tracking-[0.22em] text-emerald-300">Draft</p>
                <h1 className="mt-1 text-2xl font-black leading-none tracking-normal text-white">Pick Three</h1>
              </div>
              <div className="draft-status">
                <p className="text-2xl font-black leading-none text-white">{selectedIds.length}/{SQUAD_SIZE}</p>
                <p className="text-[0.65rem] font-black uppercase tracking-[0.16em] text-zinc-500">Squad</p>
              </div>
            </div>

            {dealtCards.length > 0 ? (
              <div className="draft-hand">
                {dealtCards.map((character, index) => {
                  const isSelected = selectedIds.includes(character.id)
                  const isMuted = selectedIds.length >= SQUAD_SIZE && !isSelected

                  return (
                    <CharacterCard
                      animationDelay={`${index * 85}ms`}
                      character={character}
                      className={`draft-card-enter ${isSelected ? 'draft-card-selected' : ''}`}
                      key={character.id}
                      muted={isMuted}
                      onClick={() => toggleSelected(character.id)}
                      selected={isSelected}
                      variant="draft"
                    />
                  )
                })}
              </div>
            ) : (
              <div className="draft-shuffling">
                <CardBack isShuffling={isShuffling} />
              </div>
            )}

            <div className="draft-panel-footer">
              <button
                className="game-button game-button-primary"
                type="button"
                disabled={!canDeploy}
                onClick={deploySelectedCards}
              >
                <Check className="size-4" aria-hidden="true" />
                Deploy
              </button>
            </div>
          </div>
        </section>
      ) : null}
    </main>
  )
}

export default App
