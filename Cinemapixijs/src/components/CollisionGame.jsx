import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';

const CollisionGame = () => {
  const gameCanvas = useRef(null);

  useEffect(() => {
    // Initialize PixiJS application
    const app = new PIXI.Application({ width: 800, height: 300, backgroundColor: 0x1a202c }); // bg-gray-900
    gameCanvas.current.appendChild(app.view);

    // Load images with verified URLs
    PIXI.Loader.shared
      .add('popcorn', 'data:image/jpeg;base64,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') // Replace with verified popcorn image URL
      .add('cola', 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAsJCQcJCQcJCQkJCwkJCQkJCQsJCwsMCwsLDA0QDBEODQ4MEhkSJRodJR0ZHxwpKRYlNzU2GioyPi0pMBk7IRP/2wBDAQcICAsJCxULCxUsHRkdLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCz/wAARCAC0AH0DASIAAhEBAxEB/8QAHAABAAEFAQEAAAAAAAAAAAAAAAECAwQFBgcI/8QARhAAAgEDAQUEBgQKCAcAAAAAAQIDAAQRBQYSEyExIkFRcRQyYYGRsQdTocEjJDNCUnKTorLRFVSCkpTC0uEWJUNEZHOD/8QAGwEBAAIDAQEAAAAAAAAAAAAAAAMEAQIFBgf/xAAyEQACAQMCBAIIBgMAAAAAAAAAAQIDESEEEjFBUWEFcRMUIoGRscHhMjNCYtHwUqHx/9oADAMBAAIRAxEAPwD1uopSgFR8qmlAKU6UoCailQSe6gBOMUAPU0Ax51TJLHGN52AHz8hQFdWjcRCVIs5ZzjlzwfbWH6Rc3ZKW67qdGc8h/ex9grKgto4OfrSHq7fcKAv0pTr5UBHP3VVUUoCM4PP3UqceNKAUpSgFR5VNOtAPKo6VOPCrU77sTtz5CgMe4vFQiOMb8jHAAyefkKojspZWEl4xPhED/ER8hVWnxJw2nKjiSPICx5ndBwAD4VnUBAVVUKoAUDAAGAB7MUzjqammPGgIqajzqaAUpSgFKUoB0pkCoJxVJZEwZHVQem8wX5mgKhk8+6pq16Rbd0sZ/VOflVQkjPQ58gaArrHvOUEnuH21f3l9vwNY90GkiKoMklfZy99ATZDdtoB4qx+LE1kVYiZEiiRmAKoob2HHOq+NAOrrQFylW+Pb/WJ8akSwHpLGf7a/zoCulKdKAZFU5J6CmCeZ6VVQChqM4qaAgLzrmJpUkurmVrhAjSvw2kZFJQHAxvHp4V07AMCpGQwIIPQg8iDXBbXxWehLpt1Y2Vvv3M80MvFMzIMIHXdUOAOhrWUlFXZNRoyrTVOHFm8jmtR/3UX7RD8q2EVxa8vxhD7z9wrh9P1e6mso7jg2qyFpAQsbbo3TgYDMfnVm52n1yDIia0UD/wAWMn97NQvUQSudGPhGolJxVr+Z6N6RaY/LL+9/KqGnsT/1l/f/AJV5lJtdtUh3Xmt1O6rYNnb+qwDKRy6EcxVptsNpv6xb/wCDtv8ATWvrUO5YXgOqaunH4v8Ag9LeTTueZ4x5lx91Y0r6Wc/jMP7Rh8xXm7bW7SHrPbHztLf7lrd6BqNxq0GpteGNprV1ZeHGsYMbRMwyq8uoNbQ1EZvaivqfCNRpqbqztZdH9jfT/wBGnP45D/iEHzNayaK1bIS+T3XETfZmuHk2h1Rxlo7M5AP5Fh/C9YMms3LBt+3tOhPISj4do0WogzFTwjU0+KXxPYNmnaN7y3edpAyRyQqSCvZJDlcHGea5rpN2ue2X0vTodJ0K/W1jS8n020nlky5bfmhDtjeJA6+FdFVg5TVnYUwKUoYFOlKUAri/pGjB0fT5O+PVIx7nt5h/Ku0rlNvo9/Z2Zvqbyyk+MnD/AM1RVVeDL3h8tuqpvujjdFOdNI/RmlHyNYV/kb5AyQCQPbWXoRzYXA/Rnb7VFY1/yLHoBk1zX+BHt6eK8vM2E+lrJpl3DE8txPpXoN3ZStEqtc6fqDFdyERs28gbtJ3gsy4zWt0rS7fU11HjXq2ZgFotvNOB6M087yKIpm6gnHZPsPkdxFBBaaPosOt3DpbaolxLZtAGF5pau4cOMZ3oX7LOp6HBAJGUu+jalpkjzTwQajb38PBlmh7dlrdse0FkYZ3LkdUP53TJbnJJsTadimtTOEJQUst4fWzza+OTv0v0yc/e6DqVkWiuInS6QSOIyA0VzCgLGS0lXkxA5spAbHMAjIXJ2RuBHqktsT2b+2eMeBePtr9haup0MTMYm0XUor3SCSRZamHN3pspU8MKy5bdzgd3LOCTzriLeUafq9tdTCJZIb8O0cXONMzFJFQ8xgcwOfSm1U5RmjCrz1dKrp58beWc8uVmu/maWVGQlCCCpI5+w4rDmPZf9VvlW31hWj1LVImP5K8uowO4KJGxitRKC3ZHVyFHmxxUcVZ2LtWe6mpdUfRumxcDTtMh+psbSLHhuRKtZdQoCgKOigL8BipxXXPnbd3cUpTnQwKUpQCue2yTf2Z1od6pbSfs7iN66GtTtJHxdn9oEx0026f3xoZPurSavFk+mltrQl0a+Z5ns+fxW+XwlU/Fasan6k/6j/KrmzxzHqC+2JviGFRqK5DjpkEZ865X6Ee/jjUsytpkv7jUbm44J9Et7e1jgVJI3a3tRCjqZYkYuoOSTlR1q3s/qGrWCX89teLFZWvo73ME0MtzE7Tuyq3DjIKgEdpgw6jrmszUCtzbWOuoZo4pWw91aANNpmoDlLBKhI3oXbLp2hguRzD7rYNlc3NtqN5qekvbQ21stuLprtTDauLghWi4S77hXYMVHcAOYxUjxPcmVYPfpfQyisK3a6aVueX8824N72aTZO1uob+7s7mymnhVrh7DjSWM5uYt94JEG64JBzho1Pf3ZrgLoo8twYi5jLuITJjf4YJCb2OWcYzXdR22y9xdeny3b6el8JRf2dzMs9jehub8C7yVJBIYdreU4O6tcLcLEk06RScSJJZEikxjiRqxCvj2jBrFa+OBnw3anLMr2XHhzwv+sr1h+Leyz/1qK1uvfNbxu325rCsY+PqWkwdeNqFjFjx350Wr92d6LT38LYwnzhldR9m7V3Z2PjbSbNJjP/NbOT3RPxfupDMhqXsoNdFb4YPoLx99KZpXVPBD50zSlAQc9R7/AG1PKlDQCsPVU4ul6xH9Zp97H/ehcVmVTIgkjkjPR0dD/aUisM2i7NM8Y2bbPpo8YYW+01e1D8731Y2cR1lusjA9GUDPfhh0rI1Dq1cm3sH0NtesO3YbP6nd2V4baG1a9ttQDQ3Vgd1hcKFYkoH7O+ADjPXp4Y30OjpG82qbMGC/sZ0a31DR707rbjHLQMZeYIPqhuYx1YHB5fRofSNX0yEtcIGmdme0cpcII4pJd6EjJ3hjIABz0wc4O1Gl31m8usaZqss9nLvOupWAYvbuW3iuo2qgvu/p4Bx1K/m1vSbccq/0K2uhFVXtltbSve9pcePfGLZ6X5W5LIvqsFpZ6RqltY6i0UOo2F1A4jtiDumeKfJXseujZGMEdGxXMXcD2txdWzkM9tPNAzAYDGNyhIHtxXVXO1211s0ljPHbLeIwi31tgZt9sbpjCtwyTkFSF55HjXJ3AkWWZZW3pRK4lYtvEybx3iW7+ec1pU28ixo1WX5lrWxZ3v3v/X1KZRmxif6u8nj9zxROPka2GxUfF2s0AdySXUp9nDtZW/lWGql9J1I/U6hYN5CSKdD91bj6O4+JtRA31FhfS+WQkX+apKS9pFLXztRqLpf/AHn6ntXKlKCumeIFKVGRQE0qaigFQDzGPGo5mqgAKA8Z0veTVtQhPIRm8iA8OHNu1e1EetVKLwtqtaj7vTtVA8jMzCq9SwA5J5AEn3VyXwfmfQoO9SL6pGssIbu4vrOKzfh3RlMkEg3sxtCjTbyhAWJAU4AByeXfXYQNBd30MltqEGm7RTQxTCazYSaXrCON4GSLkQ5wd5SAfPqOWj07XYZ7CWK2mimknU2ku/EqpMicftvvbqkKN4hsHA6Vv59L0bWLe3v3u7bSdTuJpElkhkjl0y6uU3W4kckbbqu2QwG+p68jjJ2pJpcCHXypzkm5YatdWee65rHfh71mS27Xm2ts80tpMLfSlu7f0UKVRx+CjD4LZZWYspz03fCvO7mKSCaeCUqZIZHikKMrqXQlThl5Guwla00rW7kWd3FcXE+zl6lzNbbgjOoi3aRnUISoLbgYgHq3t5cU3QY8BWtVr33Zv4fCSzf2dsUsW6/3ubC0j39E2mP6L2Dj+w/+9bv6MI97XdTl+r0lk98lxEf8ta/TI87PbRNj8pxgP/lEjVvPoqjzc7SzEepDp0QP67TufkKsUlmPkcjXVLwrr9y+SR6lSlU8zyFXjy4yTyFTuipAAFOdAKdfKmM0oBTupTuoDyS/Tg7aaqv6V1K/7WBZPvqjUlBDqehBB8jyrJ2hHD23mbpxDZt/etVj+6rOoj1q5c1mS7nvaDvGjL9qL102pSWdjtDp0shSGW3bVYFJZLfUrWMQ+kPEOW7IuMnHRufJuzlRW9rrkcEmg3VpYXUcbJc6JdIotJeIQ0hUKO2rYGcq3QerujGj0fWrvRbt5ogJbeYCO7tnOEmjGfHIDDJwcd+Ohrfy7P7O7Qq15s9eJa3B7ctlKvZRj1/BKd9fNd5fCtoPesfD+CHUQ9A0qnsrlK11bpJduT+5otX05Nn9bslBXgt6NdcMMzcKKVjFLES3aIHaCkjJBGedc/cwtbz3Fu3rQTSwnzjYp91dbFsTrj3Sm/ltEtUdXuplneRzEhy2N5BjkOpIx7sVzeqyJfarqMlqAVvL+b0cD87iykJjz5Gopwazaxd0uohNqMZ72ll/L6m8tIuFs1LkYM1pf3B9okV8fYBW4+ipCLXaGXHJ7uzjz+pEzY/erE1YR2mkXsSY3ILBoE8goiFbb6Lo8aFqMnfJrE/wS3gUffV+MbSiux5CrV9JRqz/AMpHedfKppSrByhSlKAUpSgHnSlUk4BPdQHLa7s/ZXmqW2pvJNFKqwoHjKsjtFvdl0YeB6gj7K193szc3QPAvbbn3TI6/ahPyrpLy8idoYSQPwhILYA5KRjJrIijGFJXr4iopUovii/S19ekkoy4cDzuTYbaQZKSaZID4XEqn96L76xv+DdrI3VkjtFdTlXS8CsD4ghQa9V4UeOgq1JEnt+JqH1WBfXjuqtZ2fu+55ncbP7dTxmG5u+JFyzHNqUkiHHipBFW9N2avrK+iur57bcgV3jSKRnYykbqk5UDA5nr1Ar0CeJefM/E1qLqJDkfZWy08U7kU/F684Omkkn0RzutLFc21xbmUxo4QuygM26jByAPbiuz2N0ttJ0K2gdHR5pri7KyMrPuzNlC25yyQByrkryFCsqgDJVlHvGK7+yvUkjiQDG7GigeGFAqe2bnKc5bdl8GwpSlbEYpmo+VTQClQSAQD39KmgIoQCMGpqaA182nQy5yAQeoIzWMNJ4ZzDLNF/6pZEHwU4rcUoDU+h6mvqX90P1mR/41NPR9W6G9kPnHb/6K22c9KUBpHsNQk9a7lxjuWEfJKtnRGk/KTTv5uR/Dit/U0Bo4tCtYyCEXe/SPM/E862MFnFCcjrWVUEgde+gJqKmlAKY9tTSgIwKf70pQCppSgFRSlAKUpQCppSgFRilKAeNKUoCaUpQH/9k=') // Replace with verified cola image URL
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
