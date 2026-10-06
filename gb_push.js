import axios from 'axios';

const response = await axios.get('https://hq.sinajs.cn/rn=1790355334498&list=gb_driv,gb_oklo,gb_smr,gb_ceg,gb_gev,gb_nee,gb_pwr,gb_etn,gb_lmt,gb_rtx,gb_noc,gb_gd,gb_enph,gb_fslr,gb_rivn,gb_sedg,gb_tan,gb_batt,gb_xle,gb_fcg,gb_fcx,gb_scco,gb_teck,gb_aa,gb_gdx,gb_jpm,gb_bac,gb_wfc,gb_gs,gb_lly', {
  headers: {
    'Host': 'hq.sinajs.cn',
    'Connection': 'keep-alive',
    'content-type': 'application/json',
    'charset': 'utf-8',
    'Referer': 'https://servicewechat.com/wxdc0ec724ae1bc6aa/8/page-frame.html',
    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; RMX2117 Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/142.0.7444.173 Mobile Safari/537.36 XWEB/1420283 MMWEBSDK/20260604 MMWEBID/7789 MicroMessenger/8.0.77.3160(0x28004D3A) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android',
    'Accept-Encoding': 'gzip, deflate'
  }
});

const rawdata = response.data;
const dataArray = rawdata.split(';');

const results = [];
dataArray.forEach(item => {
  const newArr = item.split(',');
  const match = newArr[0].match(/var\s+([^=]+)=/);
  if (match) {
    results.push({
      name: match[1].trim(),
      change: newArr[2],
      time: newArr[3]
    });
  }
});
console.log(results);
