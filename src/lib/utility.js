// import ko from 'locale/ko';
// import en from 'locale/en';
// import scn from 'locale/scn';
// import jp from 'locale/jp';
// import tcn from 'locale/tcn';
// import pt from 'locale/pt';

import moment from 'moment';
import { Cookies } from "react-cookie";

const ko = {}
const en = {}
const scn = {}
const jp = {}
const tcn = {}
const pt = {}

const cookies = new Cookies();

export const setCookie = (name, value, option) => {
	return cookies.set(name, value, { ... option });
}
export const getCookie = (name) => {
	return cookies.get(name);
}

export const getTilePoint = (index, size) => {
	const x = index % 5;
	const y = parseInt(index / 5);

	return { top: -(1+x*17)*size, left: -(1+y*17)*size, }
}

export const tileIndex = {
	"\\d0\\d01\\d11": { "index": 1 }, "\\d0\\d1011\\d": { "index": 1, "reversal": true }, 
	"\\d0\\d11011": { "index": 15 }, "\\d0\\d11110": { "index": 15, "reversal": true }, 
	"01\\d11010": { "index": 25 }, "\\d1011010": { "index": 25, "reversal": true }, 
	"01011011": { "index": 28 }, "01011110": { "index": 28, "reversal": true }, 
	"01011010": { "index": 26 }, 
	"01\\d1011\\d": { "index": 24 }, "\\d1001\\d11": { "index": 24, "reversal": true }, 
	"01111\\d0\\d": { "index": 18 }, "11011\\d0\\d": { "index": 18, "reversal": true }, 
	"01111110": { "index": 29 }, "11011011": { "index": 29, "reversal": true }, 
	"01011\\d0\\d": { "index": 17 }, 
	"11\\d1001\\d": { "index": 19 }, "\\d1101\\d10": { "index": 19, "reversal": true }, 
	"\\d0\\d11010": { "index": 16 }, 
	"01\\d1001\\d": { "index": 14 }, "\\d1001\\d10": { "index": 14, "reversal": true }, 
	"01111011": { "index": 27 }, "11011110": { "index": 27, "reversal": true }, 
	"01011111": { "index": 21 }, 
	"01111111": { "index": 20 }, "11011111": { "index": 20, "reversal": true }, 
	"11111010": { "index": 23 }, 
	"11111011": { "index": 22 }, "11111110": { "index": 22, "reversal": true }, 
	"\\d1101\\d11": { "index": 5 }, "11\\d1011\\d": { "index": 5, "reversal": true }, 
	"\\d0\\d01\\d10": { "index": 12 }, "\\d0\\d1001\\d": { "index": 12, "reversal": true }, 
	"\\d0\\d11111": { "index": 4 }, 
	"11111111": { "index": 3 }, 
	"\\d1001\\d0\\d": { "index": 13 }, "01\\d10\\d0\\d": { "index": 13, "reversal": true }, 
	"\\d1101\\d0\\d": { "index": 2 }, "11\\d10\\d0\\d": { "index": 2, "reversal": true }, 
	"11111\\d0\\d": { "index": 6 }, 
	"\\d0\\d01\\d0\\d": { "index": 9 }, "\\d0\\d10\\d0\\d": { "index": 9, "reversal": true }, 
	"\\d0\\d11\\d0\\d": { "index": 11 }, 
	"\\d1\\d00\\d1\\d": { "index": 10 }, 
	"\\d0\\d00\\d1\\d": { "index": 7 }, 
	"\\d1\\d00\\d0\\d": { "index": 8 }
}
export const tileKeys = Object.keys(tileIndex);


export const onJSONDownload = (name, map) => {
  const fileName = name + '_' + moment().format('YYYYMMDDHHmmss') + '.json';

  const json = JSON.stringify(map);

  // 파일로 다운로드
  const file = new Blob(['\ufeff' + json], {type:'text/csv;charset=UTF-8'});
  if (typeof window.navigator.msSaveBlob !== 'undefined') {
    window.navigator.msSaveOrOpenBlob(file, fileName);
  } else {
    const url = window.URL.createObjectURL(file);
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = url;
    link.setAttribute('download', fileName);
    if (typeof link.download === 'undefined') {
        link.setAttribute('target', '_blank');
    }
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
}








export const locale = {
  "ko": {
    name: '한국어',
    data: ko
  },
  "en": {
    name: 'English',
    data: en
  },
  "jp": {
    name: '日本語',
    data: jp
  },
  "scn": {
    name: '简体中文',
    data: scn
  },
  "tcn": {
    name: '繁體中文',
    data: tcn
  },
  "pt": {
    name: 'Português',
    data: pt
  },
};

// 저장되어 있는 언어 데이터를 가져온다
export const defaultLang = () => {
  const lang = localStorage.getItem('lang') || 'ko';

  return locale[lang] ? lang : 'ko';
}

export const changeLang = (lang) => {
  localStorage.setItem("lang", lang);
  window.location.reload();
}

export const Jobs = {
	"프리스트(남)": [
		"眞 어벤저",
		"眞 크루세이더",
		"眞 퇴마사",
		"眞 인파이터"
	],
	"마창사": [
		"眞 듀얼리스트",
		"眞 다크 랜서",
		"眞 드래고니안 랜서",
		"眞 뱅가드"
	],
	"귀검사(여)": [
		"眞 소드마스터",
		"眞 블레이드",
		"眞 데몬슬레이어",
		"眞 다크템플러",
		"眞 베가본드"
	],
	"도적": [
		"眞 로그",
		"眞 사령술사",
		"眞 섀도우댄서",
		"眞 쿠노이치"
	],
	"격투가(남)": [
		"眞 그래플러",
		"眞 스트라이커",
		"眞 넨마스터",
		"眞 스트리트파이터"
	],
	"총검사": [
		"眞 트러블 슈터",
		"眞 요원",
		"眞 스페셜리스트",
		"眞 히트맨"
	],
	"거너(남)": [
		"眞 메카닉",
		"眞 어썰트",
		"眞 스핏파이어",
		"眞 런처",
		"眞 레인저"
	],
	"마법사(여)": [
		"眞 인챈트리스",
		"眞 소환사",
		"眞 배틀메이지",
		"眞 엘레멘탈마스터",
		"眞 마도학자"
	],
	"크리에이터": [
		"眞 크리에이터"
	],
	"프리스트(여)": [
		"眞 이단심판관",
		"眞 무녀",
		"眞 미스트리스",
		"眞 크루세이더"
	],
	"격투가(여)": [
		"眞 넨마스터",
		"眞 스트리트파이터",
		"眞 그래플러",
		"眞 스트라이커"
	],
	"마법사(남)": [
		"眞 블러드 메이지",
		"眞 스위프트 마스터",
		"眞 빙결사",
		"眞 엘레멘탈 바머",
		"眞 디멘션워커"
	],
	"거너(여)": [
		"眞 메카닉",
		"眞 런처",
		"眞 스핏파이어",
		"眞 레인저"
	],
	"귀검사(남)": [
		"眞 아수라",
		"眞 소울브링어",
		"眞 버서커",
		"眞 검귀",
		"眞 웨펀마스터"
	],
	"다크나이트": [
		"眞 다크나이트"
	],
	"나이트": [
		"眞 팔라딘",
		"眞 드래곤나이트",
		"眞 엘븐나이트",
		"眞 카오스"
	]
}
export const ItemType = [
	'jacket', 'shoulder', 'pants', 'shoes', 'waist', 
	'amulet', 'wrist', 'ring',
	'support', 'magicSton', 'earring'
]