// ====================================================================
// CIS 133JS — Week 7 Side Lecture Example:
// Refactoring the Week 6 Scoreboard with Event Delegation
// ====================================================================
// Compare this file with the Week 6 loop-based scoreboard:
// - `render()` ONLY updates `app.innerHTML` (no querySelectorAll loop!)
// - Buttons carry `data-type` and `data-index` attributes
// - ONE click listener on `#app` handles all +1, -1, and Reset clicks
// ====================================================================

export const players = ['Dave', 'Donna', 'Demaris']

export function getLeaders(players, scores) {
  const max = scores.reduce((max, score) => (max < score ? score : max), 0)
  if (max === 0) return []

  return players
    .map((player, i) => {
      if (scores[i] === max) {
        return { name: player, score: scores[i] }
      }
      return null
    })
    .filter((leader) => Boolean(leader))
}

export function renderApp() {
  const scoresBaseline = resetScores()
  let scores = [...scoresBaseline]

  const app = document.querySelector('#app')

  function addPoint(index) {
    const points = scores[index]
    return scores.slice(0, index).concat([points + 1], scores.slice(index + 1))
  }

  function removePoint(index) {
    const points = scores[index]
    if (points === 0) return [...scores]
    return scores.slice(0, index).concat([points - 1], scores.slice(index + 1))
  }

  function resetScores() {
    return Array(players.length).fill(0)
  }

  function render() {
    const rows = players
      .map(
        (player, i) => `
      <tr>
        <td>${player}</td>
        <td data-test-score>${scores[i]}</td>
        <td>
          <div class="buttons">
            <button data-type='add' data-index='${i}'>+1</button>
            <button data-type='subtract' data-index='${i}'>-1</button>
          </div>
        </td>
      </tr>
    `,
      )
      .join('\n')

    const leaders = getLeaders(players, scores)
    function leadersReport() {
      if (leaders.length === 0) return 'No points yet'

      const leader = leaders.shift()

      // no remainders
      if (leaders.length === 0) {
        return `Leader: ${leader.name} (${leader.score})`
      }

      // a tie
      return `Tied: ${[leader, ...leaders].map((player) => player.name).join(', ')} (${leader.score})`
    }

    app.innerHTML = `
      <style>
        .buttons {
          display: flex;
          gap: 10px;
        }

        .buttons > button {
          display: block;
          width: 5rem;
          text-align: center;
        }
      </style>
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Score</th>
            <th>Buttons</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
      <p>${leadersReport()}</p>
      <p><button id="reset" data-type="reset">Reset scores</button></p>`
  }

  render()

  // Single delegated event listener on `#app`:
  // Survives every `app.innerHTML` rebuild without re-attaching listeners!
  app.addEventListener('click', (event) => {
    const button = event.target.closest('button')
    if (!button) return

    const i = parseInt(button.dataset.index, 10)

    switch (button.dataset.type) {
      case 'add':
        scores = addPoint(i)
        render()
        break
      case 'subtract':
        scores = removePoint(i)
        render()
        break
      case 'reset':
        scores = resetScores()
        render()
        break
      default:
        console.log('Unknown button')
        break
    }
  })
}
