//
// status.js
//

const EXP = [
  [0, 3, 10, 30, 50, 100, 150, 200, 300, 500, 800, 1000, 1200, 1500, 1800, 2000, 2500, 3000, 4000, 5000, 6500, 8000, 10000, 13000, 16000, 20000, 25000, 30000, 36000, 42000, 48000, 54000, 60000, 70000, 80000, 90000, 100000, 115000, 130000, 145000, 160000, 175000, 200000, 230000, 260000, 290000, 320000, 350000, 380000, 410000, 440000, 470000, 500000, 530000, 560000, 590000, 620000, 650000, 680000, 710000, 750000, 790000, 830000, 870000, 910000, 950000, 990000, 1030000, 1070000, 1120000, 1170000, 1220000, 1270000, 1320000, 1370000, 1420000, 1470000, 1520000, 1570000, 1620000, 1670000, 1720000, 1770000, 1820000, 1880000, 1940000, 2000000, 2060000, 2120000, 2180000, 2240000, 2300000, 2360000, 2420000, 3000000, 5000000, 7000000, 9000000, 9990000],
  [0, 10, 30, 60, 120, 160, 300, 500, 750, 1000, 1250, 1600, 2000, 2600, 3200, 4000, 5000, 6500, 8000, 9500, 11000, 13000, 16000, 19000, 22000, 25000, 28000, 31000, 36000, 42000, 48000, 54000, 60000, 70000, 80000, 90000, 100000, 115000, 130000, 145000, 160000, 175000, 200000, 230000, 260000, 290000, 320000, 350000, 380000, 410000, 440000, 470000, 500000, 530000, 560000, 590000, 620000, 650000, 680000, 710000, 750000, 790000, 830000, 870000, 910000, 950000, 990000, 1030000, 1070000, 1120000, 1170000, 1220000, 1270000, 1320000, 1370000, 1420000, 1470000, 1520000, 1570000, 1620000, 1670000, 1720000, 1770000, 1820000, 1880000, 1940000, 2000000, 2060000, 2120000, 2180000, 2240000, 2300000, 2360000, 2420000, 3000000, 5000000, 7000000, 9000000, 9990000],
  [0, 35, 100, 300, 600, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 13000, 15000, 17000, 20000, 23000, 26000, 30000, 35000, 40000, 45000, 50000, 55000, 60000, 70000, 80000, 90000, 100000, 115000, 130000, 145000, 160000, 175000, 200000, 230000, 260000, 290000, 320000, 350000, 380000, 410000, 440000, 470000, 500000, 530000, 560000, 590000, 620000, 650000, 680000, 710000, 750000, 790000, 830000, 870000, 910000, 950000, 990000, 1030000, 1070000, 1120000, 1170000, 1220000, 1270000, 1320000, 1370000, 1420000, 1470000, 1520000, 1570000, 1620000, 1670000, 1720000, 1770000, 1820000, 1880000, 1940000, 2000000, 2060000, 2120000, 2180000, 2240000, 2300000, 2360000, 2420000, 3000000, 5000000, 7000000, 9000000, 9990000],
  [0, 150, 500, 1300, 2500, 4000, 8000, 16000, 20000, 30000, 40000, 60000, 80000, 100000, 130000, 160000, 190000, 220000, 250000, 280000, 310000, 340000, 370000, 400000, 440000, 480000, 520000, 560000, 600000, 640000, 680000, 720000, 760000, 800000, 840000, 880000, 920000, 960000, 1000000, 1040000, 1090000, 1140000, 1190000, 1240000, 1290000, 1340000, 1390000, 1440000, 1490000, 1540000, 1590000, 1640000, 1690000, 1740000, 1790000, 1840000, 1890000, 1940000, 1990000, 2040000, 2090000, 2140000, 2190000, 2240000, 2290000, 2340000, 2390000, 2440000, 2490000, 2540000, 2590000, 2640000, 2690000, 2740000, 2790000, 2840000, 2890000, 2940000, 2990000, 3040000, 3100000, 3160000, 3220000, 3400000, 3600000, 3800000, 4000000, 4200000, 4400000, 4600000, 4800000, 5000000, 5500000, 6000000, 6500000, 7000000, 8000000, 9000000, 9990000],
  [0, 45, 200, 600, 1000, 1600, 2500, 3500, 4500, 5500, 7000, 8500, 10000, 20000, 30000, 50000, 70000, 90000, 110000, 130000, 150000, 170000, 190000, 210000, 230000, 240000, 250000, 260000, 270000, 280000, 290000, 300000, 310000, 320000, 330000, 340000, 350000, 360000, 370000, 380000, 390000, 400000, 410000, 420000, 430000, 440000, 450000, 460000, 470000, 480000, 490000, 500000, 510000, 520000, 530000, 540000, 550000, 560000, 570000, 580000, 630000, 680000, 730000, 780000, 830000, 880000, 930000, 980000, 1030000, 1090000, 1150000, 1210000, 1270000, 1330000, 1390000, 1450000, 1510000, 1570000, 1630000, 1690000, 1750000, 1810000, 1870000, 1930000, 1990000, 2050000, 2110000, 2170000, 2230000, 2310000, 2390000, 2470000, 2550000, 2630000, 3000000, 5000000, 7000000, 9000000, 9990000],
  [0, 55, 300, 900, 1300, 2000, 3500, 5000, 7500, 10000, 12500, 15500, 20000, 30000, 40000, 50000, 70000, 90000, 110000, 130000, 150000, 170000, 190000, 210000, 230000, 240000, 250000, 260000, 270000, 280000, 290000, 300000, 310000, 320000, 330000, 340000, 350000, 360000, 370000, 380000, 390000, 400000, 410000, 420000, 430000, 440000, 450000, 460000, 470000, 480000, 490000, 500000, 510000, 520000, 530000, 540000, 550000, 560000, 570000, 580000, 630000, 680000, 730000, 780000, 830000, 880000, 930000, 980000, 1030000, 1090000, 1150000, 1210000, 1270000, 1330000, 1390000, 1450000, 1510000, 1570000, 1630000, 1690000, 1750000, 1810000, 1870000, 1930000, 1990000, 2050000, 2110000, 2170000, 2230000, 2310000, 2390000, 2470000, 2550000, 2630000, 3000000, 5000000, 7000000, 9000000, 9990000],
  [0, 100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000, 1000000, 1100000, 1200000, 1300000, 1400000, 1500000, 1600000, 1700000, 1800000, 1900000, 2000000, 2100000, 2200000, 2300000, 2400000, 2500000, 2600000, 2700000, 2800000, 2900000, 3000000, 3100000, 3200000, 3300000, 3400000, 3500000, 3600000, 3700000, 3800000, 3900000, 4000000, 4100000, 4200000, 4300000, 4400000, 4500000, 4600000, 4700000, 4800000, 4900000, 5000000, 5100000, 5200000, 5300000, 5400000, 5500000, 5600000, 5700000, 5800000, 5900000, 6000000, 6100000, 6200000, 6300000, 6400000, 6500000, 6600000, 6700000, 6800000, 6900000, 7000000, 7100000, 7200000, 7300000, 7400000, 7500000, 7600000, 7700000, 7800000, 7900000, 8000000, 8100000, 8200000, 8300000, 8400000, 8500000, 8600000, 8700000, 8800000, 8900000, 9000000, 9100000, 9200000, 9300000, 9400000, 9500000, 9600000, 9700000, 9990000],
  [0, 100, 350, 900, 1300, 2000, 3500, 5000, 7500, 10000, 12500, 15500, 20000, 30000, 40000, 50000, 70000, 90000, 110000, 130000, 150000, 170000, 190000, 210000, 230000, 270000, 300000, 330000, 360000, 380000, 390000, 420000, 470000, 520000, 570000, 620000, 670000, 720000, 770000, 820000, 870000, 920000, 970000, 1020000, 1070000, 1120000, 1170000, 1220000, 1270000, 1320000, 1380000, 1440000, 1500000, 1560000, 1620000, 1680000, 1740000, 1800000, 1860000, 1920000, 1980000, 2040000, 2100000, 2160000, 2220000, 2280000, 2340000, 2400000, 2460000, 2520000, 2580000, 2640000, 2700000, 2760000, 2820000, 2880000, 2940000, 3000000, 3060000, 3120000, 3180000, 3250000, 3320000, 3390000, 3460000, 3530000, 3600000, 3670000, 3740000, 3810000, 3880000, 3950000, 4020000, 4090000, 4160000, 5000000, 7000000, 9000000, 9990000],
];

