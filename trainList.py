import requests
from bs4 import BeautifulSoup
import re
import json


provinceList = ['shanghai', 'jiangsu', 'zhejiang']


def getTrainStationLists(provinceList):
    for province in provinceList:
        print('Start checking station list in {}'.format(province))
        r = requests.get('http://qq.ip138.com/train/{}/'.format(province))
        assert r.status_code == 200
        soup = BeautifulSoup(r.content, 'html.parser')
        staListRaw = soup.findAll('a', attrs={'href': re.compile("/train/{}/".format(province))})
        staListRaw.pop(0)
        staList = []
        for staRaw in staListRaw:
            staList.append(staRaw['href'])
        return staList


def getTrainByStations(stationList):
    for station in stationList:
        print('Start scraping trains in {} station'.format(station))
        r = requests.get('http://qq.ip138.com/{}'.format(station))
        assert r.status_code == 200
        soup = BeautifulSoup(r.content, 'html.parser')
        rows = soup.find_all('td', bgcolor="#CCE6CD")
        trains = []
        for row in rows:
            trainNum = row.a.b.text
            trains.append(trainNum)
            print('train {} added to list'.format(trainNum))
        print(len(trains))
        f = open('data/stations/{}.json'.format(station.split('/')[-1][:-4]), 'w+')
        obj = {
            'trainStation': station,
            'depTrainList': trains
        }
        f.write(json.dumps(obj))
        f.close()


# change following url to the station you want to scrape
getTrainByStations(['train/jiangsu/suzhouyuanqu.htm'])
