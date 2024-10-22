import { useRef, useEffect } from 'react';

import { SpaceText } from '@/types/SpaceText';

export const Cell = ({ spaceText }: { spaceText: SpaceText }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    drawText();
  }, [spaceText]);

  const drawText = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // 背景を白で塗りつぶす
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 再描画 - 枠線とサイド部分、十字線、ひし形
    ctx.setLineDash([]); // 点線設定を解除
    ctx.beginPath();
    ctx.rect(0, 0, 190, 160);
    ctx.stroke();

    // 縦線の描画
    ctx.beginPath();
    ctx.moveTo(30, 0);
    ctx.lineTo(30, 160);
    ctx.stroke();

    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(30, 80);
    ctx.lineTo(70, 80);
    ctx.moveTo(150, 80);
    ctx.lineTo(190, 80);
    ctx.moveTo(160, 80);
    ctx.lineTo(190, 80);
    ctx.moveTo(110, 0);
    ctx.lineTo(110, 40);
    ctx.moveTo(110, 120);
    ctx.lineTo(110, 160);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(110, 40);
    ctx.lineTo(150, 80);
    ctx.lineTo(110, 120);
    ctx.lineTo(70, 80);
    ctx.closePath();
    ctx.stroke();

    ctx.setLineDash([]);
    ctx.font = '12px Arial';
    ctx.fillStyle = 'black';

    if (spaceText.xLabel) {
      for (let i = 0; i < spaceText.xLabelCount; i++) {
        const yOffset = 40 + i * 20;
        const inputText = spaceText.inputTexts[i] || 'X';
        ctx.fillText(inputText, 30, yOffset);
      }
    }

    if (spaceText.space1) ctx.fillText('スペース1', 60, 50);
    if (spaceText.space2) ctx.fillText('スペース2', 150, 50);
    if (spaceText.space3) ctx.fillText('スペース3', 60, 150);
    if (spaceText.space4) ctx.fillText('スペース4', 150, 150);
    if (spaceText.center) ctx.fillText('中央スペース', 100, 105);
  };

  return (
    <canvas ref={canvasRef} width={190} height={160} style={{ border: '1px solid black' }}></canvas>
  );
};