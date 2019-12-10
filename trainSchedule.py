import requests
from bs4 import BeautifulSoup
import json

depStation = 'shanghaixi'
# train = 'G146'


def getTrainScheduleByTrainNum(trainNum):
    r = requests.get('http://qq.ip138.com/train/{}.htm'.format(trainNum))
    assert r.status_code == 200
    soup = BeautifulSoup(r.content, 'html.parser')
    stopListRaw = soup.findAll('tr', onmouseover="this.bgColor='#E6F2E7';")

    stopList = []
    arrTimeList = []
    depTimeList = []
    pastTimeList = []

    for stopRaw in stopListRaw:
        sta = (stopRaw.findAll('td')[1]).a['href'][7:-4]
        arrTime = stopRaw.findAll('td')[2].text
        depTime = stopRaw.findAll('td')[3].text
        pastTime = stopRaw.findAll('td')[4].text

        print(sta, arrTime, depTime, pastTime)

        stopList.append(sta)
        arrTimeList.append(arrTime)
        depTimeList.append(depTime)
        pastTimeList.append(pastTime)

    f = open('data/trains/{}.json'.format(str(trainNum)), 'w+')
    obj = {
        'trainNum': trainNum,
        'stopList': stopList,
        'arrTimeList': arrTimeList,
        'depTimeList': depTimeList,
        'pastTimeList': pastTimeList
    }
    f.write(json.dumps(obj))
    f.close()


trainDataRaw = open('data/stations/{}.json'.format(depStation), 'r')
trainDataJson = json.loads(trainDataRaw.read())
trainList = trainDataJson['depTrainList']

for train in trainList:
    getTrainScheduleByTrainNum(str(train))
