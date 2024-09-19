// HeaderGz is a recreation of the HeroGamers GunZ header made in native javascript by TanyaHastur.
(function() {
    var defaults = {
        version: "1.0.0",
        lastFps: performance.now(),
        frames: 0,
        lastDraw: 0,
        frameDelay: 0,
        drawFps: 0,
        interval: 0,
        path: 'images/header/',
        update: undefined,
        canvas: undefined,
        context: undefined,
        isPaused: false,
        sleepTime: false,
        guns: 0,
        logo: 0,
    }
    // If you want to remove an option just comment it with "//"
    // Also you can modify the route to where you want the specific label to take you.
    var menu = [
        {name: 'home', w: 43, h: 18, route: 'index.php'},
        {name: 'register', w: 72, h: 18, route: 'index.php?do=register'},
        {name: 'download', w: 88, h: 18, route: 'index.php?do=download'},
        {name: 'forum', w: 38, h: 18, route: 'https://tanya.hastur.dev/'},
        {name: 'ranking', w: 67, h: 18, route: 'index.php?do=individualrank'},
        {name: 'itemshop', w: 77, h: 18, route: 'index.php?do=shop'}
    ];
    // number used for positioning the entire panel
    let xAxisPosition = 341;

    defaults.canvas = document.getElementById('headerGz');
    defaults.context = defaults.canvas.getContext('2d');
    defaults.canvas.width = 791;
    defaults.canvas.height = 359;
    defaults.canvas.style.touchAction = 'none';
    defaults.canvas.style.cursor = 'default';

    // imageUtils
    var ImageUtils = function() {
        this.images = {};
        this.loaded = 0;
        this.imgs = {};
    };
    
    ImageUtils.prototype.loadImages = function(imageSources, callback) {
        var _this = this;
        var totalImages = Object.keys(imageSources).length;
        for (var key in imageSources) {
            var image = new Image();
            image.src = imageSources[key];
            image.onload = function() {
                _this.loaded++;
                if (_this.loaded === totalImages) {
                    callback(_this.imgs);
                }
            };
            image.onerror = function() {
                console.error("Error al cargar la imagen: " + imageSources[key]);
            };
            _this.imgs[key] = image;
        }
    };
    
    const images = {
        character: defaults.path + 'character.png',
        gunz: defaults.path + 'gunz.png',
        gunz_glow: defaults.path + 'gunz_glow.png',
        gun_glow: defaults.path + 'gun_glow.png',
        menu_labels: defaults.path + 'menu_labels.png',
        panel: defaults.path + 'panel_hq.png'
    };
    let imageUtils = new ImageUtils();
    let loadedImages = undefined;
    // dynamically update the x-axis for each option
    menu.forEach((item, index) => {
        item.x = xAxisPosition;
        item.y = 36;
        xAxisPosition += item.w;
    });

    let hoveredMenu = null;
    let clickedMenu = null;
    let mouseX = 0;
    let mouseY = 0;
    let originX = (name) => {
        switch (name) {
            case 'home':
                return 0;
            case 'register':
                return 43;
            case 'download':
                return 115;
            case 'forum':
                return 203;
            case 'ranking':
                return 241;
            case 'itemshop':
                return 308;
            default:
                return 0;
        }
    }

    function drawMenu() {
        menu.forEach((item, index) => {
            const offsetX = 8 * index;
            if (index === hoveredMenu) {
                defaults.context.filter = 'contrast(0.35) brightness(1.5)';
            } else {
                defaults.context.filter = 'none';
            }
            defaults.context.drawImage(loadedImages.menu_labels, originX(item.name), 0, item.w, item.h, item.x + offsetX, (index === clickedMenu && index === hoveredMenu) ? item.y + 2 : item.y, item.w, (index === clickedMenu && index === hoveredMenu) ? item.h - 4 : item.h);
        });
        defaults.context.filter = 'none';
    }

    const borderWidth = 12;
    const imgWidth = 52;
    const imgHeight = 52;
    const panelWidth = (menu[menu.length - 1].x + menu[menu.length - 1].w + ((menu.length - 1) * 8)) - (menu[0].x) + 28;
    const panelHeight = 52;

    // Coords of the image sections (left, right, top, bottom)
    const left = borderWidth;
    const right = imgWidth - borderWidth;
    const top = borderWidth;
    const bottom = imgHeight - borderWidth;
    const xpos = menu[0].x - 14;
    const ypos = menu[0].y - 17;

    onInit();

    defaults.update = function(delta) {
        const now = performance.now();
        if (now - defaults.lastDraw < defaults.frameDelay) { return; }
        defaults.frames++;

        defaults.lastDraw = now;
        defaults.context.clearRect(0, 0, defaults.canvas.width, defaults.canvas.height);

        imageUtils.loadImages(images, (loaded) => {
            loadedImages = loaded;
        });

        if (loadedImages != undefined) {
            // Panel HQ
            defaults.context.drawImage(loadedImages.panel, 0, 0, left, top, xpos, ypos, borderWidth, borderWidth);
            defaults.context.drawImage(loadedImages.panel, right, 0, borderWidth, top, (panelWidth - borderWidth) + xpos, ypos, borderWidth, borderWidth);
            defaults.context.drawImage(loadedImages.panel, 0, bottom, left, borderWidth, xpos, (panelHeight - borderWidth) + ypos, borderWidth, borderWidth);
            defaults.context.drawImage(loadedImages.panel, right, bottom, borderWidth, borderWidth, (panelWidth - borderWidth) + xpos, (panelHeight - borderWidth) + ypos, borderWidth, borderWidth);
            defaults.context.drawImage(loadedImages.panel, left, 0, right - left, top, borderWidth + xpos, ypos, panelWidth - borderWidth * 2, borderWidth);
            defaults.context.drawImage(loadedImages.panel, left, bottom, right - left, borderWidth, borderWidth + xpos, (panelHeight - borderWidth) + ypos, panelWidth - borderWidth * 2, borderWidth);
            defaults.context.drawImage(loadedImages.panel, 0, top, left, bottom - top, xpos, borderWidth + ypos, borderWidth, panelHeight - borderWidth * 2);
            defaults.context.drawImage(loadedImages.panel, right, top, borderWidth, bottom - top, (panelWidth - borderWidth) + xpos, borderWidth + ypos, borderWidth, panelHeight - borderWidth * 2);
            defaults.context.drawImage(loadedImages.panel, left, top, right - left, bottom - top, borderWidth + xpos, borderWidth + ypos, panelWidth - borderWidth * 2, panelHeight - borderWidth * 2);

            drawMenu(loadedImages.menu_labels); // Panel Labels
            defaults.context.drawImage(loadedImages.character, 0, 1, 389, 358); // Character
            defaults.context.drawImage(loadedImages.gunz, 395, 105, 377, 148); // GunZ Logo
            // Step glowmation
            defaults.context.drawImage(loadedImages.gun_glow, ((-2 + defaults.guns) * 10) + 5, 0, 18, 116, 20 + (-2 + defaults.guns) * 10, 165, 18, 116);
            defaults.context.drawImage(loadedImages.gunz_glow, ((22 - defaults.logo) * 18) + 5, 0, 29, 148, 400 + (22 - defaults.logo) * 18, 105, 29, 148);
        }

        if (defaults.isPaused) { return false; }
        if (defaults.guns <= 20) defaults.guns++;

        if (defaults.guns >= 20) {
            if (defaults.sleepTime) {
                if (defaults.logo < 25) defaults.logo++;
        
                if (defaults.logo >= 25) {
                    defaults.isPaused = true;
                    setTimeout(() => {
                        defaults.isPaused = false;
                        defaults.sleepTime = false;
                        defaults.guns = 0;
                        defaults.logo = 0;
                    }, 3500);
                }
            } else {
                setTimeout(() => {
                    defaults.sleepTime = true;
                }, 300);
            }
        }
    }

    function onInit() {
        if (defaults.interval >= 1) { return; }
        let last = Date.now();
        defaults.interval = setInterval(() => {
            const now = Date.now();
            defaults.update((now - last) / 1000);
            last = now
        }, 1000 / 60);
    }
    // on url press
    function GetUrl(url, target) {
        if (target === "_self") {
            window.location.href = url;
        } else {
            window.open(url, "_blank", "noopener,noreferrer");
        }
    }
    // event mouse move
    defaults.canvas.addEventListener('mousemove', function (e) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    
        hoveredMenu = null;
        let isOverMenu = false; 

        for (let i = 0; i < menu.length; i++) {
            let offsetX = 8 * i;
            const item = menu[i]

            if (mouseX >= item.x + offsetX && mouseX <= item.x + offsetX + item.w && mouseY >= item.y && mouseY <= item.y + item.h) {
                hoveredMenu = i;
                isOverMenu = true;
                break;
            }
        };

        if (isOverMenu) {
            defaults.canvas.style.cursor = 'pointer';
        } else {
            defaults.canvas.style.cursor = 'default';
        }
    });
    // event mouse down
    defaults.canvas.addEventListener('mousedown', function (e) {
        clickedMenu = null;

        for (let i = 0; i < menu.length; i++) {
            const item = menu[i];
            let offsetX = 8 * i;

            if (mouseX >= item.x + offsetX && mouseX <= item.x + offsetX + item.w && mouseY >= item.y && mouseY <= item.y + item.h) {
                clickedMenu = i;
                break;
            }
        }
    });
    // event mouse up
    defaults.canvas.addEventListener('mouseup', function (e) {
        clickedMenu = null;
    });
    // event click
    defaults.canvas.addEventListener('click', function(e) {
        for (let i = 0; i < menu.length; i++) {
            const item = menu[i];
            let offsetX = 8 * i;

            if (mouseX >= item.x + offsetX && mouseX <= item.x + offsetX + item.w && mouseY >= item.y && mouseY <= item.y + item.h) {
                window.location.href = item.route;
                GetUrl(item.route, "_self");
                break;
            }
        }
    });
} ());