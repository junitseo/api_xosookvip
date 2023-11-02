module.exports = (str) => {
    const reg = new RegExp('^[0-9]+$');
    if (typeof str != 'string') return false // we only process strings!
    return str.match(reg) ? true : false
}
  