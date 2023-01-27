export const slideNext = (count: number, selector: string): number => {
    const items = document.querySelectorAll(selector);
    const nbSlide = items.length;

    items[count].classList.remove("active");

    if (count < nbSlide - 1) {
        count++;
    } else {
        count = 0;
    }

    items[count].classList.add("active");

    return count;
};

export const slidePrev = (count: number, selector: string): number => {
    const items = document.querySelectorAll(selector);
    const nbSlide = items.length;

    items[count].classList.remove("active");

    if (count > 0) {
        count--;
    } else {
        count = nbSlide - 1;
    }

    items[count].classList.add("active");

    return count;
};

export const slideReset = (count: number, selector: string, firstActive?: boolean): number => {
    const items = document.querySelectorAll(selector);
    if (items[count]) {
        items[count].classList.remove("active");
        if (firstActive) {
            items[0].classList.add("active");
        }
    }
    return 0;
};

//slide in a square or double column
export const slideUp = (count: number, selector: string): number => {
    const items = document.querySelectorAll(selector);
    const nbSlide = items.length;

    items[count].classList.remove("active");

    if (count > 1) {
        count = count - 2;
    } else if (count === 0) {
        count = nbSlide - 2;
    } else if (count === 1) {
        count = nbSlide - 1;
    }

    items[count].classList.add("active");

    return count;
};

export const slideDown = (count: number, selector: string): number => {
    const items = document.querySelectorAll(selector);
    const nbSlide = items.length;

    items[count].classList.remove("active");

    if (count < nbSlide - 2) {
        count = count + 2;
    } else if (count === nbSlide - 1) {
        count = 1;
    } else if (count === nbSlide - 2) {
        count = 0;
    }

    items[count].classList.add("active");

    return count;
};

export const slideLateral = (count: number, selector: string): number => {
    const items = document.querySelectorAll(selector);

    items[count].classList.remove("active");

    if (count % 2 === 0) {
        count++;
    } else {
        count--;
    }

    items[count].classList.add("active");

    return count;
};