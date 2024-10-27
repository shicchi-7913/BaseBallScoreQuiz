import { PoorInFirst } from '@/types/ScoreBook'

export const drawPoorInFirst = (
  ctx: CanvasRenderingContext2D,
  poorInFirst: PoorInFirst
) => {
  ctx.font = '20px Arial'

  console.log(poorInFirst)

  if (poorInFirst.to !== null && poorInFirst.from === null) {
    ctx.fillText(poorInFirst.to, 155, 145)
  }
  if (poorInFirst.to === null && poorInFirst.from !== null) {
    ctx.fillText(poorInFirst.from, 155, 145)
  }
  if (poorInFirst.to !== null && poorInFirst.from !== null) {
    ctx.fillText(`${poorInFirst.from}-${poorInFirst.to}`, 150, 145)
  }
}
