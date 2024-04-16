// import './style.css';

// knightMoves([0,0],[3,3]) == [[0,0],[2,1],[3,3]]
// queue = [ [[1, 2], [[0, 0]], ]

function knightMoves(start, end) {
    let queue = [];

    queue.push(start);
    while (queue.length !== 0) {
        let pMoves = typeof queue[0][1] === 'object' ? possibleMoves(queue[0][0]).join(' ') : possibleMoves(queue[0]).join(' ');

        if (queue[0][0] === end) {
            break;
        } else if (pMoves.includes(end.toString())) {
            if (typeof queue[0][1] === 'object') {
                queue[0][1].push(queue[0][0]);
                queue[0][1].push(end);

                console.log(`You made it in ${queue[0][1].length - 1} moves! Here's your path:`);
                for (let move of queue[0][1]) console.log(move);
            } else {
                console.log(`You made it in 1 move! Here's your path:`);
                console.log(start);
                console.log(end);
            }            
            return;
        }

        let moves = typeof queue[0][1] === 'object' ? possibleMoves(queue[0][0]) : possibleMoves(queue[0]);
        for (let move of moves) {
            if (typeof queue[0][1] === 'object') {
                let p = queue[0][1].slice();

                if (!p.join(' ').includes(queue[0][0].toString())) {
                    p.push(queue[0][0]);
                }

                queue.push([move, p]);
            } else {
                let p = queue[0];
                queue.push([move, [p]]);
            }
        }

        queue.shift();
    }
}

function possibleMoves(pos) {
    moves = [];

    addMove([pos[0] + 1, pos[1] + 2]);
    addMove([pos[0] - 1, pos[1] + 2]);

    addMove([pos[0] + 2, pos[1] + 1]);
    addMove([pos[0] + 2, pos[1] - 1]);

    addMove([pos[0] + 1, pos[1] - 2]);
    addMove([pos[0] - 1, pos[1] - 2]);

    addMove([pos[0] - 2, pos[1] + 1]);
    addMove([pos[0] - 2, pos[1] - 1]);

    function addMove(move) {
        if (validMove(move)) moves.push(move);
    }

    return moves;
}

function validMove([x, y]) {
    if (x < 0 || x > 7 || y < 0 || y > 7) return false;
    return true;
}

// console.log(possibleMoves([1, 2]));
knightMoves([3, 3], [3, 4]);
