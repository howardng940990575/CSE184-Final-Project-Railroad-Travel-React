import requests

staList_SH = ['ASH', 'EGH', 'NEH', 'SHH', 'AOH', 'SNH', 'SXH', 'SAH', 'IMH']
# All the station short code in Shanghai City

staName_SH = ['Anting North Railway Station',
              'Jinshan North Railway Station',
              'Nanxiang North Railway Station',
              'Shanghai Railway Station',
              'Shanghai Hongqiao Railway Station',
              'Shanghai South Railway Station',
              'Shanghai West Railway Station',
              'Songjiang Railway Station',
              'Songjiang South Railway Station',
              ]
# All the station name in Shanghai City
# 安亭北 金山北	南翔北 上海 上海虹桥 上海南 上海西 松江 松江南

staList_ZJ = ['CEH', 'CSU', 'CBH', 'CFH', 'DRH', 'MOH', 'FHH', 'FYU', 'NHN', 'EUH', 'HZH', 'HGH', 'VZH', 'JDU', 'JUH',
              'JSH', 'EAH', 'JXH', 'EPH', 'JBH', 'RNH', 'JYH', 'PYH', 'KHU', 'LWH', 'UPH', 'UFH', 'USH', 'LMH', 'NGH',
              'NHH', 'PHQ', 'ARH', 'QDU', 'QVH', 'QEH', 'RAH', 'OQH', 'SYU', 'BDH', 'SOH', 'SLH', 'SSH', 'OLH', 'TZH',
              'TLU', 'TCH', 'VHH', 'RZH', 'VRH', 'RYH', 'WDH', 'YGH', 'YWH', 'URH', 'RFH', 'QUH', 'EVH', 'YYH', 'CTH',
              'ZQH', 'ZDH']
# All the station short code in Zhejiang Province

staName_ZJ = ['Cangnan Railway Station',
              'Changshan Railway Station',
              'Changxing Railway Station',
              'Changxing South Railway Station',
              'Deqing Railway Station',
              'Deqing West Railway Station',
              'Fenghua Railway Station',
              'Fuyang Railway Station',
              'Haining Railway Station',
              'Haining West Railway Station',
              'Hangzhou Railway Station',
              'Hangzhou East Railway Station',
              'Huzhou Railway Station',
              'Jiande Railway Station',
              'Jiangshan Railway Station',
              'Jiashan Railway Station',
              'Jiashan South Railway Station',
              'Jiaxing Railway Station',
              'Jiaxing South Railway Station',
              'Jinhua Railway Station',
              'Jinhua South Railway Station',
              'Jinyun Railway Station',
              'Jinyun West Railway Station',
              'Kaihua Railway Station',
              'Lanxi Railway Station',
              'Yueqing Railway Station',
              'Linhai Railway Station',
              'Lishui Railway Station',
              'Longyou Railway Station',
              'Ningbo Railway Station',
              'Ninghai Railway Station',
              'Pinghu Railway Station',
              'Pingyang Railway Station',
              'Qiandaohu Railway Station',
              'Qingtian Railway Station',
              'Zhangzhou Railway Station',
              'Ruian Railway Station',
              'Sanmen County Railway Station',
              'Sanyang Railway Station',
              'Shangyu Railway Station',
              'Shaoxing Railway Station',
              'Shaoxing North Railway Station',
              'Shaoxing East Railway Station',
              'Weifang Railway Station',
              'Taizhou Railway Station',
              'Tonglu Railway Station',
              'Tongxiang Railway Station',
              'Wenling Railway Station',
              'Wenzhou Railway Station',
              'Wenzhou South Railway Station',
              'Wuyi Railway Station',
              'Wuyi North Railway Station',
              'Yandangshan Railway Station',
              'Yiwu Railway Station',
              'Yongjia Railway Station',
              'Yongkang Railway Station',
              'Yongkang South Railway Station',
              'Yuhang Railway Station',
              'Yuyao Railway Station',
              'Yuyao North Railway Station',
              'Zhuangqiao Railway Station',
              'Zhuji Railway Station'
              ]

# All the station name in Zhejiang Province
# 苍南	常山	长兴	长兴南	德清
# 德清西	奉化	富阳	海宁	海宁西
# 杭州	杭州东	湖州	建德	江山
# 嘉善	嘉善南	嘉兴	嘉兴南	金华
# 金华南	缙云	缙云西	开化	兰溪
# 乐清	临海	丽水	龙游	宁波
# 宁海	平湖	平阳	千岛湖	青田
# 衢州	瑞安	三门县	三阳	上虞
# 绍兴	绍兴北	绍兴东	绅坊	台州
# 桐庐	桐乡	温岭	温州	温州南
# 武义	武义北	雁荡山	义乌	永嘉
# 永康	永康南	余杭	余姚	余姚北
# 庄桥	诸暨

