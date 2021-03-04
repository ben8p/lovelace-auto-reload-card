class AutoReloadCard extends HTMLElement {
	set hass(hass) {
		this.style.display = 'none';

		const delay = this.config.delay_in_minute * 6e4;
		
		let sessionItem = window.AutoReloadCardIntervalHandle;
		if(sessionItem) {
			const [previousPanelUrl, previousIntervalHandle] = sessionItem.split(':');
			if(previousPanelUrl !== hass.panelUrl && this.config.redirect_page == null) {
				clearInterval(previousIntervalHandle);
				sessionItem = null;
			}
		}
		if(!sessionItem) {
			const intervalHandle = setInterval(() => {
				const homeAssistant = document.querySelector('home-assistant');
				const root = homeAssistant.shadowRoot.querySelector('home-assistant-main').shadowRoot;
				const panel = root.querySelector('ha-panel-lovelace');
				if(!panel) { return; }
				const uiRoot = panel.shadowRoot.querySelector('hui-root');
				if(!uiRoot) { return; }
				const header = uiRoot.shadowRoot.querySelector('app-header');
				const isEditing = header.classList.contains('edit-mode');
				if(isEditing) { return; }
			
				const toolbar = uiRoot.shadowRoot.querySelector('app-toolbar');
				const buttonMenu = toolbar.querySelector('ha-button-menu');
				const refresh = buttonMenu.querySelector('[aria-label=Refresh]');
			
				if (refresh) {
					refresh.click();
				} else {
					location.reload();
				}
			}, delay);
            if(this.config.redirect_page == null)
                window.AutoReloadCardIntervalHandle = `${hass.panelUrl}:${intervalHandle}`;
            else
                window.AutoReloadCardIntervalHandle = `${this.config.redirect_page}:${intervalHandle}`;
		}
	}



	setConfig(config) {
		if(config.delay_in_minute === undefined || typeof config.delay_in_minute !== 'number' || !Number.isInteger(config.delay_in_minute) || config.delay_in_minute < 1) {
			throw new Error('You need to define delay_in_minute (integer, starting from 1)');
		}
		this.config = config;
	}
}
customElements.define('auto-reload-card', AutoReloadCard);
