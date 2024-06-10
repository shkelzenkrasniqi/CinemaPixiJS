import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';

const PixiTextAnimation = ({ texts, duration }) => {
  const pixiContainer = useRef(null);

  useEffect(() => {
    const app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      transparent: true,
    });

    pixiContainer.current.appendChild(app.view);

    const textStyle = new PIXI.TextStyle({
      fill: '#ffffff',
      fontSize: 48,
      fontWeight: 'bold',
      dropShadow: true,
      dropShadowColor: '#000000',
      dropShadowBlur: 4,
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 6,
    });

    let currentTextIndex = 0;
    let text = new PIXI.Text(texts[currentTextIndex], textStyle);
    text.anchor.set(0.5);
    text.x = app.renderer.width / 2;
    text.y = app.renderer.height / 2;

    app.stage.addChild(text);

    const animateText = () => {
      text.scale.x += 0.01;
      text.scale.y += 0.01;
      text.alpha -= 0.01;

      if (text.alpha <= 0) {
        currentTextIndex = (currentTextIndex + 1) % texts.length;
        text.text = texts[currentTextIndex];
        text.scale.set(1);
        text.alpha = 1;
      }
    };

    app.ticker.add(animateText);

    return () => {
      app.destroy(true, true);
    };
  }, [texts, duration]);

  return <div ref={pixiContainer} className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none" />;
};

export default PixiTextAnimation;
