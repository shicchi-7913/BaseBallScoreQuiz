'use client'

import {
  BallCount,
  AtBatResult,
  TotalBases,
  InputType,
  HitInFirst,
  Position,
  Field,
  PoorInFirst,
} from '@/types/ScoreBook'
import { useRef, useState, useEffect } from 'react'
import { drawScoreBookCell } from '@/components/ScoreBook/functions/ScoreBookCell'
import { drawBallCount } from '@/components/ScoreBook/functions/BallCount'
import { drawTotalBases } from '@/components/ScoreBook/functions/TotalBases'
import { drawAtBatResult } from '@/components/ScoreBook/functions/AtBatResult'
import {
  drawHitInFirst,
  isIncludedPosition,
} from '@/components/ScoreBook/functions/HitInFirst'
import { drawPoorInFirst } from '@/components/ScoreBook/functions/PoorInFirst'

export const MergedCanvas = () => {
  const initState = {
    ballCount: [] as BallCount[],
    atBatResult: null as AtBatResult,
    totalBases: null as TotalBases,
    first: {
      position: null as Position,
      field: null as Field,
    } as HitInFirst,
    poorInFirst: {
      to: null,
      from: null,
      field: null as Field,
    } as PoorInFirst,
  }
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [content, setContent] = useState(initState)

  const handleBallCountClick = (value: BallCount) => {
    setContent((prev) => ({
      ...prev,
      ballCount: [...prev.ballCount, value],
    }))
  }

  const handleAtBatResultClick = (value: AtBatResult) => {
    setContent((prev) => ({
      ...prev,
      atBatResult: value,
    }))
  }

  const handleButtonClick = (
    section: InputType,
    value: BallCount | AtBatResult | TotalBases | Position | Field
  ) => {
    setContent((prev) => {
      if (section === 'TotalBases') {
        return {
          ...prev,
          totalBases: value as TotalBases,
        }
      } else {
        if (isIncludedPosition(value as string)) {
          return {
            ...prev,
            first: {
              ...prev.first,
              position: value as Position,
            },
          }
        } else {
          return {
            ...prev,
            first: {
              ...prev.first,
              field: value as Field,
            },
          }
        }
      }
    })
  }

  const resetColor = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = 'black'
    ctx.strokeStyle = 'black'
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

    // --- スコアブックセル ---
    drawScoreBookCell(ctx)
    // --- BallCount ---
    drawBallCount(ctx, content.ballCount)
    // --- 1打席ごとの結果（真ん中）---
    resetColor(ctx)
    drawAtBatResult(ctx, content.atBatResult)
    // score で red を指定したため black に戻す
    resetColor(ctx)
    // --- 塁打 ---
    drawTotalBases(ctx, content.totalBases)
    // 塁打 で red を指定したため black に戻す
    resetColor(ctx)
    // hitInFirst
    drawHitInFirst(ctx, content.first)
    resetColor(ctx)
    // poorInFirst
    drawPoorInFirst(ctx, content.poorInFirst)
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
            onClick={() => handleBallCountClick('calledStrike')}
          >
            見逃しストライク
          </button>
          <button
            className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
            onClick={() => handleBallCountClick('swingingStrike')}
          >
            空振りストライク
          </button>
          <button
            className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
            onClick={() => handleBallCountClick('ball')}
          >
            ボール
          </button>
          <button
            className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
            onClick={() => handleBallCountClick('foulBall')}
          >
            ファウル
          </button>
          <button
            className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
            onClick={() => handleBallCountClick('buntFoul')}
          >
            バントファウル
          </button>
          <button
            className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
            onClick={() => handleBallCountClick('buntMiss')}
          >
            バント空振り
          </button>
        </div>
        <div className="mt-4">
          <p>1打席ごとの結果（真ん中）</p>
          <button
            className="mr-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
            onClick={() => handleAtBatResultClick('leftOnBase')}
          >
            残塁
          </button>
          <button
            className="mr-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
            onClick={() => handleAtBatResultClick('oneOut')}
          >
            ワンアウト
          </button>
          <button
            className="mr-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
            onClick={() => handleAtBatResultClick('twoOut')}
          >
            ツーアウト
          </button>
          <button
            className="mr-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
            onClick={() => handleAtBatResultClick('threeOut')}
          >
            スリーアウト
          </button>
          <button
            className="mr-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
            onClick={() => handleAtBatResultClick('scoreWithEarnedRun')}
          >
            得点（自責点あり）
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
            onClick={() => handleAtBatResultClick('score')}
          >
            得点（自責点なし）
          </button>
        </div>
        <div className="mt-4">
          <p>安打</p>
          <button
            className="mr-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            onClick={() => handleButtonClick('TotalBases', 'oneHit')}
          >
            一塁打
          </button>
          <button
            className="mr-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            onClick={() => handleButtonClick('TotalBases', 'doubleHit')}
          >
            二塁打
          </button>
          <button
            className="mr-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            onClick={() => handleButtonClick('TotalBases', 'tripleHit')}
          >
            三塁打
          </button>
          <button
            className="mr-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            onClick={() => handleButtonClick('TotalBases', 'homerun')}
          >
            本塁打
          </button>
          <button
            className="mr-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            onClick={() => handleButtonClick('TotalBases', 'buntHit')}
          >
            バントヒット
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            onClick={() => handleButtonClick('TotalBases', 'infieldHit')}
          >
            内野安打
          </button>
        </div>
        <div className="mt-4">
          {Array.from({ length: 9 }, (_, i) => (
            <button
              key={i}
              className="mr-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
              onClick={() =>
                handleButtonClick('HitInFirst', (i + 1).toString() as Position)
              }
            >
              {i + 1}
            </button>
          ))}
        </div>
        <div className="mt-4">
          <button
            className="mr-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            onClick={() => handleButtonClick('HitInFirst', 'front')}
          >
            前
          </button>
          <button
            className="mr-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            onClick={() => handleButtonClick('HitInFirst', 'over')}
          >
            オーバー
          </button>
          <button
            className="mr-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            onClick={() => handleButtonClick('HitInFirst', 'fly')}
          >
            オーバー（フライ）
          </button>
          <button
            className="mr-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            onClick={() => handleButtonClick('HitInFirst', 'leftOfCenter')}
          >
            左中間
          </button>
          <button
            className="mr-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            onClick={() => handleButtonClick('HitInFirst', 'rightOfCenter')}
          >
            右中間
          </button>
        </div>
        <div className="mt-4">
          <p>一塁凡退</p>
          {Array.from({ length: 9 }, (_, i) => (
            <button
              key={i}
              className="mr-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
              onClick={() =>
                handleButtonClick('PoorInFirst', (i + 1).toString() as Position)
              }
            >
              {i + 1}
            </button>
          ))}
        </div>
        <div className="mt-4">
          <button
            className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={saveCanvasAsImage}
          >
            保存
          </button>
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
            onClick={() => resetScore()}
          >
            リセット
          </button>
        </div>
      </div>
    </>
  )
}
