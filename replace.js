String.prototype.format = function() {
  a = this;
  for (k in arguments) {
    a = a.replace("{" + k + "}", arguments[k])
  }
  return a
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.strikethrough = function() {
    return this.replace(/[a-zA-Z]/g, "$&\u0336");
}

function format(origin, replacement) {
    return "{0}{1}".format(
        origin.strikethrough(),
        /[A-Z]/.test(origin) ? replacement.capitalize() : replacement
    );
}

var map = new Map();
map.set("digitalisation", "numérisation");
map.set("digitale", "numérique");
map.set("digital", "numérique");
map.set("crypter", "chiffrer");
map.set("cryptée", "chiffrée");
map.set("crypté", "chiffré");
map.set("cryptage", "chiffrement");
map.set("décrypter", "déchiffrer");
map.set("décryptée", "déchiffrée");
map.set("décrypté", "déchiffré");
map.set("décryptage", "déchiffrement");

var keys = Array.from(map.keys())
var re = new RegExp(keys.join("|"), "gi");

function replacePattern(node) {
    if(node.nodeType === Node.TEXT_NODE) {
        node.nodeValue = node.nodeValue.replace(re, function(str) {
            return format(str, map.get(str.toLowerCase()));
        });
    } else if(node.nodeType === Node.ELEMENT_NODE) {
        for(var i = 0, num = node.childNodes.length; i < num; ++i) {
            replacePattern(node.childNodes[i]);
        }
    }
}

replacePattern(document.body);