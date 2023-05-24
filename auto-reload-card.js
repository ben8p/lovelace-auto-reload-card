class AutoReloadCard extends HTMLElement {
	set hass(hass) {
		this.style.display = 'none';

		const delay = this.config.delay_in_minute * 6e4;
		
		let sessionItem = window.AutoReloadCardIntervalHandle;
		if(sessionItem) {
			const [previousPanelUrl, previousIntervalHandle] = sessionItem.split(':');
			if(previousPanelUrl !== hass.panelUrl) {
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
				const editMode = uiRoot.shadowRoot.querySelector('.edit-mode');
				if(editMode) { return; }

				location.reload();
			}, delay);
			window.AutoReloadCardIntervalHandle = `${hass.panelUrl}:${intervalHandle}`;
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
