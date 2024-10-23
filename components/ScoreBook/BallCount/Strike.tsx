import { useEffect, useRef } from 'react'

import { BallCountSize } from '@/const/CanvasSizes'

export const Strike = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // バツ印を描画
    ctx.beginPath()
    ctx.moveTo(20, 20)
    ctx.lineTo(30, 30)
    ctx.moveTo(30, 20)
    ctx.lineTo(20, 30)
    ctx.stroke()
  }, [])

  return (
    <canvas width={BallCountSize.width} height={BallCountSize.height}></canvas>
  )
}
