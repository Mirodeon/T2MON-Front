const locationNav = (currentPath: string) => {
    let navLocation = [
        { path: "game", btn: "game_nav" },
        { path: "wiki", btn: "wiki_nav" },
        { path: "login", btn: "login_nav" },
        { path: "register", btn: "register_nav" },
        { path: "profile", btn: "profile_nav" },
    ];
    let subNavLocation = [
        { path: "controller", btn: "controller_wiki_nav" },
        { path: "t2mon", btn: "t2mon_wiki_nav" },
        { path: "spell", btn: "spell_wiki_nav" },
        { path: "item", btn: "item_wiki_nav" },
        { path: "fight", btn: "fight_wiki_nav" },
    ];
    let locHome = true;
    let activeNavBtns = document.querySelectorAll(".currentLocation");
    activeNavBtns.forEach((btn) => {
        btn.classList.remove("currentLocation");
    });
    let pathArray = currentPath.split("/");
    navLocation.forEach((item) => {
        if (pathArray[1] === item.path) {
            let currentNav = document.querySelectorAll(`.${item.btn}`);
            currentNav.forEach((item) => item.classList.add("currentLocation"));
            locHome = false;
            if (pathArray[2]) {
                subNavLocation.forEach((item) => {
                    if (pathArray[2] === item.path) {
                        let currentSubNav = document.querySelectorAll(`.${item.btn}`);
                        currentSubNav.forEach((item) => item.classList.add("currentLocation"));
                    }
                })
            }
        }
    });
    if (locHome) {
        let currentNav = document.querySelectorAll(`.home_nav`);
        currentNav.forEach((item) => item.classList.add("currentLocation"));
    }
};

export default locationNav;