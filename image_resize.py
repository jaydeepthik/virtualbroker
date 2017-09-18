# -*- coding: utf-8 -*-
"""
Created on Mon Sep 11 21:13:08 2017

@author: jaydeep thik
"""

from PIL import Image
import glob, os
#basewidth = 300
size= (128,128)
print(os.getcwd())

#print("resized_images" in os.listdir())

if ("resized_images" not in os.listdir()):
    os.mkdir("resized_images")
    
image_dir=os.getcwd()+"/images";
reimage_dir=os.getcwd()+"/resized_images"

os.chdir(image_dir)
for infile in glob.glob("*.*"):
    os.chdir(image_dir)
    file, ext = os.path.splitext(infile)
    img = Image.open(infile)
    print(img.size)
    #wpercent = (basewidth/float(img.size[0]))
    #hsize = int((float(img.size[1])*float(wpercent)))
    img = img.resize(size, Image.ANTIALIAS).convert("RGB")
    os.chdir(reimage_dir)
    img.save(file+".jpg",'JPEG')
    
    
    print(img.size)
    

os.chdir(image_dir)
os.chdir('..')
print(os.getcwd())
