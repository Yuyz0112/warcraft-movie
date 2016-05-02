var geoData = [
    [121.15, 31.89],
    [109.781327, 39.608266],
    [120.38, 37.35],
    [122.207216, 29.985295],
    [123.97, 47.33],
    [120.13, 33.38],
    [118.87, 42.28],
    [120.33, 36.07],
    [121.52, 36.89],
    [102.188043, 38.520089],
    [118.58, 24.93],
    [120.53, 36.86],
    [119.46, 35.42],
    [119.97, 35.88],
    [121.05, 32.08],
    [91.11, 29.97],
    [112.02, 22.93],
    [116.1, 24.55],
    [122.05, 37.2],
    [121.48, 31.22],
    [101.718637, 26.582347],
    [122.1, 37.5],
    [117.93, 40.97],
    [118.1, 24.46],
    [115.375279, 22.786211],
    [116.63, 23.68],
    [124.37, 40.13],
    [121.1, 31.45],
    [103.79, 25.51],
    [121.39, 37.52],
    [119.3, 26.08],
    [121.979603, 39.627114],
    [120.45, 36.38],
    [123.97, 41.97],
    [102.52, 24.35],
    [114.87, 40.82],
    [113.57, 37.85],
    [119.942327, 37.177017],
    [120.1, 30.86],
    [116.69, 23.39],
    [120.95, 31.39],
    [121.56, 29.86],
    [110.359377, 21.270708],
    [116.35, 23.55],
    [122.41, 37.16],
    [119.16, 34.59],
    [120.836932, 40.711052],
    [120.74, 31.64],
    [113.75, 23.04],
    [114.68, 23.73],
    [119.15, 33.5],
    [119.9, 32.49],
    [108.33, 22.84],
    [122.18, 40.65],
    [114.4, 23.09],
    [120.26, 31.91],
    [120.75, 37.8],
    [113.62, 24.84],
    [98.289152, 39.77313],
    [113.23, 23.16],
    [109.47, 36.6],
    [112.53, 37.87],
    [113.01, 23.7],
    [113.38, 22.52],
    [102.73, 25.04],
    [118.73, 36.86],
    [122.070714, 41.119997],
    [113.08, 36.18],
    [114.07, 22.62],
    [113.52, 22.3],
    [118.3, 33.96],
    [108.72, 34.36],
    [109.11, 35.09],
    [119.97, 36.77],
    [113.11, 23.05],
    [110.35, 20.02],
    [113.06, 22.61],
    [117.53, 36.72],
    [112.44, 23.05],
    [121.62, 38.92],
    [111.5, 36.08],
    [120.63, 31.16],
    [106.39, 39.04],
    [123.38, 41.8],
    [120.62, 31.32],
    [110.88, 21.68],
    [120.76, 30.77],
    [125.35, 43.88],
    [120.03336, 36.264622],
    [106.27, 38.47],
    [120.555821, 31.875428],
    [111.19, 34.76],
    [121.15, 41.13],
    [115.89, 28.68],
    [109.4, 24.33],
    [109.511909, 18.252847],
    [104.778442, 29.33903],
    [126.57, 43.87],
    [111.95, 21.85],
    [105.39, 28.91],
    [101.74, 36.56],
    [104.56, 29.77],
    [111.65, 40.82],
    [104.06, 30.67],
    [113.3, 40.12],
    [119.44, 32.2],
    [110.28, 25.29],
    [110.479191, 29.117096],
    [119.82, 31.36],
    [109.12, 21.49],
    [108.95, 34.27],
    [119.56, 31.74],
    [118.49, 37.46],
    [129.58, 44.6],
    [106.9, 27.7],
    [120.58, 30.01],
    [119.42, 32.39],
    [119.95, 31.79],
    [119.1, 36.62],
    [106.54, 29.59],
    [121.420757, 28.656386],
    [118.78, 32.04],
    [118.03, 37.36],
    [106.71, 26.57],
    [120.29, 31.59],
    [123.73, 41.3],
    [84.77, 45.59],
    [109.5, 34.52],
    [118.48, 31.56],
    [107.15, 34.38],
    [113.21, 35.24],
    [119.16, 31.95],
    [116.46, 39.92],
    [117.2, 34.26],
    [115.72, 37.72],
    [110, 40.58],
    [104.73, 31.48],
    [87.68, 43.77],
    [117.57, 34.86],
    [120.19, 30.26],
    [118.05, 36.78],
    [122.85, 41.12],
    [119.48, 31.43],
    [86.06, 41.68],
    [114.35, 36.1],
    [114.35, 34.79],
    [117, 36.65],
    [104.37, 31.13],
    [120.65, 28.01],
    [115.97, 29.71],
    [114.47, 36.6],
    [119.72, 30.23],
    [103.73, 36.03],
    [116.83, 38.33],
    [118.35, 35.05],
    [106.110698, 30.837793],
    [117.2, 39.13],
    [119.95, 30.07],
    [117.13, 36.18],
    [120.23, 29.71],
    [113.65, 34.76],
    [126.63, 45.75],
    [115.97, 36.45],
    [118.38, 31.33],
    [118.02, 39.63],
    [113.29, 33.75],
    [114.48, 37.05],
    [116.29, 37.45],
    [116.59, 35.38],
    [112.239741, 30.335165],
    [111.3, 30.7],
    [120.06, 29.32],
    [119.92, 28.45],
    [112.44, 34.7],
    [119.57, 39.95],
    [113.16, 27.83],
    [114.48, 38.03],
    [117.67, 36.19],
    [111.69, 29.05],
    [115.48, 38.85],
    [112.91, 27.87],
    [119.64, 29.12],
    [113.09, 29.37],
    [113, 28.21],
    [118.88, 28.97],
    [116.7, 39.53],
    [115.480656, 35.23375],
    [117.27, 31.86],
    [114.31, 30.52],
    [125.03, 46.58]
];