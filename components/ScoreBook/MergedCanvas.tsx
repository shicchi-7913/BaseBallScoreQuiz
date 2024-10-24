'use client'

import { BallCount } from '@/types/BallCount'
import { CellSize } from '@/const/CanvasSizes'
import { useRef, useState, useEffect } from 'react'

export const MergedCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [content, setContent] = useState({
    ballCount: [] as BallCount[],
  })

  const handleButtonClick = (section: 'BallCount', value: BallCount) => {
    setContent((prev) => {
      return {
        ...prev,
        ballCount: [...prev.ballCount, value as BallCount],
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
    content.ballCount.forEach((ballCount, index) => {
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
        <p className="ml-2">ボールカウント</p>
        <button
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
          onClick={() => handleButtonClick('BallCount', 'calledStrike')}
        >
          見逃しストライク
        </button>
        <button
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
          onClick={() => handleButtonClick('BallCount', 'swingingStrike')}
        >
          空振りストライク
        </button>
        <button
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
          onClick={() => handleButtonClick('BallCount', 'ball')}
        >
          ボール
        </button>
        <button
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
          onClick={() => handleButtonClick('BallCount', 'foulBall')}
        >
          ファウル
        </button>
        <button
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
          onClick={() => handleButtonClick('BallCount', 'buntFoul')}
        >
          バントファウル
        </button>
        <button
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
          onClick={() => handleButtonClick('BallCount', 'buntMiss')}
        >
          バント空振り
        </button>
      </div>
    </>
  )
}
