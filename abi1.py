from cv2 import *
import sys
from face_recognition import *
from PIL import Image
import numpy as np
from mongoengine import connect,Document,fields
connect(db='e_vote',host='127.0.0.1',port=27017)
import warnings
warnings.filterwarnings('ignore')
class user(Document):
    meta={"collection":"voters"}
    img=fields.ImageField(thumbnail_size=(150,150,False))
    phoneno=fields.StringField(required=True)
    date=fields.StringField(required=True)
    month=fields.StringField(required=True)
    year=fields.StringField(required=True)
    voterno=fields.StringField(required=True)
    gender=fields.StringField(required=True)
    name=fields.StringField(required=True)
    addr=fields.StringField(required=True)
    district=fields.StringField(required=True)
    state=fields.StringField(required=True)
    pincode=fields.StringField(required=True)
    ac_no=fields.StringField(required=True)
face_cascade=CascadeClassifier('haarcascade_frontalface_default.xml')
cap=VideoCapture(0)
s,img=cap.read()

pil_img=Image.fromarray(img)
pil_img.save('face.jpg')
if s:
    gray=cvtColor(img,COLOR_BGR2GRAY)
    faces=face_cascade.detectMultiScale(gray,1.1,2)
    if len(faces)==1:
        u=user.objects(voterno=sys.argv[1]).first()
        a=(u.img.thumbnail.read())
        nparr = np.fromstring(a, np.uint8)
        img_np = imdecode(nparr, IMREAD_COLOR)
        
        dbimg_enc=face_encodings(img_np)[0]
        ipimg_enc=face_encodings(img)
        chk=compare_faces(dbimg_enc,ipimg_enc)
        if chk[0]:print('Welcome')
        else:print('Boom')
    else:
        print("other")
cap.release()
