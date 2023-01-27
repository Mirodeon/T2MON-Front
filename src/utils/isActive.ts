const isActive = (selector: string): boolean => {
    let elems: NodeListOf<Element> = document.querySelectorAll(selector);
    let result = false;
    elems.forEach((elem) => elem.classList.contains("active") ? result = true : result ? result = true : result = false)
    return result;
}
export default isActive;