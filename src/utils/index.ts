const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

const shortstring = (str: string, len: number): string => {
  if (str.length > len) {
    let sstr = str.substring(0, len) + ' ...';
    return sstr;
  }
  return str;
};

const toHHMMSS = (time: number): string => {
  let hours: number | string = Math.floor(time / 3600);
  let minutes: number | string = Math.floor((time - hours * 3600) / 60);
  let seconds: number | string = time - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  if (hours !== '00') {
    return hours + ':' + minutes + ':' + seconds;
  } else {
    return minutes + ':' + seconds;
  }
};

export {validateEmail, shortstring, toHHMMSS};
