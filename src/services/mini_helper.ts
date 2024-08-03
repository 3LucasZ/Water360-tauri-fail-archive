export function formatTime(sec_num: number) {
  sec_num = Math.round(sec_num);
  var hours: number | string = Math.floor(sec_num / 3600);
  var minutes: number | string = Math.floor((sec_num - hours * 3600) / 60);
  var seconds: number | string = sec_num - hours * 3600 - minutes * 60;

  if (hours == 0) {
    hours = "";
  } else if (hours < 10) {
    hours = "0" + hours + ":";
  } else {
    hours = "" + hours + ":";
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + minutes + ":" + seconds;
}

export function isValidIP(ip: string, v6?: boolean) {
  const ipv4Pattern = /^(\d{1,3}\.){3}\d{1,3}$/;
  const ipv6Pattern = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  if (v6) return ipv6Pattern.test(ip);
  return ipv4Pattern.test(ip) || ipv6Pattern.test(ip);
}
