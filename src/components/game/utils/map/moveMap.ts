const moveMap = (leftCoeff: number, topCoeff: number, origin?: string) => {

    let gameBoard: HTMLElement | null = document.querySelector(`.container_board_game`);
    let gameMap: HTMLElement | null = document.querySelector(`.container_map_game`);
    let mapSquare: HTMLElement | null = document.querySelector(`.mapSquare`);

    if (gameBoard && gameMap && mapSquare) {
        let leftPos = ((8 - leftCoeff) * mapSquare.offsetWidth);
        let topPos = ((4 - topCoeff) * mapSquare.offsetHeight);

        if (origin && origin !== "load") {
            preMoveMap(gameBoard, leftPos, topPos, mapSquare.offsetHeight, mapSquare.offsetWidth, origin);
        };
        if (origin === "load") {
            gameBoard.style.transition = "none";
        } else {
            gameBoard.style.transition = "left 0.3s linear 0s, top 0.3s linear 0s";
        }
        gameBoard.style.left = `calc(50% + ${leftPos}px)`;
        gameBoard.style.top = `calc(50% + ${topPos}px)`;
    }

};

const preMoveMap = (gameBoard: HTMLElement, leftPos: number, topPos: number, squareH: number, squareW: number, origin: string) => {
    gameBoard.style.transition = "none";
    if (origin === "down") {
        gameBoard.style.left = `calc(50% + ${leftPos}px)`;
        gameBoard.style.top = `calc(50% + ${topPos + squareH}px`;
    }
    if (origin === "up") {
        gameBoard.style.left = `calc(50% + ${leftPos}px)`;
        gameBoard.style.top = `calc(50% + ${topPos - squareH}px`;
    }
    if (origin === "left") {
        gameBoard.style.left = `calc(50% + ${leftPos - squareW}px`;
        gameBoard.style.top = `calc(50% + ${topPos}px)`;
    }
    if (origin === "right") {
        gameBoard.style.left = `calc(50% + ${leftPos + squareW}px`;
        gameBoard.style.top = `calc(50% + ${topPos}px)`;
    }
    // eslint-disable-next-line
    let updateTop = gameBoard.offsetTop;
    // eslint-disable-next-line
    let updateLeft = gameBoard.offsetLeft;
};

export default moveMap;