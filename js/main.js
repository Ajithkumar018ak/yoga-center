/* =========================================================
   AURA YOGA — MAIN JAVASCRIPT
   Premium Static Website
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* =========================================================
       GLOBAL SELECTORS
    ========================================================= */

    const body = document.body;

    const pageLoader = document.getElementById("pageLoader");
    const loaderProgress = document.getElementById("loaderProgress");
    const loaderPercent = document.getElementById("loaderPercent");

    const siteHeader = document.getElementById("siteHeader");
    const scrollProgress = document.getElementById("scrollProgress");

    const customCursor = document.getElementById("customCursor");

    const menuToggle = document.getElementById("menuToggle");
    const mobileOverlay = document.getElementById("mobileOverlay");
    const mobileDrawer = document.getElementById("mobileDrawer");
    const drawerClose = document.getElementById("drawerClose");

    const headerLoginButton =
        document.getElementById("headerLoginButton");

    const drawerLoginButton =
        document.getElementById("drawerLoginButton");

    const finalLoginButton =
        document.getElementById("finalLoginButton");


    /* =========================================================
       PAGE LOADER
    ========================================================= */

    let loaderValue = 0;

    const loaderPoses =
        document.querySelectorAll(".loader-pose");

    let loaderPoseIndex = 0;

    const changeLoaderPose = () => {

        if (!loaderPoses.length) {
            return;
        }

        loaderPoses.forEach((pose, index) => {
            pose.classList.toggle(
                "active",
                index === loaderPoseIndex
            );
        });

        loaderPoseIndex =
            (loaderPoseIndex + 1) %
            loaderPoses.length;
    };


    /*
        Change yoga pose every 700ms
    */

    const loaderPoseTimer =
        setInterval(changeLoaderPose, 700);


    /*
        Loader progress animation
    */

    const loaderProgressTimer =
        setInterval(() => {

            loaderValue += Math.floor(
                Math.random() * 4
            ) + 1;

            if (loaderValue >= 100) {
                loaderValue = 100;
                clearInterval(loaderProgressTimer);
            }

            if (loaderProgress) {
                loaderProgress.style.width =
                    `${loaderValue}%`;
            }

            if (loaderPercent) {
                loaderPercent.textContent =
                    String(loaderValue).padStart(2, "0");
            }

        }, 35);


    /*
        Page loading completion
    */

    const finishLoader = () => {

        clearInterval(loaderPoseTimer);
        clearInterval(loaderProgressTimer);

        if (loaderProgress) {
            loaderProgress.style.width = "100%";
        }

        if (loaderPercent) {
            loaderPercent.textContent = "100";
        }

        setTimeout(() => {

            if (!pageLoader) {
                return;
            }

            pageLoader.classList.add("loader-complete");

            body.classList.remove("loading");

            setTimeout(() => {

                pageLoader.style.pointerEvents = "none";
                pageLoader.setAttribute(
                    "aria-hidden",
                    "true"
                );

            }, 1200);

        }, 450);
    };


    /*
        Start page in loading state
    */

    body.classList.add("loading");


    /*
        Wait until window assets are loaded
    */

    window.addEventListener(
        "load",
        () => {

            setTimeout(
                finishLoader,
                900
            );

        },
        { once: true }
    );


    /*
        Safety fallback
    */

    setTimeout(() => {

        if (
            pageLoader &&
            !pageLoader.classList.contains(
                "loader-complete"
            )
        ) {
            finishLoader();
        }

    }, 5000);



    /* =========================================================
       SCROLL PROGRESS
    ========================================================= */

    const updateScrollProgress = () => {

        const scrollTop =
            window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        if (documentHeight <= 0) {
            return;
        }

        const percentage =
            (scrollTop / documentHeight) * 100;

        if (scrollProgress) {
            scrollProgress.style.width =
                `${percentage}%`;
        }

    };


    /* =========================================================
       HEADER SCROLL EFFECT
    ========================================================= */

    const updateHeader = () => {

        if (!siteHeader) {
            return;
        }

        if (window.scrollY > 50) {

            siteHeader.classList.add(
                "scrolled"
            );

        } else {

            siteHeader.classList.remove(
                "scrolled"
            );

        }

    };


    /* =========================================================
       SCROLL EVENT
    ========================================================= */

    const handleScroll = () => {

        updateScrollProgress();
        updateHeader();

    };

    window.addEventListener(
        "scroll",
        handleScroll,
        { passive: true }
    );

    handleScroll();



    /* =========================================================
       MOBILE DRAWER
    ========================================================= */

    const openDrawer = () => {

        if (!mobileDrawer) {
            return;
        }

        mobileDrawer.classList.add("active");

        if (mobileOverlay) {
            mobileOverlay.classList.add("active");
        }

        body.classList.add("drawer-open");

        if (menuToggle) {
            menuToggle.classList.add("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );
        }

        mobileDrawer.setAttribute(
            "aria-hidden",
            "false"
        );

    };


    const closeDrawer = () => {

        if (!mobileDrawer) {
            return;
        }

        mobileDrawer.classList.remove("active");

        if (mobileOverlay) {
            mobileOverlay.classList.remove("active");
        }

        body.classList.remove("drawer-open");

        if (menuToggle) {
            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );
        }

        mobileDrawer.setAttribute(
            "aria-hidden",
            "true"
        );

    };


    if (menuToggle) {

        menuToggle.addEventListener(
            "click",
            () => {

                if (
                    mobileDrawer &&
                    mobileDrawer.classList.contains("active")
                ) {

                    closeDrawer();

                } else {

                    openDrawer();

                }

            }
        );

    }


    if (drawerClose) {

        drawerClose.addEventListener(
            "click",
            closeDrawer
        );

    }


    if (mobileOverlay) {

        mobileOverlay.addEventListener(
            "click",
            closeDrawer
        );

    }


    /*
        Close drawer when navigation link is clicked
    */

    const drawerLinks =
        document.querySelectorAll(
            ".drawer-nav a"
        );

    drawerLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {
                closeDrawer();
            }
        );

    });



    /* =========================================================
       ESC KEY
    ========================================================= */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {

                closeDrawer();

                closeLoginModal();

            }

        }
    );



    /* =========================================================
       MOBILE RESIZE SAFETY
    ========================================================= */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 900 &&
                mobileDrawer &&
                mobileDrawer.classList.contains("active")
            ) {

                closeDrawer();

            }

        }
    );



    /* =========================================================
       HERO POSE SLIDER
    ========================================================= */

    const heroPoses =
        document.querySelectorAll(
            ".hero-pose"
        );

    const heroPrev =
        document.getElementById("heroPrev");

    const heroNext =
        document.getElementById("heroNext");

    const heroCurrent =
        document.getElementById("heroCurrent");

    const poseEyebrow =
        document.getElementById("poseEyebrow");

    const poseTitle =
        document.getElementById("poseTitle");

    const poseDescription =
        document.getElementById("poseDescription");

    const poseFocus =
        document.getElementById("poseFocus");

    const poseBreath =
        document.getElementById("poseBreath");

    const poseLevel =
        document.getElementById("poseLevel");

    const poseNumber =
        document.querySelector(".pose-number");

    const poseWord =
        document.querySelector(".pose-word");


    const poseData = [

        {
            eyebrow: "POSE 01 / TREE",

            title: `
                FIND YOUR
                <em>BALANCE.</em>
            `,

            description:
                "Root down, lift through the crown and discover the stillness hidden inside movement.",

            focus: "BALANCE",

            breath: "4 — 4",

            level: "BEGINNER",

            number: "01",

            word: "BALANCE"
        },

        {
            eyebrow: "POSE 02 / WARRIOR",

            title: `
                BUILD YOUR
                <em>POWER.</em>
            `,

            description:
                "Create strength from the ground up while keeping your breath steady and your mind focused.",

            focus: "STRENGTH",

            breath: "4 — 6",

            level: "BEGINNER",

            number: "02",

            word: "POWER"
        },

        {
            eyebrow: "POSE 03 / LOTUS",

            title: `
                FIND YOUR
                <em>STILLNESS.</em>
            `,

            description:
                "Turn inward, soften the noise and create space for deeper awareness through conscious breathing.",

            focus: "STILLNESS",

            breath: "5 — 5",

            level: "ALL LEVELS",

            number: "03",

            word: "STILLNESS"
        },

        {
            eyebrow: "POSE 04 / DANCER",

            title: `
                MOVE WITH
                <em>GRACE.</em>
            `,

            description:
                "Challenge your balance, open the body and move with confidence, control and awareness.",

            focus: "MOBILITY",

            breath: "4 — 4",

            level: "INTERMEDIATE",

            number: "04",

            word: "GRACE"
        }

    ];


    let currentPose = 0;


    const updateHeroPose = (
        index,
        direction = "next"
    ) => {

        if (!heroPoses.length) {
            return;
        }

        currentPose =
            (index + heroPoses.length) %
            heroPoses.length;


        /*
            Image switching
        */

        heroPoses.forEach(
            (pose, poseIndex) => {

                pose.classList.toggle(
                    "active",
                    poseIndex === currentPose
                );

            }
        );


        const data =
            poseData[currentPose];


        if (!data) {
            return;
        }


        /*
            Text animation
        */

        const textElements = [
            poseEyebrow,
            poseTitle,
            poseDescription,
            poseFocus,
            poseBreath,
            poseLevel,
            poseNumber,
            poseWord
        ];


        textElements.forEach(element => {

            if (element) {
                element.classList.add(
                    "pose-changing"
                );
            }

        });


        setTimeout(() => {

            if (poseEyebrow) {
                poseEyebrow.textContent =
                    data.eyebrow;
            }

            if (poseTitle) {
                poseTitle.innerHTML =
                    data.title;
            }

            if (poseDescription) {
                poseDescription.textContent =
                    data.description;
            }

            if (poseFocus) {
                poseFocus.textContent =
                    data.focus;
            }

            if (poseBreath) {
                poseBreath.textContent =
                    data.breath;
            }

            if (poseLevel) {
                poseLevel.textContent =
                    data.level;
            }

            if (poseNumber) {
                poseNumber.textContent =
                    data.number;
            }

            if (poseWord) {
                poseWord.textContent =
                    data.word;
            }


            textElements.forEach(element => {

                if (element) {
                    element.classList.remove(
                        "pose-changing"
                    );
                }

            });

        }, 180);


        /*
            Counter
        */

        if (heroCurrent) {

            heroCurrent.textContent =
                data.number;

        }

    };


    const nextPose = () => {

        updateHeroPose(
            currentPose + 1,
            "next"
        );

    };


    const previousPose = () => {

        updateHeroPose(
            currentPose - 1,
            "prev"
        );

    };


    if (heroNext) {

        heroNext.addEventListener(
            "click",
            nextPose
        );

    }


    if (heroPrev) {

        heroPrev.addEventListener(
            "click",
            previousPose
        );

    }



    /* =========================================================
       AUTO HERO SLIDER
    ========================================================= */

    let heroAutoPlay;

    const startHeroAutoPlay = () => {

        clearInterval(heroAutoPlay);

        heroAutoPlay =
            setInterval(
                nextPose,
                5000
            );

    };


    const stopHeroAutoPlay = () => {

        clearInterval(heroAutoPlay);

    };


    startHeroAutoPlay();


    const heroSection =
        document.querySelector(
            ".hero-section"
        );


    if (heroSection) {

        heroSection.addEventListener(
            "mouseenter",
            stopHeroAutoPlay
        );

        heroSection.addEventListener(
            "mouseleave",
            startHeroAutoPlay
        );

        heroSection.addEventListener(
            "touchstart",
            stopHeroAutoPlay,
            { passive: true }
        );

        heroSection.addEventListener(
            "touchend",
            startHeroAutoPlay,
            { passive: true }
        );

    }



    /* =========================================================
       HERO TOUCH / SWIPE
    ========================================================= */

    let touchStartX = 0;
    let touchEndX = 0;


    if (heroSection) {

        heroSection.addEventListener(
            "touchstart",
            event => {

                touchStartX =
                    event.changedTouches[0].screenX;

            },
            { passive: true }
        );


        heroSection.addEventListener(
            "touchend",
            event => {

                touchEndX =
                    event.changedTouches[0].screenX;

                const difference =
                    touchEndX - touchStartX;


                if (Math.abs(difference) < 50) {
                    return;
                }


                if (difference < 0) {

                    nextPose();

                } else {

                    previousPose();

                }

            },
            { passive: true }
        );

    }



    /* =========================================================
       REVEAL ON SCROLL
    ========================================================= */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "revealed"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -60px 0px"
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(
                element
            );

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add(
                "revealed"
            );

        });

    }



    /* =========================================================
       STAGGERED REVEAL
    ========================================================= */

    const revealGroups = [
        ".philosophy-points article",
        ".class-card",
        ".journey-item",
        ".instructor-card",
        ".footer-column"
    ];


    revealGroups.forEach(selector => {

        const items =
            document.querySelectorAll(
                selector
            );


        items.forEach(
            (item, index) => {

                item.style.setProperty(
                    "--reveal-delay",
                    `${index * 90}ms`
                );

            }
        );

    });



    /* =========================================================
       SMOOTH ANCHOR SCROLL
    ========================================================= */

    const anchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    anchorLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                const headerHeight =
                    siteHeader
                        ? siteHeader.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight;


                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });


                closeDrawer();

            }
        );

    });



    /* =========================================================
       CLASS HORIZONTAL DRAG
    ========================================================= */

    const classesTrack =
        document.getElementById(
            "classesTrack"
        );


    if (classesTrack) {

        let isDragging = false;
        let startX = 0;
        let scrollLeft = 0;


        classesTrack.addEventListener(
            "mousedown",
            event => {

                isDragging = true;

                classesTrack.classList.add(
                    "is-dragging"
                );

                startX =
                    event.pageX -
                    classesTrack.offsetLeft;

                scrollLeft =
                    classesTrack.scrollLeft;

            }
        );


        classesTrack.addEventListener(
            "mouseleave",
            () => {

                isDragging = false;

                classesTrack.classList.remove(
                    "is-dragging"
                );

            }
        );


        classesTrack.addEventListener(
            "mouseup",
            () => {

                isDragging = false;

                classesTrack.classList.remove(
                    "is-dragging"
                );

            }
        );


        classesTrack.addEventListener(
            "mousemove",
            event => {

                if (!isDragging) {
                    return;
                }

                event.preventDefault();


                const x =
                    event.pageX -
                    classesTrack.offsetLeft;


                const walk =
                    (x - startX) * 1.3;


                classesTrack.scrollLeft =
                    scrollLeft - walk;

            }
        );


        /*
            Touch scrolling
        */

        let touchStart = 0;
        let touchScroll = 0;


        classesTrack.addEventListener(
            "touchstart",
            event => {

                touchStart =
                    event.touches[0].pageX;

                touchScroll =
                    classesTrack.scrollLeft;

            },
            { passive: true }
        );


        classesTrack.addEventListener(
            "touchmove",
            event => {

                const currentX =
                    event.touches[0].pageX;

                const difference =
                    touchStart - currentX;


                classesTrack.scrollLeft =
                    touchScroll + difference;

            },
            { passive: true }
        );

    }



    /* =========================================================
       LOGIN MODAL
    ========================================================= */

    const loginModal =
        document.getElementById(
            "loginModal"
        );

    const loginModalClose =
        document.getElementById(
            "loginModalClose"
        );


    const loginTabs =
        document.querySelectorAll(
            ".login-tab"
        );


    const loginForms =
        document.querySelectorAll(
            ".login-form"
        );


    const openLoginModal = () => {

        if (!loginModal) {
            return;
        }


        closeDrawer();


        loginModal.classList.add(
            "active"
        );


        loginModal.setAttribute(
            "aria-hidden",
            "false"
        );


        body.classList.add(
            "modal-open"
        );


        /*
            Focus first visible input
        */

        setTimeout(() => {

            const activeForm =
                document.querySelector(
                    ".login-form.active"
                );


            const firstInput =
                activeForm
                    ? activeForm.querySelector(
                        "input"
                    )
                    : null;


            if (firstInput) {
                firstInput.focus();
            }

        }, 300);

    };


    function closeLoginModal() {

        if (!loginModal) {
            return;
        }


        loginModal.classList.remove(
            "active"
        );


        loginModal.setAttribute(
            "aria-hidden",
            "true"
        );


        body.classList.remove(
            "modal-open"
        );

    }



    /* =========================================================
       LOGIN BUTTONS
    ========================================================= */

    [
        headerLoginButton,
        drawerLoginButton,
        finalLoginButton
    ].forEach(button => {

        if (!button) {
            return;
        }


        button.addEventListener(
            "click",
            event => {

                event.preventDefault();

                openLoginModal();

            }
        );

    });


    if (loginModalClose) {

        loginModalClose.addEventListener(
            "click",
            closeLoginModal
        );

    }


    /*
        Close modal when clicking overlay
    */

    if (loginModal) {

        loginModal.addEventListener(
            "click",
            event => {

                if (
                    event.target === loginModal
                ) {

                    closeLoginModal();

                }

            }
        );

    }



    /* =========================================================
       LOGIN TABS
    ========================================================= */

    loginTabs.forEach(tab => {

        tab.addEventListener(
            "click",
            () => {

                const selectedTab =
                    tab.dataset.loginTab;


                /*
                    Update tabs
                */

                loginTabs.forEach(
                    currentTab => {

                        currentTab.classList.toggle(
                            "active",
                            currentTab === tab
                        );

                    }
                );


                /*
                    Update forms
                */

                loginForms.forEach(form => {

                    const formType =
                        form.dataset.loginForm;


                    form.classList.toggle(
                        "active",
                        formType === selectedTab
                    );

                });

            }
        );

    });



    /* =========================================================
       PASSWORD SHOW / HIDE
    ========================================================= */

    const passwordToggles =
        document.querySelectorAll(
            "[data-password-toggle]"
        );


    passwordToggles.forEach(toggle => {

        toggle.addEventListener(
            "click",
            () => {

                const inputId =
                    toggle.dataset.passwordToggle;


                const input =
                    document.getElementById(
                        inputId
                    );


                if (!input) {
                    return;
                }


                const isPassword =
                    input.type === "password";


                input.type =
                    isPassword
                        ? "text"
                        : "password";


                toggle.classList.toggle(
                    "visible",
                    isPassword
                );


                toggle.setAttribute(
                    "aria-label",
                    isPassword
                        ? "Hide password"
                        : "Show password"
                );

            }
        );

    });



    /* =========================================================
       LOGIN FORM VALIDATION
    ========================================================= */

    const loginFormsAll =
        document.querySelectorAll(
            ".login-form"
        );


    loginFormsAll.forEach(form => {

        form.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const emailInput =
                    form.querySelector(
                        'input[type="email"]'
                    );


                const passwordInput =
                    form.querySelector(
                        'input[type="password"], input[type="text"]'
                    );


                if (
                    !emailInput ||
                    !passwordInput
                ) {
                    return;
                }


                const email =
                    emailInput.value.trim();


                const password =
                    passwordInput.value;


                /*
                    Email validation
                */

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (
                    !emailPattern.test(email)
                ) {

                    showFormMessage(
                        form,
                        "Please enter a valid email address."
                    );

                    emailInput.focus();

                    return;

                }


                /*
                    Password validation
                */

                if (password.length < 8) {

                    showFormMessage(
                        form,
                        "Password must contain at least 8 characters."
                    );

                    passwordInput.focus();

                    return;

                }


                /*
                    Static website:
                    No backend / storage.
                    Successful action goes to 404.
                */

                const submitButton =
                    form.querySelector(
                        ".login-submit"
                    );


                if (submitButton) {

                    submitButton.classList.add(
                        "is-loading"
                    );


                    const buttonText =
                        submitButton.querySelector(
                            "span:first-child"
                        );


                    if (buttonText) {

                        buttonText.textContent =
                            "Entering AURA...";

                    }

                }


                setTimeout(() => {

                    window.location.href =
                        "404.html";

                }, 600);

            }
        );

    });



    /* =========================================================
       FORM MESSAGE
    ========================================================= */

    function showFormMessage(
        form,
        message
    ) {

        let messageElement =
            form.querySelector(
                ".login-form-message"
            );


        if (!messageElement) {

            messageElement =
                document.createElement(
                    "div"
                );


            messageElement.className =
                "login-form-message";


            form.appendChild(
                messageElement
            );

        }


        messageElement.textContent =
            message;


        messageElement.classList.add(
            "show"
        );


        clearTimeout(
            messageElement._timer
        );


        messageElement._timer =
            setTimeout(() => {

                messageElement.classList.remove(
                    "show"
                );

            }, 3500);

    }



    /* =========================================================
       CUSTOM CURSOR
    ========================================================= */

    if (
        customCursor &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        let cursorX = 0;
        let cursorY = 0;

        let currentX = 0;
        let currentY = 0;


        document.addEventListener(
            "mousemove",
            event => {

                cursorX =
                    event.clientX;

                cursorY =
                    event.clientY;

            }
        );


        const animateCursor = () => {

            currentX +=
                (cursorX - currentX) * 0.18;

            currentY +=
                (cursorY - currentY) * 0.18;


            customCursor.style.transform =
                `translate3d(${currentX}px, ${currentY}px, 0)`;


            requestAnimationFrame(
                animateCursor
            );

        };


        animateCursor();


        document.body.classList.add(
            "custom-cursor-enabled"
        );


        const interactiveElements =
            document.querySelectorAll(
                "a, button, input, textarea, select, .class-card, .instructor-card"
            );


        interactiveElements.forEach(element => {

            element.addEventListener(
                "mouseenter",
                () => {

                    customCursor.classList.add(
                        "hover"
                    );

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    customCursor.classList.remove(
                        "hover"
                    );

                }
            );

        });

    }



    /* =========================================================
       MAGNETIC BUTTONS
    ========================================================= */

    const magneticElements =
        document.querySelectorAll(
            ".magnetic"
        );


    if (
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        magneticElements.forEach(element => {

            element.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        element.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left -
                        rect.width / 2;


                    const y =
                        event.clientY -
                        rect.top -
                        rect.height / 2;


                    const strength = 0.15;


                    element.style.transform =
                        `translate(${x * strength}px, ${y * strength}px)`;

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    element.style.transform =
                        "";

                }
            );

        });

    }



    /* =========================================================
       IMAGE PARALLAX
    ========================================================= */

    const parallaxImages =
        document.querySelectorAll(
            ".experience-image img, .retreat-image-main img"
        );


    const updateParallax =
        () => {

            if (
                window.innerWidth < 768
            ) {
                return;
            }


            const viewportHeight =
                window.innerHeight;


            parallaxImages.forEach(image => {

                const rect =
                    image.getBoundingClientRect();


                if (
                    rect.bottom < 0 ||
                    rect.top > viewportHeight
                ) {
                    return;
                }


                const center =
                    rect.top +
                    rect.height / 2;


                const offset =
                    (
                        center -
                        viewportHeight / 2
                    ) * -0.025;


                image.style.transform =
                    `translate3d(0, ${offset}px, 0) scale(1.04)`;

            });

        };


    window.addEventListener(
        "scroll",
        updateParallax,
        { passive: true }
    );



    /* =========================================================
       ACTIVE NAVIGATION
    ========================================================= */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop() || "index.html";


    const allNavLinks =
        document.querySelectorAll(
            ".desktop-nav a, .drawer-nav a"
        );


    allNavLinks.forEach(link => {

        const href =
            link.getAttribute("href");


        if (!href) {
            return;
        }


        const cleanHref =
            href.split("#")[0];


        if (
            cleanHref === currentPage
        ) {

            link.classList.add(
                "active"
            );

        }

    });



    /* =========================================================
       IMAGE ERROR HANDLING
    ========================================================= */

    const allImages =
        document.querySelectorAll(
            "img"
        );


    allImages.forEach(image => {

        image.addEventListener(
            "error",
            () => {

                image.classList.add(
                    "image-error"
                );

            }
        );

    });



    /* =========================================================
       REDUCED MOTION SUPPORT
    ========================================================= */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (prefersReducedMotion.matches) {

        document.documentElement.classList.add(
            "reduced-motion"
        );


        clearInterval(heroAutoPlay);


        revealElements.forEach(element => {

            element.classList.add(
                "revealed"
            );

        });

    }



    /* =========================================================
       PAGE VISIBILITY
    ========================================================= */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.hidden
            ) {

                stopHeroAutoPlay();

            } else {

                startHeroAutoPlay();

            }

        }
    );



    /* =========================================================
       INITIAL HERO STATE
    ========================================================= */

    updateHeroPose(
        0
    );


    /* =========================================================
       INITIAL PARALLAX
    ========================================================= */

    updateParallax();


    /* =========================================================
       INITIAL SCROLL STATE
    ========================================================= */

    updateScrollProgress();
    updateHeader();


    /* =========================================================
       CONSOLE BRAND MESSAGE
    ========================================================= */

    console.log(
        "%c AURA YOGA ",
        "font-size:20px;font-weight:700;"
    );

    console.log(
        "%c Breathe. Move. Become. ",
        "font-size:13px;"
    );

});