const MHP = [
  [0, 8, 15, 21, 26, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 59, 61, 63, 65, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146],
  [0, 3, 6, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 47, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67],
  [0, 4, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35, 38, 41, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 60, 61, 61, 62, 62, 63, 63, 64, 64, 65, 65, 66, 66, 67, 67, 68, 68, 69, 69, 70, 70, 71, 71, 72, 72, 73, 73, 74, 74, 75, 75, 76, 76, 77, 77, 78, 78, 79, 79, 80, 80, 81, 81, 82, 82, 83, 83, 84, 84, 84, 84, 84, 84, 84, 84, 84, 84, 84, 84, 84, 84, 84, 84, 84, 84, 84, 84, 84],
  [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 93, 96, 99, 102, 105, 108, 111, 114, 117, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 152, 154, 156, 158, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210],
  [0, 3, 6, 9, 12, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132],
  [0, 8, 15, 21, 26, 30, 33, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86],
  [0, 10, 15, 20, 25, 30, 35, 40, 45, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const ATK = [
  [0, 9, 14, 18, 21, 24, 27, 30, 33, 36, 38, 40, 42, 44, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 71, 71, 72, 72, 73, 73, 74, 74, 75, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76],
  [0, 2, 4, 6, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131],
  [0, 5, 10, 14, 17, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 39, 39, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40],
  [0, 10, 16, 21, 26, 31, 36, 39, 42, 45, 48, 51, 54, 57, 60, 63, 66, 69, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 107, 108, 108, 109, 109, 110, 110, 111, 111, 112, 112, 113, 113, 114, 114, 115, 115, 116, 116, 117, 117, 118, 118, 119, 119, 120, 120, 121, 121, 122, 122, 123, 123, 124, 124, 125, 125, 126, 126, 127, 127, 128, 128, 129, 129, 130, 130, 131, 131, 132, 132, 133, 133, 134, 134, 135, 135, 136],
  [0, 5, 9, 12, 14, 16, 18, 20, 22, 23, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 43, 43, 44, 44, 45, 45, 46, 46, 47, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 152, 154, 156, 158, 160, 162, 164, 166, 168, 170, 172, 174, 176],
  [0, 2, 4, 6, 8, 10, 12, 14, 15, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 30, 30, 31, 31, 32, 32, 33, 33, 34, 34, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35],
  [0, 70, 140, 200, 260, 310, 360, 410, 460, 510, 515, 519, 522, 524, 526, 528, 530, 532, 534, 536, 538, 540, 542, 544, 546, 548, 550, 552, 554, 556, 558, 560, 562, 564, 566, 568, 570, 572, 574, 576, 578, 580, 582, 584, 586, 588, 590, 592, 594, 595, 596, 597, 598, 599, 600, 601, 602, 603, 604, 605, 606, 607, 608, 609, 610, 611, 612, 613, 614, 615, 616, 617, 618, 619, 620, 621, 622, 623, 624, 625, 626, 627, 628, 629, 630, 631, 632, 633, 634, 635, 636, 637, 638, 639, 640, 641, 642, 643, 644],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]
];

const DEF = [
  [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40],
  [0, 2, 4, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33],
  [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 55, 56, 57, 57, 58, 58, 59, 59, 60, 60, 61, 61, 62, 62, 63, 63, 64, 64, 65, 65, 66, 66, 67, 67, 68, 68, 69, 69, 70, 70, 71, 71, 72, 72, 73, 73, 74, 74, 75, 75, 76, 76, 77, 77, 78, 78, 79, 79, 80, 80, 81, 81, 82, 82, 83, 83, 84, 84, 85, 85, 86, 86, 87, 87, 88, 88, 89, 89, 90, 90, 91],
  [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107],
  [0, 1, 2, 3, 4, 5, 6, 9, 12, 15, 18, 21, 24, 25, 26, 27, 28, 29, 30, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31],
  [0, 6, 11, 15, 18, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 127, 129, 130, 132, 133, 135, 136, 138, 139, 141, 142, 144, 145, 147, 148, 150, 151, 153, 154, 158],
  [0, 30, 35, 40, 45, 50, 55, 60, 65, 70, 74, 77, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165],
  [0, 3, 6, 9, 12, 15, 18, 21, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 152, 154, 156, 158, 160, 162, 164, 166, 168, 170, 172, 174, 176, 178, 180, 182, 184, 186, 188, 190, 192, 194, 196, 198, 200, 202, 204],
];

const BasicMonsterInfo = {
  "いたずらもぐら": {species: 1, mhp0: 8, atk0: 6, def0: 5, maximum_lv: 5, recovery: 50},
  "がいこつけんし": {species: 1, mhp0: 35, atk0: 20, def0: 10, maximum_lv: 9, recovery: 50},
  "かげのきし": {species: 1, mhp0: 85, atk0: 30, def0: 29, maximum_lv: 9, recovery: 50},
  "キラースター": {species: 1, mhp0: 62, atk0: 19, def0: 18, maximum_lv: 99, recovery: 100},
  "グール": {species: 1, mhp0: 50, atk0: 21, def0: 20, maximum_lv: 9, recovery: 50},
  "くさった死体": {species: 1, mhp0: 45, atk0: 15, def0: 15, maximum_lv: 9, recovery: 50},
  "しりょうのきし": {species: 1, mhp0: 70, atk0: 35, def0: 35, maximum_lv: 9, recovery: 50},
  "スライム": {species: 1, mhp0: 5, atk0: 2, def0: 2, maximum_lv: 99, recovery: 50},
  "スライムベス": {species: 1, mhp0: 6, atk0: 3, def0: 3, maximum_lv: 99, recovery: 50},
  "スライムベホマズン": {species: 1, mhp0: 100, atk0: 50, def0: 50, maximum_lv: 9, recovery: 100},
  "タホドラキー": {species: 1, mhp0: 35, atk0: 16, def0: 15, maximum_lv: 3, recovery: 50},
  "デビルアンカー": {species: 1, mhp0: 45, atk0: 16, def0: 11, maximum_lv: 99, recovery: 100},
  "どくどくゾンビ": {species: 1, mhp0: 100, atk0: 45, def0: 35, maximum_lv: 9, recovery: 50},
  "ドラキー": {species: 1, mhp0: 7, atk0: 5, def0: 2, maximum_lv: 99, recovery: 50},
  "ドラキーマ": {species: 1, mhp0: 42, atk0: 20, def0: 14, maximum_lv: 99, recovery: 100},
  "ハエまどう": {species: 1, mhp0: 50, atk0: 16, def0: 24, maximum_lv: 99, recovery: 50},
  "ファイヤーケロッグ": {species: 1, mhp0: 40, atk0: 11, def0: 10, maximum_lv: 9, recovery: 50},
  "ブラウニー": {species: 1, mhp0: 25, atk0: 14, def0: 17, maximum_lv: 99, recovery: 50},
  "プラチナキング": {species: 1, mhp0: 134, atk0: 52, def0: 52, maximum_lv: 99, recovery: 100},
  "ホイミスライム": {species: 1, mhp0: 28, atk0: 10, def0: 9, maximum_lv: 99, recovery: 50},
  "メイジももんじゃ": {species: 1, mhp0: 45, atk0: 19, def0: 19, maximum_lv: 99, recovery: 50},
  "ももんじゃ": {species: 1, mhp0: 12, atk0: 7, def0: 5, maximum_lv: 99, recovery: 50},
  "リビングデッド": {species: 1, mhp0: 50, atk0: 15, def0: 16, maximum_lv: 9, recovery: 50},
  "リビングハンマー": {species: 1, mhp0: 90, atk0: 44, def0: 30, maximum_lv: 99, recovery: 100},
  "エリミネーター": {species: 2, mhp0: 100, atk0: 30, def0: 35, maximum_lv: 99, recovery: 100},
  "キメラ": {species: 2, mhp0: 48, atk0: 30, def0: 20, maximum_lv: 99, recovery: 30},
  "さつじんき": {species: 2, mhp0: 48, atk0: 16, def0: 18, maximum_lv: 99, recovery: 50},
  "しにがみ": {species: 2, mhp0: 35, atk0: 15, def0: 13, maximum_lv: 99, recovery: 50},
  "スターキメラ": {species: 2, mhp0: 78, atk0: 32, def0: 31, maximum_lv: 99, recovery: 30},
  "スモールグール": {species: 2, mhp0: 55, atk0: 17, def0: 10, maximum_lv: 99, recovery: 50},
  "デスストーカー": {species: 2, mhp0: 150, atk0: 45, def0: 45, maximum_lv: 99, recovery: 100},
  "トロル": {species: 2, mhp0: 50, atk0: 23, def0: 23, maximum_lv: 99, recovery: 100},
  "トロルボンバー": {species: 2, mhp0: 60, atk0: 31, def0: 27, maximum_lv: 99, recovery: 100},
  "ベロベロ": {species: 2, mhp0: 80, atk0: 45, def0: 30, maximum_lv: 99, recovery: 50},
  "マミー": {species: 2, mhp0: 40, atk0: 25, def0: 13, maximum_lv: 99, recovery: 50},
  "ミイラおとこ": {species: 2, mhp0: 42, atk0: 21, def0: 13, maximum_lv: 99, recovery: 50},
  "ゆうれい": {species: 2, mhp0: 23, atk0: 18, def0: 5, maximum_lv: 99, recovery: 50},
  "アイアンタートル": {species: 3, mhp0: 30, atk0: 18, def0: 19, maximum_lv: 99, recovery: 50},
  "あめふらし": {species: 3, mhp0: 31, atk0: 19, def0: 14, maximum_lv: 99, recovery: 50},
  "アローインプ": {species: 3, mhp0: 41, atk0: 11, def0: 14, maximum_lv: 99, recovery: 50},
  "あんこくつむり": {species: 3, mhp0: 30, atk0: 20, def0: 19, maximum_lv: 99, recovery: 50},
  "岩とびあくま": {species: 3, mhp0: 32, atk0: 15, def0: 18, maximum_lv: 99, recovery: 50},
  "エビルポット": {species: 3, mhp0: 26, atk0: 8, def0: 11, maximum_lv: 99, recovery: 50},
  "おおナメクジ": {species: 3, mhp0: 17, atk0: 8, def0: 7, maximum_lv: 99, recovery: 50},
  "おどる宝石": {species: 3, mhp0: 36, atk0: 10, def0: 8, maximum_lv: 99, recovery: 50},
  "ガニラス": {species: 3, mhp0: 33, atk0: 17, def0: 15, maximum_lv: 99, recovery: 100},
  "キラーマンティス": {species: 3, mhp0: 50, atk0: 16, def0: 18, maximum_lv: 99, recovery: 100},
  "ぐんたいガニ": {species: 3, mhp0: 47, atk0: 23, def0: 19, maximum_lv: 99, recovery: 100},
  "ケダモン": {species: 3, mhp0: 33, atk0: 17, def0: 16, maximum_lv: 99, recovery: 50},
  "ゴースト": {species: 3, mhp0: 21, atk0: 9, def0: 10, maximum_lv: 99, recovery: 50},
  "さそりかまきり": {species: 3, mhp0: 15, atk0: 11, def0: 10, maximum_lv: 99, recovery: 100},
  "じごくのハサミ": {species: 3, mhp0: 35, atk0: 17, def0: 18, maximum_lv: 99, recovery: 100},
  "しびれマイマイ": {species: 3, mhp0: 28, atk0: 14, def0: 18, maximum_lv: 99, recovery: 50},
  "ストローマウス": {species: 3, mhp0: 19, atk0: 12, def0: 13, maximum_lv: 99, recovery: 50},
  "スライムブレス": {species: 3, mhp0: 34, atk0: 14, def0: 12, maximum_lv: 99, recovery: 50},
  "タッフペンギー": {species: 3, mhp0: 31, atk0: 13, def0: 15, maximum_lv: 99, recovery: 50},
  "タマゴロン": {species: 3, mhp0: 6, atk0: 10, def0: 3, maximum_lv: 99, recovery: 50},
  "ちゅうまじゅう": {species: 3, mhp0: 25, atk0: 11, def0: 11, maximum_lv: 99, recovery: 50},
  "つかいま": {species: 3, mhp0: 125, atk0: 40, def0: 35, maximum_lv: 99, recovery: 50},
  "つのうしがい": {species: 3, mhp0: 23, atk0: 13, def0: 14, maximum_lv: 99, recovery: 50},
  "ドラゴスライム": {species: 3, mhp0: 37, atk0: 19, def0: 18, maximum_lv: 99, recovery: 150},
  "ドラゴメタル": {species: 3, mhp0: 50, atk0: 25, def0: 50, maximum_lv: 99, recovery: 50},
  "ドルイド": {species: 3, mhp0: 20, atk0: 10, def0: 6, maximum_lv: 99, recovery: 50},
  "どろにんぎょう": {species: 3, mhp0: 35, atk0: 20, def0: 10, maximum_lv: 99, recovery: 50},
  "バブルスライム": {species: 3, mhp0: 21, atk0: 9, def0: 7, maximum_lv: 5, recovery: 50},
  "パペットマン": {species: 3, mhp0: 35, atk0: 16, def0: 10, maximum_lv: 99, recovery: 50},
  "ファーラット": {species: 3, mhp0: 21, atk0: 10, def0: 9, maximum_lv: 99, recovery: 50},
  "ベビーサタン": {species: 3, mhp0: 44, atk0: 10, def0: 15, maximum_lv: 99, recovery: 50},
  "ヘルゴースト": {species: 3, mhp0: 46, atk0: 19, def0: 21, maximum_lv: 99, recovery: 50},
  "マージスター": {species: 3, mhp0: 26, atk0: 15, def0: 13, maximum_lv: 99, recovery: 50},
  "ミニデーモン": {species: 3, mhp0: 49, atk0: 20, def0: 24, maximum_lv: 99, recovery: 50},
  "メイジキメラ": {species: 3, mhp0: 60, atk0: 27, def0: 20, maximum_lv: 99, recovery: 50},
  "メガザルロック": {species: 3, mhp0: 35, atk0: 14, def0: 9, maximum_lv: 99, recovery: 50},
  "メダパニシックル": {species: 3, mhp0: 90, atk0: 19, def0: 25, maximum_lv: 99, recovery: 100},
  "メトロゴースト": {species: 3, mhp0: 41, atk0: 13, def0: 18, maximum_lv: 99, recovery: 50},
  "ランドアーマー": {species: 3, mhp0: 31, atk0: 20, def0: 35, maximum_lv: 99, recovery: 50},
  "リリパット": {species: 3, mhp0: 40, atk0: 11, def0: 12, maximum_lv: 99, recovery: 50},
  "ワンダーエッグ": {species: 3, mhp0: 6, atk0: 10, def0: 3, maximum_lv: 99, recovery: 50},
  "アークデーモン": {species: 4, mhp0: 60, atk0: 26, def0: 27, maximum_lv: 99, recovery: 100},
  "ギガンテス": {species: 4, mhp0: 55, atk0: 22, def0: 22, maximum_lv: 99, recovery: 50},
  "キラースコップ": {species: 4, mhp0: 22, atk0: 10, def0: 10, maximum_lv: 99, recovery: 50},
  "グレイトホーン": {species: 4, mhp0: 80, atk0: 28, def0: 29, maximum_lv: 99, recovery: 100},
  "ゴーレム": {species: 4, mhp0: 50, atk0: 20, def0: 20, maximum_lv: 99, recovery: 100},
  "レノファイター": {species: 4, mhp0: 70, atk0: 21, def0: 27, maximum_lv: 99, recovery: 100},
  "あくましんかん": {species: 5, mhp0: 48, atk0: 22, def0: 15, maximum_lv: 99, recovery: 50},
  "うごくせきぞう": {species: 5, mhp0: 42, atk0: 20, def0: 22, maximum_lv: 99, recovery: 100},
  "キースドラゴン": {species: 5, mhp0: 150, atk0: 50, def0: 40, maximum_lv: 99, recovery: 100},
  "グレイトマーマン": {species: 5, mhp0: 39, atk0: 20, def0: 18, maximum_lv: 99, recovery: 50},
  "じごくのつかい": {species: 5, mhp0: 44, atk0: 22, def0: 17, maximum_lv: 99, recovery: 50},
  "スカイフロッグ": {species: 5, mhp0: 38, atk0: 9, def0: 10, maximum_lv: 99, recovery: 50},
  "ストーンマン": {species: 5, mhp0: 75, atk0: 25, def0: 29, maximum_lv: 99, recovery: 100},
  "ダースドラゴン": {species: 5, mhp0: 150, atk0: 50, def0: 55, maximum_lv: 99, recovery: 100},
  "デーモントード": {species: 5, mhp0: 45, atk0: 21, def0: 19, maximum_lv: 99, recovery: 50},
  "ドラゴン": {species: 5, mhp0: 120, atk0: 40, def0: 36, maximum_lv: 99, recovery: 100},
  "バーサーカー": {species: 5, mhp0: 30, atk0: 12, def0: 12, maximum_lv: 99, recovery: 50},
  "ひとくいばこ": {species: 5, mhp0: 20, atk0: 40, def0: 10, maximum_lv: 99, recovery: 50},
  "ひょうがまじん": {species: 5, mhp0: 70, atk0: 30, def0: 20, maximum_lv: 99, recovery: 100},
  "ミミック": {species: 5, mhp0: 50, atk0: 10, def0: 15, maximum_lv: 99, recovery: 50},
  "ようがんまじん": {species: 5, mhp0: 97, atk0: 31, def0: 36, maximum_lv: 99, recovery: 100},
  "アイアンアント": {species: 6, mhp0: 17, atk0: 13, def0: 20, maximum_lv: 99, recovery: 50},
  "イエティ": {species: 6, mhp0: 70, atk0: 15, def0: 5, maximum_lv: 99, recovery: 150},
  "いしにんぎょう": {species: 6, mhp0: 100, atk0: 45, def0: 45, maximum_lv: 99, recovery: 50},
  "おおきづち": {species: 6, mhp0: 15, atk0: 10, def0: 8, maximum_lv: 5, recovery: 50},
  "おおめだま": {species: 6, mhp0: 55, atk0: 22, def0: 22, maximum_lv: 99, recovery: 50},
  "おばけキノコ": {species: 6, mhp0: 38, atk0: 20, def0: 12, maximum_lv: 99, recovery: 50},
  "おばけヒトデ": {species: 6, mhp0: 22, atk0: 12, def0: 12, maximum_lv: 5, recovery: 50},
  "ガーゴイル": {species: 6, mhp0: 200, atk0: 180, def0: 150, maximum_lv: 99, recovery: 100},
  "きとうし": {species: 6, mhp0: 39, atk0: 8, def0: 10, maximum_lv: 99, recovery: 50},
  "きめんどうし": {species: 6, mhp0: 18, atk0: 9, def0: 8, maximum_lv: 99, recovery: 50},
  "キラーアーマー": {species: 6, mhp0: 55, atk0: 25, def0: 26, maximum_lv: 99, recovery: 100},
  "キラープラスター": {species: 6, mhp0: 135, atk0: 55, def0: 52, maximum_lv: 99, recovery: 100},
  "キラーマシン": {species: 6, mhp0: 60, atk0: 20, def0: 25, maximum_lv: 99, recovery: 100},
  "ぐんたいアリ": {species: 6, mhp0: 40, atk0: 8, def0: 11, maximum_lv: 99, recovery: 50},
  "げんじゅつし": {species: 6, mhp0: 37, atk0: 18, def0: 16, maximum_lv: 99, recovery: 50},
  "コロヒーロー": {species: 6, mhp0: 34, atk0: 9, def0: 14, maximum_lv: 99, recovery: 50},
  "コロファイター": {species: 6, mhp0: 35, atk0: 10, def0: 15, maximum_lv: 99, recovery: 50},
  "コロプリースト": {species: 6, mhp0: 35, atk0: 11, def0: 14, maximum_lv: 99, recovery: 50},
  "コロマージ": {species: 6, mhp0: 35, atk0: 10, def0: 16, maximum_lv: 99, recovery: 50},
  "さまようよろい": {species: 6, mhp0: 45, atk0: 21, def0: 23, maximum_lv: 99, recovery: 100},
  "じごくのよろい": {species: 6, mhp0: 105, atk0: 45, def0: 47, maximum_lv: 99, recovery: 100},
  "しびれくらげ": {species: 6, mhp0: 31, atk0: 10, def0: 12, maximum_lv: 99, recovery: 50},
  "シャーマン": {species: 6, mhp0: 35, atk0: 20, def0: 17, maximum_lv: 99, recovery: 50},
  "シャドーナイト": {species: 6, mhp0: 48, atk0: 19, def0: 14, maximum_lv: 99, recovery: 50},
  "シルバーデビル": {species: 6, mhp0: 65, atk0: 20, def0: 20, maximum_lv: 99, recovery: 100},
  "スーパーテンツク": {species: 6, mhp0: 38, atk0: 22, def0: 20, maximum_lv: 99, recovery: 50},
  "スペクテット": {species: 6, mhp0: 45, atk0: 10, def0: 15, maximum_lv: 99, recovery: 50},
  "ゾンビマスター": {species: 6, mhp0: 55, atk0: 23, def0: 18, maximum_lv: 99, recovery: 50},
  "だいまじん": {species: 6, mhp0: 105, atk0: 34, def0: 30, maximum_lv: 99, recovery: 100},
  "だいまどう": {species: 6, mhp0: 41, atk0: 17, def0: 17, maximum_lv: 99, recovery: 50},
  "ダンスキャロット": {species: 6, mhp0: 28, atk0: 18, def0: 13, maximum_lv: 99, recovery: 50},
  "デスマシーン": {species: 6, mhp0: 128, atk0: 65, def0: 53, maximum_lv: 99, recovery: 100},
  "デビルロード": {species: 6, mhp0: 120, atk0: 25, def0: 35, maximum_lv: 99, recovery: 100},
  "テンツク": {species: 6, mhp0: 35, atk0: 17, def0: 19, maximum_lv: 99, recovery: 50},
  "どぐう戦士": {species: 6, mhp0: 120, atk0: 39, def0: 50, maximum_lv: 99, recovery: 100},
  "どくやずきん": {species: 6, mhp0: 50, atk0: 15, def0: 18, maximum_lv: 99, recovery: 50},
  "ドッグスナイパー": {species: 6, mhp0: 50, atk0: 15, def0: 15, maximum_lv: 99, recovery: 100},
  "ドラゴンキッズ": {species: 6, mhp0: 55, atk0: 18, def0: 18, maximum_lv: 99, recovery: 50},
  "ばくだん岩": {species: 6, mhp0: 100, atk0: 15, def0: 5, maximum_lv: 99, recovery: 50},
  "バズズ": {species: 6, mhp0: 135, atk0: 30, def0: 45, maximum_lv: 99, recovery: 100},
  "はねせんにん": {species: 6, mhp0: 17, atk0: 9, def0: 13, maximum_lv: 99, recovery: 50},
  "ビッグスロース": {species: 6, mhp0: 55, atk0: 8, def0: 5, maximum_lv: 99, recovery: 150},
  "プチヒーロー": {species: 6, mhp0: 35, atk0: 10, def0: 15, maximum_lv: 99, recovery: 50},
  "プチファイター": {species: 6, mhp0: 35, atk0: 11, def0: 14, maximum_lv: 99, recovery: 50},
  "プチプリースト": {species: 6, mhp0: 33, atk0: 10, def0: 14, maximum_lv: 99, recovery: 50},
  "プチマージ": {species: 6, mhp0: 20, atk0: 8, def0: 10, maximum_lv: 99, recovery: 50},
  "フライングデビル": {species: 6, mhp0: 130, atk0: 40, def0: 40, maximum_lv: 99, recovery: 100},
  "ベビーニュート": {species: 6, mhp0: 20, atk0: 13, def0: 14, maximum_lv: 99, recovery: 50},
  "ベホマスライム": {species: 6, mhp0: 35, atk0: 20, def0: 10, maximum_lv: 99, recovery: 50},
  "マージマタンゴ": {species: 6, mhp0: 110, atk0: 40, def0: 40, maximum_lv: 99, recovery: 50},
  "マタンゴ": {species: 6, mhp0: 51, atk0: 22, def0: 21, maximum_lv: 99, recovery: 50},
  "まどうし": {species: 6, mhp0: 35, atk0: 14, def0: 13, maximum_lv: 99, recovery: 50},
  "マンドラゴラ": {species: 6, mhp0: 75, atk0: 25, def0: 28, maximum_lv: 99, recovery: 50},
  "ミステリドール": {species: 6, mhp0: 60, atk0: 23, def0: 17, maximum_lv: 99, recovery: 50},
  "メタルハンター": {species: 6, mhp0: 130, atk0: 40, def0: 45, maximum_lv: 99, recovery: 100},
  "メラリザード": {species: 6, mhp0: 90, atk0: 29, def0: 27, maximum_lv: 99, recovery: 50},
  "モシャスナイト": {species: 6, mhp0: 51, atk0: 20, def0: 22, maximum_lv: 99, recovery: 50},
  "ようじゅつし": {species: 6, mhp0: 34, atk0: 12, def0: 15, maximum_lv: 99, recovery: 50},
  "ラストテンツク": {species: 6, mhp0: 95, atk0: 28, def0: 26, maximum_lv: 99, recovery: 50},
  "ラリホーアント": {species: 6, mhp0: 25, atk0: 11, def0: 10, maximum_lv: 99, recovery: 50},
  "ランガー": {species: 6, mhp0: 140, atk0: 51, def0: 45, maximum_lv: 99, recovery: 100},
  "アトラス": {species: 7, mhp0: 130, atk0: 60, def0: 48, maximum_lv: 10, recovery: 100},
  "エビルエスターク": {species: 7, mhp0: 145, atk0: 60, def0: 55, maximum_lv: 10, recovery: 100},
  "キングスライム": {species: 7, mhp0: 100, atk0: 50, def0: 50, maximum_lv: 10, recovery: 100},
  "こうてつまじん": {species: 7, mhp0: 135, atk0: 60, def0: 55, maximum_lv: 10, recovery: 100},
  "ゴールデンスライム": {species: 7, mhp0: 132, atk0: 50, def0: 50, maximum_lv: 10, recovery: 50},
  "ゴールドマン": {species: 7, mhp0: 131, atk0: 51, def0: 55, maximum_lv: 99, recovery: 100},
  "ジャスティス兄": {species: 7, mhp0: 150, atk0: 80, def0: 80, maximum_lv: 99, recovery: 150},
  "スライムエンペラー": {species: 7, mhp0: 133, atk0: 51, def0: 51, maximum_lv: 10, recovery: 100},
  "トロルキング": {species: 7, mhp0: 131, atk0: 66, def0: 53, maximum_lv: 99, recovery: 100},
  "ベリアル": {species: 7, mhp0: 135, atk0: 65, def0: 55, maximum_lv: 10, recovery: 100},
  "あやしいかげ": {species: 8, mhp0: 5, atk0: 20, def0: 1, maximum_lv: 9, recovery: 50},
  "オニオーン": {species: 8, mhp0: 10, atk0: 1, def0: 1, maximum_lv: 99, recovery: 50},
  "サンダーラット": {species: 8, mhp0: 6, atk0: 12, def0: 4, maximum_lv: 9, recovery: 150},
  "シャドー": {species: 8, mhp0: 5, atk0: 13, def0: 1, maximum_lv: 9, recovery: 50},
  "たまねぎマン": {species: 8, mhp0: 10, atk0: 1, def0: 100, maximum_lv: 99, recovery: 50},
  "はぐれメタル": {species: 8, mhp0: 5, atk0: 10, def0: 200, maximum_lv: 99, recovery: 50},
  "バブリン": {species: 8, mhp0: 100, atk0: 35, def0: 15, maximum_lv: 99, recovery: 100},
  "はりせんもぐら": {species: 8, mhp0: 4, atk0: 7, def0: 4, maximum_lv: 9, recovery: 50},
  "プヨンターゲット": {species: 8, mhp0: 150, atk0: 45, def0: 20, maximum_lv: 99, recovery: 100},
  "プラズママウス": {species: 8, mhp0: 6, atk0: 40, def0: 4, maximum_lv: 9, recovery: 150},
  "ブラッドハンド": {species: 8, mhp0: 26, atk0: 17, def0: 15, maximum_lv: 99, recovery: 50},
  "ポムポムボム": {species: 8, mhp0: 200, atk0: 55, def0: 29, maximum_lv: 99, recovery: 100},
  "マドハンド": {species: 8, mhp0: 10, atk0: 6, def0: 5, maximum_lv: 99, recovery: 30},
  "メタルキング": {species: 8, mhp0: 50, atk0: 10, def0: 100, maximum_lv: 99, recovery: 100},
  "メタルスライム": {species: 8, mhp0: 6, atk0: 10, def0: 100, maximum_lv: 99, recovery: 50},
  "笑いぶくろ": {species: 8, mhp0: 35, atk0: 0, def0: 5, maximum_lv: 99, recovery: 50},
};

/**
 * モンスターの能力値を返す
 * @param {string} name モンスター名
 * @param {Number} lv レベル
 * @returns {BasicMonsterInfo} base モンスターの能力値
 */
export const getStatus = (name, lv) => {
  let base = JSON.parse(JSON.stringify(BasicMonsterInfo[name]));
  base.mhp0 += MHP[base.species-1][lv-1];
  base.atk0 += ATK[base.species-1][lv-1];
  base.def0 += DEF[base.species-1][lv-1];
  base.exp = EXP[base.species-1][lv-1];
  return base;
};

export const getExpByLv = (name, lv) => {
  let base = BasicMonsterInfo[name];
  return EXP[base.species-1][lv-1];
};

export const getLvByDexp = (name, start_lv, dexp) => {
  const base = BasicMonsterInfo[name];
  const start_exp = EXP[base.species-1][start_lv-1];
  for(let lv=start_lv+1; lv<100; lv++) {
    const dexpf = EXP[base.species-1][lv-1] - start_exp;
    if (dexpf > dexp) {
      return lv-1;
    }
  }
  console.assert(false, "invalid value encountered.");
  return null;
};

export const implemented = [
    "ホイミスライム", "キラーマシン", "おばけキノコ"
];
