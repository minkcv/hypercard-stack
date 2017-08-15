const electron = require('electron')

module.exports = 
{
    createMenuTemplate: function(handleOpen, handleSave, handleLoad, handleFullscreen, isFullscreen)
    {
        let fullscreenLabel = 'Full Screen';
        if (isFullscreen)
            fullscreenLabel = 'Exit Full Screen';

        return [
            {
                label: 'File',
                submenu:
                [
                    { click: handleOpen,        label: 'Open', accelerator: 'CommandOrControl+O' },
                    { click: handleSave,        label: 'Save', accelerator: 'CommandOrControl+S' },
                    { click: handleLoad,        label: 'Load', accelerator: 'CommandOrControl+L' },
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
    }
}