setTimeout(() => {
    document.body.classList.remove("menu-open");
    document.body.classList.remove("modal-open");

    pageLoader.classList.add("loaded");

    setTimeout(() => {
        pageLoader.style.display = "none";
    }, 1000);
}, 3200);





/* =========================================================
   AURA YOGA — 3D PRELOADER
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const pageLoader = document.getElementById("pageLoader");
    const progressBar = document.getElementById("loaderProgress");
    const progressPercent = document.getElementById("loaderPercent");

    const poses = document.querySelectorAll(".loader-pose");

    if (!pageLoader || !poses.length) {
        return;
    }


    /* -----------------------------------------------------
       INITIAL STATE
    ----------------------------------------------------- */

    let currentPose = 0;

    poses.forEach((pose, index) => {
        pose.classList.toggle("active", index === 0);
        pose.classList.remove("exit");
    });


    /* -----------------------------------------------------
       LOCK PAGE SCROLL DURING PRELOADER
    ----------------------------------------------------- */

    document.body.classList.add("menu-open");


    /* -----------------------------------------------------
       CHANGE YOGA POSE
    ----------------------------------------------------- */

    function showPose(index) {

        poses.forEach((pose, i) => {

            pose.classList.remove("active");
            pose.classList.remove("exit");

            if (i !== index) {
                pose.classList.add("exit");
            }

        });


        /* Small delay gives 3D exit effect */

        setTimeout(() => {

            poses.forEach((pose, i) => {

                pose.classList.toggle(
                    "active",
                    i === index
                );

                if (i === index) {
                    pose.classList.remove("exit");
                }

            });

        }, 120);
    }


    /* -----------------------------------------------------
       LOADER PROGRESS
    ----------------------------------------------------- */

    const totalDuration = 6000;
    const startTime = performance.now();

    let poseTimer = null;
    let progressFrame = null;


    function updateLoader(time) {

        const elapsed = time - startTime;

        let progress =
            (elapsed / totalDuration) * 100;

        progress = Math.min(progress, 100);


        if (progressBar) {
            progressBar.style.width =
                `${progress}%`;
        }


        if (progressPercent) {
            progressPercent.textContent =
                `${Math.floor(progress)}%`;
        }


        if (progress < 100) {

            progressFrame =
                requestAnimationFrame(updateLoader);

        }

    }


    progressFrame =
        requestAnimationFrame(updateLoader);


    /* -----------------------------------------------------
       POSE 01 → 02 → 03
    ----------------------------------------------------- */

    poseTimer = setInterval(() => {

        currentPose++;

        if (currentPose < poses.length) {

            showPose(currentPose);

        } else {

            clearInterval(poseTimer);

        }

    }, 1600);


    /* -----------------------------------------------------
       FINISH LOADER
    ----------------------------------------------------- */

    setTimeout(() => {

        if (progressFrame) {
            cancelAnimationFrame(progressFrame);
        }


        if (progressBar) {
            progressBar.style.width = "100%";
        }


        if (progressPercent) {
            progressPercent.textContent = "100%";
        }


        /* Keep third pose visible briefly */

        setTimeout(() => {

            pageLoader.classList.add("loaded");

            document.body.classList.remove(
                "menu-open"
            );


            /* Remove loader completely */

            setTimeout(() => {

                pageLoader.style.display = "none";

            }, 1500);

        }, 700);

    }, totalDuration);

});












