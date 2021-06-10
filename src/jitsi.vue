<template>
    <div ref="jitsi-meet-parent" class="jitsi-wrapper"></div>
</template>

<script lang='ts'>
import {Vue, Component, Prop} from 'vue-property-decorator';

declare global {
    interface Window { JitsiMeetExternalAPI: any }
}

type CommandCallback = {
    name: string;
    action: (event: Record<string, unknown>) => void | Record<string, unknown> | string;
}

type Event = {
    name: string;
    listener: (event: Record<string, unknown>) => void;
}

@Component
export default class VueJitsi extends Vue {
    @Prop({ default: '' }) roomID!: string;
    @Prop({ default: 'meet.jit.si' }) domain!: string;
    @Prop({ default: '100%' }) height!: string | number;
    @Prop({ default: '100%' }) width!: string | number;
    @Prop({ default: () => { return {} }}) config!: {[option: string]: string | boolean};
    @Prop({ default: () => { return {} }}) interfaceConfig!: {[option: string]: string | boolean};
    @Prop({ default: () => { return [] }}) commands!: CommandCallback[];
    @Prop({ default: () => { return [] }}) events!: Event[];

    private jitsi = new window.JitsiMeetExternalAPI(this.domain, {});

    private initJitsiProcess() {
        const parentRef = this.$refs['jitsi-meet-parent'] as HTMLElement;
        this.jitsi = new window.JitsiMeetExternalAPI(this.domain, {
            roomName: this.roomID,
            parentNode: parentRef,
            width: this.width,
            height: this.height,
            configOverwrite: {
                ...this.config
            },
            interfaceConfigOverwrite: {
                ...this.interfaceConfig
            },
        })

        this.killJitsiProcess();
    }

    get jitsiScript(): HTMLScriptElement {
        const jitsiScript = document.createElement('script');
        jitsiScript.src = `https://${this.domain}/external_api.js`;
        jitsiScript.async = true;

        return jitsiScript;
    }

    private mountJitsi() {
        const bodyElement = document.querySelector('body');

        if (bodyElement && !document.body.contains(this.jitsiScript)) {
            bodyElement.append(this.jitsiScript)

            this.jitsiScript.addEventListener('load', this.initJitsiProcess)
        }
    }

    private killJitsiProcess() {
        this.jitsi.addEventListener('videoConferenceLeft', () => {
            this.jitsi.dispose();
            this.close();
        })
    }

    private close() {
        this.$emit('close')
    }

    mounted() {
        this.mountJitsi();
    }

    destroy() {
        this.jitsi.dispose()
    }
}
</script>

<style scoped>
div.jitsi-wrapper {
    width: 100%;
    height: 100%;
}
</style>