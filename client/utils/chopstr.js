export function chopstr(str, len) {
  if (str == null) return str;
  if (str.length <= len) return str;
  return str.substr(0, len);
}
