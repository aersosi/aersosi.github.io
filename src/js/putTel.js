// generic elementcollector for putEmail, putTel
const getElementsByClass = (elem, classname) => {
    const classes = new Array();
    const alltags = document.getElementsByTagName(elem);
    let i;
    for (i = 0; i < alltags.length; i++)
        if (alltags[i].className == classname)
            classes[classes.length] = alltags[i];
    return classes;
}


const putEmail = (eml, emlSpan, textWhite) => {
    if (emlSpan) {
        const link = document.createElement("a");
        link.setAttribute("href", "mailto:" + eml);
        link.classList.add('text-link', textWhite);
        link.appendChild(document.createTextNode(eml));
        const spans = getElementsByClass("span", emlSpan);
        spans.forEach(el => el.parentNode.replaceChild(link.cloneNode(true), el))
    }
}



const eMail_span = 'eMail_span'
const eMail = ['a.ers', 'osi@gm', 'x.de']
putEmail(eMail.join(''), eMail_span);