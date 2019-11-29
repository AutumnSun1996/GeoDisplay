let layers = [
  {
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
      'fill-opacity': 0.3,
      'fill-color': "#66CCFF",
    },
    'filter': ["match", ["geometry-type"], ["Polygon", "MultiPolygon"], true, false]
  },
  {
    'id': 'line',
    'type': 'line',
    'source': 'Source',
    'paint': {
      'line-color': '#999999',
      'line-width': 1
    }
  },
  {
    'id': 'point',
    'type': 'circle',
    'source': 'Source',
    'paint': {
      'circle-opacity': 0.3,
      'circle-color': '#880033',
      'circle-radius': 5
    },
    'filter': ["match", ["geometry-type"], ["Point"], true, false],
  },
]