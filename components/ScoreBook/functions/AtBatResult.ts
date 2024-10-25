import { AtBatResult } from '@/types/ScoreBook'

export const drawAtBatResult = (
  ctx: CanvasRenderingContext2D,
  atBatResult: AtBatResult
) => {
  ctx.font = '40px Arial'
  if (atBatResult === 'leftOnBase') {
    ctx.fillText('ℓ', 102, 95)
  } else if (atBatResult === 'oneOut') {
    ctx.fillText('I', 104, 95)
  } else if (atBatResult === 'twoOut') {
    ctx.fillText('II', 98, 95)
  } else if (atBatResult === 'threeOut') {
    ctx.fillText('III', 93, 95)
  } else if (atBatResult === 'scoreWithEarnedRun') {
    ctx.beginPath()
    ctx.arc(110, 80, 20, 0, Math.PI * 2)
    ctx.fillStyle = 'red'
    ctx.fill()
    ctx.strokeStyle = 'red'
    ctx.stroke()
  } else if (atBatResult === 'score') {
    ctx.beginPath()
    ctx.arc(110, 80, 20, 0, Math.PI * 2)
    ctx.strokeStyle = 'red'
    ctx.stroke()
  }
}
