export const SESSION_ID = '_session_id_';
export const API = '/api/';
export const TOKEN = {
  ACCESS: 'easytrade_access_token',
  REFRESH: 'easytrade_refresh_token',
};
export const LOGINSTATUS = 'loginStatus';
export const LANG = 'language'
export const LOGIN_USER = 'login_user';
export const REGISTER_USER = 'register_user';

export const DEFAULTLOCALE = process.env.REACT_APP_LOCALE;

function leftPad(value: number) {
  if (value >= 10) {
    return value;
  }
  return `0${value}`;
}

export const FROMDATEDAY =
  new Date(+new Date() - 3600000 * 24).getFullYear() +
  `0${1 + new Date(+new Date() - 3600000 * 24).getMonth()}`.slice(-2) +
  `0${new Date(+new Date() - 3600000 * 24).getDate()}`.slice(-2);

export const FROMDATEWEEK =
  new Date(+new Date() - 3600000 * 24 * 7).getFullYear() +
  `0${1 + new Date(+new Date() - 3600000 * 24 * 7).getMonth()}`.slice(-2) +
  `0${new Date(+new Date() - 3600000 * 24 * 7).getDate()}`.slice(-2);

export const FROMDATEMONTH =
  new Date(+new Date() - 3600000 * 24 * 30).getFullYear() +
  `0${1 + new Date(+new Date() - 3600000 * 24 * 30).getMonth()}`.slice(-2) +
  `0${new Date(+new Date() - 3600000 * 24 * 30).getDate()}`.slice(-2);

export const FROMDATEYEAR =
  new Date(+new Date() - 3600000 * 24 * 365).getFullYear() +
  `0${1 + new Date(+new Date() - 3600000 * 24 * 365).getMonth()}`.slice(-2) +
  `0${new Date(+new Date() - 3600000 * 24 * 365).getDate()}`.slice(-2);

export const DEFARULTTODATE =
  new Date().getFullYear() +
  `0${1 + new Date().getMonth()}`.slice(-2) +
  `0${new Date().getDate()}`.slice(-2);

export const TODATEWEEK =
  new Date(+new Date() + 3600000 * 24 * 7).getFullYear() +
  `0${1 + new Date(+new Date() + 3600000 * 24 * 7).getMonth()}`.slice(-2) +
  `0${new Date(+new Date() + 3600000 * 24 * 7).getDate()}`.slice(-2);

export const dateFormat = (source: any, delimiter = '-') => {
  const year = source.getFullYear();
  const month = leftPad(source.getMonth() + 1);
  const day = leftPad(source.getDate());

  return [year, month, day].join();
};

export const changeDateFormat = (source: any) => {
  const year = source.getFullYear();
  const month = `0${1 + source.getMonth()}`.slice(-2);
  const day = `0${source.getDate()}`.slice(-2);

  return year + month + day;
};

// 기본값을 yyyyMMdd 형식의 문자열로 반환하는 함수
export const getDefaultFromDate = () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 1);
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  return `${year}${month}${day}`;
};

// 현재 날짜를 yyyyMMdd 형식의 문자열로 반환하는 함수
export const getDefaultToDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  return `${year}${month}${day}`;
};

// yyyyMMdd 형식의 문자열을 Date 객체로 변환하는 함수
export const parseDate = (dateString: string) => {
  const year = parseInt(dateString.substring(0, 4), 10);
  const month = parseInt(dateString.substring(4, 6), 10) - 1; // 월은 0부터 시작
  const day = parseInt(dateString.substring(6, 8), 10);
  return new Date(year, month, day);
};

// Date 객체를 yyyyMMdd 형식의 문자열로 변환하는 함수
export const formatDate = (date: any) => {
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  return `${year}${month}${day}`;
};