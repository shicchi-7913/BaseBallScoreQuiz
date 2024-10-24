'use client'

import { BallCount, AtBatResult, TotalBases } from '@/types/ScoreBook'
import { CellSize } from '@/const/CanvasSizes'
import { useRef, useState, useEffect } from 'react'

export const MergedCanvas = () => {
  const initState = {
    ballCount: [] as BallCount[],
    atBatResult: null as AtBatResult,
    totalBases: null as TotalBases,
  }
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [content, setContent] = useState(initState)

  const handleButtonClick = (
    section: 'BallCount' | 'AtBatResult' | 'TotalBases',
    value: BallCount | AtBatResult | TotalBases
  ) => {
    setContent((prev) => {
      if (section === 'BallCount') {
        return {
          ...prev,
          ballCount: [...prev.ballCount, value as BallCount],
        }
      } else if (section === 'AtBatResult') {
        return {
          ...prev,
          atBatResult: value as AtBatResult,
        }
      } else {
        return {
          ...prev,
          totalBases: value as TotalBases,
        }
      }
    })
  }

  const resetScore = () => {
    setContent(initState)
  }

  const saveCanvasAsImage = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement('a')
    link.href = canvas.toDataURL('image/png')
    link.download = 'scorebook.png'
    link.click()
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
    // --- ここまで BallCount ---

    // --- ここから 1打席ごとの結果（真ん中）---
    ctx.font = '40px Arial'
    ctx.fillStyle = 'black'
    ctx.strokeStyle = 'black'
    if (content.atBatResult === 'leftOnBase') {
      ctx.fillText('ℓ', 102, 95)
    } else if (content.atBatResult === 'oneOut') {
      ctx.fillText('I', 104, 95)
    } else if (content.atBatResult === 'twoOut') {
      ctx.fillText('II', 98, 95)
    } else if (content.atBatResult === 'threeOut') {
      ctx.fillText('III', 93, 95)
    } else if (content.atBatResult === 'scoreWithEarnedRun') {
      ctx.beginPath()
      ctx.arc(110, 80, 20, 0, Math.PI * 2)
      ctx.fillStyle = 'red'
      ctx.fill()
      ctx.strokeStyle = 'red'
      ctx.stroke()
    } else if (content.atBatResult === 'score') {
      ctx.beginPath()
      ctx.arc(110, 80, 20, 0, Math.PI * 2)
      ctx.strokeStyle = 'red'
      ctx.stroke()
    }
    // score で red を指定したため black に戻す
    ctx.strokeStyle = 'black'
    // --- ここまで 1打席ごとの結果（真ん中）---

    // --- ここから 塁打 ---
    if (content.totalBases === 'oneHit') {
      ctx.beginPath()
      ctx.strokeStyle = 'red'
      ctx.moveTo(80, 190)
      ctx.lineTo(190, 80)
      ctx.stroke()
    } else if (content.totalBases === 'doubleHit') {
    }
    // --- ここまで 塁打 ---
  }, [content])

  return (
    <>
      <canvas
        ref={canvasRef}
        width={190}
        height={160}
        className="border-2 border-black"
      ></canvas>

      <div className="mt-4">
        <div className="mt-4">
          <p>ボールカウント</p>
          <button
            className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
            onClick={() => handleButtonClick('BallCount', 'calledStrike')}
          >
            見逃しストライク
          </button>
          <button
            className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
            onClick={() => handleButtonClick('BallCount', 'swingingStrike')}
          >
            空振りストライク
          </button>
          <button
            className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
            onClick={() => handleButtonClick('BallCount', 'ball')}
          >
            ボール
          </button>
          <button
            className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
            onClick={() => handleButtonClick('BallCount', 'foulBall')}
          >
            ファウル
          </button>
          <button
            className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
            onClick={() => handleButtonClick('BallCount', 'buntFoul')}
          >
            バントファウル
          </button>
          <button
            className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
            onClick={() => handleButtonClick('BallCount', 'buntMiss')}
          >
            バント空振り
          </button>
        </div>
        <div className="mt-4">
          <p>1打席ごとの結果（真ん中）</p>
          <button
            className="mr-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
            onClick={() => handleButtonClick('AtBatResult', 'leftOnBase')}
          >
            残塁
          </button>
          <button
            className="mr-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
            onClick={() => handleButtonClick('AtBatResult', 'oneOut')}
          >
            ワンアウト
          </button>
          <button
            className="mr-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
            onClick={() => handleButtonClick('AtBatResult', 'twoOut')}
          >
            ツーアウト
          </button>
          <button
            className="mr-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
            onClick={() => handleButtonClick('AtBatResult', 'threeOut')}
          >
            スリーアウト
          </button>
          <button
            className="mr-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
            onClick={() =>
              handleButtonClick('AtBatResult', 'scoreWithEarnedRun')
            }
          >
            得点（自責点あり）
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
            onClick={() => handleButtonClick('AtBatResult', 'score')}
          >
            得点（自責点なし）
          </button>
        </div>
        <div className="mt-4">
          <p>塁打</p>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            onClick={() => handleButtonClick('TotalBases', 'oneHit')}
          >
            一塁打
          </button>
        </div>
        <div className="mt-4">
          <button
            className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={saveCanvasAsImage}
          >
            保存
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            onClick={() => resetScore()}
          >
            リセット
          </button>
        </div>
      </div>
    </>
  )
}
