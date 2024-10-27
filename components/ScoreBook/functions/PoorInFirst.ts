import { PoorInFirst } from '@/types/ScoreBook'

export const drawPoorInFirst = (
  ctx: CanvasRenderingContext2D,
  poorInFirst: PoorInFirst
) => {
  ctx.font = '20px Arial'

  if (poorInFirst.to !== null && poorInFirst.from === null) {
    ctx.fillText(poorInFirst.to, 155, 145)
  }
  if (poorInFirst.to === null && poorInFirst.from !== null) {
    ctx.fillText(poorInFirst.from, 155, 145)
  }
  if (poorInFirst.to !== null && poorInFirst.from !== null) {
    ctx.fillText(`${poorInFirst.from}-${poorInFirst.to}`, 150, 145)
  }
  if (poorInFirst.field === 'fly') {
    ctx.beginPath()
    ctx.arc(160, 130, 10, Math.PI, Math.PI * 2)
    ctx.stroke()
  }
  if (poorInFirst.field === 'liner') {
    ctx.beginPath()
    ctx.moveTo(151, 125)
    ctx.lineTo(170, 125)
    ctx.stroke()
  }
}
