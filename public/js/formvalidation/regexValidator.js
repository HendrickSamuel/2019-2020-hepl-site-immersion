let regs = {'heure': /^[0-9]{2}h[0-9]{2}$/};

export function verifregex(valeur, attribut) {
    if (attribut in regs) {
        let regex = regs[attribut];
        return regex.test(valeur);
    } else
        return false;
}

export function switchclass(object, addclass, removeclass) {
    if (object.classList.contains(removeclass))
        object.classList.remove(removeclass);

    if (!object.classList.contains(addclass))
        object.classList.add(addclass);
}