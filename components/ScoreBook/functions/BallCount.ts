import { BallCount } from '@/types/ScoreBook'

export const drawBallCount = (
  ctx: CanvasRenderingContext2D,
  ballCounts: BallCount[]
) => {
  ballCounts.forEach((ballCount, index) => {
    ctx.font = '10px Arial'
    const baseXOffset = 10
    const baseYOffset = 10
    const height = 15
    if (ballCount === 'calledStrike') {
      ctx.beginPath()
      ctx.moveTo(10, 10 + index * height)
      ctx.lineTo(20, 20 + index * height)
      ctx.moveTo(20, 10 + index * height)
      ctx.lineTo(10, 20 + index * height)
      ctx.stroke()
    } else if (ballCount === 'swingingStrike') {
      ctx.beginPath()
      ctx.moveTo(10, 10 + index * height)
      ctx.lineTo(20, 20 + index * height)
      ctx.moveTo(16, 10 + index * height)
      ctx.lineTo(10, 19 + index * height)
      ctx.moveTo(20, 10 + index * height)
      ctx.lineTo(13, 20 + index * height)
      ctx.stroke()
    } else if (ballCount === 'ball') {
      ctx.fillText('・', baseXOffset, baseYOffset + 10 + index * height)
    } else if (ballCount === 'foulBall') {
      ctx.beginPath()
      ctx.moveTo(baseXOffset + 5, baseYOffset + index * height)
      ctx.lineTo(baseXOffset - 3, baseYOffset + 10 + index * height)
      ctx.lineTo(baseXOffset + 13, baseYOffset + 10 + index * height)
      ctx.lineTo(baseXOffset + 5, baseYOffset + index * height)
      ctx.stroke()
    } else if (ballCount === 'buntFoul') {
      ctx.beginPath()
      ctx.fillText('・', baseXOffset, baseYOffset + 10 + index * height)
      ctx.moveTo(baseXOffset + 5, baseYOffset + index * height)
      ctx.lineTo(baseXOffset - 3, baseYOffset + 10 + index * height)
      ctx.lineTo(baseXOffset + 13, baseYOffset + 10 + index * height)
      ctx.lineTo(baseXOffset + 5, baseYOffset + index * height)
      ctx.stroke()
    } else {
      ctx.beginPath()
      // 左から右へ
      ctx.moveTo(10, 10 + index * height)
      ctx.lineTo(17, 20 + index * height)
      // 左から右へ②
      ctx.moveTo(13, 10 + index * height)
      ctx.lineTo(20, 20 + index * height)
      // 右から左へ
      ctx.moveTo(17, 10 + index * height)
      ctx.lineTo(10, 20 + index * height)
      // 右から左へ②
      ctx.moveTo(20, 10 + index * height)
      ctx.lineTo(13, 20 + index * height)
      ctx.stroke()
    }
  })
}

export const ballCountOptions: { label: string; value: BallCount }[] = [
  { label: '見逃しストライク', value: 'calledStrike' },
  { label: '空振りストライク', value: 'swingingStrike' },
  { label: 'ボール', value: 'ball' },
  { label: 'ファウル', value: 'foulBall' },
  { label: 'バントファウル', value: 'buntFoul' },
  { label: 'バント空振り', value: 'buntMiss' },
]
