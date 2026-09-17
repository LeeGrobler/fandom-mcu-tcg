import { Activity, HeartPulse, Shield, Sparkles, Swords, Tag, Wind } from 'lucide-react'
import { useState } from 'react'

const statLabels = {
  power: {
    shortLabel: 'PWR',
    icon: Swords,
  },
  defense: {
    shortLabel: 'DEF',
    icon: Shield,
  },
  speed: {
    shortLabel: 'SPD',
    icon: Wind,
  },
}

function CharacterCard({ character }) {
  const { theme, stats } = character
  const [tooltipSide, setTooltipSide] = useState('right')
  const [tooltipVertical, setTooltipVertical] = useState('middle')
  const cardStyle = {
    '--card-primary': theme.primary,
    '--card-secondary': theme.secondary,
    '--card-text': theme.text,
  }

  function updateTooltipPlacement(event) {
    const rect = event.currentTarget.getBoundingClientRect()
    const hasMoreRoomOnLeft = rect.left + rect.width / 2 > window.innerWidth / 2
    const spaceBelow = window.innerHeight - rect.bottom
    const spaceAbove = rect.top

    setTooltipSide(hasMoreRoomOnLeft ? 'left' : 'right')
    setTooltipVertical(spaceBelow < 360 && spaceAbove > spaceBelow ? 'top' : 'middle')
  }

  const opensLeft = tooltipSide === 'left'
  const opensAbove = tooltipVertical === 'top'
  const tooltipPosition = opensAbove
    ? `${opensLeft ? 'md:right-0 md:left-auto md:origin-bottom-right' : 'md:left-0 md:right-auto md:origin-bottom-left'} bottom-[calc(100%+0.65rem)] left-1/2 -translate-x-1/2 md:translate-x-0`
    : `${opensLeft ? 'md:right-[calc(100%+0.65rem)] md:left-auto md:origin-right' : 'md:left-[calc(100%+0.65rem)] md:right-auto md:origin-left'} left-1/2 top-[calc(100%+0.65rem)] -translate-x-1/2 md:top-1/2 md:-translate-x-0 md:-translate-y-1/2`

  const tooltipArrow = opensAbove
    ? `${opensLeft ? 'md:right-8 md:left-auto' : 'md:left-8'} -bottom-2 left-1/2 -translate-x-1/2 border-b border-r md:translate-x-0`
    : opensLeft
      ? '-top-2 left-1/2 -translate-x-1/2 border-l border-t md:-right-2 md:left-auto md:top-1/2 md:-translate-y-1/2 md:translate-x-0 md:border-r md:border-t md:border-b-0 md:border-l-0'
      : '-top-2 left-1/2 -translate-x-1/2 border-l border-t md:-left-2 md:left-auto md:top-1/2 md:-translate-y-1/2 md:translate-x-0 md:border-b md:border-l md:border-t-0'

  const hoverBridge = opensAbove
    ? 'bottom-full left-0 right-0 h-3'
    : opensLeft
      ? 'top-full left-0 right-0 h-3 md:left-auto md:right-full md:top-0 md:h-full md:w-4'
      : 'top-full left-0 right-0 h-3 md:left-full md:right-auto md:top-0 md:h-full md:w-4'

  return (
    <article
      className="group relative z-0 h-[17.5rem] w-[12.5rem] shrink-0 overflow-visible rounded-lg bg-zinc-950 p-[2px] shadow-2xl shadow-zinc-950/25 transition duration-300 hover:z-30 hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(0,0,0,0.35)] focus:z-30 focus:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white/70"
      style={cardStyle}
      tabIndex={0}
      onFocus={updateTooltipPlacement}
      onMouseEnter={updateTooltipPlacement}
    >
      <div className="pointer-events-none absolute inset-0 rounded-lg bg-[linear-gradient(135deg,var(--card-primary),var(--card-secondary)_52%,var(--card-primary))]" />
      <div className="pointer-events-none absolute -right-14 -top-16 size-40 rounded-full bg-white/25 blur-3xl transition duration-500 group-hover:scale-125 group-focus:scale-125" />

      <div className="relative flex h-full flex-col overflow-hidden rounded-[7px] border border-white/20 bg-zinc-950 text-white">
        <header className="relative h-14 shrink-0 p-2 text-[color:var(--card-text)]">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,var(--card-primary),var(--card-secondary))] opacity-95" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.34),transparent_40%)]" />
          <div className="relative flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-[0.5rem] font-black uppercase tracking-[0.14em] opacity-80">{character.character}</p>
              <h2 className="mt-0.5 truncate text-sm font-black leading-tight tracking-normal">{character.name}</h2>
              <p className="truncate text-[0.58rem] font-bold opacity-90">{character.subtitle}</p>
            </div>
            <div className="flex shrink-0 items-center gap-1 rounded-full border border-white/70 bg-black/40 px-1.5 py-1 shadow-lg backdrop-blur">
              <HeartPulse className="size-3" aria-hidden="true" />
              <span className="text-xs font-black leading-none">{stats.hp}</span>
            </div>
          </div>
        </header>

        <div className="relative min-h-0 flex-1 border-y border-white/15 bg-zinc-900">
          <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,transparent_55%,rgba(0,0,0,0.78))]" />
          <img
            className="block h-full w-full object-cover transition duration-500 group-hover:scale-105"
            src={character.imageUrl}
            alt={character.name}
          />
          <div className="absolute bottom-2 left-2 right-2 z-20">
            <p className="truncate text-[0.58rem] font-black uppercase tracking-[0.14em] text-white/90">
              {character.tags.slice(0, 3).join(' / ').replaceAll('_', ' ')}
            </p>
          </div>
        </div>

        <div className="grid h-14 shrink-0 grid-cols-3 gap-px bg-white/15">
          {Object.entries(statLabels).map(([stat, config]) => {
            const Icon = config.icon

            return (
              <div key={stat} className="bg-zinc-950 px-1.5 py-2 text-center">
                <Icon className="mx-auto size-3.5 text-zinc-300" aria-hidden="true" />
                <span className="mt-1 block text-sm font-black leading-none text-white">{stats[stat]}</span>
                <span className="mt-0.5 block text-[0.46rem] font-black uppercase tracking-[0.08em] text-zinc-500">{config.shortLabel}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className={`pointer-events-none absolute z-30 bg-transparent group-hover:pointer-events-auto group-focus:pointer-events-auto ${hoverBridge}`} />

      <aside
        className={`pointer-events-none absolute z-40 w-[18rem] scale-95 rounded-lg border border-white/15 bg-zinc-950/96 text-white opacity-0 shadow-2xl shadow-black/50 backdrop-blur transition duration-200 group-hover:pointer-events-auto group-hover:scale-100 group-hover:opacity-100 group-focus:pointer-events-auto group-focus:scale-100 group-focus:opacity-100 ${tooltipPosition}`}
      >
        <div className={`pointer-events-none absolute size-4 rotate-45 border-white/15 bg-zinc-950/96 ${tooltipArrow}`} />
        <div className="relative max-h-[min(22rem,calc(100vh-2rem))] overflow-y-auto overflow-x-hidden p-3">
          <div className="space-y-3">
            <p className="text-xs font-semibold leading-5 text-zinc-200">{character.description}</p>

            <div className="space-y-1.5 border-t border-white/10 pt-3">
              {character.passives.map((passive) => (
                <div key={passive.id} className="flex gap-2 rounded-md bg-white/[0.05] p-2">
                  <Sparkles className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" style={{ color: theme.secondary }} />
                  <div>
                    <h4 className="text-xs font-black">{passive.name}</h4>
                    <p className="mt-0.5 text-[0.68rem] leading-4 text-zinc-300">{passive.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2 rounded-md border border-white/10 bg-black/35 p-2">
              <Activity className="mt-0.5 size-3.5 shrink-0 text-zinc-400" aria-hidden="true" />
              {character.activeAbility ? (
                <div>
                  <h4 className="text-xs font-black">{character.activeAbility.name}</h4>
                  <p className="mt-0.5 text-[0.68rem] leading-4 text-zinc-300">{character.activeAbility.description}</p>
                </div>
              ) : (
                <p className="text-xs font-bold italic text-zinc-500">No active ability yet.</p>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5 border-t border-white/10 pt-3">
              {character.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.06] px-1.5 py-0.5 text-[0.58rem] font-black uppercase tracking-[0.08em] text-zinc-300">
                  <Tag className="size-2.5" aria-hidden="true" />
                  {tag.replaceAll('_', ' ')}
                </span>
              ))}
            </div>

            <div className="border-t border-white/10 pt-3">
              <p className="text-[0.68rem] italic leading-4 text-zinc-400">{character.flavorText}</p>
            </div>
          </div>
        </div>
      </aside>
    </article>
  )
}

export default CharacterCard