staList_JS = ['BWH', 'FWH', 'BGU', 'CZH', 'ESH', 'DYH', 'EXH', 'DQH', 'AKH', 'FDU', 'GYU', 'HIH', 'HMU', 'AUH', 'VQH',
              'VCH', 'UDH', 'JJH', 'OKH', 'UEH', 'JWH', 'KSH', 'KNH', 'UIH', 'UKH', 'LDH', 'LEH', 'NJH', 'NKH', 'NUH',
              'PJH', 'QOU', 'QYH', 'RIH', 'RBH', 'SAU', 'FMH', 'MPH', 'SZH', 'OHH', 'ITH', 'KAH', 'UTH', 'WAH', 'WXH',
              'WGH', 'IFH', 'XSU', 'XPH', 'VIH', 'XCH', 'UUH', 'AFH', 'AEH', 'AIH', 'GTH', 'YLH', 'YUH', 'ZJH', 'ZEH']
# All the station short code in Jiangsu Province

staName_JS = ['Baohuashan Railway Station',
              'Bencha Railway Station',
              'Binhai Port Railway Station',
              'Changzhou Railway Station',
              'Changzhou North Railway Station',
              'Danyang Railway Station',
              'Danyang North Railway Station',
              'Donghai County Railway Station',
              'Suining Railway Station',
              'Suining East Railway Station',
              'Ganyu Railway Station',
              'Haian Railway Station',
              'Haimen Railway Station',
              'Huaian Railway Station',
              'Huaqiao Railway Station',
              'Huishan Railway Station',
              'Jiangdu Railway Station',
              'Jiangning Railway Station',
              'Jiangning West Railway Station',
              'Jiangyan Railway Station',
              'Jurong West Railway Station',
              'Kunshan Railway Station',
              'Kunshan South Railway Station',
              'Lianyungang Railway Station',
              'Lianyungang East Railway Station',
              'Fushui Railway Station',
              'Fuyang Railway Station',
              'Nanjing Railway Station',
              'Nanjing South Railway Station',
              'Nantong Railway Station',
              'Zhangzhou Railway Station',
              'Qidong Railway Station',
              'Qishuyan Railway Station',
              'Rudong Railway Station',
              'Rugao Railway Station',
              'Sheyang Railway Station',
              'Shuyang Railway Station',
              'Siyang Railway Station',
              'Suzhou Railway Station',
              'Suzhou North Railway Station',
              'Suzhou New District Railway Station',
              'Suzhou Park Railway Station',
              'Taizhou Railway Station',
              'Wawushan Railway Station',
              'Wuxi Railway Station',
              'Wuxi East Railway Station',
              'Wuxi New District Railway Station',
              'Xiangshui County Railway Station',
              'Xianlin Railway Station',
              'Xinyi Railway Station',
              'Xuzhou Railway Station',
              'Xuzhou East Railway Station',
              'Yancheng Railway Station',
              'Yancheng North Railway Station',
              'Yangcheng Lake Railway Station',
              'Yanghe Railway Station',
              'Yangzhou Railway Station',
              'Yixing Railway Station',
              'Zhenjiang Railway Station',
              'Zhenjiang South Railway Station'
              ]

# All the station name in Jiangsu Province
# 宝华山	栟茶	滨海港	常州	常州北
# 丹阳	丹阳北	东海县	阜宁	阜宁东
# 赣榆	海安	海门	淮安	花桥
# 惠山	江都	江宁	江宁西	姜堰
# 句容西	昆山	昆山南	连云港	连云港东
# 溧水	溧阳	南京	南京南	南通
# 邳州	启东	戚墅堰	如东	如皋
# 射阳	沭阳	泗阳	苏州	苏州北
# 苏州新区	苏州园区	泰州	瓦屋山	无锡
# 无锡东	无锡新区	响水县	仙林	新沂
# 徐州	徐州东	盐城	盐城北	阳澄湖
# 洋河	扬州	宜兴	镇江	镇江南


def getPriceRaw(depSta, arrSta):
    print('Requesting Price Raw info: {} => {}'.format(depSta, arrSta))
    date = '2019-12-13' # Change this
    r = requests.get(
        'https://kyfw.12306.cn/otn/leftTicketPrice/query?leftTicketDTO.train_date=2019-12-05&leftTicketDTO.from_station={}&leftTicketDTO.to_station={}&leftTicketDTO.ticket_type=1&randCode='.format(
            depSta, arrSta))
    assert r.status_code == 200
    priceInfoRaw = r.content.decode('UTF-8')

    f = open('data/tripsInfoRaw/{}-{}.json'.format(depSta, arrSta), 'w+')
    f.write(priceInfoRaw)
    f.close()


def scrapeData():
    for dep in staList_SH:
        for arr in staList_SH:
            getPriceRaw(dep, arr)
    for dep in staList_SH:
        for arr in staList_ZJ:
            getPriceRaw(dep, arr)
    for dep in staList_SH:
        for arr in staList_JS:
            getPriceRaw(dep, arr)
    for dep in staList_ZJ:
        for arr in staList_SH:
            getPriceRaw(dep, arr)
    for dep in staList_ZJ:
        for arr in staList_ZJ:
            getPriceRaw(dep, arr)
    for dep in staList_ZJ:
        for arr in staList_JS:
            getPriceRaw(dep, arr)
    for dep in staList_JS:
        for arr in staList_SH:
            getPriceRaw(dep, arr)
    for dep in staList_JS:
        for arr in staList_ZJ:
            getPriceRaw(dep, arr)
    for dep in staList_JS:
        for arr in staList_JS:
            getPriceRaw(dep, arr)


scrapeData()
