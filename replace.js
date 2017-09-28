function replace(node) {
    // digitalisation
    node.nodeValue = node.nodeValue.replace(/digitalisation/gi, function(str) {
        return /D/.test(str) ? "Numérisation" : "numérisation";
    })
    // digital.e
    node.nodeValue = node.nodeValue.replace(/digitale?/gi, function(str) {
        return /D/.test(str) ? "Numérique" : "numérique";
    })
}

function replacePattern(node) {
    if(node.nodeType === Node.TEXT_NODE) {
        replace(node);
    } else if(node.nodeType === Node.ELEMENT_NODE) {
        for(var i = 0, num = node.childNodes.length; i < num; ++i) {
            replacePattern(node.childNodes[i]);
        }
    }
}

replacePattern(document.body);