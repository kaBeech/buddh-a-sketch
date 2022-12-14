# etchpad

A fun art toy or relaxing metitation tool, depending on your perspective =)

https://kabeech.com/buddh-a-sketch/index.html

### Basic info

This started as an emulation of a classic drawing toy and evolved to include
functionality for meditative practice. Then I added ever-mutating neon black
colors because fun!

This is one of my first JavaScript projects, and still one of my favorites. It's
not very sophisticated, but it's a lot of fun and I love it!

### Instructions

Wave your mouse over the grid, click all the buttons, see what they do! I hope
you enjoy it =)

- The New Pad buttons create a new blank pad, either in shades of grey or neon
  black
  - Clicking them will prompt you to input the number of cells per side that
    will make up the new grid
  - The input accepts any positive integer from 1 to 100

- The button between the New Pad Buttons toggles the color mode for the Neon
  Black board
  - This button also indicates the curent hue of the paint that is on your
    brush. In the second mode (see below) the current hue is the one in the
    upper left quadrant
  - The default mode specifies a relatively monochrome board and all painted
    cells will slowly change hue at a relatively standard rate
  - The second mode specifies that whenever a cell is painted it will retain
    that hue (and only the lightness will update) until it gets painted again
  - The processes beind the scenes are intentionally a bit wonkey and organic.
    Higher resolutions tend to update slower.
    - I think it's fun to choose a high resolution Neon Black board with second
      mode selected, paint all over the board until it's mostly covered, then
      toggle the mode selector on and off, watching the colors slowly shift from
      rainbow to monochrome and back again

### ToDo

- Add functionality for touchscreen devices
