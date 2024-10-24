'use client'

import { CellSize } from '@/const/CanvasSizes'
import { useRef, useState, useEffect } from 'react'

export const MergedCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [content, setContent] = useState({
    ballCount: [] as string[],
  })

  const handleButtonClick = (section: 'BallCount', value: string) => {
    setContent((prev) => {
      return {
        ...prev,
        ballCount: [...prev.ballCount, value as string],
      }
    })
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // --- ここから スコアブックセル ---
    // 枠の設定
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
    // --- ここまで スコアブックセル ---

    // --- ここから BallCount ---
    content.ballCount.forEach((_, index) => {
      ctx.beginPath()
      ctx.moveTo(10, 10 + index * 15)
      ctx.lineTo(20, 20 + index * 15)
      ctx.moveTo(20, 10 + index * 15)
      ctx.lineTo(10, 20 + index * 15)
      ctx.stroke()
    })
    // --- ここまで BallCount ---
  }, [content])

  return (
    <>
      <canvas
        ref={canvasRef}
        width={190}
        height={160}
        className="border-2 border-black"
      ></canvas>

      <div className="mt-4 space-x-2">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={() => handleButtonClick('BallCount', 'x')}
        >
          ストライク
        </button>
      </div>
    </>
  )
}
