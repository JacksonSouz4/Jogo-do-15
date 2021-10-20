function pcMove(){
    board[posEmpty] = board[posEmpty + choices[choicedMove]]
    board[posEmpty + choices[choicedMove]] = ''
}


function playerMove(number){
    board[posEmpty] = number
    board[posNumber] = ''
    game.innerHTML = ''
    for(let c = 0; c <= 15; c++){
        game.innerHTML += `<div onclick="doMove(${board[c]})">${board[c]}</div>`
    }
    moves++
    checkIfWin()
}


function doMove(number=0){
    if(number != 0){
        posEmpty = board.indexOf('')
        posNumber = board.indexOf(number)
        diference = posEmpty - posNumber
        if(Math.abs(diference) == 1 || Math.abs(diference) == 4){
            if(posEmpty == 0 || posEmpty == 4 || posEmpty == 8 || posEmpty == 12){
                if(diference != 1){
                    playerMove(number)
                }
            }else if(posEmpty == 3 || posEmpty == 7 || posEmpty == 11 || posEmpty == 15){
                if(diference != -1){
                    playerMove(number)
                }
            }else{
                playerMove(number)
            }
        }
    }
}


function checkIfWin(){
    equals = 0
    for(let c = 0; c <= 15; c++){
        if(winnerSequence[c] == board[c]){
            equals++
        }
    }
    if(equals == 16){
        game.innerHTML = ''
        for(let c = 0; c <= 15; c++){
            game.innerHTML += `<div>${board[c]}</div>`
        }
        body.innerHTML += `<p>Parabéns! Você venceu em ${moves} lances.<p>`
        body.innerHTML += `<button onclick="window.location.reload()">Jogar Novamente</button>`
    }
}


var game = document.getElementById('game')
var body = document.querySelector('body')
var board = []
var moves = 0
for(let c = 1; c <= 15; c++){
    board.push(c)
}
board.push('')
var winnerSequence = board.slice()
for(let c = 0; c <= 10000; c++){
    choices = [1, -1, 4, -4]
    posEmpty = board.indexOf('')
    while(true){
        choicedMove = Math.ceil(Math.random() * choices.length) - 1
        if(choices[choicedMove] + posEmpty >= 0 && choices[choicedMove]+ posEmpty <= 15){
            if(posEmpty == 3 || posEmpty == 7 || posEmpty == 11 || posEmpty == 15){
                if(choices[choicedMove] == 1){
                    choices.splice(choicedMove, 1)
                }else{
                    pcMove()
                    break
                }
            }else if(posEmpty == 0 || posEmpty == 4 || posEmpty == 8 || posEmpty == 12){
                if(choices[choicedMove] == -1){
                    choices.splice(choicedMove, 1)
                }else{
                    pcMove()
                    break
                }
            }else{
                pcMove()
                break
            }
        }else{
            choices.splice(choicedMove, 1)
        }
    }
}
while(board[0] != ''){
    posEmpty = board.indexOf('')
    if(posEmpty >= 4){
        board[posEmpty] = board[posEmpty - 4]
        board[posEmpty - 4] = ''
    }else{
        board[posEmpty] = board[posEmpty - 1]
        board[posEmpty - 1] = ''
    }
}
for(let c = 0; c <= 15; c++){
    game.innerHTML += `<div onclick="doMove(${board[c]})">${board[c]}</div>`
}
