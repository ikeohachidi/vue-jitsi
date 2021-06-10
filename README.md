## Getting Started

1. Install the plugin
```
npm install --save <not on npm yet>
```
2. Add Plugin to app
```
import VueJitsi from 'vue-jitsi';

Vue.use(VueJitsi);
```

#### Usage
```
<jitsi
	:roomID="your-room-id"
	:domain="ikeoha.com"
	:userInfo="{
		email: ''
	}"
	:config="{}"
	:interfaceConfig="{}"
/>
```
Please find more `config` options at [enter link description here](https://github.com/jitsi/jitsi-meet/blob/master/config.js) and more `interfaceConfigOptions` at [enter link description here](https://github.com/jitsi/jitsi-meet/blob/master/interface_config.js)

| Prop|value|default
|--|--|--|
|roomID|string| ''
|domain|string| meet.jit.si
|userInfo|object|{}
|height|string OR number| 100%
|width|string OR number| 100%
|config|{}|{}
|interfaceConfig|{}|{}