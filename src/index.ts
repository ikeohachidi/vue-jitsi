import { PluginObject, VueConstructor } from 'vue';
import jitsi from './jitsi.vue';

const plugin: PluginObject<null> = {
    install(Vue: VueConstructor) {
        Vue.component('jitsi', jitsi)
    }
} 

export const Jitsi = jitsi;
export default plugin;