/* =========================================================
   AURA YOGA LOGIN
   MEMBER → USER DASHBOARD
   STUDIO → ADMIN DASHBOARD
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const loginModal = document.getElementById("loginModal");

    const memberForm = document.getElementById("memberLoginForm");
    const studioForm = document.getElementById("studioLoginForm");

    /* -----------------------------------------------------
       PASSWORD SHOW / HIDE
    ----------------------------------------------------- */

    const passwordToggles = document.querySelectorAll(
        "[data-password-toggle]"
    );

    passwordToggles.forEach((button) => {

        button.addEventListener("click", () => {

            const targetId = button.getAttribute(
                "data-password-toggle"
            );

            const input = document.getElementById(targetId);

            if (!input) return;

            if (input.type === "password") {

                input.type = "text";

                button.setAttribute(
                    "aria-label",
                    "Hide password"
                );

                button.classList.add("showing");

            } else {

                input.type = "password";

                button.setAttribute(
                    "aria-label",
                    "Show password"
                );

                button.classList.remove("showing");
            }

        });

    });


    /* -----------------------------------------------------
       MEMBER LOGIN
       → USER DASHBOARD
    ----------------------------------------------------- */

    if (memberForm) {

        memberForm.addEventListener("submit", (event) => {

            event.preventDefault();

            const emailInput =
                document.getElementById("memberEmail");

            const passwordInput =
                document.getElementById("memberPassword");

            if (!emailInput || !passwordInput) return;

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            if (!email || !password) {
                return;
            }

            /*
             * Save only the display name for dashboard greeting.
             * No backend / API / database required.
             */

            const nameFromEmail = email
                .split("@")[0]
                .replace(/[._-]+/g, " ")
                .replace(/\b\w/g, letter => letter.toUpperCase());

            sessionStorage.setItem(
                "auraUserName",
                nameFromEmail
            );

            sessionStorage.setItem(
                "auraUserRole",
                "member"
            );

            window.location.href = "user-dashboard.html";

        });

    }


    /* -----------------------------------------------------
       STUDIO LOGIN
       → ADMIN DASHBOARD
    ----------------------------------------------------- */

    if (studioForm) {

        studioForm.addEventListener("submit", (event) => {

            event.preventDefault();

            const emailInput =
                document.getElementById("studioEmail");

            const passwordInput =
                document.getElementById("studioPassword");

            if (!emailInput || !passwordInput) return;

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            if (!email || !password) {
                return;
            }

            sessionStorage.setItem(
                "auraStudioEmail",
                email
            );

            sessionStorage.setItem(
                "auraUserRole",
                "studio"
            );

            window.location.href = "admin-dashboard.html";

        });

    }

});




