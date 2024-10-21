'use client';

import { useRef, useEffect, useState } from 'react';

type SpaceText = {
  space1: boolean;
  space2: boolean;
  space3: boolean;
  space4: boolean;
  center: boolean;
  xLabel: boolean;
  xLabelCount: number;
  inputTexts: string[];
};

const ScoreBookQuiz = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [spaceText, setSpaceText] = useState<SpaceText>({
    space1: false,
    space2: false,
    space3: false,
    space4: false,
    center: false,
    xLabel: false,
    xLabelCount: 0,
    inputTexts: []
  });

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

  const toggleText = (space: keyof Omit<SpaceText, 'xLabelCount' | 'inputTexts'>) => {
    setSpaceText((prev) => {
      const newSpaceText: SpaceText = { ...prev };
      if (space === 'xLabel') {
        newSpaceText.xLabel = true;
        const inputElement = document.getElementById('inputText') as HTMLInputElement;
        const inputText = inputElement?.value || 'X';
        newSpaceText.inputTexts.push(inputText);
        newSpaceText.xLabelCount++;
      } else {
        newSpaceText[space] = !newSpaceText[space];
      }
      return newSpaceText;
    });
  };

  const resetText = () => {
    setSpaceText({
      space1: false,
      space2: false,
      space3: false,
      space4: false,
      center: false,
      xLabel: false,
      xLabelCount: 0,
      inputTexts: []
    });
  };

  const saveCanvasImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'scoreCanvas.png';
    link.click();
  };

  return (
    <div>
      <h1>野球スコアブッククイズ</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <canvas ref={canvasRef} width={190} height={160} style={{ border: '1px solid black' }}></canvas>
      </div>
      <br />
      <button className="toggle-button bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={() => toggleText('space1')}>スペース1 トグル</button>
      <button className="toggle-button bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={() => toggleText('space2')}>スペース2 トグル</button>
      <button className="toggle-button bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={() => toggleText('space3')}>スペース3 トグル</button>
      <button className="toggle-button bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={() => toggleText('space4')}>スペース4 トグル</button>
      <button className="toggle-button bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={() => toggleText('center')}>中央スペース トグル</button>
      <input type="text" id="inputText" placeholder="文字を入力" style={{ marginTop: '10px' }} />
      <button className="toggle-button bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={() => toggleText('xLabel')}>追加 トグル</button>
      <button className="toggle-button bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600" onClick={saveCanvasImage}>画像保存</button>
      <button className="toggle-button bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600" onClick={resetText}>リセット</button>
    </div>
  );
};

export default ScoreBookQuiz;
