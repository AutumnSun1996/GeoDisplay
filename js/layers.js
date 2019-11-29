let conf = {
  "flow-icon": "triangle-red",
  "camera-icon": "circle-blue",
  "poi-fill": {
    'fill-opacity': 0.3,
    'fill-pattern': "fill-line0011",
  },
  "fn-fill": {
    'fill-opacity': 0.3,
    'fill-pattern': "fill-line1000",
  },
}
filter = ['all',
  ['match', ['get', 'Layer'], ['P-平面到顶固定家具', 'P-平面洁具', '厨房设备', 'P-装饰完成面到顶', 'F-地坪文本'], false, true],
  ['match', ['get', 'EntityHandle'], ["4336"], false, true],
]
let layers = [
  {
    //整体地图背景
    'id': 'background',
    'type': 'background',
    'paint': {
      'background-color': '#FFFFFF'
    }
  },
  {
    'id': 'fill',
    'type': 'fill',
    'source': 'Source',
    'paint': {
      'fill-opacity': 0.5,
      'fill-color': '#678678'
    },
    'filter': ["match", ["geometry-type"], ["Polygon", "MultiPolygon"], true, false]
  },
  {
    'id': 'line',
    'type': 'line',
    'source': 'Source',
    'paint': {
      'line-color': '#999',
      'line-width': 1
    }
  },
  {
    'id': 'point',
    'type': 'circle',
    'source': 'Source',
    'paint': {
      'circle-color': '#880033',
      'circle-radius': 10
    },
    'filter': ['all',
      ['match', ['get', 'Layer'], ['楼层文字',], true, false],
      ["match", ["geometry-type"], ["Point"], true, false],
    ]
  },
]