/* =========================================================
   AURA YOGA — INSTRUCTORS PAGE JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       HERO — 3 INSTRUCTOR ROTATION
    ===================================================== */

    const heroDetails =
        document.querySelectorAll(".instructor-detail");

    const heroCopies =
        document.querySelectorAll(".instructor-detail-copy");

    const heroDots =
        document.querySelectorAll("[data-instructor-slide]");

    let instructorIndex = 0;

    const instructorDuration = 6000;

    function showInstructor(index) {

        if (!heroDetails.length) return;

        instructorIndex =
            (index + heroDetails.length) %
            heroDetails.length;


        /* LEFT DETAILS */

        heroDetails.forEach((item, i) => {
            item.classList.toggle(
                "active",
                i === instructorIndex
            );
        });


        /* RIGHT DETAILS */

        heroCopies.forEach((item, i) => {
            item.classList.toggle(
                "active",
                i === instructorIndex
            );
        });


        /* DOTS */

        heroDots.forEach((dot, i) => {
            dot.classList.toggle(
                "active",
                i === instructorIndex
            );
        });
    }


    function nextInstructor() {
        showInstructor(instructorIndex + 1);
    }


    let instructorTimer =
        setInterval(
            nextInstructor,
            instructorDuration
        );


    /* manual dots */

    heroDots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            showInstructor(index);

            clearInterval(instructorTimer);

            instructorTimer =
                setInterval(
                    nextInstructor,
                    instructorDuration
                );
        });

    });


    /* =====================================================
       HERO MOUSE PARALLAX
    ===================================================== */

    const hero =
        document.querySelector(
            ".instructors-hero-section"
        );

    const heroCenter =
        document.querySelector(
            ".instructor-hero-center"
        );

    if (
        hero &&
        heroCenter &&
        window.matchMedia("(pointer:fine)").matches
    ) {

        hero.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    hero.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left)
                    / rect.width
                    - 0.5;

                const y =
                    (event.clientY - rect.top)
                    / rect.height
                    - 0.5;


                heroCenter.style.transform =
                    `translate(
                        calc(-50% + ${x * 12}px),
                        calc(-50% + ${y * 12}px)
                    )`;
            }
        );


        hero.addEventListener(
            "mouseleave",
            () => {

                heroCenter.style.transform =
                    "translate(-50%, -50%)";
            }
        );
    }


    /* =====================================================
       4 IMAGE GALLERY CAROUSEL
    ===================================================== */

    const gallerySlides =
        document.querySelectorAll(
            ".gallery-slide"
        );

    const galleryDots =
        document.querySelectorAll(
            ".gallery-dots button"
        );

    const galleryPrev =
        document.querySelector(
            ".gallery-prev"
        );

    const galleryNext =
        document.querySelector(
            ".gallery-next"
        );

    const progress =
        document.querySelector(
            ".gallery-progress-line span"
        );

    const gallery =
        document.querySelector(
            ".instructor-gallery-carousel"
        );


    if (!gallerySlides.length) {
        return;
    }


    let galleryIndex = 0;

    const galleryDuration = 5000;

    let galleryTimer;


    function updateGallery(index) {

        galleryIndex =
            (index + gallerySlides.length)
            % gallerySlides.length;


        gallerySlides.forEach(
            (slide, i) => {

                slide.classList.toggle(
                    "active",
                    i === galleryIndex
                );
            }
        );


        galleryDots.forEach(
            (dot, i) => {

                dot.classList.toggle(
                    "active",
                    i === galleryIndex
                );
            }
        );


        if (progress) {

            const percentage =
                ((galleryIndex + 1)
                / gallerySlides.length) * 100;

            progress.style.width =
                `${percentage}%`;
        }
    }


    function nextGallery() {

        updateGallery(
            galleryIndex + 1
        );
    }


    function previousGallery() {

        updateGallery(
            galleryIndex - 1
        );
    }


    function startGalleryAutoPlay() {

        clearInterval(galleryTimer);

        galleryTimer =
            setInterval(
                nextGallery,
                galleryDuration
            );
    }


    function stopGalleryAutoPlay() {

        clearInterval(galleryTimer);
    }


    /* NEXT */

    if (galleryNext) {

        galleryNext.addEventListener(
            "click",
            () => {

                nextGallery();

                startGalleryAutoPlay();
            }
        );
    }


    /* PREVIOUS */

    if (galleryPrev) {

        galleryPrev.addEventListener(
            "click",
            () => {

                previousGallery();

                startGalleryAutoPlay();
            }
        );
    }


    /* DOTS */

    galleryDots.forEach(
        (dot, index) => {

            dot.addEventListener(
                "click",
                () => {

                    updateGallery(index);

                    startGalleryAutoPlay();
                }
            );
        }
    );


    /* PAUSE ON HOVER */

    if (gallery) {

        gallery.addEventListener(
            "mouseenter",
            stopGalleryAutoPlay
        );

        gallery.addEventListener(
            "mouseleave",
            startGalleryAutoPlay
        );
    }


    /* =====================================================
       TOUCH SWIPE
    ===================================================== */

    let touchStartX = 0;
    let touchEndX = 0;


    if (gallery) {

        gallery.addEventListener(
            "touchstart",
            (event) => {

                touchStartX =
                    event.changedTouches[0].screenX;
            },
            {
                passive: true
            }
        );


        gallery.addEventListener(
            "touchend",
            (event) => {

                touchEndX =
                    event.changedTouches[0].screenX;

                const distance =
                    touchEndX - touchStartX;


                if (Math.abs(distance) < 50) {
                    return;
                }


                if (distance < 0) {
                    nextGallery();
                } else {
                    previousGallery();
                }


                startGalleryAutoPlay();
            },
            {
                passive: true
            }
        );
    }


    /* =====================================================
       KEYBOARD CONTROLS
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            const activeElement =
                document.activeElement;

            const isTyping =
                activeElement &&
                (
                    activeElement.tagName === "INPUT" ||
                    activeElement.tagName === "TEXTAREA" ||
                    activeElement.tagName === "SELECT"
                );

            if (isTyping) {
                return;
            }


            if (event.key === "ArrowRight") {

                nextGallery();

                startGalleryAutoPlay();
            }


            if (event.key === "ArrowLeft") {

                previousGallery();

                startGalleryAutoPlay();
            }
        }
    );


    /* =====================================================
       INITIALIZE
    ===================================================== */

    showInstructor(0);

    updateGallery(0);

    startGalleryAutoPlay();


    /* =====================================================
       INTERSECTION REVEAL
       Only if elements are not already forced visible
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".instructors-page .reveal"
        );


    if (
        revealElements.length &&
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "is-visible"
                                );

                                observer.unobserve(
                                    entry.target
                                );
                            }
                        }
                    );
                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            (element) => {

                revealObserver.observe(
                    element
                );
            }
        );
    }


    /* =====================================================
       SMOOTH INTERNAL LINKS
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach((link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute("href");

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (!target) {
                        return;
                    }


                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            );
        });

});




/* =========================================================
   INSTRUCTOR CENTER IMAGE SWITCHER
   NO ROTATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const images = document.querySelectorAll(".orbit-image");

    const details = document.querySelectorAll(".instructor-detail");

    const philosophies = document.querySelectorAll(
        ".instructor-detail-copy"
    );

    if (!images.length) return;

    let currentIndex = 0;

    function changeInstructor() {

        /* Remove active */

        images.forEach((image) => {
            image.classList.remove("active");
        });

        details.forEach((detail) => {
            detail.classList.remove("active");
        });

        philosophies.forEach((philosophy) => {
            philosophy.classList.remove("active");
        });


        /* Next instructor */

        currentIndex++;

        if (currentIndex >= images.length) {
            currentIndex = 0;
        }


        /* Activate */

        images[currentIndex].classList.add("active");

        if (details[currentIndex]) {
            details[currentIndex].classList.add("active");
        }

        if (philosophies[currentIndex]) {
            philosophies[currentIndex].classList.add("active");
        }

    }


    /* Change every 3 seconds */

    setInterval(changeInstructor, 3000);

});