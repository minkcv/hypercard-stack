const electron = require('electron')

module.exports.createMenuTemplate = function(gameLoaded, handleOpen, handleSave, handleLoad, handleFullscreen, isFullscreen)
{
    let fullscreenLabel = 'Full Screen';
    if (isFullscreen)
        fullscreenLabel = 'Exit Full Screen';

    menuData = [
        {
            label: 'File',
            submenu:
            [
                { click: handleOpen,        label: 'Open', accelerator: 'CommandOrControl+O' },
                { click: electron.app.quit, label: 'Exit', accelerator: 'CommandOrControl+Q' }
            ]
        },
        {
            label: 'View',
            submenu:
            [
                { role: 'toggledevtools' },
                { click: handleFullscreen, label: fullscreenLabel }
            ]
        }
    ];

    // Add the load/save commands if we've loaded a game already.
    if (gameLoaded)
    {
        menuData[0]['submenu'].splice(1, 0,
            { click: handleSave,        label: 'Save', accelerator: 'CommandOrControl+S' },
            { click: handleLoad,        label: 'Load', accelerator: 'CommandOrControl+L' }
        )
    }

    return menuData;
}
