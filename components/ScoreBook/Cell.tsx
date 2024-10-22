import { useRef, useEffect } from 'react'

import { SpaceText } from '@/types/SpaceText'

export const Cell = ({ spaceText }: { spaceText: SpaceText }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    drawText()
  }, [spaceText])

  const drawText = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // 背景を白で塗りつぶす
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // 枠の設定
    ctx.beginPath()
    ctx.rect(0, 0, 190, 160)
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

  return (
    <canvas
      ref={canvasRef}
      width={190}
      height={160}
      style={{ border: '1px solid black' }}
    ></canvas>
  )
}
