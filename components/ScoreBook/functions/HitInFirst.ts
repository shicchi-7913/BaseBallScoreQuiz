import { HitInFirst } from '@/types/ScoreBook'

export const isIncludedPosition = (value: string) => {
  return ['1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(value)
}

export const drawHitInFirst = (
  ctx: CanvasRenderingContext2D,
  hitInFirst: HitInFirst
) => {
  ctx.font = '20px Arial'
  ctx.strokeStyle = 'red'
  ctx.fillStyle = 'red'
  if (hitInFirst.position !== null) {
    ctx.fillText(hitInFirst.position, 155, 145)
  }
  if (hitInFirst.field === 'leftOfCenter') {
    ctx.fillText('・', 140, 145)
  }
  if (hitInFirst.field === 'rightOfCenter') {
    ctx.fillText('・', 160, 145)
  }
  if (hitInFirst.field === 'front') {
    ctx.fillText('・', 151, 160)
  }
  if (hitInFirst.field === 'over') {
    ctx.fillText('・', 151, 130)
  }
  if (hitInFirst.field === 'fly') {
    ctx.beginPath()
    ctx.arc(160, 130, 10, Math.PI, Math.PI * 2)
    ctx.stroke()
  }
}
