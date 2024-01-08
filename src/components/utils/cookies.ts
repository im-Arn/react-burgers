export function getCookie(name: string) {
  const matches = document.cookie.match(  // eslint-disable-next-line
    new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)")
  );
  // return matches ? decodeURIComponent(matches[1]) : undefined;
  return matches ? decodeURIComponent(matches[1]) : '';
};


export function setCookie(
  name: string,
  value: string | number | boolean,
  props: { [key: string]: Date | string | number | boolean } = {}) {
  props = props || {};

  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp instanceof Date) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
};
