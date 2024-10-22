'use client';

import { useRef, useState } from 'react';

import { SpaceText } from '@/types/SpaceText';
import { ScoreBookBase } from '@/components/ScoreBook/base';

const Page = () => {
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

  const toggleText = (space: keyof Omit<SpaceText, 'xLabelCount' | 'inputTexts'>) => {
    setSpaceText((prev) => {
      const newSpaceText: SpaceText = { ...prev };
      if (space === 'xLabel') {
        newSpaceText.xLabel = true;
        newSpaceText.inputTexts.push('X');
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
        <ScoreBookBase spaceText={spaceText} />
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

export default Page;
