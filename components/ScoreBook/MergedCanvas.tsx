'use client'

import { useRef, useState, useEffect, useMemo } from 'react'

import {
  BallCount,
  AtBatResult,
  TotalBases,
  HitInFirst,
  Position,
  Field,
  PoorInFirst,
} from '@/types/ScoreBook'
import { drawScoreBookCell } from '@/components/ScoreBook/functions/ScoreBookCell'
import {
  drawBallCount,
  ballCountOptions,
} from '@/components/ScoreBook/functions/BallCount'
import { drawTotalBases } from '@/components/ScoreBook/functions/TotalBases'
import { drawAtBatResult } from '@/components/ScoreBook/functions/AtBatResult'
import { drawHitInFirst } from '@/components/ScoreBook/functions/HitInFirst'
import { drawPoorInFirst } from '@/components/ScoreBook/functions/PoorInFirst'

export const MergedCanvas = () => {
  const initState = useMemo(
    () => ({
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
    }),
    []
  )
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

  const handleTotalBasesClick = (value: TotalBases) => {
    setContent((prev) => ({
      ...prev,
      totalBases: value,
    }))
  }

  const handleHitAtPositionClick = (value: Position) => {
    setContent((prev) => ({
      ...prev,
      first: {
        ...prev.first,
        position: value,
      },
    }))
  }

  const handleHitHowFieldClick = (value: Field) => {
    setContent((prev) => ({
      ...prev,
      first: {
        ...prev.first,
        field: value,
      },
    }))
  }

  const handlePoorFromPositionClick = (from: Position) => {
    setContent((prev) => ({
      ...prev,
      poorInFirst: {
        ...prev.poorInFirst,
        from,
      },
    }))
  }

  const handlePoorToPositionClick = (to: Position) => {
    setContent((prev) => ({
      ...prev,
      poorInFirst: {
        ...prev.poorInFirst,
        to,
      },
    }))
  }

  const handlePoorAtFieldClick = (field: Field) => {
    setContent((prev) => ({
      ...prev,
      poorInFirst: {
        ...prev.poorInFirst,
        field,
      },
    }))
  }

  const resetColor = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = 'black'
    ctx.strokeStyle = 'black'
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

      <div className="mt-2">
        <div className="mt-2">
          <p>ボールカウント</p>
          {ballCountOptions.map((option) => (
            <button
              key={option.value}
              className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
              onClick={() => handleBallCountClick(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
        <div className="mt-2">
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
        <div className="mt-2">
          <p>安打</p>
          <button
            className="mr-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            onClick={() => handleTotalBasesClick('oneHit')}
          >
            一塁打
          </button>
          <button
            className="mr-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            onClick={() => handleTotalBasesClick('doubleHit')}
          >
            二塁打
          </button>
          <button
            className="mr-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            onClick={() => handleTotalBasesClick('tripleHit')}
          >
            三塁打
          </button>
          <button
            className="mr-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            onClick={() => handleTotalBasesClick('homerun')}
          >
            本塁打
          </button>
          <button
            className="mr-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            onClick={() => handleTotalBasesClick('buntHit')}
          >
            バントヒット
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            onClick={() => handleTotalBasesClick('infieldHit')}
          >
            内野安打
          </button>
        </div>
        <div className="mt-2">
          {Array.from({ length: 9 }, (_, i) => (
            <button
              key={i}
              className="mr-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
              onClick={() =>
                handleHitAtPositionClick((i + 1).toString() as Position)
              }
            >
              {i + 1}
            </button>
          ))}
        </div>
        <div className="mt-2">
          <button
            className="mr-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            onClick={() => handleHitHowFieldClick('front')}
          >
            前
          </button>
          <button
            className="mr-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            onClick={() => handleHitHowFieldClick('over')}
          >
            オーバー
          </button>
          <button
            className="mr-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            onClick={() => handleHitHowFieldClick('fly')}
          >
            オーバー（フライ）
          </button>
          <button
            className="mr-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            onClick={() => handleHitHowFieldClick('leftOfCenter')}
          >
            左中間
          </button>
          <button
            className="mr-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            onClick={() => handleHitHowFieldClick('rightOfCenter')}
          >
            右中間
          </button>
        </div>
        <div className="mt-2">
          <p>一塁凡退</p>
          <span className="mr-2">from</span>
          {Array.from({ length: 9 }, (_, i) => (
            <button
              key={i}
              className="mr-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
              onClick={() =>
                handlePoorFromPositionClick((i + 1).toString() as Position)
              }
            >
              {i + 1}
            </button>
          ))}
          <div className="mt-2">
            <span className="mr-2">to</span>
            {Array.from({ length: 9 }, (_, i) => (
              <button
                key={i}
                className="mr-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                onClick={() =>
                  handlePoorToPositionClick((i + 1).toString() as Position)
                }
              >
                {i + 1}
              </button>
            ))}
          </div>
          <div className="mt-2">
            <button
              className="mr-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
              onClick={() => handlePoorAtFieldClick('fly')}
            >
              フライ
            </button>
            <button
              className="mr-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
              onClick={() => handlePoorAtFieldClick('liner')}
            >
              ライナー
            </button>
          </div>
        </div>
        <div className="mt-2">
          <button
            className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={saveCanvasAsImage}
          >
            保存
          </button>
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
            onClick={() => setContent(initState)}
          >
            リセット
          </button>
        </div>
      </div>
    </>
  )
}
