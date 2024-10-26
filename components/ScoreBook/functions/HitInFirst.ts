import { HitInFirst } from '@/types/ScoreBook'

export const drawHitInFirst = (
  ctx: CanvasRenderingContext2D,
  hitInFirst: HitInFirst
) => {
  ctx.font = '20px Arial'
  ctx.fillStyle = 'red'
  if (hitInFirst.position !== null) {
    ctx.fillText(hitInFirst.position, 155, 145)
  }
}
