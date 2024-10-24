'use client'

import { useRef, useState, useEffect } from 'react'

const CanvasComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [content, setContent] = useState({
    A: [] as Array<{ type: 'text' | 'custom'; value: string }>,
    B: {
      text: '',
      drawShape: null as 'circle' | 'rectangle' | null,
      custom: false,
    },
    C: {
      text: '',
      drawShape: null as 'circle' | 'rectangle' | null,
      custom: false,
    },
    D: {
      text: '',
      drawShape: null as 'circle' | 'rectangle' | null,
      custom: false,
    },
  })

  const handleButtonClick = (
    section: 'A' | 'B' | 'C' | 'D',
    action: 'text' | 'shape' | 'custom',
    value?: string | 'circle' | 'rectangle'
  ) => {
    setContent((prev) => {
      if (section === 'A') {
        if (action === 'custom') {
          return {
            ...prev,
            A: [...prev.A, { type: 'custom', value: '' }],
          }
        } else {
          return {
            ...prev,
            A: [...prev.A, { type: 'text', value: value as string }],
          }
        }
      } else if (section === 'D' && action === 'custom') {
        return {
          ...prev,
          D: {
            text: '',
            drawShape: null,
            custom: true,
          },
        }
      } else {
        return {
          ...prev,
          [section]: {
            text: action === 'text' ? (value as string) : prev[section].text,
            drawShape:
              action === 'shape'
                ? (value as 'circle' | 'rectangle')
                : prev[section].drawShape,
            custom: false,
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

        // Draw content for Section A
        content.A.forEach((item, index) => {
          if (item.type === 'text') {
            ctx.fillStyle = 'black'
            ctx.font = '20px Arial'
            ctx.fillText(item.value, 20, 50 + index * 30)
          } else if (item.type === 'custom') {
            ctx.beginPath()
            ctx.moveTo(20, 20 + index * 30)
            ctx.lineTo(30, 30 + index * 30)
            ctx.moveTo(30, 20 + index * 30)
            ctx.lineTo(20, 30 + index * 30)
            ctx.stroke()
          }
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
          }

          if (secContent.drawShape === 'circle') {
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
          } else if (secContent.custom) {
            // Draw custom content for D-3
            ctx.beginPath()
            ctx.moveTo(xOffset + 20, yOffset + 20)
            ctx.lineTo(xOffset + 30, yOffset + 30)
            ctx.moveTo(xOffset + 30, yOffset + 20)
            ctx.lineTo(xOffset + 20, yOffset + 30)
            ctx.stroke()
          }
        })
      }
    }
  }, [content])

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <div style={{ marginBottom: '20px' }}>
        {/* Buttons for Section A */}
        <button onClick={() => handleButtonClick('A', 'text', 'A-1')}>
          A-1
        </button>
        <button onClick={() => handleButtonClick('A', 'text', 'A-2')}>
          A-2
        </button>
        <button onClick={() => handleButtonClick('A', 'custom')}>
          A-3 Custom
        </button>

        {/* Buttons for Section B */}
        <button onClick={() => handleButtonClick('B', 'text', 'B-1')}>
          B-1
        </button>
        <button onClick={() => handleButtonClick('B', 'text', 'B-2')}>
          B-2
        </button>
        <button onClick={() => handleButtonClick('B', 'shape', 'circle')}>
          Draw Circle in B
        </button>
        <button onClick={() => handleButtonClick('B', 'shape', 'rectangle')}>
          Draw Rectangle in B
        </button>

        {/* Buttons for Section C */}
        <button onClick={() => handleButtonClick('C', 'text', 'C-1')}>
          C-1
        </button>
        <button onClick={() => handleButtonClick('C', 'text', 'C-2')}>
          C-2
        </button>
        <button onClick={() => handleButtonClick('C', 'shape', 'circle')}>
          Draw Circle in C
        </button>
        <button onClick={() => handleButtonClick('C', 'shape', 'rectangle')}>
          Draw Rectangle in C
        </button>

        {/* Buttons for Section D */}
        <button onClick={() => handleButtonClick('D', 'text', 'D-1')}>
          D-1
        </button>
        <button onClick={() => handleButtonClick('D', 'text', 'D-2')}>
          D-2
        </button>
        <button onClick={() => handleButtonClick('D', 'shape', 'circle')}>
          Draw Circle in D
        </button>
        <button onClick={() => handleButtonClick('D', 'shape', 'rectangle')}>
          Draw Rectangle in D
        </button>
        <button onClick={() => handleButtonClick('D', 'custom')}>
          D-3 Custom
        </button>
      </div>

      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        style={{ border: '2px solid black' }}
      ></canvas>
    </div>
  )
}

export default CanvasComponent
