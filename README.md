[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg?style=for-the-badge)](https://github.com/custom-components/hacs)  

# auto-reload-card
Custom [Lovelace](https://www.home-assistant.io/lovelace) card to use in [Home assistant](https://www.home-assistant.io/) allowing lovelace to auto reload every X minutes.

When running on wall tablet, it often happens that lovelace websocket disconnect and the entities are not refreshed automatically anymore.  
This card, can be used to workaround this problem.  
Hopefully, one day, this card will be deprecated and a real fix will be available.  

### Installation
Use [HACS](https://hacs.xyz/) or follow this [guide](https://github.com/thomasloven/hass-config/wiki/Lovelace-Plugins)

```
resources:
  url: /local/auto-reload-card.js
  type: module
```

### Configuration example:

 - Refresh lovelace every 1 minute:
```yaml
type: 'custom:auto-reload-card'
delay_in_minute: 1
```
