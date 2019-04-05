// mock data
var forecasts = [29, 19.7, 24.2, 27.3, 19, 29, 24.5];
var xRowMockData = [0, 87, 140, 242, 348, 410, 480];

// масштабирует сетку координат канваса под заданные размеры
var scaleRange = function(range, limitX, limitY) {

  var resultRangeY = range.map(function(t) {
    return t - Math.min.apply(null, range);
  });

// находим макс в каждом ряду
  var maxX = Math.max.apply(null, xRowMockData);
  var maxY = Math.max.apply(null, resultRangeY);

// находим коэф масштабирования
  var scaleX = Math.abs(maxX) / limitX || 1;
  var scaleY = Math.abs(maxY) / limitY || 1;


// масштабируем и записываем в массив координат каждой точки
  return xRowMockData.map(function(item, i) {
    return {
      x: i ? Math.round(item / scaleX, 100) : 0,
      y: Math.round(resultRangeY[i] / scaleY, 100),
    };
  });
}


// рисует канвас
function draw(data) {
  var canvas = document.getElementById('graph');

  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    // задаем размеры и увеличиваем разрешение канваса в 5 раз
    ctx.canvas.width = 194.5 * 5;
    ctx.canvas.height = 46 * 5;


    const STROKE_WIDTH_LINE = 5;
    const STROKE_WIDTH_DOT = 17;
    const POINT_RADIUS = 10;
    const STROKE_STYLE = '#771921';
    const STROKE_FILL = '#FFFFFF';


    // отступ для полей канваса
    const canvasOffset = STROKE_WIDTH_DOT + POINT_RADIUS;

    var canvasWidth = ctx.canvas.width;
    var canvasHeight = ctx.canvas.height;

    // получение координат
    var scaledRange = scaleRange(data, canvasWidth - canvasOffset * 2, canvasHeight - canvasOffset * 2);

    var rangeLength = scaledRange.length;


    // рисуем
    scaledRange.forEach(function(point, i, scaledRange) {
      if (i) {
        ctx.beginPath();
        ctx.strokeStyle = STROKE_STYLE;
        ctx.fillStyle = STROKE_FILL;

        ctx.moveTo(canvasOffset + scaledRange[i - 1].x, - canvasOffset + canvasHeight - scaledRange[i - 1].y);
        ctx.lineTo(canvasOffset + point.x, - canvasOffset + canvasHeight - point.y);
        ctx.lineWidth = STROKE_WIDTH_LINE;
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath()
        ctx.lineWidth = STROKE_WIDTH_DOT;
        ctx.arc(canvasOffset + scaledRange[i - 1].x, - canvasOffset + canvasHeight - scaledRange[i - 1].y, POINT_RADIUS, 0, 2 * Math.PI)
        ctx.stroke();
        ctx.fill();
        ctx.closePath();

        if (i === rangeLength - 1) {
          ctx.beginPath();
          ctx.lineWidth = STROKE_WIDTH_DOT;
          ctx.arc(canvasOffset + point.x, - canvasOffset + canvasHeight - point.y, POINT_RADIUS, 0, 2 * Math.PI)
          ctx.stroke();
          ctx.fill();
          ctx.closePath()
        }
      }
    });
  }
}

window.onload = draw.bind(null, forecasts);
