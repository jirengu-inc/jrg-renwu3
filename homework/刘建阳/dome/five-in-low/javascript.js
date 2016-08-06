/**
 * Created by liujianyang on 2016/4/2.
 */
var chess = document.getElementById("chess");
var context = chess.getContext("2d");

/*Window.onload(){
    context.clearRect(0, 0, 450, 450);
}*/

var chessBoard = [];
var me = true;
var over = false;

//赢发数组
var wins = [];
//赢法统计数组
var myWin = [];
var computerWin = [];

for (var i = 0; i < 15; i++) {
    chessBoard[i] = [];
    for (var j = 0; j < 15; j++) {
        chessBoard[i][j] = 0;
    }
}

for (var i = 0; i < 15; i++) {
    wins[i] = [];
    for (var j = 0; j < 15; j++) {
        wins[i][j] = [];
    }
}
var count = 0;
for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 11; j++) {
        //wins[o][o][o] = true
        //wins[o][1][o] = true
        //wins[o][2][o] = true
        //wins[o][3][o] = true
        //wins[o][4][o] = true;count记录赢法，第一种赢法，横向

        //wins[o][1][1] = true;
        //wins[o][2][1] = true;
        //wins[o][3][1] = true;
        //wins[o][4][1] = true;
        //wins[o][6][1] = true;count记录赢法，第二种赢法，横向。。。。

        for (var k = 0; k < 5; k++) {
             wins[i][j+k][count] = true;
        }
        count++;
    }
}
/*所有横向赢法*/
for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 11; j++) {
        for (var k = 0; k < 5; k++) {
            wins[j + k][i][count] = true;
        }
        count++;
    }
}
/*所有竖向赢法*/
for (var i = 0; i < 11; i++) {
    for (var j = 0; j < 11; j++) {
        for (var k = 0; k < 5; k++) {
            wins[i + k][j + k][count] = true;
        }
        count++;
    }
}
/*所有斜线赢法*/
for (var i = 0; i < 11; i++) {
    for (var j = 14; j > 3; j--) {
        for (var k = 0; k < 5; k++) {
            wins[i + k][j - k][count] = true;
        }
        count++;
    }
}/*所有反斜线赢法*/

for (var i = 0; i < count; i++) {
    myWin[i] = 0;
    computerWin[i] = 0;
}
context.strokeStyle = "black";

var img = new Image();
img.src = "452.jpeg";

img.onload = function () {
    context.save();
    context.globalAlpha = 0.4;
    context.drawImage(img, 0, 0, 450, 450);
    context.restore();
    drawChessBorad();

}

var drawChessBorad = function () {
    for (var i = 0; i < 15; i++) {
        context.moveTo(15 + 30 * i, 15);
        context.lineTo(15 + 30 * i, 435);
        context.stroke();
        context.moveTo(15, 15 + 30 * i);
        context.lineTo(435, 15 + 30 * i);
        context.stroke();
    }
}

var onStep = function (i, j, me) {
    context.beginPath();
    context.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);
    context.closePath();
    var gradient = context.createRadialGradient(15 + i * 30, 15 + j * 30, 13, 15 + i * 30, 15 + j * 30, 0);
    if (me) {
        gradient.addColorStop(0, "#0A0A0A");
        gradient.addColorStop(1, "#636766");
    } else {
        gradient.addColorStop(0, "#D1D1D1");
        gradient.addColorStop(1, "#F9F9F9");
    }
    context.fillStyle = gradient;
    context.fill();

}

chess.onclick = function (event) {
    if (over) {
        return;
    }
    if (!me) {
        return;
    }
    var event = event || window.event;
    var x = event.offsetX,
        y = event.offsetY;
    var i = Math.floor(x / 30),
        j = Math.floor(y / 30);
    /*if(chessBoard[i][j] == 0) {
        onStep(i, j, me);
        if(me){
            chessBoard[i][j] = 1;
        }else{
            chessBoard[i][j] = 2;
        }
        me = !me;*/

    if (chessBoard[i][j] == 0) {
        onStep(i, j, me);
        chessBoard[i][j] = 1;

        for (var k = 0; k < count; k++) {
            if (wins[i][j][k]) {
                myWin[k]++;
                computerWin[k] = 6;
                if (myWin[k] == 5) {
                    alert("你赢了");
                    over = true;
                }
            }
        }
        if (!over) {
            me = !me;
            computerAI();
        }
    }
}

var computerAI = function () {
    var myScore = [];
    var computerScore = [];
    var max = 0;
    var u = 0, v = 0;

    for (var i = 0; i < 15; i++) {
        myScore[i] = [];
        computerScore[i] = [];
        for (var j = 0; j < 15; j++) {
            myScore[i][j] = 0;
            computerScore[i][j] = 0;
        }
    }
    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 15; j++) {
            if (chessBoard[i][j] == 0) {
                for (var k = 0; k < count; k++) {
                    if (wins[i][j][k]) {
                        if (myWin[k] == 1) {
                            myScore[i][j] += 200;
                        } else if (myWin[k] == 2) {
                            myScore[i][j] += 400;
                        } else if (myWin[k] == 3) {
                            myScore[i][j] += 2000;
                        } else if (myWin[k] == 4) {
                            myScore[i][j] += 10000;
                        }

                        if (computerWin[k] == 1) {
                            computerScore[i][j] += 200;
                        } else if (computerWin[k] == 2) {
                            computerScore[i][j] += 420;
                        } else if (computerWin[k] == 3) {
                            computerScore[i][j] += 2100;
                        } else if (computerWin[k] == 4) {
                            computerScore[i][j] += 20000;
                        }
                    }
                }

                if (myScore[i][j] > max) {
                    max = myScore[i][j];
                    u = i;
                    v = j;
                } else if (myScore[i][j] == max) {
                    if (computerScore[i][j] > computerScore[u][v]) {
                        u = i;
                        v = j;
                    }
                }
                if (computerScore[i][j] > max) {
                    max = computerScore[i][j];
                    u = i;
                    v = j;
                } else if (computerScore[i][j] == max) {
                    if (myScore[i][j] > myScore[u][v]) {
                        u = i;
                        v = j;
                    }
                }
            }
        }
    }
    onStep(u, v, false);
    chessBoard[u][v] = 2;

    for (var k = 0; k < count; k++) {
        if (wins[u][v][k]) {
            computerWin[k]++;
            myWin[k] = 6;
            if (computerWin[k] == 5) {
                window.alert("计算机赢了");
                over = true;
            }
        }
    }
    if (!over) {
        me = !me;
    }
}
