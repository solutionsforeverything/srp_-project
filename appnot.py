from mongoengine import connect,Document,fields
import pandas as pd
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

df=pd.read_csv('Book1.csv')
col=list(df['voterno'])
l=[1235679001,1235678926,1236790037,1237901148,1239012259,1235678925,1249012258]
lset=set(l)

colset=set(col)
a=list(lset-colset)
for i in a:
    u=user.objects(voterno=str(i)).first()
    y=int(u.year)
    age=2020-y
    print(age)
    if age>=18 and age<=30:
             agegrp="youth"
    elif age>=30 and age<=40 :
             agegrp="adult"
    else:
             agegrp="oldage"
    print(agegrp)


    writer([(u.voterno,str(age),u.district,'0',"nota",u.gender,str(agegrp))],'Book1.csv')
