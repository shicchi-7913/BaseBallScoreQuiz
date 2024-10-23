'use client'

import { useRef, useState, useEffect } from 'react'

const CanvasComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [content, setContent] = useState({
    A: [] as string[],
    B: { text: '', drawShape: null as 'circle' | 'rectangle' | null },
    C: { text: '', drawShape: null as 'circle' | 'rectangle' | null },
    D: { text: '', drawShape: null as 'circle' | 'rectangle' | null },
  })

  const handleButtonClick = (
    section: 'A' | 'B' | 'C' | 'D',
    action: 'text' | 'shape',
    value?: string | 'circle' | 'rectangle'
  ) => {
    setContent((prev) => {
      if (section === 'A') {
        return {
          ...prev,
          A: [...prev.A, value as string],
        }
      } else {
        return {
          ...prev,
          [section]: {
            text: action === 'text' ? (value as string) : '',
            drawShape:
              action === 'shape' ? (value as 'circle' | 'rectangle') : null,
          },
        }
      }
    })
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Draw sections
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 2
        ctx.strokeRect(0, 0, canvas.width / 2, canvas.height / 2) // Section A
        ctx.strokeRect(canvas.width / 2, 0, canvas.width / 2, canvas.height / 2) // Section B
        ctx.strokeRect(
          0,
          canvas.height / 2,
          canvas.width / 2,
          canvas.height / 2
        ) // Section C
        ctx.strokeRect(
          canvas.width / 2,
          canvas.height / 2,
          canvas.width / 2,
          canvas.height / 2
        ) // Section D

        // Draw content
        ctx.fillStyle = 'black'
        ctx.font = '20px Arial'
        content.A.forEach((text, index) => {
          ctx.fillText(text, 20, 50 + index * 30)
        })

        // Draw shapes or text for sections B, C, D
        ;['B', 'C', 'D'].forEach((section) => {
          const secContent = content[section as 'B' | 'C' | 'D']
          const xOffset =
            section === 'B' || section === 'D' ? canvas.width / 2 : 0
          const yOffset =
            section === 'C' || section === 'D' ? canvas.height / 2 : 0

          if (secContent.text) {
            ctx.fillText(secContent.text, xOffset + 20, yOffset + 50)
          } else if (secContent.drawShape === 'circle') {
            ctx.beginPath()
            ctx.arc(
              xOffset + canvas.width / 4,
              yOffset + canvas.height / 4,
              30,
              0,
              2 * Math.PI
            )
            ctx.stroke()
          } else if (secContent.drawShape === 'rectangle') {
            ctx.strokeRect(
              xOffset + canvas.width / 4 - 30,
              yOffset + canvas.height / 4 - 20,
              60,
              40
            )
          }
        })
      }
    }
  }, [content])

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="border-2 border-black mb-4"
      ></canvas>

      <div className="mb-4 space-x-2">
        {/* Buttons for Section A */}
        <button
          onClick={() => handleButtonClick('A', 'text', 'A-1')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          A-1
        </button>
        <button
          onClick={() => handleButtonClick('A', 'text', 'A-2')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          A-2
        </button>

        {/* Buttons for Section B */}
        <button
          onClick={() => handleButtonClick('B', 'text', 'B-1')}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
        >
          B-1
        </button>
        <button
          onClick={() => handleButtonClick('B', 'text', 'B-2')}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
        >
          B-2
        </button>
        <button
          onClick={() => handleButtonClick('B', 'shape', 'circle')}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
        >
          Draw Circle in B
        </button>
        <button
          onClick={() => handleButtonClick('B', 'shape', 'rectangle')}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
        >
          Draw Rectangle in B
        </button>

        {/* Buttons for Section C */}
        <button
          onClick={() => handleButtonClick('C', 'text', 'C-1')}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
        >
          C-1
        </button>
        <button
          onClick={() => handleButtonClick('C', 'text', 'C-2')}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
        >
          C-2
        </button>
        <button
          onClick={() => handleButtonClick('C', 'shape', 'circle')}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
        >
          Draw Circle in C
        </button>
        <button
          onClick={() => handleButtonClick('C', 'shape', 'rectangle')}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
        >
          Draw Rectangle in C
        </button>

        {/* Buttons for Section D */}
        <button
          onClick={() => handleButtonClick('D', 'text', 'D-1')}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
        >
          D-1
        </button>
        <button
          onClick={() => handleButtonClick('D', 'text', 'D-2')}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
        >
          D-2
        </button>
        <button
          onClick={() => handleButtonClick('D', 'shape', 'circle')}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
        >
          Draw Circle in D
        </button>
        <button
          onClick={() => handleButtonClick('D', 'shape', 'rectangle')}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
        >
          Draw Rectangle in D
        </button>
      </div>
    </div>
  )
}

export default CanvasComponent
