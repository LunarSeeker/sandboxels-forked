// Based off cs_expanded

const menu = {
    pauseButton: 'freeze',
    resetButton: 'reset',
    replaceButton: 'change',
    // elemSelectButton: 'X',
    tpsButton: 'TPS',
    infoButton: 'info',
    savesButton: 'files',
    modsButton: 'mods',
    settingsButton: 'settings',
    changelogButton: 'changelog',
}


if (langCode == 'qvp') {
    Object.keys(menu).forEach(key => {
        document.getElementById(key).textContent = menu[key]
    })
}