from mongoengine import connect,Document,fields

import csv
import sys
connect(db='e_vote',host='127.0.0.1',port=27017)
class user(Document):
    meta={"collection":"voters"}
    voterno=fields.StringField(required=True)
    img=fields.ImageField(thumbnail_size=(150,150,False))
    district=fields.StringField(required=True)
    gender=fields.StringField(required=True)
    phoneno=fields.StringField(required=True)
    date=fields.StringField(required=True)
    month=fields.StringField(required=True)
    year=fields.StringField(required=True)
    name=fields.StringField(required=True)
    addr=fields.StringField(required=True)
    state=fields.StringField(required=True)
    pincode=fields.StringField(required=True)
    ac_no=fields.StringField(required=True)

def writer(data, filename):
  with open (filename, "a", newline = "") as csvfile:
    movies = csv.writer(csvfile)
    for x in data:
      movies.writerow(x)

vno=sys.argv[1]
age=sys.argv[2]

party=sys.argv[3]
agegrp=sys.argv[4]
filename = "Book1.csv"
#header = ('voterno','age','district','vote','party','gender','agegrp')
data = []
u=user.objects(voterno=str(vno)).first()
data.append((u.voterno,str(age),u.district,'1',str(party),u.gender,str(agegrp)))
#writer(header, data, filename)
writer(data,filename)