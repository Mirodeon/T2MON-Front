export const addClassName = (className: string, selector: string, index: number) => {
    const elem: NodeListOf<Element> = document.querySelectorAll(selector);
    if (elem[index]) {
        elem[index].classList.add(className);
    }
};

export const removeClasseName = (className: string, selector: string, index: number) => {
    const elem: NodeListOf<Element> = document.querySelectorAll(selector);
    if (elem[index]) {
        elem[index].classList.remove(className);
    }
};