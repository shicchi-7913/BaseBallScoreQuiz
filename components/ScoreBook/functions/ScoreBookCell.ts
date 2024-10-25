import { CellSize } from '@/const/CanvasSizes'

export const drawScoreBookCell = (ctx: CanvasRenderingContext2D) => {
  ctx.beginPath()
  ctx.rect(0, 0, CellSize.width, CellSize.height)
  ctx.stroke()

  // 縦線の描画
  ctx.beginPath()
  ctx.moveTo(30, 0)
  ctx.lineTo(30, 160)
  ctx.stroke()

  // 横線の描画
  ctx.setLineDash([3, 3])
  ctx.beginPath()
  ctx.moveTo(30, 80)
  ctx.lineTo(70, 80)
  ctx.moveTo(150, 80)
  ctx.lineTo(190, 80)
  ctx.moveTo(160, 80)
  ctx.lineTo(190, 80)
  ctx.moveTo(110, 0)
  ctx.lineTo(110, 40)
  ctx.moveTo(110, 120)
  ctx.lineTo(110, 160)
  ctx.stroke()

  // ひし形の描画
  ctx.beginPath()
  ctx.moveTo(110, 40)
  ctx.lineTo(150, 80)
  ctx.lineTo(110, 120)
  ctx.lineTo(70, 80)
  ctx.closePath()
  ctx.stroke()

  // 枠の点線を解除する
  ctx.setLineDash([])
}
