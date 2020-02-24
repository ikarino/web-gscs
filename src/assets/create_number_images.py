#!/usr/bin/env python

from PIL import Image
from PIL import ImageDraw
from PIL import ImageFont

def generate_char_img(char, fontname='Osaka', size=(64, 64)):
    img = Image.new('RGBA', size, '#ffffff00')
    draw = ImageDraw.Draw(img)
    fontsize = int(size[0]*0.8)
    font = ImageFont.truetype(fontname, fontsize)

    # adjust charactor position.
    char_displaysize = font.getsize(char)
    offset = tuple((si-sc)//2 for si, sc in zip(size, char_displaysize))
    assert all(o>=0 for o in offset)

    # adjust offset, half value is right size for height axis.
    # draw.text((offset[0], offset[1]//2+5), char, font=font, fill='#000')

    img.save(char+".png")

# for number in range(10):
#     generate_char_img(str(number), fontname='/System/Library/Fonts/Helvetica.ttc')

generate_char_img("z", fontname='/System/Library/Fonts/Helvetica.ttc')
    
