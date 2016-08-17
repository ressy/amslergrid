# amslergrid

An online Amsler Grid vision test intended to be as clear and simple as possible.

Live version: http://ressy.github.io/amslergrid

An Amsler Grid is a rectilinear grid image used as a self-service check for
vision problems.  There are plenty available online already, but mainly as
small squares in JPG images or embedded in PDFs.  That works fine for printing
out and sticking to the front of a fridge, but isn't ideal for viewing directly
from the web from whatever device you have on hand.  (At regular size they'll
leave the clutter of the rest of the device display still visible, but when
magnified they can be blurry, and displaying them fullscreen isn't always
easy.)

So, this aims to provide an easily-usable, scalable, web-based Amsler Grid
without any visual clutter.  It's just a grid, but it tries to be the best grid
possible.

## Technical Details

The grid is built as an [SVG] image, spread across a web page, with some
[jQuery] JavaScript to provide an options form and a fullscreen button.  I'm
aiming to make it compatible with phones and tablets, and so far iOS will show
it fullscreen when added as a home screen icon, but the options form is still a
bit clunky.

[SVG]: https://www.w3.org/Graphics/SVG/
[jQuery]: https://jquery.com/

## Other Grids

 * <http://www.eyesight.org/Macular_Degeneration/Eye_Test/eye_test.html>

   A modified Amsler Grid with built-in calibration for viewing distance using
   the physiological (optic nerve) blind spots.

 * <http://www.brightfocus.org/macular/news/amsler-grid-eye-test>

   BrightFocus Foundation's printable version with instructions.  The PDF
   version uses vector graphics so it scales nicely.

 * <https://www.macular.org/sites/default/files/amslerchart.pdf>

   American Macular Degeneration Foundation's Amsler Grid PDF.

 * <http://www.amd.org/the-amsler-grid/>

   Macular Degeneration Partnership web page about the Amsler Grid.
