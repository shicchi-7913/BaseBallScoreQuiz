import { TotalBases } from '@/types/ScoreBook'

export const drawTotalBases = (
  ctx: CanvasRenderingContext2D,
  totalBases: TotalBases
) => {
  if (totalBases === 'oneHit') {
    ctx.beginPath()
    ctx.strokeStyle = 'red'
    ctx.moveTo(80, 190)
    ctx.lineTo(190, 80)
    ctx.stroke()
  } else if (totalBases === 'doubleHit') {
    ctx.beginPath()
    ctx.strokeStyle = 'red'
    ctx.moveTo(80, 190)
    ctx.lineTo(190, 80)
    ctx.moveTo(190, 80)
    ctx.lineTo(110, 0)
    ctx.stroke()
  } else if (totalBases === 'tripleHit') {
    ctx.beginPath()
    ctx.strokeStyle = 'red'
    ctx.moveTo(80, 190)
    ctx.lineTo(190, 80)
    ctx.moveTo(190, 80)
    ctx.lineTo(110, 0)
    ctx.moveTo(110, 0)
    ctx.lineTo(30, 80)
    ctx.stroke()
  } else if (totalBases === 'homerun') {
    ctx.beginPath()
    ctx.strokeStyle = 'red'
    ctx.moveTo(80, 190)
    ctx.lineTo(190, 80)
    ctx.moveTo(190, 80)
    ctx.lineTo(110, 0)
    ctx.moveTo(110, 0)
    ctx.lineTo(30, 80)
    ctx.moveTo(30, 80)
    ctx.lineTo(140, 190)
    ctx.stroke()
  } else if (totalBases === 'buntHit') {
    ctx.beginPath()
    ctx.strokeStyle = 'red'
    ctx.moveTo(80, 190)
    ctx.lineTo(190, 80)
    ctx.stroke()

    const radius = 38

    ctx.beginPath()
    ctx.strokeStyle = 'red'
    ctx.arc(150, 120, radius, Math.PI / -4, Math.PI + Math.PI / -4)
    ctx.stroke()

    ctx.save() // ここまでの状態を保存

    ctx.translate(135, 125)
    ctx.rotate(-Math.PI / 4)

    // 傾けた状態で文字を描画
    ctx.fillStyle = 'red'
    ctx.font = '20px Arial'
    ctx.fillText('BH', 0, 0)

    ctx.restore() // 状態を復元
  } else if (totalBases === 'infieldHit') {
    ctx.beginPath()
    ctx.strokeStyle = 'red'
    ctx.moveTo(80, 190)
    ctx.lineTo(190, 80)
    ctx.stroke()

    const radius = 38

    ctx.beginPath()
    ctx.strokeStyle = 'red'
    ctx.arc(150, 120, radius, Math.PI / -4, Math.PI + Math.PI / -4)
    ctx.stroke()
  }
}
