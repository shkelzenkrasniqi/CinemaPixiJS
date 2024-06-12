import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';

const CollisionGame = () => {
  const gameCanvas = useRef(null);

  useEffect(() => {
    // Initialize PixiJS application
    const app = new PIXI.Application({ width: 1920, height: 500, backgroundColor: 0x1a202c }); // bg-gray-900
    gameCanvas.current.appendChild(app.view);

    // Load images with verified URLs
    PIXI.Loader.shared
      .add('popcorn', 'coke.png') // Replace with verified popcorn image URL
      .add('cola', 'popcorn.png') // Replace with verified cola image URL
      .load(setup)
      .onError.add((error) => {
        console.error('Error loading assets:', error);
      });

    function setup(loader, resources) {
      if (!resources.popcorn || !resources.cola) {
        console.error('Failed to load images. Please check the image URLs.');
        return;
      }

      // Create popcorn sprite
      const popcorn = new PIXI.Sprite(resources.popcorn.texture);
      popcorn.x = 50;
      popcorn.y = app.view.height / 2 - popcorn.height / 2;
      popcorn.interactive = true;
      popcorn.buttonMode = true;
      popcorn.priceText = createPriceText('$2.50', popcorn);
      popcorn
        .on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove', onDragMove);

      // Create cola sprite
      const cola = new PIXI.Sprite(resources.cola.texture);
      cola.x = app.view.width - cola.width - 50;
      cola.y = app.view.height / 2 - cola.height / 2;
      cola.interactive = true;
      cola.buttonMode = true;
      cola.priceText = createPriceText('$1.99', cola);
      cola
        .on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove', onDragMove);

      app.stage.addChild(popcorn);
      app.stage.addChild(cola);
      app.stage.addChild(popcorn.priceText);
      app.stage.addChild(cola.priceText);

      // Collision detection
      app.ticker.add(() => {
        if (checkCollision(popcorn, cola)) {
          app.stage.removeChild(popcorn.priceText);
          app.stage.removeChild(cola.priceText);
          showComboMessage();
        }
      });

      // Create price text
      function createPriceText(price, sprite) {
        const priceText = new PIXI.Text(price, {
          fontSize: 24,
          fill: 0xffffff,
        });
        priceText.x = sprite.x + sprite.width / 2 - priceText.width / 2;
        priceText.y = sprite.y + sprite.height + 10;
        return priceText;
      }

      // Drag and Drop handlers
      function onDragStart(event) {
        this.data = event.data;
        this.alpha = 0.5;
        this.dragging = true;
      }

      function onDragEnd() {
        this.alpha = 1;
        this.dragging = false;
        this.data = null;
      }

      function onDragMove() {
        if (this.dragging) {
          const newPosition = this.data.getLocalPosition(this.parent);
          this.x = newPosition.x - this.width / 2;
          this.y = newPosition.y - this.height / 2;
          this.priceText.x = this.x + this.width / 2 - this.priceText.width / 2;
          this.priceText.y = this.y + this.height + 10;
        }
      }

      // Collision detection function
      function checkCollision(spriteA, spriteB) {
        const boundsA = spriteA.getBounds();
        const boundsB = spriteB.getBounds();

        return (
          boundsA.x + boundsA.width > boundsB.x &&
          boundsA.x < boundsB.x + boundsB.width &&
          boundsA.y + boundsA.height > boundsB.y &&
          boundsA.y < boundsB.y + boundsB.height
        );
      }

      // Show combo message
      function showComboMessage() {
        const comboMessage = new PIXI.Text('Perfect Combo! Only $3.99!', {
          fontSize: 36,
          fill: 0xff0000,
          align: 'center',
        });
        comboMessage.x = app.view.width / 2;
        comboMessage.y = app.view.height / 2;
        comboMessage.anchor.set(0.5);

        app.stage.addChild(comboMessage);

        // Remove the message after 2 seconds
        setTimeout(() => {
          app.stage.removeChild(comboMessage);
        }, 2000);
      }
    }

    // Cleanup PixiJS application on component unmount
    return () => {
      app.destroy(true, true);
    };
  }, []);

  return (
    <div style={{ backgroundColor: '#1a202c', padding: '20px', borderRadius: '8px' }}>
     <h1 style={{ color: 'white', textAlign: 'center', fontSize: '36px', fontWeight: 'bold' }}>Match these two for a surprise</h1>
      <div ref={gameCanvas}></div>
    </div>
  );
};

export default CollisionGame;
