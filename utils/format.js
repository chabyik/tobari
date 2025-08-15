export default function (str, ...args) {
    return str.replace(/{(\d+)}/g, (match, number) => typeof args[number] != 'undefined' ? args[number] : match);
}